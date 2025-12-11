// Archivo principal que coordina todos los sistemas - VERSIÓN CORREGIDA

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
        
        // Inicializar UI inmediatamente
        this.inicializarUI();
        
        // Configurar event listeners después de inicializar UI
        setTimeout(() => this.configurarEventListeners(), 100);
    }

    // ========== INICIALIZACIÓN ==========
    configurarEventListeners() {
        console.log("Configurando event listeners...");
        
        // Navegación principal
        const btnVocabulario = document.getElementById('btn-vocabulario');
        const btnNovias = document.getElementById('btn-novias');
        const btnDificiles = document.getElementById('btn-dificiles');
        
        if (btnVocabulario) {
            btnVocabulario.addEventListener('click', () => {
                console.log("Click en vocabulario");
                this.mostrarSeccion('vocabulario');
            });
        }
        
        if (btnNovias) {
            btnNovias.addEventListener('click', () => {
                console.log("Click en novias");
                this.mostrarSeccion('novias');
            });
        }
        
        if (btnDificiles) {
            btnDificiles.addEventListener('click', () => {
                console.log("Click en dificiles");
                this.mostrarSeccion('dificiles');
            });
        }
        
        // Botones del quiz
        const btnVolver = document.getElementById('btn-volver-mangas');
        if (btnVolver) {
            btnVolver.addEventListener('click', () => this.volverAMangas());
        }
        
        const btnMarcarDificil = document.getElementById('btn-marcar-dificil');
        if (btnMarcarDificil) {
            btnMarcarDificil.addEventListener('click', () => this.marcarPalabraDificil());
        }
        
        const btnLimpiar = document.getElementById('btn-limpiar-dificiles');
        if (btnLimpiar) {
            btnLimpiar.addEventListener('click', () => this.limpiarPalabrasDificiles());
        }
        
        const btnIniciarDificiles = document.getElementById('btn-iniciar-dificiles');
        if (btnIniciarDificiles) {
            btnIniciarDificiles.addEventListener('click', () => this.iniciarQuizDificiles());
        }
        
        const btnCerrarModal = document.getElementById('btn-cerrar-modal');
        if (btnCerrarModal) {
            btnCerrarModal.addEventListener('click', () => this.sistemaJuego.cerrarModalEvento());
        }
        
        // Selector de novias
        const selectNovia = document.getElementById('select-novia');
        if (selectNovia) {
            selectNovia.addEventListener('change', (e) => {
                this.sistemaRPG.seleccionarNovia(parseInt(e.target.value));
            });
        }
        
        // Opciones del quiz
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => this.seleccionarOpcion(index));
        });
        
        // Cerrar modal al hacer clic fuera
        const modal = document.getElementById('evento-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.sistemaJuego.cerrarModalEvento();
                }
            });
        }
        
        console.log("Event listeners configurados");
    }

    inicializarUI() {
        console.log("Inicializando UI...");
        console.log("VOCABULARIO disponible:", window.VOCABULARIO ? "Sí" : "No");
        console.log("CONTENIDO disponible:", window.CONTENIDO ? "Sí" : "No");
        
        // Cargar mangas inmediatamente
        this.cargarMangas();
        
        // Actualizar estadísticas
        if (this.sistemaJuego) {
            this.sistemaJuego.actualizarUI();
        }
        
        // Cargar palabras difíciles
        this.cargarPalabrasDificiles();
        
        // Inicializar sistema RPG
        if (this.sistemaRPG) {
            this.sistemaRPG.actualizarListaNovias();
            this.sistemaRPG.mostrarDetallesNovia(this.sistemaRPG.noviaActual || 0);
        }
        
        // Asegurar que la sección de vocabulario esté visible
        setTimeout(() => {
            this.mostrarSeccion('vocabulario');
        }, 200);
        
        console.log("UI inicializada");
    }

    // ========== SISTEMA DE MANGAS ==========
    cargarMangas() {
        const container = document.getElementById('mangas-container');
        console.log("Cargando mangas en contenedor:", container);
        
        if (!container) {
            console.error("No se encontró el contenedor de mangas");
            return;
        }
        
        if (!window.VOCABULARIO) {
            console.error("VOCABULARIO no está definido");
            container.innerHTML = '<div class="error">Error: No se pudieron cargar los mangas</div>';
            return;
        }
        
        console.log("Mangas disponibles:", window.VOCABULARIO.mangas.length);
        
        // Limpiar contenedor
        container.innerHTML = '';
        
        // Crear tarjetas para cada manga
        window.VOCABULARIO.mangas.forEach(manga => {
            console.log(`Procesando manga: ${manga.nombre} con ${manga.mazos.length} mazos`);
            
            const mangaCard = document.createElement('div');
            mangaCard.className = 'manga-card';
            mangaCard.dataset.id = manga.id;
            
            // Calcular progreso total del manga
            let progresoTotal = 0;
            let mazosCompletados = 0;
            
            if (manga.mazos && manga.mazos.length > 0) {
                manga.mazos.forEach(mazo => {
                    const progreso = this.sistemaJuego.cargarProgresoMazo(manga.id, mazo.id);
                    progresoTotal += progreso;
                    if (progreso === 100) mazosCompletados++;
                });
                progresoTotal = Math.round(progresoTotal / manga.mazos.length);
            }
            
            // Crear HTML de la tarjeta
            mangaCard.innerHTML = `
                <div class="manga-header">
                    <div class="manga-icon" style="background: ${manga.color || '#7e57c2'}">
                        ${manga.icono || '📚'}
                    </div>
                    <div>
                        <div class="manga-title">${manga.nombre}</div>
                        <div class="manga-stats">
                            <span>${manga.mazos?.length || 0} mazos</span>
                            <span>${progresoTotal}% completado</span>
                        </div>
                    </div>
                </div>
                <div class="manga-mazos">
                    ${(manga.mazos || []).map((mazo, index) => {
                        const progreso = this.sistemaJuego.cargarProgresoMazo(manga.id, mazo.id);
                        return `
                            <div class="mazo-item ${progreso === 100 ? 'mazo-completado' : ''}" 
                                 data-manga="${manga.id}" 
                                 data-mazo="${index}">
                                <span>${mazo.nombre || `Mazo ${index + 1}`}</span>
                                <span class="mazo-progress">${progreso}%</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            
            container.appendChild(mangaCard);
            
            // Agregar event listener a la tarjeta del manga
            mangaCard.addEventListener('click', (e) => {
                if (!e.target.closest('.mazo-item')) {
                    console.log(`Click en manga: ${manga.nombre}`);
                    // Aquí podrías expandir/contraer el manga si quieres
                }
            });
            
            // Agregar event listeners a los mazos
            mangaCard.querySelectorAll('.mazo-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const mangaId = parseInt(item.dataset.manga);
                    const mazoId = parseInt(item.dataset.mazo);
                    console.log(`Iniciando quiz: Manga ${mangaId}, Mazo ${mazoId}`);
                    this.iniciarQuiz(mangaId, mazoId);
                });
            });
        });
        
        // Si no hay mangas, mostrar mensaje
        if (window.VOCABULARIO.mangas.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 20px;"></i>
                    <h3>No hay mangas disponibles</h3>
                    <p>Agrega mangas en el archivo vocabulario.js</p>
                </div>
            `;
        }
        
        console.log("Mangas cargados exitosamente");
    }

    mostrarManga(mangaId) {
        console.log(`Mostrando detalles del manga ${mangaId}`);
        // Implementar vista detallada del manga si es necesario
    }

    // ========== SISTEMA DE QUIZ ==========
    iniciarQuiz(mangaId, mazoId) {
        console.log(`Iniciando quiz: manga ${mangaId}, mazo ${mazoId}`);
        
        if (!window.VOCABULARIO) {
            console.error("VOCABULARIO no disponible");
            return;
        }
        
        const manga = window.VOCABULARIO.mangas.find(m => m.id === mangaId);
        if (!manga) {
            console.error(`Manga ${mangaId} no encontrado`);
            return;
        }
        
        const mazo = manga.mazos[mazoId];
        if (!mazo) {
            console.error(`Mazo ${mazoId} no encontrado en manga ${mangaId}`);
            return;
        }
        
        this.mangaActual = manga;
        this.mazoActual = mazo;
        this.indicePalabra = 0;
        this.palabrasFalladas = 0;
        this.palabrasAcertadas = 0;
        this.palabrasMarcadasDificiles = [];
        this.quizActivo = true;
        
        console.log(`Quiz iniciado: ${manga.nombre} - ${mazo.nombre}`);
        
        // Actualizar UI del quiz
        const quizManga = document.getElementById('quiz-manga');
        const quizMazo = document.getElementById('quiz-mazo');
        
        if (quizManga) quizManga.textContent = manga.nombre;
        if (quizMazo) quizMazo.textContent = mazo.nombre;
        
        this.actualizarProgresoQuiz();
        
        // Mostrar primera palabra
        this.mostrarSiguientePalabra();
        
        // Cambiar a sección de quiz
        this.mostrarSeccion('quiz');
    }

    iniciarQuizDificiles() {
        console.log("Iniciando quiz de palabras difíciles");
        
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
            const quizManga = document.getElementById('quiz-manga');
            const quizMazo = document.getElementById('quiz-mazo');
            
            if (quizManga) quizManga.textContent = "Especial";
            if (quizMazo) quizMazo.textContent = "Palabras Difíciles";
            
            this.actualizarProgresoQuiz();
            
            // Mostrar primera palabra
            this.mostrarSiguientePalabra();
            
            // Cambiar a sección de quiz
            this.mostrarSeccion('quiz');
        } else {
            this.mostrarNotificacion("No hay palabras difíciles para estudiar", "warning");
        }
    }

    mostrarSiguientePalabra() {
        if (!this.mazoActual || !this.mazoActual.palabras || this.indicePalabra >= this.mazoActual.palabras.length) {
            console.log("Quiz completado o sin palabras");
            this.finalizarQuiz();
            return;
        }
        
        this.palabraActual = this.mazoActual.palabras[this.indicePalabra];
        console.log(`Mostrando palabra ${this.indicePalabra + 1}: ${this.palabraActual.japones}`);
        
        // Actualizar palabra en pantalla
        const japonesElement = document.getElementById('japanese-word');
        const romajiElement = document.getElementById('romaji-display');
        
        if (japonesElement) japonesElement.textContent = this.palabraActual.japones;
        if (romajiElement) romajiElement.textContent = "";
        
        // Generar opciones
        this.opcionesActuales = this.sistemaJuego.generarOpcionesAleatorias(this.palabraActual.significado);
        console.log("Opciones generadas:", this.opcionesActuales);
        
        // Actualizar botones de opciones
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (index < this.opcionesActuales.length) {
                btn.textContent = this.opcionesActuales[index];
                btn.className = 'option-btn';
                btn.disabled = false;
            }
        });
        
        // Actualizar botón de palabra difícil
        const esDificil = this.palabrasMarcadasDificiles.includes(this.indicePalabra);
        const btnDificil = document.getElementById('btn-marcar-dificil');
        if (btnDificil) {
            btnDificil.className = esDificil ? 'btn-difficult active' : 'btn-difficult';
            btnDificil.innerHTML = esDificil ?
                '<i class="fas fa-fire"></i> Marcada como difícil' :
                '<i class="fas fa-fire"></i> Marcar como difícil';
        }
        
        // Actualizar contador
        const difficultCount = document.getElementById('difficult-count');
        if (difficultCount) {
            difficultCount.textContent = this.palabrasMarcadasDificiles.length;
        }
    }

    seleccionarOpcion(opcionIndex) {
        if (!this.quizActivo || !this.palabraActual) {
            console.log("Quiz no activo o palabra no disponible");
            return;
        }
        
        console.log(`Opción seleccionada: ${opcionIndex}`);
        
        const opcionSeleccionada = this.opcionesActuales[opcionIndex];
        const esCorrecta = opcionSeleccionada === this.palabraActual.significado;
        
        console.log(`¿Correcta? ${esCorrecta} (Seleccionada: "${opcionSeleccionada}", Correcta: "${this.palabraActual.significado}")`);
        
        // Mostrar romaji
        const romajiElement = document.getElementById('romaji-display');
        if (romajiElement) {
            romajiElement.textContent = this.palabraActual.romaji;
        }
        
        // Marcar opciones correctas/incorrectas
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (this.opcionesActuales[index] === this.palabraActual.significado) {
                btn.classList.add('correct');
            } else if (index === opcionIndex && !esCorrecta) {
                btn.classList.add('incorrect');
            }
            btn.disabled = true;
        });
        
        // Dar EXP a la novia seleccionada si hay sistemaRPG
        if (esCorrecta && this.sistemaRPG && this.sistemaRPG.noviaActual !== null) {
            this.sistemaRPG.agregarExp(this.sistemaRPG.noviaActual, 10, "Palabra correcta");
            this.palabrasAcertadas++;
        } else if (!esCorrecta) {
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
            } else {
                console.log("Falló, permanece en la misma palabra");
                // Si falla en mazo normal, se queda en la misma palabra
                // Solo re-habilitar los botones
                document.querySelectorAll('.option-btn').forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('correct', 'incorrect');
                });
            }
        }, 1500);
    }

    marcarPalabraDificil() {
        if (!this.quizActivo || !this.palabraActual || !this.mangaActual || !this.mazoActual) {
            console.log("No se puede marcar como difícil: quiz no activo");
            return;
        }
        
        const index = this.indicePalabra;
        console.log(`Marcando palabra ${index} como difícil`);
        
        if (this.palabrasMarcadasDificiles.includes(index)) {
            // Desmarcar
            this.palabrasMarcadasDificiles = this.palabrasMarcadasDificiles.filter(i => i !== index);
            console.log("Palabra desmarcada como difícil");
            
            const btnDificil = document.getElementById('btn-marcar-dificil');
            if (btnDificil) {
                btnDificil.className = 'btn-difficult';
                btnDificil.innerHTML = '<i class="fas fa-fire"></i> Marcar como difícil';
            }
        } else {
            // Marcar
            this.palabrasMarcadasDificiles.push(index);
            console.log("Palabra marcada como difícil");
            
            const btnDificil = document.getElementById('btn-marcar-dificil');
            if (btnDificil) {
                btnDificil.className = 'btn-difficult active';
                btnDificil.innerHTML = '<i class="fas fa-fire"></i> Marcada como difícil';
            }
            
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
        const difficultCount = document.getElementById('difficult-count');
        if (difficultCount) {
            difficultCount.textContent = this.palabrasMarcadasDificiles.length;
        }
    }

    actualizarProgresoQuiz() {
        const totalPalabras = this.mazoActual ? (this.mazoActual.palabras?.length || 10) : 10;
        const porcentaje = (this.indicePalabra / totalPalabras) * 100;
        
        const progressBar = document.getElementById('quiz-progress-bar');
        const progressText = document.getElementById('quiz-progress-text');
        
        if (progressBar) {
            progressBar.style.width = `${porcentaje}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${this.indicePalabra}/${totalPalabras}`;
        }
        
        console.log(`Progreso: ${this.indicePalabra}/${totalPalabras} (${porcentaje}%)`);
    }

    finalizarQuiz() {
        console.log("Finalizando quiz...");
        this.quizActivo = false;
        
        const totalPalabras = this.mazoActual ? (this.mazoActual.palabras?.length || 10) : 10;
        const porcentajeCompletado = totalPalabras > 0 ? (this.palabrasAcertadas / totalPalabras) * 100 : 0;
        
        console.log(`Resultado: ${this.palabrasAcertadas}/${totalPalabras} = ${porcentajeCompletado}%`);
        
        // Calcular recompensa
        const esMazoDificil = this.mazoActual && this.mazoActual.id === -1;
        const recompensa = this.sistemaJuego.calcularRecompensaMazo(porcentajeCompletado, esMazoDificil);
        
        // Mostrar resultados
        const feedback = document.getElementById('quiz-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="quiz-result">
                    <h3>¡Quiz Completado!</h3>
                    <p>Aciertos: ${this.palabrasAcertadas}/${totalPalabras} (${porcentajeCompletado.toFixed(1)}%)</p>
                    <p>Recompensa: ${recompensa.toFixed(2)} soles ${esMazoDificil ? '(x3 bonus)' : ''}</p>
                    ${porcentajeCompletado === 100 ? 
                        '<p class="perfect">¡Perfecto! +50 EXP extra</p>' : 
                        ''}
                </div>
            `;
            
            // Dar EXP extra si fue perfecto
            if (porcentajeCompletado === 100 && this.sistemaRPG && this.sistemaRPG.noviaActual !== null) {
                this.sistemaRPG.agregarExp(this.sistemaRPG.noviaActual, 50, "Mazo perfecto");
            }
            
            // Procesar recompensa del mazo
            if (this.mazoActual && this.mazoActual.id !== -1 && this.mangaActual) {
                this.sistemaJuego.procesarResultadoMazo(
                    this.mazoActual.id,
                    this.mangaActual.id,
                    porcentajeCompletado,
                    this.palabrasFalladas
                );
            } else if (esMazoDificil) {
                // Recompensa especial para mazo de difíciles
                this.sistemaJuego.agregarDinero(recompensa, "Mazo de palabras difíciles");
                
                // Limpiar palabras usadas
                this.palabrasMarcadasDificiles.forEach(index => {
                    const palabra = this.mazoActual.palabras[index];
                    if (palabra && palabra.id) {
                        this.sistemaJuego.eliminarPalabraDificil(palabra.id);
                    }
                });
            }
            
            // Actualizar UI
            this.sistemaJuego.actualizarUI();
            this.cargarPalabrasDificiles();
        }
        
        // Volver automáticamente después de 3 segundos
        setTimeout(() => {
            if (this.mazoActual && this.mazoActual.id === -1) {
                this.mostrarSeccion('dificiles');
            } else {
                this.volverAMangas();
            }
        }, 3000);
    }

    // ========== NAVEGACIÓN ==========
    mostrarSeccion(seccion) {
        console.log(`Mostrando sección: ${seccion}`);
        
        // Ocultar todas las secciones
        document.querySelectorAll('.content-section').forEach(s => {
            s.classList.remove('active');
        });
        
        // Mostrar sección seleccionada
        const seccionElement = document.getElementById(`${seccion}-section`);
        if (seccionElement) {
            seccionElement.classList.add('active');
            console.log(`Sección ${seccion} mostrada`);
        } else {
            console.error(`No se encontró la sección: ${seccion}-section`);
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
        switch(seccion) {
            case 'novias':
                if (this.sistemaRPG) {
                    this.sistemaRPG.actualizarListaNovias();
                    this.sistemaRPG.mostrarDetallesNovia(this.sistemaRPG.noviaActual || 0);
                }
                break;
            case 'dificiles':
                this.cargarPalabrasDificiles();
                break;
            case 'vocabulario':
                this.cargarMangas();
                break;
        }
    }

    volverAMangas() {
        console.log("Volviendo a mangas");
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
            console.log("Limpiando palabras difíciles");
            this.sistemaJuego.limpiarPalabrasDificiles();
            this.cargarPalabrasDificiles();
        }
    }

    // ========== PALABRAS DIFÍCILES ==========
    cargarPalabrasDificiles() {
        const container = document.getElementById('dificiles-words');
        if (!container) {
            console.error("No se encontró el contenedor de palabras difíciles");
            return;
        }
        
        const palabras = this.sistemaJuego.palabrasDificiles || [];
        console.log(`Cargando ${palabras.length} palabras difíciles`);
        
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
                    <div class="dificil-word-jp">${palabra.japones || 'Sin palabra'}</div>
                    <div class="dificil-word-romaji">${palabra.romaji || ''}</div>
                    <div class="dificil-word-meaning">${palabra.significado || ''}</div>
                    <small>${palabra.mangaId !== undefined ? `Manga ${palabra.mangaId + 1}` : 'Origen desconocido'}</small>
                </div>
                <div class="dificil-word-stats">
                    <span class="dificil-count">Fallada ${palabra.vecesFallada || 1} veces</span>
                </div>
            </div>
        `).join('');
    }

    // ========== NOTIFICACIONES ==========
    mostrarNotificacion(mensaje, tipo = "info") {
        if (this.sistemaJuego && this.sistemaJuego.mostrarNotificacion) {
            this.sistemaJuego.mostrarNotificacion(mensaje, tipo);
        } else {
            console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
        }
    }
}

// Función para inicializar todo cuando la página cargue
function inicializarAplicacion() {
    console.log("=== INICIALIZANDO APLICACIÓN ===");
    
    // Verificar que los archivos necesarios estén cargados
    if (!window.VOCABULARIO) {
        console.error("ERROR: vocabulario.js no se cargó correctamente");
        alert("Error: No se pudo cargar el vocabulario. Recarga la página.");
        return;
    }
    
    if (!window.CONTENIDO) {
        console.warn("Advertencia: contenido.js no se cargó");
    }
    
    // Inicializar sistemas
    if (!window.sistemaJuego) {
        window.sistemaJuego = new SistemaJuego();
        console.log("Sistema de juego inicializado");
    }
    
    if (!window.sistemaRPG) {
        window.sistemaRPG = new SistemaRPGNovias();
        console.log("Sistema RPG inicializado");
    }
    
    // Inicializar aplicación principal
    window.app = new AplicacionPrincipal();
    console.log("Aplicación principal inicializada");
    
    // Hacer funciones disponibles globalmente
    window.obtenerFotoNovia = (nombre, nivel) => {
        if (window.CONTENIDO?.fotos) {
            const nombreLower = nombre.toLowerCase();
            const fotos = window.CONTENIDO.fotos[nombreLower];
            if (fotos && fotos.length > 0) {
                let fotoSeleccionada = fotos[0];
                for (const foto of fotos) {
                    if (foto.nivel <= nivel) {
                        fotoSeleccionada = foto;
                    }
                }
                return fotoSeleccionada;
            }
        }
        return { url: '', descripcion: 'Sin imagen' };
    };
    
    window.obtenerActividadesNovia = (nombre, nivel) => {
        if (window.CONTENIDO?.actividades) {
            const actividades = window.CONTENIDO.actividades[nombre.toLowerCase()];
            return actividades ? actividades.filter(a => a.nivelRequerido <= nivel) : [];
        }
        return [];
    };
    
    window.obtenerVideosIntimosNovia = (nombre, nivel) => {
        if (window.CONTENIDO?.videosIntimos) {
            const videos = window.CONTENIDO.videosIntimos[nombre.toLowerCase()];
            return videos ? videos.filter(v => v.nivelRequerido <= nivel) : [];
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
    
    console.log("=== APLICACIÓN LISTA ===");
}

// Inicializar cuando el DOM esté listo
if (typeof window !== 'undefined') {
    // Esperar a que todos los scripts se carguen
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarAplicacion);
    } else {
        // DOM ya cargado
        setTimeout(inicializarAplicacion, 500);
    }
}

// Exportar para desarrollo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AplicacionPrincipal;
}
