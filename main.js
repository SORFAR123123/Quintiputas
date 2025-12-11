// UI Manager
const UI = {
    // Inicialización
    inicializar: function() {
        this.cargarTemas();
        this.inicializarEventos();
        Sistema.inicializar();
    },

    // Cargar temas desde el nuevo vocabulario
    cargarTemas: function() {
        const listaTemas = document.getElementById('lista-temas');
        listaTemas.innerHTML = '';

        vocabulario.temas.forEach(tema => {
            // Calcular estadísticas del tema
            let totalSubtemas = tema.subtemas.length;
            let totalMazos = 0;
            let totalPalabras = 0;
            
            tema.subtemas.forEach(subtema => {
                totalMazos += subtema.mazos.length;
                subtema.mazos.forEach(mazo => {
                    totalPalabras += mazo.palabras.length;
                });
            });

            const temaCard = document.createElement('div');
            temaCard.className = 'tema-card';
            temaCard.dataset.temaId = tema.id;
            temaCard.innerHTML = `
                <i class="${tema.icono}"></i>
                <h3>${tema.nombre}</h3>
                <p>${tema.descripcion}</p>
                <div class="tema-estadisticas">
                    <span><i class="fas fa-folder"></i> ${totalSubtemas} subtemas</span>
                    <span><i class="fas fa-layer-group"></i> ${totalMazos} mazos</span>
                    <span><i class="fas fa-font"></i> ${totalPalabras} palabras</span>
                </div>
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
            // Calcular total de palabras en todos los mazos del subtema
            let totalPalabras = 0;
            let totalMazos = subtema.mazos.length;
            
            subtema.mazos.forEach(mazo => {
                totalPalabras += mazo.palabras.length;
            });

            const subtemaCard = document.createElement('div');
            subtemaCard.className = 'subtema-card';
            subtemaCard.dataset.subtemaId = subtema.id;
            subtemaCard.innerHTML = `
                <i class="${subtema.icono}"></i>
                <h3>${subtema.nombre}</h3>
                <div class="subtema-info">
                    <span><i class="fas fa-layer-group"></i> ${totalMazos} mazos</span>
                    <span><i class="fas fa-font"></i> ${totalPalabras} palabras</span>
                </div>
                <p>Haz clic para ver los mazos</p>
            `;
            listaSubtemas.appendChild(subtemaCard);
        });

        this.mostrarPantalla('pantalla-subtemas');
    },

    cargarMazos: function(subtemaId) {
        // Buscar el tema que contiene este subtema
        const tema = vocabulario.temas.find(t => 
            t.subtemas.some(s => s.id === subtemaId)
        );
        
        const subtema = tema.subtemas.find(s => s.id === subtemaId);
        if (!subtema) return;

        const listaMazos = document.getElementById('lista-mazos');
        const tituloSubtema = document.getElementById('titulo-subtema-actual');
        
        tituloSubtema.textContent = subtema.nombre;
        listaMazos.innerHTML = '';

        subtema.mazos.forEach((mazo, index) => {
            const progreso = Sistema.obtenerProgresoMazo(mazo.id);
            const totalPalabras = mazo.palabras.length;
            const completadas = Math.floor((progreso / 100) * totalPalabras);
            
            const mazoCard = document.createElement('div');
            mazoCard.className = 'mazo-card';
            mazoCard.dataset.mazoId = mazo.id;
            mazoCard.innerHTML = `
                <div class="mazo-header">
                    <i class="${mazo.icono}"></i>
                    <div class="mazo-titulo">
                        <h3>${mazo.nombre}</h3>
                        <span class="mazo-numero">Mazo ${index + 1}</span>
                    </div>
                </div>
                <p class="mazo-descripcion">${mazo.descripcion}</p>
                <div class="mazo-estadisticas">
                    <div class="estadistica">
                        <i class="fas fa-font"></i>
                        <span>${totalPalabras} palabras</span>
                    </div>
                    <div class="estadistica">
                        <i class="fas fa-coins"></i>
                        <span>+${mazo.recompensa} soles</span>
                    </div>
                </div>
                <div class="progreso-mazo">
                    <div class="progreso-mini">
                        <div class="progreso-fill-mini" style="width: ${progreso}%"></div>
                    </div>
                    <span>${completadas}/${totalPalabras} (${progreso}%)</span>
                </div>
                <div class="mazo-boton">
                    <i class="fas fa-play"></i> Iniciar
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
            progresoTexto.textContent = `${totalCompletadas}/${totalPalabras} palabras completadas`;
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

        // Opciones del quiz - CORREGIDO
        document.querySelectorAll('.opcion').forEach(opcion => {
            opcion.addEventListener('click', (e) => {
                const opcionElement = e.target.closest('.opcion');
                if (!opcionElement) return;
                
                // Verificar si ya se respondió
                if (opcionElement.classList.contains('correcta') || 
                    opcionElement.classList.contains('incorrecta')) {
                    return;
                }

                const opcionIndex = parseInt(opcionElement.dataset.index);
                const correcta = Sistema.responderPregunta(opcionIndex);
                
                // Si fue correcta, pasar automáticamente a la siguiente después de 1.5 segundos
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
