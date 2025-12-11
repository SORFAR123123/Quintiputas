// ===== APLICACIÓN PRINCIPAL =====
// Coordina todos los componentes y maneja la interfaz de usuario

import vocabulario from './vocabulario.js';
import sistema from './sistemas.js';

class Aplicacion {
    constructor() {
        this.elementos = {};
        this.inicializarElementos();
        this.inicializarEventos();
        this.inicializarSistema();
        this.cargarMangas();
    }
    
    // ===== INICIALIZACIÓN =====
    inicializarElementos() {
        // Pantallas
        this.elementos.pantallas = {
            inicio: document.getElementById('pantalla-inicio'),
            mazos: document.getElementById('pantalla-mazos'),
            quiz: document.getElementById('pantalla-quiz'),
            resultados: document.getElementById('pantalla-resultados')
        };
        
        // Botones de navegación
        this.elementos.botones = {
            volverInicio: document.getElementById('btn-volver-inicio'),
            salirQuiz: document.getElementById('btn-salir-quiz'),
            volverManga: document.getElementById('btn-volver-manga'),
            repetirMazo: document.getElementById('btn-repetir-mazo'),
            practicarDificiles: document.getElementById('btn-practicar-dificiles')
        };
        
        // Listas dinámicas
        this.elementos.listas = {
            mangas: document.getElementById('lista-mangas'),
            mazos: document.getElementById('lista-mazos'),
            palabrasDificiles: document.getElementById('lista-palabras-dificiles')
        };
        
        // Elementos del quiz
        this.elementos.quiz = {
            palabraJapones: document.getElementById('palabra-japones'),
            palabraRomaji: document.getElementById('palabra-romaji'),
            opcionesGrid: document.querySelector('.opciones-grid'),
            feedbackArea: document.getElementById('feedback-area'),
            btnSiguiente: document.getElementById('btn-siguiente'),
            btnMarcarDificil: document.getElementById('btn-marcar-dificil'),
            contadorPregunta: document.getElementById('contador-pregunta'),
            barraProgreso: document.getElementById('barra-progreso')
        };
        
        // Elementos de resultados
        this.elementos.resultados = {
            correctasCount: document.getElementById('correctas-count'),
            incorrectasCount: document.getElementById('incorrectas-count'),
            totalCount: document.getElementById('total-count'),
            mensajeResultado: document.getElementById('mensaje-resultado'),
            detalleResultado: document.getElementById('detalle-resultado'),
            palabrasDificilesSection: document.getElementById('palabras-dificiles-section')
        };
        
        // Títulos dinámicos
        this.elementos.titulos = {
            mangaActual: document.getElementById('titulo-manga-actual'),
            contadorDificiles: document.getElementById('contador-dificiles')
        };
    }
    
    inicializarEventos() {
        // Navegación
        this.elementos.botones.volverInicio.addEventListener('click', () => this.mostrarPantalla('inicio'));
        this.elementos.botones.salirQuiz.addEventListener('click', () => this.mostrarPantalla('inicio'));
        this.elementos.botones.volverManga.addEventListener('click', () => this.mostrarPantalla('mazos'));
        this.elementos.botones.repetirMazo.addEventListener('click', () => this.repetirMazo());
        this.elementos.botones.practicarDificiles.addEventListener('click', () => this.iniciarMazoDificil());
        
        // Quiz
        this.elementos.quiz.btnSiguiente.addEventListener('click', () => this.siguientePregunta());
        this.elementos.quiz.btnMarcarDificil.addEventListener('click', () => this.marcarPalabraDificil());
        
        // Eventos del sistema
        sistema.on('cambioPantalla', (pantalla) => this.mostrarPantalla(pantalla));
        sistema.on('mangaSeleccionado', (mangaId) => this.mostrarMazos(mangaId));
        sistema.on('mazoSeleccionado', (mazoId) => this.iniciarQuiz(mazoId));
        sistema.on('palabraDificilAgregada', () => this.actualizarContadorDificiles());
        sistema.on('nuevaPregunta', (datos) => this.mostrarPregunta(datos));
        sistema.on('respuestaVerificada', (respuesta) => this.mostrarFeedback(respuesta));
        sistema.on('quizFinalizado', (resultados) => this.mostrarResultados(resultados));
    }
    
    inicializarSistema() {
        // Configurar estado inicial
        this.actualizarContadorDificiles();
    }
    
    // ===== GESTIÓN DE PANTALLAS =====
    mostrarPantalla(nombrePantalla) {
        // Ocultar todas las pantallas
        Object.values(this.elementos.pantallas).forEach(pantalla => {
            pantalla.classList.remove('activa');
        });
        
        // Mostrar pantalla solicitada
        if (this.elementos.pantallas[nombrePantalla]) {
            this.elementos.pantallas[nombrePantalla].classList.add('activa');
            sistema.cambiarPantalla(nombrePantalla);
        }
        
        // Resetear elementos del quiz si salimos
        if (nombrePantalla !== 'quiz') {
            this.limpiarQuiz();
        }
    }
    
    // ===== CARGA DE DATOS =====
    cargarMangas() {
        const mangas = vocabulario.obtenerMangas();
        this.elementos.listas.mangas.innerHTML = '';
        
        mangas.forEach(manga => {
            const mazoCount = Object.keys(manga.mazos).length;
            const card = this.crearElemento('div', ['card']);
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icono" style="background: ${manga.color}20; color: ${manga.color}">
                        <i class="${manga.icono}"></i>
                    </div>
                    <h3 class="card-titulo">${manga.nombre}</h3>
                </div>
                <p class="card-descripcion">${manga.descripcion}</p>
                <div class="card-info">
                    <span class="badge">${mazoCount} ${mazoCount === 1 ? 'mazo' : 'mazos'}</span>
                    <button class="btn btn-primary btn-seleccionar" data-manga-id="${manga.id}">
                        Seleccionar
                    </button>
                </div>
            `;
            
            this.elementos.listas.mangas.appendChild(card);
        });
        
        // Agregar event listeners a los botones de selección
        document.querySelectorAll('.btn-seleccionar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mangaId = e.currentTarget.dataset.mangaId;
                sistema.seleccionarManga(mangaId);
            });
        });
    }
    
    mostrarMazos(mangaId) {
        const manga = vocabulario.obtenerManga(mangaId);
        if (!manga) return;
        
        // Actualizar título
        this.elementos.titulos.mangaActual.textContent = manga.nombre;
        
        // Cargar mazos del manga
        const mazos = vocabulario.obtenerMazos(mangaId);
        this.elementos.listas.mazos.innerHTML = '';
        
        mazos.forEach(mazo => {
            const card = this.crearElemento('div', ['card']);
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icono" style="background: ${manga.color}20; color: ${manga.color}">
                        <i class="fas fa-cards"></i>
                    </div>
                    <h3 class="card-titulo">${mazo.nombre}</h3>
                </div>
                <p class="card-descripcion">${mazo.descripcion}</p>
                <div class="card-info">
                    <span class="badge">${mazo.palabras.length} palabras</span>
                    <button class="btn btn-primary btn-practicar" data-manga-id="${mangaId}" data-mazo-id="${mazo.id}">
                        Practicar
                    </button>
                </div>
            `;
            
            this.elementos.listas.mazos.appendChild(card);
        });
        
        // Agregar event listeners a los botones de práctica
        document.querySelectorAll('.btn-practicar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mangaId = e.currentTarget.dataset.mangaId;
                const mazoId = e.currentTarget.dataset.mazoId;
                sistema.seleccionarMazo({ mangaId, mazoId });
            });
        });
        
        // Actualizar mazo difícil
        this.actualizarMazoDificil(mangaId);
        
        // Mostrar pantalla de mazos
        this.mostrarPantalla('mazos');
    }
    
    actualizarMazoDificil(mangaId) {
        const palabrasDificiles = sistema.obtenerPalabrasDificilesPorManga(mangaId);
        const btnPracticar = this.elementos.botones.practicarDificiles;
        
        if (palabrasDificiles.length > 0) {
            btnPracticar.disabled = false;
            btnPracticar.innerHTML = `Practicar (${palabrasDificiles.length})`;
        } else {
            btnPracticar.disabled = true;
            btnPracticar.textContent = 'Practicar';
        }
    }
    
    actualizarContadorDificiles() {
        const total = sistema.obtenerPalabrasDificiles().length;
        this.elementos.titulos.contadorDificiles.textContent = `${total} ${total === 1 ? 'palabra' : 'palabras'}`;
    }
    
    // ===== QUIZ =====
    async iniciarQuiz(mazoInfo) {
        const { mangaId, mazoId } = mazoInfo;
        const mazo = vocabulario.obtenerMazo(mangaId, mazoId);
        
        if (!mazo || !mazo.palabras.length) {
            console.error('Mazo no encontrado o vacío');
            return;
        }
        
        // Mezclar palabras
        const palabrasMezcladas = [...mazo.palabras].sort(() => Math.random() - 0.5);
        
        // Configurar información del mazo actual
        this.mazoActual = {
            mangaId,
            mazoId,
            mazoNombre: mazo.nombre,
            mangaNombre: vocabulario.obtenerManga(mangaId).nombre
        };
        
        // Iniciar quiz en el sistema
        sistema.iniciarQuiz(palabrasMezcladas);
        
        // Mostrar pantalla de quiz
        this.mostrarPantalla('quiz');
    }
    
    iniciarMazoDificil() {
        const palabrasDificiles = sistema.crearMazoDificil();
        
        if (palabrasDificiles.length === 0) {
            alert('No hay palabras marcadas como difíciles');
            return;
        }
        
        // Configurar información del mazo difícil
        this.mazoActual = {
            mangaId: 'dificiles',
            mazoId: 'dificil',
            mazoNombre: 'Palabras Difíciles',
            mangaNombre: 'Repaso General'
        };
        
        // Iniciar quiz con palabras difíciles
        sistema.iniciarQuiz(palabrasDificiles);
        
        // Mostrar pantalla de quiz
        this.mostrarPantalla('quiz');
    }
    
    mostrarPregunta(datos) {
        const { palabra, opciones, indice, total } = datos;
        
        // Actualizar contador
        this.elementos.quiz.contadorPregunta.textContent = `${indice + 1}/${total}`;
        
        // Actualizar barra de progreso
        const porcentaje = ((indice + 1) / total) * 100;
        this.elementos.quiz.barraProgreso.style.width = `${porcentaje}%`;
        
        // Mostrar palabra japonesa
        this.elementos.quiz.palabraJapones.textContent = palabra.japones;
        this.elementos.quiz.palabraRomaji.textContent = palabra.romaji;
        
        // Limpiar opciones anteriores
        this.elementos.quiz.opcionesGrid.innerHTML = '';
        
        // Crear botones de opciones
        opciones.forEach(opcion => {
            const boton = this.crearElemento('button', ['opcion-btn']);
            boton.textContent = opcion.significado;
            boton.dataset.opcionId = opcion.id;
            
            boton.addEventListener('click', () => {
                this.seleccionarOpcion(opcion.id);
            });
            
            this.elementos.quiz.opcionesGrid.appendChild(boton);
        });
        
        // Ocultar feedback
        this.elementos.quiz.feedbackArea.classList.add('oculto');
        
        // Resetear botón de marcar como difícil
        this.elementos.quiz.btnMarcarDificil.innerHTML = '<i class="far fa-flag"></i>';
        this.elementos.quiz.btnMarcarDificil.classList.remove('marcada');
        
        // Guardar palabra actual para marcar como difícil
        this.palabraActual = {
            ...palabra,
            mangaId: this.mazoActual.mangaId,
            mazoId: this.mazoActual.mazoId,
            mangaNombre: this.mazoActual.mangaNombre
        };
    }
    
    seleccionarOpcion(opcionId) {
        // Deshabilitar todos los botones
        document.querySelectorAll('.opcion-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // Verificar respuesta
        const respuesta = sistema.verificarRespuesta(parseInt(opcionId));
        
        // Marcar botones correctos/incorrectos
        document.querySelectorAll('.opcion-btn').forEach(btn => {
            const id = parseInt(btn.dataset.opcionId);
            const esCorrecta = sistema.estado.progresoMazo.opciones.find(op => op.id === id)?.esCorrecta;
            
            if (esCorrecta) {
                btn.classList.add('correcta');
            } else if (id === opcionId && !respuesta.esCorrecta) {
                btn.classList.add('incorrecta');
            }
        });
    }
    
    mostrarFeedback(respuesta) {
        const { palabra, opcionSeleccionada, esCorrecta } = respuesta;
        
        // Crear contenido del feedback
        let feedbackHTML = '';
        
        if (esCorrecta) {
            feedbackHTML = `
                <div class="feedback-correcto">
                    <div class="feedback-icono">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 class="feedback-titulo">¡Correcto!</h3>
                    <div class="feedback-datos">
                        <div class="feedback-dato">
                            <span>Japonés:</span>
                            <strong>${palabra.japones}</strong>
                        </div>
                        <div class="feedback-dato">
                            <span>Romaji:</span>
                            <strong>${palabra.romaji}</strong>
                        </div>
                        <div class="feedback-dato">
                            <span>Lectura:</span>
                            <strong>${palabra.lectura}</strong>
                        </div>
                        <div class="feedback-dato">
                            <span>Significado:</span>
                            <strong>${palabra.significado}</strong>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const opcionCorrecta = sistema.estado.progresoMazo.opciones.find(op => op.esCorrecta);
            
            feedbackHTML = `
                <div class="feedback-incorrecto">
                    <div class="feedback-icono">
                        <i class="fas fa-times-circle"></i>
                    </div>
                    <h3 class="feedback-titulo">¡Incorrecto!</h3>
                    <p>Tu respuesta: <strong>${opcionSeleccionada}</strong></p>
                    <p>Respuesta correcta: <strong>${opcionCorrecta?.significado || palabra.significado}</strong></p>
                    <div class="feedback-datos">
                        <div class="feedback-dato">
                            <span>Japonés:</span>
                            <strong>${palabra.japones}</strong>
                        </div>
                        <div class="feedback-dato">
                            <span>Romaji:</span>
                            <strong>${palabra.romaji}</strong>
                        </div>
                        <div class="feedback-dato">
                            <span>Lectura:</span>
                            <strong>${palabra.lectura}</strong>
                        </div>
                        <div class="feedback-dato">
                            <span>Significado:</span>
                            <strong>${palabra.significado}</strong>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Actualizar contenido y mostrar feedback
        document.querySelector('.feedback-content').innerHTML = feedbackHTML;
        this.elementos.quiz.feedbackArea.classList.remove('oculto');
        
        // Si la respuesta fue correcta, avanzar automáticamente después de 1.5 segundos
        if (esCorrecta) {
            setTimeout(() => {
                this.siguientePregunta();
            }, 1500);
        }
    }
    
    siguientePregunta() {
        const siguiente = sistema.avanzarPregunta();
        
        if (!siguiente) {
            // Quiz terminado
            return;
        }
    }
    
    marcarPalabraDificil() {
        if (!this.palabraActual) return;
        
        const agregada = sistema.agregarPalabraDificil(this.palabraActual);
        
        if (agregada) {
            this.elementos.quiz.btnMarcarDificil.innerHTML = '<i class="fas fa-flag"></i> Marcada';
            this.elementos.quiz.btnMarcarDificil.classList.add('marcada');
            
            // Mostrar mensaje de confirmación
            this.mostrarNotificacion('Palabra marcada como difícil');
        }
    }
    
    limpiarQuiz() {
        this.elementos.quiz.palabraJapones.textContent = '';
        this.elementos.quiz.palabraRomaji.textContent = '';
        this.elementos.quiz.opcionesGrid.innerHTML = '';
        this.elementos.quiz.feedbackArea.classList.add('oculto');
    }
    
    // ===== RESULTADOS =====
    mostrarResultados(resultados) {
        const { correctas, incorrectas, total, porcentaje } = resultados;
        
        // Actualizar estadísticas
        this.elementos.resultados.correctasCount.textContent = correctas;
        this.elementos.resultados.incorrectasCount.textContent = incorrectas;
        this.elementos.resultados.totalCount.textContent = total;
        
        // Configurar mensaje según el desempeño
        let mensaje, detalle;
        
        if (porcentaje >= 90) {
            mensaje = '¡Excelente trabajo!';
            detalle = 'Dominas completamente este mazo';
        } else if (porcentaje >= 70) {
            mensaje = '¡Muy bien!';
            detalle = 'Buen dominio del vocabulario';
        } else if (porcentaje >= 50) {
            mensaje = 'Buen esfuerzo';
            detalle = 'Sigue practicando para mejorar';
        } else {
            mensaje = 'Sigue practicando';
            detalle = 'Revisa las palabras y vuelve a intentarlo';
        }
        
        this.elementos.resultados.mensajeResultado.textContent = mensaje;
        this.elementos.resultados.detalleResultado.textContent = detalle;
        
        // Mostrar palabras difíciles si hay
        const palabrasDificiles = sistema.obtenerPalabrasDificiles();
        if (palabrasDificiles.length > 0 && this.mazoActual.mangaId !== 'dificiles') {
            this.mostrarPalabrasDificiles(palabrasDificiles);
            this.elementos.resultados.palabrasDificilesSection.classList.remove('oculto');
        } else {
            this.elementos.resultados.palabrasDificilesSection.classList.add('oculto');
        }
        
        // Mostrar pantalla de resultados
        this.mostrarPantalla('resultados');
    }
    
    mostrarPalabrasDificiles(palabras) {
        const lista = this.elementos.resultados.palabrasDificiles;
        lista.innerHTML = '';
        
        palabras.slice(-5).forEach(palabra => { // Mostrar solo las 5 más recientes
            const item = this.crearElemento('div', ['item-dificil']);
            item.innerHTML = `
                <div>
                    <strong>${palabra.japones}</strong>
                    <div style="font-size: 0.875rem; color: var(--color-text-secondary)">
                        ${palabra.mangaNombre}
                    </div>
                </div>
                <span>${palabra.significado}</span>
            `;
            lista.appendChild(item);
        });
    }
    
    repetirMazo() {
        sistema.reiniciarMazo();
        this.mostrarPantalla('quiz');
    }
    
    // ===== UTILIDADES =====
    crearElemento(tag, clases = []) {
        const elemento = document.createElement(tag);
        elemento.classList.add(...clases);
        return elemento;
    }
    
    mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear notificación temporal
        const notificacion = this.crearElemento('div', ['notificacion', `notificacion-${tipo}`]);
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos para animaciones de notificación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .opcion-btn.marcada {
            background: var(--color-accent) !important;
            border-color: var(--color-accent) !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);
    
    // Crear instancia de la aplicación
    window.app = new Aplicacion();
    
    // Exponer vocabulario y sistema para depuración
    window.vocabulario = vocabulario;
    window.sistema = sistema;
});
