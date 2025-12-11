// Sistema completo del Quiz
const Sistema = {
    // Estado del sistema
    estado: {
        saldo: 0,
        temaActual: null,
        subtemaActual: null,
        mazoActual: null,
        preguntaActual: 0,
        respuestasCorrectas: 0,
        respuestasIncorrectas: 0,
        tiempoInicio: null,
        tiempoTranscurrido: 0,
        intervalo: null,
        progreso: {} // Almacena progreso por mazo
    },

    // Inicialización
    inicializar: function() {
        this.cargarEstado();
        this.inicializarTemporizador();
        this.actualizarUI();
    },

    // Cargar estado desde localStorage
    cargarEstado: function() {
        const estadoGuardado = localStorage.getItem('quizEstado');
        const saldoGuardado = localStorage.getItem('quizSaldo');
        const progresoGuardado = localStorage.getItem('quizProgreso');
        
        if (estadoGuardado) {
            this.estado = JSON.parse(estadoGuardado);
        }
        
        if (saldoGuardado) {
            this.estado.saldo = parseInt(saldoGuardado);
        }
        
        if (progresoGuardado) {
            this.estado.progreso = JSON.parse(progresoGuardado);
        }
    },

    // Guardar estado en localStorage
    guardarEstado: function() {
        localStorage.setItem('quizEstado', JSON.stringify(this.estado));
        localStorage.setItem('quizSaldo', this.estado.saldo.toString());
        localStorage.setItem('quizProgreso', JSON.stringify(this.estado.progreso));
    },

    // Gestión de dinero
    agregarSoles: function(cantidad) {
        this.estado.saldo += cantidad;
        this.guardarEstado();
        this.actualizarSaldoUI();
        
        // Mostrar notificación
        this.mostrarNotificacion(`¡Ganaste ${cantidad} soles!`);
    },

    actualizarSaldoUI: function() {
        const elementoSaldo = document.getElementById('saldo-soles');
        if (elementoSaldo) {
            elementoSaldo.textContent = this.estado.saldo;
        }
    },

    // Gestión de progreso
    obtenerProgresoMazo: function(mazoId) {
        if (!this.estado.progreso[mazoId]) {
            return 0;
        }
        const totalPalabras = this.obtenerTotalPalabras(mazoId);
        const completadas = this.estado.progreso[mazoId].palabrasCorrectas.length;
        return totalPalabras > 0 ? Math.round((completadas / totalPalabras) * 100) : 0;
    },

    obtenerTotalPalabras: function(mazoId) {
        for (const tema of vocabulario.temas) {
            for (const subtema of tema.subtemas) {
                for (const mazo of subtema.mazos) {
                    if (mazo.id === mazoId) {
                        return mazo.palabras.length;
                    }
                }
            }
        }
        return 0;
    },

    registrarRespuesta: function(mazoId, palabraIndex, correcta) {
        if (!this.estado.progreso[mazoId]) {
            this.estado.progreso[mazoId] = {
                palabrasCorrectas: [],
                palabrasIncorrectas: [],
                completado: false,
                recompensaObtenida: false
            };
        }

        if (correcta) {
            if (!this.estado.progreso[mazoId].palabrasCorrectas.includes(palabraIndex)) {
                this.estado.progreso[mazoId].palabrasCorrectas.push(palabraIndex);
            }
            this.estado.respuestasCorrectas++;
        } else {
            if (!this.estado.progreso[mazoId].palabrasIncorrectas.includes(palabraIndex)) {
                this.estado.progreso[mazoId].palabrasIncorrectas.push(palabraIndex);
            }
            this.estado.respuestasIncorrectas++;
        }

        // Verificar si se completó el mazo
        this.verificarCompletadoMazo(mazoId);
        
        this.guardarEstado();
    },

    verificarCompletadoMazo: function(mazoId) {
        const progreso = this.obtenerProgresoMazo(mazoId);
        const mazoData = this.obtenerMazoPorId(mazoId);
        
        if (progreso === 100 && 
            mazoData && 
            this.estado.progreso[mazoId] && 
            !this.estado.progreso[mazoId].recompensaObtenida) {
            
            this.estado.progreso[mazoId].recompensaObtenida = true;
            this.estado.progreso[mazoId].completado = true;
            this.agregarSoles(mazoData.recompensa);
            
            this.mostrarNotificacion(`¡Mazo completado al 100%! Ganaste ${mazoData.recompensa} soles`);
        }
    },

    // Gestión del quiz
    iniciarQuiz: function(mazoId) {
        this.estado.mazoActual = mazoId;
        this.estado.preguntaActual = 0;
        this.estado.respuestasCorrectas = 0;
        this.estado.respuestasIncorrectas = 0;
        this.estado.tiempoInicio = Date.now();
        this.estado.tiempoTranscurrido = 0;
        
        this.iniciarTemporizador();
        this.guardarEstado();
        this.mostrarPregunta();
    },

    obtenerPreguntaActual: function() {
        const mazo = this.obtenerMazoActual();
        if (mazo && mazo.palabras[this.estado.preguntaActual]) {
            return mazo.palabras[this.estado.preguntaActual];
        }
        return null;
    },

    obtenerMazoActual: function() {
        return this.obtenerMazoPorId(this.estado.mazoActual);
    },

    obtenerMazoPorId: function(mazoId) {
        for (const tema of vocabulario.temas) {
            for (const subtema of tema.subtemas) {
                for (const mazo of subtema.mazos) {
                    if (mazo.id === mazoId) {
                        return mazo;
                    }
                }
            }
        }
        return null;
    },

    responderPregunta: function(opcionIndex) {
        const pregunta = this.obtenerPreguntaActual();
        if (!pregunta) return false;

        const correcta = opcionIndex === pregunta.respuesta;
        
        this.registrarRespuesta(
            this.estado.mazoActual,
            this.estado.preguntaActual,
            correcta
        );

        this.mostrarRetroalimentacion(correcta, pregunta.romaji);
        
        // Habilitar botón siguiente si la respuesta fue incorrecta
        if (!correcta) {
            document.getElementById('btn-siguiente').disabled = false;
        }

        return correcta;
    },

    siguientePregunta: function() {
        const mazo = this.obtenerMazoActual();
        if (!mazo) return;

        this.estado.preguntaActual++;
        
        if (this.estado.preguntaActual >= mazo.palabras.length) {
            this.finalizarQuiz();
        } else {
            this.mostrarPregunta();
        }
    },

    finalizarQuiz: function() {
        this.detenerTemporizador();
        
        // Mostrar resumen del quiz
        const total = this.obtenerMazoActual().palabras.length;
        const porcentaje = Math.round((this.estado.respuestasCorrectas / total) * 100);
        
        this.mostrarNotificacion(
            `¡Quiz completado! ${this.estado.respuestasCorrectas}/${total} correctas (${porcentaje}%)`
        );
        
        // Volver a la pantalla de mazos después de 3 segundos
        setTimeout(() => {
            UI.mostrarPantalla('pantalla-mazos');
        }, 3000);
    },

    // Temporizador
    iniciarTemporizador: function() {
        this.detenerTemporizador();
        this.estado.tiempoInicio = Date.now() - (this.estado.tiempoTranscurrido * 1000);
        
        this.estado.intervalo = setInterval(() => {
            this.estado.tiempoTranscurrido = Math.floor((Date.now() - this.estado.tiempoInicio) / 1000);
            this.actualizarTiempoUI();
        }, 1000);
    },

    detenerTemporizador: function() {
        if (this.estado.intervalo) {
            clearInterval(this.estado.intervalo);
            this.estado.intervalo = null;
        }
    },

    inicializarTemporizador: function() {
        // Solo para mantener el tiempo actualizado
        setInterval(() => {
            if (this.estado.intervalo) {
                this.actualizarTiempoUI();
            }
        }, 1000);
    },

    actualizarTiempoUI: function() {
        const tiempoElemento = document.getElementById('tiempo');
        if (tiempoElemento) {
            tiempoElemento.textContent = `${this.estado.tiempoTranscurrido}s`;
        }
    },

    // UI helpers
    mostrarPregunta: function() {
        const pregunta = this.obtenerPreguntaActual();
        if (!pregunta) return;

        const palabraElemento = document.getElementById('palabra-central');
        const opcionesElementos = document.querySelectorAll('.opcion');
        const preguntaActualElemento = document.getElementById('pregunta-actual');
        const totalPreguntasElemento = document.getElementById('total-preguntas');
        const mazo = this.obtenerMazoActual();

        // Actualizar palabra central
        palabraElemento.textContent = pregunta.palabra;
        
        // Limpiar romaji
        document.getElementById('romaji-display').textContent = '';
        
        // Limpiar feedback
        const feedbackElemento = document.getElementById('quiz-feedback');
        feedbackElemento.textContent = '';
        feedbackElemento.className = 'quiz-feedback';
        
        // Actualizar contadores
        preguntaActualElemento.textContent = this.estado.preguntaActual + 1;
        totalPreguntasElemento.textContent = mazo.palabras.length;
        
        // Deshabilitar botón siguiente
        document.getElementById('btn-siguiente').disabled = true;
        
        // Mezclar opciones
        const opcionesMezcladas = [...pregunta.opciones];
        for (let i = opcionesMezcladas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opcionesMezcladas[i], opcionesMezcladas[j]] = [opcionesMezcladas[j], opcionesMezcladas[i]];
        }
        
        // Insertar la respuesta correcta en una posición aleatoria
        const posicionCorrecta = Math.floor(Math.random() * 4);
        opcionesMezcladas[posicionCorrecta] = pregunta.opciones[pregunta.respuesta];
        
        // Actualizar opciones en UI
        opcionesElementos.forEach((opcion, index) => {
            opcion.textContent = opcionesMezcladas[index];
            opcion.className = 'opcion';
            opcion.dataset.correcta = (opcionesMezcladas[index] === pregunta.opciones[pregunta.respuesta]).toString();
        });
    },

    mostrarRetroalimentacion: function(correcta, romaji) {
        const feedbackElemento = document.getElementById('quiz-feedback');
        const romajiElemento = document.getElementById('romaji-display');
        const opcionesElementos = document.querySelectorAll('.opcion');
        
        // Mostrar romaji
        romajiElemento.textContent = romaji;
        
        // Mostrar mensaje de feedback
        if (correcta) {
            feedbackElemento.textContent = '¡Correcto!';
            feedbackElemento.className = 'quiz-feedback correcto';
        } else {
            feedbackElemento.textContent = 'Incorrecto';
            feedbackElemento.className = 'quiz-feedback incorrecto';
        }
        
        // Resaltar opciones
        opcionesElementos.forEach(opcion => {
            if (opcion.dataset.correcta === 'true') {
                opcion.classList.add('correcta');
            } else if (opcion.textContent !== '' && opcion.dataset.correcta === 'false') {
                opcion.classList.add('incorrecta');
            }
        });
    },

    mostrarNotificacion: function(mensaje) {
        const notificacion = document.getElementById('notificacion');
        const notificacionTexto = document.getElementById('notificacion-texto');
        
        notificacionTexto.textContent = mensaje;
        notificacion.style.display = 'block';
        
        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 3000);
    },

    actualizarUI: function() {
        this.actualizarSaldoUI();
    },

    // Navegación
    seleccionarTema: function(temaId) {
        this.estado.temaActual = temaId;
        this.guardarEstado();
    },

    seleccionarSubtema: function(subtemaId) {
        this.estado.subtemaActual = subtemaId;
        this.guardarEstado();
    },

    // Limpiar estado
    resetearQuiz: function() {
        this.estado.mazoActual = null;
        this.estado.preguntaActual = 0;
        this.estado.respuestasCorrectas = 0;
        this.estado.respuestasIncorrectas = 0;
        this.detenerTemporizador();
        this.estado.tiempoTranscurrido = 0;
    }
};
