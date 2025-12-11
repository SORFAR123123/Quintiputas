// UI Manager
const UI = {
    // Inicialización
    inicializar: function() {
        this.cargarTemas();
        this.inicializarEventos();
        Sistema.inicializar();
    },

    // Cargar datos
    cargarTemas: function() {
        const listaTemas = document.getElementById('lista-temas');
        listaTemas.innerHTML = '';

        vocabulario.temas.forEach(tema => {
            const temaCard = document.createElement('div');
            temaCard.className = 'tema-card';
            temaCard.dataset.temaId = tema.id;
            temaCard.innerHTML = `
                <i class="${tema.icono}"></i>
                <h3>${tema.nombre}</h3>
                <p>${tema.descripcion}</p>
            `;
            listaTemas.appendChild(temaCard);
        });
    },

    cargarSubtemas: function(temaId) {
        const tema = vocabulario.temas.find(t => t.id === temaId);
        if (!tema) return;

        const listaSubtemas = document.getElementById('lista-subtemas');
        const tituloTema = document.getElementById('titulo-tema-actual');
        
        tituloTema.textContent = tema.nombre;
        listaSubtemas.innerHTML = '';

        tema.subtemas.forEach(subtema => {
            const subtemaCard = document.createElement('div');
            subtemaCard.className = 'subtema-card';
            subtemaCard.dataset.subtemaId = subtema.id;
            subtemaCard.innerHTML = `
                <i class="${subtema.icono}"></i>
                <h3>${subtema.nombre}</h3>
                <p>${subtema.mazos.length} mazos disponibles</p>
            `;
            listaSubtemas.appendChild(subtemaCard);
        });

        this.mostrarPantalla('pantalla-subtemas');
    },

    cargarMazos: function(subtemaId) {
        const tema = vocabulario.temas.find(t => 
            t.subtemas.some(s => s.id === subtemaId)
        );
        
        const subtema = tema.subtemas.find(s => s.id === subtemaId);
        if (!subtema) return;

        const listaMazos = document.getElementById('lista-mazos');
        const tituloSubtema = document.getElementById('titulo-subtema-actual');
        const recompensaElemento = document.getElementById('recompensa-mazo');
        
        tituloSubtema.textContent = subtema.nombre;
        recompensaElemento.textContent = '2';
        listaMazos.innerHTML = '';

        subtema.mazos.forEach(mazo => {
            const progreso = Sistema.obtenerProgresoMazo(mazo.id);
            const mazoCard = document.createElement('div');
            mazoCard.className = 'mazo-card';
            mazoCard.dataset.mazoId = mazo.id;
            mazoCard.innerHTML = `
                <i class="${mazo.icono}"></i>
                <h3>${mazo.nombre}</h3>
                <p>${mazo.descripcion}</p>
                <div class="progreso-mazo">
                    <div class="progreso-mini">
                        <div class="progreso-fill-mini" style="width: ${progreso}%"></div>
                    </div>
                    <span>${progreso}% completado</span>
                </div>
            `;
            listaMazos.appendChild(mazoCard);
        });

        // Actualizar progreso del subtema
        this.actualizarProgresoSubtema(subtema);
        
        this.mostrarPantalla('pantalla-mazos');
    },

    actualizarProgresoSubtema: function(subtema) {
        let totalPalabras = 0;
        let totalCompletadas = 0;

        subtema.mazos.forEach(mazo => {
            totalPalabras += mazo.palabras.length;
            const progreso = Sistema.obtenerProgresoMazo(mazo.id);
            totalCompletadas += Math.floor((progreso / 100) * mazo.palabras.length);
        });

        const porcentajeTotal = totalPalabras > 0 ? 
            Math.round((totalCompletadas / totalPalabras) * 100) : 0;
        
        const progresoFill = document.getElementById('progreso-mazo');
        const progresoTexto = document.getElementById('texto-progreso');
        
        if (progresoFill && progresoTexto) {
            progresoFill.style.width = `${porcentajeTotal}%`;
            progresoFill.textContent = `${porcentajeTotal}%`;
            progresoTexto.textContent = `${totalCompletadas}/${totalPalabras} completado`;
        }
    },

    // Navegación entre pantallas
    mostrarPantalla: function(pantallaId) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.pantalla').forEach(pantalla => {
            pantalla.classList.remove('activa');
        });
        
        // Mostrar pantalla solicitada
        const pantalla = document.getElementById(pantallaId);
        if (pantalla) {
            pantalla.classList.add('activa');
        }
        
        // Resetear quiz si salimos de la pantalla de quiz
        if (pantallaId !== 'pantalla-quiz') {
            Sistema.resetearQuiz();
        }
    },

    // Manejo de eventos
    inicializarEventos: function() {
        // Temas
        document.getElementById('lista-temas').addEventListener('click', (e) => {
            const temaCard = e.target.closest('.tema-card');
            if (temaCard) {
                const temaId = temaCard.dataset.temaId;
                Sistema.seleccionarTema(temaId);
                this.cargarSubtemas(temaId);
            }
        });

        // Subtemas
        document.getElementById('lista-subtemas').addEventListener('click', (e) => {
            const subtemaCard = e.target.closest('.subtema-card');
            if (subtemaCard) {
                const subtemaId = subtemaCard.dataset.subtemaId;
                Sistema.seleccionarSubtema(subtemaId);
                this.cargarMazos(subtemaId);
            }
        });

        // Mazos
        document.getElementById('lista-mazos').addEventListener('click', (e) => {
            const mazoCard = e.target.closest('.mazo-card');
            if (mazoCard) {
                const mazoId = mazoCard.dataset.mazoId;
                Sistema.iniciarQuiz(mazoId);
                this.mostrarPantalla('pantalla-quiz');
            }
        });

        // Opciones del quiz
        document.querySelectorAll('.opcion').forEach(opcion => {
            opcion.addEventListener('click', (e) => {
                if (opcion.classList.contains('correcta') || 
                    opcion.classList.contains('incorrecta')) {
                    return; // Ya se respondió esta pregunta
                }

                const opcionIndex = parseInt(opcion.dataset.index);
                const correcta = Sistema.responderPregunta(opcionIndex);
                
                // Si fue correcta, pasar automáticamente a la siguiente
                if (correcta) {
                    setTimeout(() => {
                        Sistema.siguientePregunta();
                    }, 1500);
                }
            });
        });

        // Botón siguiente
        document.getElementById('btn-siguiente').addEventListener('click', () => {
            Sistema.siguientePregunta();
        });

        // Botones de navegación
        document.getElementById('btn-volver-temas').addEventListener('click', () => {
            this.mostrarPantalla('pantalla-inicio');
        });

        document.getElementById('btn-volver-subtemas').addEventListener('click', () => {
            this.mostrarPantalla('pantalla-subtemas');
        });

        document.getElementById('btn-volver-mazos').addEventListener('click', () => {
            this.mostrarPantalla('pantalla-mazos');
            // Recargar mazos para actualizar progreso
            if (Sistema.estado.subtemaActual) {
                this.cargarMazos(Sistema.estado.subtemaActual);
            }
        });
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    UI.inicializar();
});
