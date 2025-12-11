// Archivo principal que coordina todos los sistemas

class AplicacionPrincipal {
    constructor() {
        this.mangaActual = null;
        this.mazoActual = null;
        this.quizActivo = false;
        this.palabraActual = null;
        this.opcionesActuales = [];
        this.indicePalabra = 0;
        this.palabrasFalladas = 0;
        this.palabrasAcertadas = 0;
        this.palabrasMarcadasDificiles = [];
        
        // Inicializar sistemas
        this.sistemaJuego = window.sistemaJuego || new SistemaJuego();
        this.sistemaRPG = window.sistemaRPG || new SistemaRPGNovias();
        
        // Configurar event listeners
        this.configurarEventListeners();
        
        // Inicializar UI
        this.inicializarUI();
    }

    // ========== INICIALIZACIÓN ==========
    configurarEventListeners() {
        // Navegación principal
        document.getElementById('btn-vocabulario')?.addEventListener('click', () => this.mostrarSeccion('vocabulario'));
        document.getElementById('btn-novias')?.addEventListener('click', () => this.mostrarSeccion('novias'));
        document.getElementById('btn-dificiles')?.addEventListener('click', () => this.mostrarSeccion('dificiles'));
        
        // Botones del quiz
        document.getElementById('btn-volver-mangas')?.addEventListener('click', () => this.volverAMangas());
        document.getElementById('btn-marcar-dificil')?.addEventListener('click', () => this.marcarPalabraDificil());
        document.getElementById('btn-limpiar-dificiles')?.addEventListener('click', () => this.limpiarPalabrasDificiles());
        document.getElementById('btn-iniciar-dificiles')?.addEventListener('click', () => this.iniciarQuizDificiles());
        document.getElementById('btn-cerrar-modal')?.addEventListener('click', () => this.sistemaJuego.cerrarModalEvento());
        
        // Selector de novias
        document.getElementById('select-novia')?.addEventListener('change', (e) => {
            this.sistemaRPG.seleccionarNovia(parseInt(e.target.value));
        });
        
        // Opciones del quiz
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.seleccionarOpcion(parseInt(e.target.dataset.option)));
        });
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('evento-modal')?.addEventListener('click', (e) => {
            if (e.target === document.getElementById('evento-modal')) {
                this.sistemaJuego.cerrarModalEvento();
            }
        });
    }

    inicializarUI() {
        // Cargar mangas
        this.cargarMangas();
        
        // Actualizar estadísticas
        this.sistemaJuego.actualizarUI();
        
        // Cargar palabras difíciles
        this.cargarPalabrasDificiles();
    }

    // ========== SISTEMA DE MANGAS ==========
    cargarMangas() {
        const container = document.getElementById('mangas-container');
        if (!container || !window.VOCABULARIO) return;
        
        container.innerHTML = window.VOCABULARIO.mangas.map(manga => `
            <div class="manga-card" data-id="${manga.id}">
                <div class="manga-header">
                    <div class="manga-icon" style="background: ${manga.color}">
                        ${manga.icono}
                    </div>
                    <div>
                        <div class="manga-title">${manga.nombre}</div>
                        <div class="manga-stats">
                            <span>${manga.mazos.length} mazos</span>
                            <span>${manga.mazos.reduce((total, mazo) => total + mazo.palabras.length, 0)} palabras</span>
                        </div>
                    </div>
                </div>
                <div class="manga-mazos">
                    ${manga.mazos.map(mazo => {
                        const progreso = this.sistemaJuego.cargarProgresoMazo(manga.id, mazo.id);
                        return `
                            <div class="mazo-item ${progreso === 100 ? 'mazo-completado' : ''}" 
                                 data-manga="${manga.id}" 
                                 data-mazo="${mazo.id}">
                                <span>${mazo.nombre}</span>
                                <span class="mazo-progress">${progreso}%</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
        
        // Agregar event listeners a los mangas y mazos
        container.querySelectorAll('.manga-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.mazo-item')) {
                    const mangaId = parseInt(card.dataset.id);
                    this.mostrarManga(mangaId);
                }
            });
        });
        
        container.querySelectorAll('.mazo-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const mangaId = parseInt(item.dataset.manga);
                const mazoId = parseInt(item.dataset.mazo);
                this.iniciarQuiz(mangaId, mazoId);
            });
        });
    }

    mostrarManga(mangaId) {
        // Implementar vista detallada del manga si es necesario
        console.log(`Mostrar manga ${mangaId}`);
    }

    // ========== SISTEMA DE QUIZ ==========
    iniciarQuiz(mangaId, mazoId) {
        if (!window.VOCABULARIO) return;
        
        const manga = window.VOCABULARIO.mangas.find(m => m.id === mangaId);
        if (!manga) return;
        
        const mazo = manga.mazos.find(m => m.id === mazoId);
        if (!mazo) return;
        
        this.mangaActual = manga;
        this.mazoActual = mazo;
        this.indicePalabra = 0;
        this.palabrasFalladas = 0;
        this.palabrasAcertadas = 0;
        this.palabrasMarcadasDificiles = [];
        this.quizActivo = true;
        
        // Actualizar UI del quiz
        document.getElementById('quiz-manga').textContent = manga.nombre;
        document.getElementById('quiz-mazo').textContent = mazo.nombre;
        this.actualizarProgresoQuiz();
        
        // Mostrar primera palabra
        this.mostrarSiguientePalabra();
        
        // Cambiar a sección de quiz
        this.mostrarSeccion('quiz');
    }

    iniciarQuizDificiles() {
        if (this.sistemaJuego.crearMazoDificilesTemporal()) {
            const mazoDificiles = {
                id: -1,
                nombre: "Palabras Difíciles",
                palabras: this.sistemaJuego.mazoDificilesTemporal
            };
            
            this.mangaActual = { id: -1, nombre: "Especial" };
            this.mazoActual = mazoDificiles;
            this.indicePalabra = 0;
            this.palabrasFalladas = 0;
            this.palabrasAcertadas = 0;
            this.palabrasMarcadasDificiles = [];
            this.quizActivo = true;
            
            // Actualizar UI del quiz
            document.getElementById('quiz-manga').textContent = "Especial";
            document.getElementById('quiz-mazo').textContent = "Palabras Difíciles";
            this.actualizarProgresoQuiz();
            
            // Mostrar primera palabra
            this.mostrarSiguientePalabra();
            
            // Cambiar a sección de quiz
            this.mostrarSeccion('quiz');
        }
    }

    mostrarSiguientePalabra() {
        if (!this.mazoActual || this.indicePalabra >= this.mazoActual.palabras.length) {
            this.finalizarQuiz();
            return;
        }
        
        this.palabraActual = this.mazoActual.palabras[this.indicePalabra];
        
        // Actualizar palabra en pantalla
        document.getElementById('japanese-word').textContent = this.palabraActual.japones;
        document.getElementById('romaji-display').textContent = "";
        
        // Generar opciones
        this.opcionesActuales = this.sistemaJuego.generarOpcionesAleatorias(this.palabraActual.significado);
        
        // Actualizar botones de opciones
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            btn.textContent = this.opcionesActuales[index];
            btn.className = 'option-btn';
            btn.disabled = false;
        });
        
        // Actualizar contador de palabras difíciles
        const esDificil = this.palabrasMarcadasDificiles.includes(this.indicePalabra);
        document.getElementById('btn-marcar-dificil').className = esDificil ? 
            'btn-difficult active' : 'btn-difficult';
        document.getElementById('btn-marcar-dificil').innerHTML = esDificil ?
            '<i class="fas fa-fire"></i> Marcada como difícil' :
            '<i class="fas fa-fire"></i> Marcar como difícil';
        
        // Actualizar contador en UI
        document.getElementById('difficult-count').textContent = 
            this.palabrasMarcadasDificiles.length;
    }

    seleccionarOpcion(opcionIndex) {
        if (!this.quizActivo || !this.palabraActual) return;
        
        const opcionSeleccionada = this.opcionesActuales[opcionIndex];
        const esCorrecta = opcionSeleccionada === this.palabraActual.significado;
        
        // Mostrar romaji
        document.getElementById('romaji-display').textContent = this.palabraActual.romaji;
        
        // Marcar opciones correctas/incorrectas
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (this.opcionesActuales[index] === this.palabraActual.significado) {
                btn.classList.add('correct');
            } else if (index === opcionIndex && !esCorrecta) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        });
        
        // Dar EXP a la novia seleccionada
        if (esCorrecta && this.sistemaRPG.noviaActual !== null) {
            this.sistemaRPG.agregarExp(this.sistemaRPG.noviaActual, 10, "Palabra correcta");
            this.palabrasAcertadas++;
        } else {
            this.palabrasFalladas++;
        }
        
        // Avanzar automáticamente después de un tiempo
        setTimeout(() => {
            if (esCorrecta || this.mazoActual.id === -1) {
                // Para mazo normal: solo avanza si acierta
                // Para mazo difícil: siempre avanza
                this.indicePalabra++;
                this.actualizarProgresoQuiz();
                this.mostrarSiguientePalabra();
            }
            // Si falla en mazo normal, se queda en la misma palabra
        }, 1500);
    }

    marcarPalabraDificil() {
        if (!this.quizActivo || !this.palabraActual || !this.mangaActual || !this.mazoActual) return;
        
        const index = this.indicePalabra;
        
        if (this.palabrasMarcadasDificiles.includes(index)) {
            // Desmarcar
            this.palabrasMarcadasDificiles = this.palabrasMarcadasDificiles.filter(i => i !== index);
            document.getElementById('btn-marcar-dificil').className = 'btn-difficult';
            document.getElementById('btn-marcar-dificil').innerHTML = 
                '<i class="fas fa-fire"></i> Marcar como difícil';
        } else {
            // Marcar
            this.palabrasMarcadasDificiles.push(index);
            document.getElementById('btn-marcar-dificil').className = 'btn-difficult active';
            document.getElementById('btn-marcar-dificil').innerHTML = 
                '<i class="fas fa-fire"></i> Marcada como difícil';
            
            // Guardar en sistema
            if (this.mazoActual.id !== -1) { // No guardar si es mazo de difíciles
                this.sistemaJuego.marcarPalabraDificil(
                    this.palabraActual,
                    this.mangaActual.id,
                    this.mazoActual.id
                );
            }
        }
        
        // Actualizar contador
        document.getElementById('difficult-count').textContent = 
            this.palabrasMarcadasDificiles.length;
    }

    actualizarProgresoQuiz() {
        const totalPalabras = this.mazoActual ? this.mazoActual.palabras.length : 10;
        const porcentaje = (this.indicePalabra / totalPalabras) * 100;
        
        document.getElementById('quiz-progress-bar').style.width = `${porcentaje}%`;
        document.getElementById('quiz-progress-text').textContent = 
            `${this.indicePalabra}/${totalPalabras}`;
    }

    finalizarQuiz() {
        this.quizActivo = false;
        
        const totalPalabras = this.mazoActual ? this.mazoActual.palabras.length : 10;
        const porcentajeCompletado = (this.palabrasAcertadas / totalPalabras) * 100;
        
        // Calcular recompensa
        const esMazoDificil = this.mazoActual.id === -1;
        const recompensa = this.sistemaJuego.calcularRecompensaMazo(porcentajeCompletado, esMazoDificil);
        
        // Mostrar resultados
        const feedback = document.getElementById('quiz-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="quiz-result">
                    <h3>¡Quiz Completado!</h3>
                    <p>Aciertos: ${this.palabrasAcertadas}/${totalPalabras} (${porcentajeCompletado.toFixed(1)}%)</p>
                    <p>Recompensa: ${recompensa} soles ${esMazoDificil ? '(x3 bonus)' : ''}</p>
                    ${porcentajeCompletado === 100 ? 
                        '<p class="perfect">¡Perfecto! +50 EXP extra</p>' : 
                        ''}
                </div>
            `;
            
            // Dar EXP extra si fue perfecto
            if (porcentajeCompletado === 100 && this.sistemaRPG.noviaActual !== null) {
                this.sistemaRPG.agregarExp(this.sistemaRPG.noviaActual, 50, "Mazo perfecto");
            }
            
            // Procesar recompensa del mazo
            if (this.mazoActual.id !== -1) {
                this.sistemaJuego.procesarResultadoMazo(
                    this.mazoActual.id,
                    this.mangaActual.id,
                    porcentajeCompletado,
                    this.palabrasFalladas
                );
            } else {
                // Recompensa especial para mazo de difíciles
                this.sistemaJuego.agregarDinero(recompensa, "Mazo de palabras difíciles");
                
                // Limpiar palabras usadas
                this.palabrasMarcadasDificiles.forEach(index => {
                    const palabra = this.mazoActual.palabras[index];
                    this.sistemaJuego.eliminarPalabraDificil(palabra.id);
                });
            }
            
            // Actualizar UI
            this.sistemaJuego.actualizarUI();
            this.cargarPalabrasDificiles();
        }
        
        // Volver automáticamente después de 3 segundos
        setTimeout(() => {
            if (this.mazoActual.id === -1) {
                this.mostrarSeccion('dificiles');
            } else {
                this.volverAMangas();
            }
        }, 3000);
    }

    // ========== NAVEGACIÓN ==========
    mostrarSeccion(seccion) {
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        const seccionElement = document.getElementById(`${seccion}-section`);
        if (seccionElement) {
            seccionElement.classList.add('active');
        }
        
        // Actualizar botones de navegación
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const btnSeccion = document.getElementById(`btn-${seccion}`);
        if (btnSeccion) {
            btnSeccion.classList.add('active');
        }
        
        // Actualizar contenido específico de la sección
        if (seccion === 'novias') {
            this.sistemaRPG.actualizarListaNovias();
            this.sistemaRPG.mostrarDetallesNovia(this.sistemaRPG.noviaActual);
        } else if (seccion === 'dificiles') {
            this.cargarPalabrasDificiles();
        } else if (seccion === 'vocabulario') {
            this.cargarMangas();
        }
    }

    volverAMangas() {
        this.mostrarSeccion('vocabulario');
        
        // Limpiar feedback del quiz
        const feedback = document.getElementById('quiz-feedback');
        if (feedback) {
            feedback.innerHTML = '';
        }
        
        // Limpiar mazo temporal de difíciles si existe
        if (this.mazoActual && this.mazoActual.id === -1) {
            this.sistemaJuego.mazoDificilesTemporal = [];
        }
    }

    limpiarPalabrasDificiles() {
        if (confirm("¿Estás seguro de que quieres eliminar todas las palabras difíciles?")) {
            this.sistemaJuego.limpiarPalabrasDificiles();
            this.cargarPalabrasDificiles();
        }
    }

    // ========== PALABRAS DIFÍCILES ==========
    cargarPalabrasDificiles() {
        const container = document.getElementById('dificiles-words');
        if (!container) return;
        
        const palabras = this.sistemaJuego.palabrasDificiles;
        
        if (palabras.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-fire" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                    <h3>No hay palabras difíciles</h3>
                    <p>Marca palabras como difíciles durante los quizzes para verlas aquí</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = palabras.map((palabra, index) => `
            <div class="dificil-word-item">
                <div>
                    <div class="dificil-word-jp">${palabra.japones}</div>
                    <div class="dificil-word-romaji">${palabra.romaji}</div>
                    <div class="dificil-word-meaning">${palabra.significado}</div>
                    <small>Mazo: ${palabra.mazoId !== undefined ? `Mazo ${palabra.mazoId + 1}` : 'Desconocido'}</small>
                </div>
                <div class="dificil-word-stats">
                    <span class="dificil-count">Fallada ${palabra.vecesFallada || 1} veces</span>
                </div>
            </div>
        `).join('');
    }

    // ========== UTILIDADES ==========
    agregarMazoDinamico(mangaId, nombreMazo, palabras) {
        if (!window.VOCABULARIO) return null;
        
        const nuevoMazo = {
            id: window.VOCABULARIO.mangas[mangaId]?.mazos.length || 0,
            nombre: nombreMazo,
            palabras: palabras.map(p => ({
                japones: p.japones,
                romaji: p.romaji,
                significado: p.significado,
                opciones: p.opciones || []
            }))
        };
        
        if (window.VOCABULARIO.mangas[mangaId]) {
            window.VOCABULARIO.mangas[mangaId].mazos.push(nuevoMazo);
            this.cargarMangas();
            return nuevoMazo;
        }
        
        return null;
    }
}

// Inicializar aplicación cuando se cargue la página
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Asegurarse de que los sistemas estén inicializados
        if (!window.sistemaJuego) window.sistemaJuego = new SistemaJuego();
        if (!window.sistemaRPG) window.sistemaRPG = new SistemaRPGNovias();
        
        // Crear instancia principal
        window.app = new AplicacionPrincipal();
        
        // Hacer funciones disponibles globalmente
        window.obtenerFotoNovia = (nombre, nivel) => {
            if (window.CONTENIDO?.fotos) {
                const fotos = window.CONTENIDO.fotos[nombre.toLowerCase()];
                if (fotos) {
                    let fotoSeleccionada = fotos[0];
                    for (const foto of fotos) {
                        if (foto.nivel <= nivel) {
                            fotoSeleccionada = foto;
                        }
                    }
                    return fotoSeleccionada;
                }
            }
            return null;
        };
        
        window.obtenerActividadesNovia = (nombre, nivel) => {
            if (window.CONTENIDO?.actividades) {
                return window.CONTENIDO.actividades[nombre.toLowerCase()]?.filter(a => a.nivelRequerido <= nivel) || [];
            }
            return [];
        };
        
        window.obtenerVideosIntimosNovia = (nombre, nivel) => {
            if (window.CONTENIDO?.videosIntimos) {
                return window.CONTENIDO.videosIntimos[nombre.toLowerCase()]?.filter(v => v.nivelRequerido <= nivel) || [];
            }
            return [];
        };
        
        window.obtenerMensajeFallo = (nombre) => {
            if (window.CONTENIDO?.mensajesFallo) {
                const mensajes = window.CONTENIDO.mensajesFallo[nombre.toLowerCase()];
                if (mensajes && mensajes.length > 0) {
                    return mensajes[Math.floor(Math.random() * mensajes.length)];
                }
            }
            return `${nombre} no tiene ganas en este momento`;
        };
    });
}

// Exportar para desarrollo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AplicacionPrincipal;
}
