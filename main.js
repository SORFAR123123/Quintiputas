// Sistema principal de inicialización y coordinación
class SistemaPrincipal {
    constructor() {
        this.pantallaActual = 'inicio';
        this.mangaSeleccionado = null;
        this.mazoSeleccionado = null;
        this.quizActivo = null;
        this.sistemaJuego = sistemaJuego;
        this.sistemaRPG = sistemaRPG;
    }
    
    inicializar() {
        // Cargar estado guardado
        this.sistemaJuego.cargarEstado();
        this.sistemaRPG.inicializar();
        
        // Inicializar pantallas
        this.inicializarPantallaInicio();
        this.inicializarPantallaMangas();
        this.inicializarPantallaRPG();
        
        // Mostrar pantalla de inicio
        this.mostrarPantalla('inicio');
        
        console.log('Sistema cargado exitosamente');
    }
    
    // Sistema de pantallas
    mostrarPantalla(pantalla) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.pantalla').forEach(p => {
            p.classList.remove('activa');
        });
        
        // Mostrar pantalla solicitada
        const pantallaElemento = document.getElementById(`pantalla-${pantalla}`);
        if (pantallaElemento) {
            pantallaElemento.classList.add('activa');
            this.pantallaActual = pantalla;
            
            // Actualizar displays específicos
            this.sistemaJuego.actualizarDisplayDinero();
        }
    }
    
    // Pantalla de inicio
    inicializarPantallaInicio() {
        // Botón módulo vocabulario
        document.getElementById('btn-modulo-vocabulario').addEventListener('click', () => {
            this.cargarMangas();
            this.mostrarPantalla('mangas');
        });
        
        // Botón RPG novias
        document.getElementById('btn-rpg-novias').addEventListener('click', () => {
            this.mostrarPantalla('rpg');
        });
    }
    
    // Pantalla de mangas
    inicializarPantallaMangas() {
        // Botón volver
        document.getElementById('btn-volver-inicio').addEventListener('click', () => {
            this.mostrarPantalla('inicio');
            this.ocultarQuiz();
            this.ocultarMazos();
        });
        
        // Botón limpiar difíciles
        document.getElementById('btn-limpiar-dificiles').addEventListener('click', () => {
            this.sistemaJuego.limpiarPalabrasDificiles();
            this.cargarMangas();
        });
    }
    
    // Pantalla RPG
    inicializarPantallaRPG() {
        document.getElementById('btn-volver-inicio-rpg').addEventListener('click', () => {
            this.mostrarPantalla('inicio');
        });
    }
    
    // Sistema de mangas
    cargarMangas() {
        const contenedor = document.getElementById('contenedor-mangas');
        if (!contenedor) return;
        
        contenedor.innerHTML = '';
        
        VOCABULARIO.mangas.forEach(manga => {
            const mangaElement = document.createElement('div');
            mangaElement.className = 'manga-card';
            mangaElement.dataset.mangaId = manga.id;
            
            // Calcular progreso
            const progreso = this.calcularProgresoManga(manga.id);
            
            mangaElement.innerHTML = `
                <img src="${manga.imagen}" alt="${manga.nombre}" class="manga-imagen">
                <div class="manga-info">
                    <h3>${manga.nombre}</h3>
                    <div class="manga-progreso">
                        <div class="progreso-barra" style="width: ${progreso}%"></div>
                    </div>
                    <p>${manga.mazos.length} mazos disponibles</p>
                    <p class="progreso-texto">${progreso.toFixed(1)}% completado</p>
                </div>
            `;
            
            mangaElement.addEventListener('click', () => this.seleccionarManga(manga.id));
            contenedor.appendChild(mangaElement);
        });
        
        // Mostrar contenedor de mangas y ocultar otros
        contenedor.classList.remove('oculto');
        document.getElementById('contenedor-mazos').classList.add('oculto');
        this.ocultarQuiz();
    }
    
    seleccionarManga(mangaId) {
        this.mangaSeleccionado = VOCABULARIO.mangas.find(m => m.id === mangaId);
        if (!this.mangaSeleccionado) return;
        
        this.cargarMazos();
    }
    
    cargarMazos() {
        const contenedor = document.getElementById('contenedor-mazos');
        if (!contenedor || !this.mangaSeleccionado) return;
        
        contenedor.innerHTML = '';
        
        // Botón volver a mangas
        const botonVolver = document.createElement('button');
        botonVolver.className = 'btn-volver';
        botonVolver.innerHTML = '<i class="fas fa-arrow-left"></i> Volver a Mangas';
        botonVolver.addEventListener('click', () => {
            this.cargarMangas();
        });
        contenedor.appendChild(botonVolver);
        
        // Título
        const titulo = document.createElement('h3');
        titulo.textContent = `${this.mangaSeleccionado.nombre} - Mazos`;
        contenedor.appendChild(titulo);
        
        // Mazos normales
        this.mangaSeleccionado.mazos.forEach(mazo => {
            const mazoElement = document.createElement('div');
            mazoElement.className = 'mazo-card';
            mazoElement.dataset.mazoId = mazo.id;
            mazoElement.innerHTML = `
                <h4>${mazo.nombre}</h4>
                <p>${mazo.palabras.length} palabras</p>
                <div class="mazo-estado">
                    <i class="fas fa-book"></i>
                    <span>Listo para aprender</span>
                </div>
            `;
            
            mazoElement.addEventListener('click', () => this.seleccionarMazo(mazo));
            contenedor.appendChild(mazoElement);
        });
        
        // Mazo de palabras difíciles (si existe)
        const mazoDificil = this.sistemaJuego.crearMazoDificilTemporal();
        if (mazoDificil) {
            const mazoDificilElement = document.createElement('div');
            mazoDificilElement.className = 'mazo-card dificil';
            mazoDificilElement.dataset.mazoId = mazoDificil.id;
            mazoDificilElement.innerHTML = `
                <h4><i class="fas fa-star"></i> ${mazoDificil.nombre}</h4>
                <p>${mazoDificil.palabras.length} palabras difíciles</p>
                <div class="mazo-estado">
                    <i class="fas fa-fire"></i>
                    <span>x3 Recompensa</span>
                </div>
            `;
            
            mazoDificilElement.addEventListener('click', () => this.seleccionarMazo(mazoDificil));
            contenedor.appendChild(mazoDificilElement);
        }
        
        // Mostrar contenedor
        contenedor.classList.remove('oculto');
        document.getElementById('contenedor-mangas').classList.add('oculto');
    }
    
    seleccionarMazo(mazo) {
        this.mazoSeleccionado = mazo;
        this.iniciarQuiz();
    }
    
    // Sistema de Quiz
    iniciarQuiz() {
        if (!this.mazoSeleccionado || !this.mazoSeleccionado.palabras.length) return;
        
        this.quizActivo = {
            mazo: this.mazoSeleccionado,
            palabras: [...this.mazoSeleccionado.palabras],
            palabraActual: 0,
            correctas: 0,
            mostrandoResultado: false
        };
        
        this.mostrarQuiz();
    }
    
    mostrarQuiz() {
        const contenedor = document.getElementById('quiz-container');
        if (!contenedor || !this.quizActivo) return;
        
        const palabra = this.quizActivo.palabras[this.quizActivo.palabraActual];
        
        contenedor.innerHTML = `
            <div class="quiz-header">
                <h3>${this.quizActivo.mazo.nombre}</h3>
                <div class="quiz-progreso">
                    ${this.quizActivo.palabraActual + 1} / ${this.quizActivo.palabras.length}
                    <div class="progreso-barra" style="width: ${(this.quizActivo.palabraActual / this.quizActivo.palabras.length) * 100}%"></div>
                </div>
            </div>
            
            <div class="palabra-japones" id="palabra-actual">${palabra.japones}</div>
            
            <div class="romaji-display oculto" id="romaji-display">
                ${palabra.romaji}
            </div>
            
            <div class="opciones-container">
                ${palabra.opciones.map((opcion, index) => `
                    <button class="opcion-btn" data-opcion="${opcion}" data-correcta="${opcion === palabra.respuesta}">
                        ${opcion}
                    </button>
                `).join('')}
            </div>
            
            <div class="controles-quiz">
                <button class="btn-secundario btn-dificil" id="btn-marcar-dificil">
                    <i class="fas fa-star"></i> Marcar como Difícil
                </button>
                <button class="btn-primario oculto" id="btn-siguiente">
                    <i class="fas fa-arrow-right"></i> Siguiente
                </button>
            </div>
        `;
        
        // Mostrar contenedor
        contenedor.classList.remove('oculto');
        document.getElementById('contenedor-mazos').classList.add('oculto');
        
        // Agregar event listeners
        this.agregarEventListenersQuiz();
    }
    
    agregarEventListenersQuiz() {
        // Opciones
        document.querySelectorAll('.opcion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.quizActivo.mostrandoResultado) return;
                
                const esCorrecta = btn.dataset.correcta === 'true';
                const romajiDisplay = document.getElementById('romaji-display');
                const btnSiguiente = document.getElementById('btn-siguiente');
                const palabraActual = this.quizActivo.palabras[this.quizActivo.palabraActual];
                
                // Mostrar romaji
                romajiDisplay.classList.remove('oculto');
                
                // Marcar botones
                document.querySelectorAll('.opcion-btn').forEach(b => {
                    b.classList.add('disabled');
                    if (b.dataset.correcta === 'true') {
                        b.classList.add('correcto');
                    } else if (b === btn && !esCorrecta) {
                        b.classList.add('incorrecto');
                    }
                });
                
                // Reproducir sonido
                if (esCorrecta) {
                    this.sistemaJuego.reproducirSonido('correcto');
                    this.quizActivo.correctas++;
                    
                    // Dar EXP a la chica activa si existe
                    if (this.sistemaJuego.chicaActiva) {
                        const exp = this.sistemaJuego.calcularExpPorPalabra(this.sistemaJuego.chicaActiva);
                        this.sistemaJuego.agregarExpChica(this.sistemaJuego.chicaActiva, exp);
                    }
                } else {
                    this.sistemaJuego.reproducirSonido('incorrecto');
                    // Marcar como difícil automáticamente si falla
                    palabraActual.dificil = true;
                    this.sistemaJuego.marcarPalabraDificil(palabraActual);
                }
                
                // Mostrar botón siguiente
                btnSiguiente.classList.remove('oculto');
                this.quizActivo.mostrandoResultado = true;
            });
        });
        
        // Botón marcar difícil
        document.getElementById('btn-marcar-dificil').addEventListener('click', () => {
            const palabra = this.quizActivo.palabras[this.quizActivo.palabraActual];
            palabra.dificil = true;
            this.sistemaJuego.marcarPalabraDificil(palabra);
            
            // Feedback visual
            const btn = document.getElementById('btn-marcar-dificil');
            btn.innerHTML = '<i class="fas fa-star"></i> Marcada como Difícil';
            btn.classList.add('disabled');
        });
        
        // Botón siguiente
        document.getElementById('btn-siguiente').addEventListener('click', () => {
            this.avanzarQuiz();
        });
    }
    
    avanzarQuiz() {
        this.quizActivo.palabraActual++;
        
        if (this.quizActivo.palabraActual >= this.quizActivo.palabras.length) {
            this.finalizarQuiz();
        } else {
            this.quizActivo.mostrandoResultado = false;
            this.mostrarQuiz();
        }
    }
    
    finalizarQuiz() {
        const porcentaje = (this.quizActivo.correctas / this.quizActivo.palabras.length) * 100;
        const recompensa = this.sistemaJuego.calcularRecompensaMazo(
            this.quizActivo.mazo.id,
            porcentaje
        );
        
        // Agregar dinero
        this.sistemaJuego.agregarDinero(recompensa);
        
        // Mostrar resultado
        let mensaje = `Completaste ${this.quizActivo.correctas} de ${this.quizActivo.palabras.length} palabras correctamente.`;
        mensaje += `\nPorcentaje: ${porcentaje.toFixed(1)}%`;
        mensaje += `\nRecompensa: ${recompensa} Soles`;
        
        this.sistemaJuego.mostrarResultado('Quiz Completado', mensaje, recompensa)
            .then(() => {
                // Generar evento aleatorio si se completó al 100%
                if (porcentaje === 100) {
                    const evento = this.sistemaJuego.generarEventoAleatorio();
                    this.sistemaJuego.mostrarEvento(evento).then(() => {
                        this.ocultarQuiz();
                        this.cargarMazos();
                    });
                } else {
                    this.ocultarQuiz();
                    this.cargarMazos();
                }
            });
    }
    
    ocultarQuiz() {
        document.getElementById('quiz-container').classList.add('oculto');
        this.quizActivo = null;
    }
    
    ocultarMazos() {
        document.getElementById('contenedor-mazos').classList.add('oculto');
    }
    
    // Utilidades
    calcularProgresoManga(mangaId) {
        // En una implementación real, calcularías el progreso real
        // Por ahora, devolvemos un valor aleatorio
        return Math.floor(Math.random() * 100);
    }
    
    // Función para agregar mazos dinámicamente (ejemplo)
    agregarMazoEjemplo() {
        const palabrasEjemplo = [
            {
                japones: '猫',
                romaji: 'neko',
                significado: 'gato',
                opciones: ['perro', 'gato', 'pájaro', 'pez'],
                respuesta: 'gato'
            },
            {
                japones: '犬',
                romaji: 'inu',
                significado: 'perro',
                opciones: ['gato', 'perro', 'ratón', 'tigre'],
                respuesta: 'perro'
            }
        ];
        
        const nuevoMazo = agregarMazo(1, 'Mazo de Animales', palabrasEjemplo);
        if (nuevoMazo) {
            console.log('Mazo agregado:', nuevoMazo);
            this.cargarMangas();
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const sistema = new SistemaPrincipal();
    window.sistemaPrincipal = sistema; // Hacer global para debugging
    sistema.inicializar();
    
    // Ejemplo: Agregar un mazo dinámico después de 5 segundos
    // setTimeout(() => sistema.agregarMazoEjemplo(), 5000);
});
