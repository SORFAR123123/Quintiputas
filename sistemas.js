// Sistema de gestión: dinero, EXP, eventos, probabilidades

class SistemaJuego {
    constructor() {
        this.dinero = 100;
        this.mazosCompletados = 0;
        this.expTotal = 0;
        this.palabrasDificiles = [];
        this.mazoDificilesTemporal = [];
        this.ultimoMazoCompletado = null;
        this.estadisticas = {
            palabrasAprendidas: 0,
            palabrasFalladas: 0,
            tiempoEstudiado: 0,
            dineroGastado: 0,
            dineroGanado: 0
        };
        
        this.cargarProgreso();
    }

    // ========== SISTEMA DE DINERO ==========
    agregarDinero(cantidad, motivo = "") {
        this.dinero += cantidad;
        if (cantidad > 0) {
            this.estadisticas.dineroGanado += cantidad;
        }
        this.guardarProgreso();
        this.actualizarUI();
        
        if (motivo) {
            this.mostrarNotificacion(`+${cantidad} soles (${motivo})`, "success");
        }
        return this.dinero;
    }

    gastarDinero(cantidad, motivo = "") {
        if (this.dinero >= cantidad) {
            this.dinero -= cantidad;
            this.estadisticas.dineroGastado += cantidad;
            this.guardarProgreso();
            this.actualizarUI();
            
            if (motivo) {
                this.mostrarNotificacion(`-${cantidad} soles (${motivo})`, "warning");
            }
            return true;
        }
        this.mostrarNotificacion("Dinero insuficiente", "error");
        return false;
    }

    // ========== SISTEMA DE QUIZ ==========
    calcularRecompensaMazo(porcentajeCompletado, esMazoDificil = false) {
        const base = 2; // 2 soles por mazo al 100%
        let recompensa = (porcentajeCompletado / 100) * base;
        
        if (esMazoDificil) {
            recompensa *= 3; // Triple recompensa
        }
        
        return Math.round(recompensa * 100) / 100; // Redondear a 2 decimales
    }

    procesarResultadoMazo(mazoId, mangaId, porcentaje, palabrasFalladas) {
        const recompensa = this.calcularRecompensaMazo(porcentaje);
        this.agregarDinero(recompensa, "Completar mazo");
        
        this.mazosCompletados++;
        this.estadisticas.palabrasAprendidas += 10 - palabrasFalladas;
        this.estadisticas.palabrasFalladas += palabrasFalladas;
        
        // Guardar progreso del mazo
        this.guardarProgresoMazo(mangaId, mazoId, porcentaje);
        
        // Si es 100%, mostrar evento aleatorio
        if (porcentaje === 100) {
            this.ultimoMazoCompletado = { mangaId, mazoId };
            setTimeout(() => this.mostrarEventoAleatorio(), 1000);
        }
        
        return recompensa;
    }

    // ========== PALABRAS DIFÍCILES ==========
    marcarPalabraDificil(palabra, mangaId, mazoId) {
        const palabraExistente = this.palabrasDificiles.find(
            p => p.japones === palabra.japones && p.mangaId === mangaId && p.mazoId === mazoId
        );
        
        if (!palabraExistente) {
            const palabraDificil = {
                ...palabra,
                mangaId,
                mazoId,
                fechaMarcada: new Date().toISOString(),
                vecesFallada: 1
            };
            this.palabrasDificiles.push(palabraDificil);
            this.guardarProgreso();
            return true;
        } else {
            palabraExistente.vecesFallada++;
            this.guardarProgreso();
            return false;
        }
    }

    eliminarPalabraDificil(palabraId) {
        this.palabrasDificiles = this.palabrasDificiles.filter(p => p.id !== palabraId);
        this.guardarProgreso();
    }

    limpiarPalabrasDificiles() {
        this.palabrasDificiles = [];
        this.mazoDificilesTemporal = [];
        this.guardarProgreso();
        this.mostrarNotificacion("Palabras difíciles eliminadas", "success");
    }

    crearMazoDificilesTemporal() {
        if (this.palabrasDificiles.length === 0) {
            this.mostrarNotificacion("No hay palabras difíciles", "warning");
            return false;
        }
        
        // Crear mazo temporal con hasta 10 palabras difíciles
        this.mazoDificilesTemporal = [...this.palabrasDificiles]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10)
            .map((palabra, index) => ({
                ...palabra,
                id: `dificil-${index}`,
                opciones: this.generarOpcionesAleatorias(palabra.significado)
            }));
        
        return true;
    }

    // ========== EVENTOS ALEATORIOS ==========
    mostrarEventoAleatorio() {
        const evento = this.seleccionarEventoAleatorio();
        const modal = document.getElementById('evento-modal');
        const contenido = document.getElementById('evento-contenido');
        
        if (!modal || !contenido) return;
        
        contenido.innerHTML = `
            <div class="evento-header">
                <h4>¡Felicidades! Has completado un mazo al 100%</h4>
                <p>Selecciona un video especial para ver:</p>
            </div>
            <div class="videos-container" id="evento-videos">
                ${evento.videos.map(video => `
                    <div class="video-item" data-id="${video.id}" data-probabilidad="${video.probabilidad}">
                        <i class="fas ${video.icono}"></i>
                        <h5>${video.nombre}</h5>
                        <p>${video.descripcion}</p>
                        <small>Probabilidad: ${(video.probabilidad * 100).toFixed(0)}%</small>
                    </div>
                `).join('')}
            </div>
        `;
        
        modal.classList.add('active');
        
        // Agregar event listeners a los videos
        setTimeout(() => {
            document.querySelectorAll('.video-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.procesarSeleccionVideo(item.dataset.id, item.dataset.probabilidad);
                });
            });
        }, 100);
    }

    seleccionarEventoAleatorio() {
        // Usar los eventos de contenido.js
        const eventos = window.CONTENIDO?.eventos || [
            { id: 0, nombre: "Video Especial", probabilidad: 1, recompensa: 10, icono: "fa-gift", descripcion: "Contenido exclusivo" }
        ];
        
        return {
            videos: eventos.map(e => ({
                ...e,
                icono: e.icono.startsWith('fa-') ? e.icono : `fa-${e.icono}`
            }))
        };
    }

    procesarSeleccionVideo(videoId, probabilidad) {
        const random = Math.random();
        const exito = random <= parseFloat(probabilidad);
        
        if (exito) {
            const recompensa = 10 + Math.floor(Math.random() * 40); // 10-50 soles
            this.agregarDinero(recompensa, "Evento especial");
            this.mostrarNotificacion(`¡Video desbloqueado! +${recompensa} soles`, "success");
        } else {
            this.mostrarNotificacion("El video no pudo cargarse", "warning");
        }
        
        this.cerrarModalEvento();
    }

    cerrarModalEvento() {
        const modal = document.getElementById('evento-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // ========== PROBABILIDADES Y CÁLCULOS ==========
    generarOpcionesAleatorias(respuestaCorrecta) {
        const opciones = [respuestaCorrecta];
        const todasPalabras = this.obtenerTodasPalabras();
        
        // Seleccionar 3 opciones incorrectas aleatorias
        while (opciones.length < 4) {
            const randomIndex = Math.floor(Math.random() * todasPalabras.length);
            const opcion = todasPalabras[randomIndex].significado;
            if (!opciones.includes(opcion)) {
                opciones.push(opcion);
            }
        }
        
        // Mezclar opciones
        return this.mezclarArray(opciones);
    }

    obtenerTodasPalabras() {
        let todasPalabras = [];
        if (window.VOCABULARIO) {
            window.VOCABULARIO.mangas.forEach(manga => {
                manga.mazos.forEach(mazo => {
                    todasPalabras = todasPalabras.concat(mazo.palabras);
                });
            });
        }
        return todasPalabras;
    }

    mezclarArray(array) {
        const nuevoArray = [...array];
        for (let i = nuevoArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
        }
        return nuevoArray;
    }

    calcularProbabilidadExito(nivel, baseProbabilidad = 0.01) {
        // Probabilidad aumenta con el nivel
        return Math.min(baseProbabilidad * nivel, 0.99);
    }

    // ========== SISTEMA DE GUARDADO ==========
    guardarProgreso() {
        const progreso = {
            dinero: this.dinero,
            mazosCompletados: this.mazosCompletados,
            expTotal: this.expTotal,
            palabrasDificiles: this.palabrasDificiles,
            estadisticas: this.estadisticas,
            fechaGuardado: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('japaneseRPG_progreso', JSON.stringify(progreso));
        } catch (e) {
            console.error("Error guardando progreso:", e);
        }
    }

    cargarProgreso() {
        try {
            const guardado = localStorage.getItem('japaneseRPG_progreso');
            if (guardado) {
                const progreso = JSON.parse(guardado);
                this.dinero = progreso.dinero || 100;
                this.mazosCompletados = progreso.mazosCompletados || 0;
                this.expTotal = progreso.expTotal || 0;
                this.palabrasDificiles = progreso.palabrasDificiles || [];
                this.estadisticas = progreso.estadisticas || this.estadisticas;
            }
        } catch (e) {
            console.error("Error cargando progreso:", e);
        }
    }

    guardarProgresoMazo(mangaId, mazoId, porcentaje) {
        const clave = `mazo_${mangaId}_${mazoId}`;
        try {
            localStorage.setItem(clave, porcentaje.toString());
        } catch (e) {
            console.error("Error guardando progreso del mazo:", e);
        }
    }

    cargarProgresoMazo(mangaId, mazoId) {
        const clave = `mazo_${mangaId}_${mazoId}`;
        try {
            const porcentaje = localStorage.getItem(clave);
            return porcentaje ? parseInt(porcentaje) : 0;
        } catch (e) {
            console.error("Error cargando progreso del mazo:", e);
            return 0;
        }
    }

    // ========== UI Y NOTIFICACIONES ==========
    actualizarUI() {
        // Actualizar dinero
        const dineroElement = document.getElementById('money');
        if (dineroElement) {
            dineroElement.textContent = this.dinero;
        }
        
        // Actualizar mazos completados
        const mazosElement = document.getElementById('mazos-completados');
        if (mazosElement) {
            mazosElement.textContent = this.mazosCompletados;
        }
        
        // Actualizar EXP total
        const expElement = document.getElementById('exp-total');
        if (expElement) {
            expElement.textContent = this.expTotal;
        }
        
        // Actualizar contador de palabras difíciles
        const dificilesCount = document.getElementById('dificiles-count');
        if (dificilesCount) {
            dificilesCount.textContent = `${this.palabrasDificiles.length} palabras`;
        }
    }

    mostrarNotificacion(mensaje, tipo = "info") {
        const notificaciones = document.getElementById('notificaciones');
        if (!notificaciones) return;
        
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.innerHTML = `
            <i class="fas ${this.obtenerIconoNotificacion(tipo)}"></i>
            <span>${mensaje}</span>
        `;
        
        notificaciones.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.opacity = '0';
            notificacion.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificaciones.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }

    obtenerIconoNotificacion(tipo) {
        switch(tipo) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }

    // ========== UTILIDADES ==========
    formatearDinero(cantidad) {
        return cantidad.toFixed(2);
    }

    calcularNivel(exp) {
        return Math.floor(Math.sqrt(exp / 100)) + 1;
    }

    calcularExpParaNivel(nivel) {
        return Math.pow((nivel - 1) * 100, 2);
    }

    calcularExpParaSiguienteNivel(expActual) {
        const nivelActual = this.calcularNivel(expActual);
        const expSiguienteNivel = this.calcularExpParaNivel(nivelActual + 1);
        return expSiguienteNivel - expActual;
    }
}

// Crear instancia global del sistema
let sistemaJuego;

// Inicializar sistema cuando se cargue la página
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        sistemaJuego = new SistemaJuego();
        sistemaJuego.actualizarUI();
    });
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SistemaJuego;
}
