// UI Manager - NUEVA VERSIÓN
const UI = {
    // Inicialización
    inicializar: function() {
        this.cargarMangas();
        this.inicializarEventos();
        Sistema.inicializar();
    },

    // Cargar mangas desde el vocabulario
    cargarMangas: function() {
        const listaMangas = document.getElementById('lista-mangas');
        listaMangas.innerHTML = '';

        vocabulario.temas.forEach(manga => {
            // Calcular estadísticas del manga
            let totalSubtemas = manga.subtemas.length;
            let totalMazos = 0;
            let totalPalabras = 0;
            
            manga.subtemas.forEach(subtema => {
                totalMazos += subtema.mazos.length;
                subtema.mazos.forEach(mazo => {
                    totalPalabras += mazo.palabras.length;
                });
            });

            const mangaItem = document.createElement('div');
            mangaItem.className = 'manga-item';
            mangaItem.dataset.mangaId = manga.id;
            mangaItem.innerHTML = `
                <i class="${manga.icono}"></i>
                <div class="manga-info">
                    <h4>${manga.nombre}</h4>
                    <p>${manga.descripcion}</p>
                    <div class="manga-estadisticas">
                        <span><i class="fas fa-folder"></i> ${totalSubtemas}</span>
                        <span><i class="fas fa-layer-group"></i> ${totalMazos}</span>
                        <span><i class="fas fa-font"></i> ${totalPalabras}</span>
                    </div>
                </div>
            `;
            listaMangas.appendChild(mangaItem);
        });
    },

    cargarMazos: function(mangaId) {
        const manga = vocabulario.temas.find(m => m.id === mangaId);
        if (!manga) return;

        const listaMazos = document.getElementById('lista-mazos');
        listaMazos.innerHTML = '';

        // Primero, quitar selección anterior
        document.querySelectorAll('.manga-item').forEach(item => {
            item.classList.remove('seleccionado');
        });

        // Marcar manga seleccionado
        const mangaSeleccionado = document.querySelector(`[data-manga-id="${mangaId}"]`);
        if (mangaSeleccionado) {
            mangaSeleccionado.classList.add('seleccionado');
        }

        // Cargar todos los mazos del manga
        let mazoIndex = 0;
        manga.subtemas.forEach(subtema => {
            subtema.mazos.forEach(mazo => {
                mazoIndex++;
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
                            <h4>${mazo.nombre}</h4>
                            <span class="mazo-numero">Mazo ${mazoIndex}</span>
                        </div>
                    </div>
                    <p class="mazo-descripcion">${mazo.descripcion} • ${subtema.nombre}</p>
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
                        <i class="fas fa-play"></i> Iniciar Quiz
                    </div>
                `;
                listaMazos.appendChild(mazoCard);
            });
        });
    },

    // Navegación entre pantallas
    mostrarPantallaQuiz: function() {
        // Ocultar entrenamiento especial
        document.querySelector('.entrenamiento-especial').style.display = 'none';
        
        // Mostrar pantalla de quiz
        const pantallaQuiz = document.getElementById('pantalla-quiz');
        pantallaQuiz.classList.add('activa');
        pantallaQuiz.style.display = 'block';
    },

    mostrarPantallaMazos: function() {
        // Ocultar pantalla de quiz
        const pantallaQuiz = document.getElementById('pantalla-quiz');
        pantallaQuiz.classList.remove('activa');
        pantallaQuiz.style.display = 'none';
        
        // Mostrar entrenamiento especial
        document.querySelector('.entrenamiento-especial').style.display = 'block';
        
        // Recargar mazos para actualizar progreso
        if (Sistema.estado.mangaActual) {
            this.cargarMazos(Sistema.estado.mangaActual);
        }
        
        Sistema.resetearQuiz();
    },

    // Manejo de eventos
    inicializarEventos: function() {
        // Selección de manga
        document.getElementById('lista-mangas').addEventListener('click', (e) => {
            const mangaItem = e.target.closest('.manga-item');
            if (mangaItem) {
                const mangaId = mangaItem.dataset.mangaId;
                Sistema.seleccionarManga(mangaId);
                this.cargarMazos(mangaId);
            }
        });

        // Selección de mazo
        document.getElementById('lista-mazos').addEventListener('click', (e) => {
            const mazoCard = e.target.closest('.mazo-card');
            if (mazoCard) {
                const mazoId = mazoCard.dataset.mazoId;
                Sistema.iniciarQuiz(mazoId);
                this.mostrarPantallaQuiz();
            }
        });

        // Opciones del quiz - NUEVA LÓGICA: solo la seleccionada muestra color
        document.querySelectorAll('.opcion').forEach(opcion => {
            opcion.addEventListener('click', (e) => {
                const opcionElement = e.target.closest('.opcion');
                if (!opcionElement) return;
                
                // Verificar si ya se respondió
                if (document.getElementById('btn-siguiente').disabled === false) {
                    return;
                }

                const opcionIndex = parseInt(opcionElement.dataset.index);
                const correcta = Sistema.responderPregunta(opcionIndex);
                
                // Marcar solo la opción seleccionada
                opcionElement.classList.add('seleccionada');
                if (correcta) {
                    opcionElement.classList.add('correcta');
                } else {
                    opcionElement.classList.add('incorrecta');
                }
                
                // Si fue correcta, pasar automáticamente a la siguiente después de 1.5 segundos
                if (correcta) {
                    setTimeout(() => {
                        Sistema.siguientePregunta();
                    }, 1500);
                } else {
                    document.getElementById('btn-siguiente').disabled = false;
                }
            });
        });

        // Botón siguiente
        document.getElementById('btn-siguiente').addEventListener('click', () => {
            Sistema.siguientePregunta();
        });

        // Botón volver desde quiz
        document.getElementById('btn-volver-mazos').addEventListener('click', () => {
            this.mostrarPantallaMazos();
        });
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    UI.inicializar();
});
