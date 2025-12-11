// UI Manager - VERSIÓN CON NUEVO MENÚ
const UI = {
    // Inicialización
    inicializar: function() {
        // Cargar imágenes
        Imagenes.cargarImagenesMenu();
        Imagenes.cargarImagenEntrenamiento();
        
        // Inicializar sistema
        Sistema.inicializar();
        
        // Cargar estadísticas iniciales
        this.cargarEstadisticas();
        
        // Inicializar eventos
        this.inicializarEventos();
    },
    
    // Cargar estadísticas para las cards
    cargarEstadisticas: function() {
        // Contar palabras falladas
        let palabrasFalladas = 0;
        for (const mazoId in Sistema.estado.progreso) {
            const progreso = Sistema.estado.progreso[mazoId];
            if (progreso.palabrasIncorrectas) {
                palabrasFalladas += progreso.palabrasIncorrectas.length;
            }
        }
        document.getElementById('contador-falladas').textContent = `${palabrasFalladas} palabras`;
        
        // Contar mazos disponibles
        let totalMazos = 0;
        vocabulario.temas.forEach(manga => {
            manga.subtemas.forEach(subtema => {
                totalMazos += subtema.mazos.length;
            });
        });
        document.getElementById('contador-mazos').textContent = `${totalMazos} mazos`;
        
        // Contar mazos rápidos (todos los mazos de 10 palabras)
        let mazosRapidos = 0;
        vocabulario.temas.forEach(manga => {
            manga.subtemas.forEach(subtema => {
                subtema.mazos.forEach(mazo => {
                    if (mazo.palabras.length === 10) {
                        mazosRapidos++;
                    }
                });
            });
        });
        document.getElementById('contador-rapidos').textContent = `${mazosRapidos} disponibles`;
    },
    
    // Navegación entre pantallas
    mostrarPantalla: function(pantallaId) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.pantalla-entrenamiento, .pantalla-biblioteca, .pantalla-manga, .pantalla-quiz').forEach(p => {
            p.style.display = 'none';
        });
        
        // Ocultar menú principal
        document.querySelector('.menu-principal').style.display = 'none';
        
        // Mostrar pantalla solicitada
        document.getElementById(pantallaId).style.display = 'block';
    },
    
    mostrarMenuPrincipal: function() {
        // Ocultar todas las pantallas
        document.querySelectorAll('.pantalla-entrenamiento, .pantalla-biblioteca, .pantalla-manga, .pantalla-quiz').forEach(p => {
            p.style.display = 'none';
        });
        
        // Mostrar menú principal
        document.querySelector('.menu-principal').style.display = 'block';
        
        // Actualizar estadísticas
        this.cargarEstadisticas();
    },
    
    mostrarBiblioteca: function() {
        this.mostrarPantalla('pantalla-biblioteca');
        this.cargarMangas();
    },
    
    mostrarManga: function(mangaId) {
        this.mostrarPantalla('pantalla-manga');
        this.cargarInfoManga(mangaId);
        Sistema.seleccionarManga(mangaId);
    },
    
    mostrarQuiz: function(mazoId) {
        this.mostrarPantalla('pantalla-quiz');
        Sistema.iniciarQuiz(mazoId);
    },
    
    // Cargar mangas en la biblioteca
    cargarMangas: function() {
        const listaMangas = document.getElementById('lista-mangas');
        listaMangas.innerHTML = '';
        
        vocabulario.temas.forEach(manga => {
            const imagen = Imagenes.obtenerImagenManga(manga.id);
            
            // Calcular estadísticas
            let totalSubtemas = manga.subtemas.length;
            let totalMazos = 0;
            let totalPalabras = 0;
            
            manga.subtemas.forEach(subtema => {
                totalMazos += subtema.mazos.length;
                subtema.mazos.forEach(mazo => {
                    totalPalabras += mazo.palabras.length;
                });
            });
            
            const mangaCard = document.createElement('div');
            mangaCard.className = 'manga-card';
            mangaCard.dataset.mangaId = manga.id;
            mangaCard.innerHTML = `
                <div class="manga-portada">
                    <img src="${imagen.portada}" alt="${manga.nombre}">
                </div>
                <div class="manga-info">
                    <h3>
                        <i class="${manga.icono}"></i>
                        ${manga.nombre}
                    </h3>
                    <p>${manga.descripcion}</p>
                    <div class="manga-estadisticas">
                        <span><i class="fas fa-folder"></i> ${totalSubtemas} subtemas</span>
                        <span><i class="fas fa-layer-group"></i> ${totalMazos} mazos</span>
                        <span><i class="fas fa-font"></i> ${totalPalabras} palabras</span>
                    </div>
                </div>
            `;
            listaMangas.appendChild(mangaCard);
        });
    },
    
    // Cargar información detallada del manga
    cargarInfoManga: function(mangaId) {
        const manga = vocabulario.temas.find(m => m.id === mangaId);
        if (!manga) return;
        
        const imagen = Imagenes.obtenerImagenManga(mangaId);
        
        // Actualizar título
        document.getElementById('titulo-manga').textContent = manga.nombre;
        
        // Cargar información del manga
        const infoManga = document.getElementById('info-manga');
        infoManga.innerHTML = `
            <div class="manga-info-header">
                <img src="${imagen.banner}" class="manga-banner" alt="${manga.nombre}">
                <div class="manga-info-content">
                    <i class="${manga.icono} manga-info-icon"></i>
                    <div class="manga-info-text">
                        <h3>${manga.nombre}</h3>
                        <p>${manga.descripcion}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Cargar subtemas
        this.cargarSubtemas(manga);
    },
    
    // Cargar subtemas del manga
    cargarSubtemas: function(manga) {
        const listaSubtemas = document.getElementById('lista-subtemas');
        listaSubtemas.innerHTML = '';
        
        manga.subtemas.forEach(subtema => {
            const imagen = Imagenes.obtenerImagenSubtema(subtema.id);
            
            const subtemaCard = document.createElement('div');
            subtemaCard.className = 'subtema-card';
            subtemaCard.innerHTML = `
                <div class="subtema-header">
                    <div class="subtema-icon">
                        <img src="${imagen.icono}" alt="${subtema.nombre}">
                    </div>
                    <div class="subtema-title">
                        <h4>${subtema.nombre}</h4>
                        <p><i class="${subtema.icono}"></i> ${subtema.mazos.length} mazos</p>
                    </div>
                </div>
                <div class="subtema-mazos">
                    ${this.generarMazosHTML(subtema.mazos)}
                </div>
            `;
            listaSubtemas.appendChild(subtemaCard);
        });
    },
    
    // Generar HTML para los mazos
    generarMazosHTML: function(mazos) {
        let html = '';
        let mazoIndex = 0;
        
        mazos.forEach(mazo => {
            mazoIndex++;
            const progreso = Sistema.obtenerProgresoMazo(mazo.id);
            const totalPalabras = mazo.palabras.length;
            const completadas = Math.floor((progreso / 100) * totalPalabras);
            const icono = Imagenes.obtenerIconoMazo(mazo.nombre);
            
            html += `
                <div class="mazo-item" data-mazo-id="${mazo.id}">
                    <div class="mazo-icon">
                        <img src="${icono}" alt="${mazo.nombre}">
                    </div>
                    <div class="mazo-info">
                        <h5>${mazo.nombre}</h5>
                        <p>${mazo.descripcion} • ${completadas}/${totalPalabras} palabras (${progreso}%)</p>
                        <div class="progreso-mini">
                            <div class="progreso-fill-mini" style="width: ${progreso}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        return html;
    },
    
    // Manejo de eventos
    inicializarEventos: function() {
        // Menú principal
        document.getElementById('menu-entrenamiento').addEventListener('click', () => {
            this.mostrarPantalla('pantalla-entrenamiento');
        });
        
        document.getElementById('menu-biblioteca').addEventListener('click', () => {
            this.mostrarBiblioteca();
        });
        
        // Botones de volver
        document.querySelectorAll('.btn-volver-menu').forEach(btn => {
            btn.addEventListener('click', () => {
                this.mostrarMenuPrincipal();
            });
        });
        
        document.querySelectorAll('.btn-volver-biblioteca').forEach(btn => {
            btn.addEventListener('click', () => {
                this.mostrarBiblioteca();
            });
        });
        
        // Selección de manga en biblioteca
        document.addEventListener('click', (e) => {
            const mangaCard = e.target.closest('.manga-card');
            if (mangaCard) {
                const mangaId = mangaCard.dataset.mangaId;
                this.mostrarManga(mangaId);
            }
        });
        
        // Selección de mazo
        document.addEventListener('click', (e) => {
            const mazoItem = e.target.closest('.mazo-item');
            if (mazoItem) {
                const mazoId = mazoItem.dataset.mazoId;
                this.mostrarQuiz(mazoId);
            }
        });
        
        // Cards de entrenamiento
        document.getElementById('card-falladas').addEventListener('click', () => {
            this.mostrarMazosFallados();
        });
        
        document.getElementById('card-quintillizas').addEventListener('click', () => {
            Sistema.mostrarNotificacion('¡Próximamente! Esta función estará disponible en la próxima actualización.');
        });
        
        document.getElementById('card-rapidos').addEventListener('click', () => {
            this.mostrarMazosRapidos();
        });
        
        // Eventos del quiz (mantenidos del código anterior)
        this.inicializarEventosQuiz();
    },
    
    // Eventos del quiz (copiados del código anterior)
    inicializarEventosQuiz: function() {
        // Opciones del quiz
        document.querySelectorAll('.opcion').forEach(opcion => {
            opcion.addEventListener('click', (e) => {
                const opcionElement = e.target.closest('.opcion');
                if (!opcionElement) return;
                
                if (document.getElementById('btn-siguiente').disabled === false) {
                    return;
                }
                
                const opcionIndex = parseInt(opcionElement.dataset.index);
                const correcta = Sistema.responderPregunta(opcionIndex);
                
                opcionElement.classList.add('seleccionada');
                if (correcta) {
                    opcionElement.classList.add('correcta');
                    setTimeout(() => {
                        Sistema.siguientePregunta();
                    }, 1500);
                } else {
                    opcionElement.classList.add('incorrecta');
                    document.getElementById('btn-siguiente').disabled = false;
                }
            });
        });
        
        // Botón siguiente
        document.getElementById('btn-siguiente').addEventListener('click', () => {
            Sistema.siguientePregunta();
        });
        
        // Botón volver desde quiz
        document.getElementById('btn-volver-mazo').addEventListener('click', () => {
            if (Sistema.estado.mangaActual) {
                this.mostrarManga(Sistema.estado.mangaActual);
            } else {
                this.mostrarMenuPrincipal();
            }
        });
    },
    
    // Métodos auxiliares
    mostrarMazosFallados: function() {
        // Aquí puedes implementar la lógica para mostrar palabras falladas
        Sistema.mostrarNotificacion('Próximamente podrás revisar tus palabras falladas aquí.');
    },
    
    mostrarMazosRapidos: function() {
        // Aquí puedes implementar la lógica para mostrar mazos rápidos
        Sistema.mostrarNotificacion('Próximamente podrás acceder a mazos rápidos aquí.');
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    UI.inicializar();
});
