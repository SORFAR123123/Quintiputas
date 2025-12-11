// Sistema RPG de las quintillizas

class SistemaRPGNovias {
    constructor() {
        this.novias = [
            { id: 0, nombre: "Ichika", exp: 0, nivel: 1, seleccionada: true },
            { id: 1, nombre: "Nino", exp: 0, nivel: 1, seleccionada: false },
            { id: 2, nombre: "Miku", exp: 0, nivel: 1, seleccionada: false },
            { id: 3, nombre: "Yotsuba", exp: 0, nivel: 1, seleccionada: false },
            { id: 4, nombre: "Itsuki", exp: 0, nivel: 1, seleccionada: false }
        ];
        
        this.noviaActual = 0;
        this.inventario = {
            condones: 0,
            regalos: []
        };
        
        this.cargarProgresoNovias();
    }

    // ========== SISTEMA DE EXP Y NIVELES ==========
    agregarExp(noviaId, cantidad, motivo = "") {
        const novia = this.novias.find(n => n.id === noviaId);
        if (!novia) return false;
        
        novia.exp += cantidad;
        const nivelAnterior = novia.nivel;
        novia.nivel = this.calcularNivel(novia.exp);
        
        // Si subió de nivel
        if (novia.nivel > nivelAnterior) {
            this.mostrarNotificacion(`¡${novia.nombre} subió al nivel ${novia.nivel}!`, "success");
        }
        
        this.guardarProgresoNovias();
        this.actualizarUINovia(noviaId);
        
        if (motivo) {
            this.mostrarNotificacion(`+${cantidad} EXP para ${novia.nombre} (${motivo})`, "info");
        }
        
        return true;
    }

    calcularNivel(exp) {
        // Fórmula: nivel = floor(sqrt(exp/100)) + 1
        return Math.floor(Math.sqrt(exp / 100)) + 1;
    }

    calcularExpParaSiguienteNivel(expActual) {
        const nivelActual = this.calcularNivel(expActual);
        const expSiguienteNivel = Math.pow(nivelActual * 100, 2);
        return expSiguienteNivel - expActual;
    }

    // ========== GESTIÓN DE NOVIAS ==========
    seleccionarNovia(noviaId) {
        this.novias.forEach(n => n.seleccionada = false);
        const novia = this.novias.find(n => n.id === noviaId);
        if (novia) {
            novia.seleccionada = true;
            this.noviaActual = noviaId;
            this.mostrarDetallesNovia(noviaId);
            return true;
        }
        return false;
    }

    // ========== ACTIVIDADES ==========
    realizarActividad(noviaId, actividadId) {
        const novia = this.novias.find(n => n.id === noviaId);
        if (!novia) return false;
        
        // Obtener actividad de contenido.js
        const actividades = window.CONTENIDO?.actividades[novia.nombre.toLowerCase()];
        if (!actividades) return false;
        
        const actividad = actividades.find(a => a.id === actividadId);
        if (!actividad) return false;
        
        // Verificar nivel requerido
        if (novia.nivel < actividad.nivelRequerido) {
            this.mostrarNotificacion(`${novia.nombre} necesita nivel ${actividad.nivelRequerido} para esta actividad`, "warning");
            return false;
        }
        
        // Gastar dinero
        if (!sistemaJuego.gastarDinero(actividad.costo, actividad.nombre)) {
            return false;
        }
        
        // Dar EXP
        this.agregarExp(noviaId, actividad.exp, actividad.nombre);
        
        // Mostrar mensaje de éxito
        this.mostrarNotificacion(`Disfrutaste ${actividad.nombre.toLowerCase()} con ${novia.nombre}`, "success");
        
        return true;
    }

    realizarActividadIntima(noviaId, actividadId) {
        const novia = this.novias.find(n => n.id === noviaId);
        if (!novia) return false;
        
        // Obtener actividad íntima de contenido.js
        const actividadesIntimas = window.CONTENIDO?.videosIntimos[novia.nombre.toLowerCase()];
        if (!actividadesIntimas) return false;
        
        const actividad = actividadesIntimas.find(a => a.id === actividadId);
        if (!actividad) return false;
        
        // Verificar nivel requerido
        if (novia.nivel < actividad.nivelRequerido) {
            this.mostrarNotificacion(`${novia.nombre} necesita nivel ${actividad.nivelRequerido} para esta actividad`, "warning");
            return false;
        }
        
        // Verificar condones
        if (this.inventario.condones < 1) {
            this.mostrarNotificacion("Necesitas condones para esta actividad", "warning");
            return false;
        }
        
        // Gastar dinero y condones
        if (!sistemaJuego.gastarDinero(actividad.costo, actividad.nombre)) {
            return false;
        }
        this.inventario.condones--;
        
        // Calcular probabilidad de éxito
        const probabilidadExito = sistemaJuego.calcularProbabilidadExito(novia.nivel, actividad.probabilidad);
        const exito = Math.random() <= probabilidadExito;
        
        if (exito) {
            // Éxito: dar EXP y recompensa
            this.agregarExp(noviaId, actividad.exp, actividad.nombre);
            this.mostrarNotificacion(`¡Éxito! ${actividad.nombre} con ${novia.nombre}`, "success");
            return true;
        } else {
            // Fallo: mostrar mensaje personalizado
            const mensajeFallo = window.obtenerMensajeFallo?.(novia.nombre) || 
                                `${novia.nombre} no tiene ganas en este momento`;
            this.mostrarNotificacion(mensajeFallo, "error");
            return false;
        }
    }

    // ========== COMPRAS Y TIENDA ==========
    comprarCondones(paqueteId) {
        const paquetes = window.CONTENIDO?.items?.condones || [
            { id: 0, nombre: "Paquete Básico", precio: 20, cantidad: 3 }
        ];
        
        const paquete = paquetes.find(p => p.id === paqueteId);
        if (!paquete) return false;
        
        if (!sistemaJuego.gastarDinero(paquete.precio, paquete.nombre)) {
            return false;
        }
        
        this.inventario.condones += paquete.cantidad;
        this.guardarProgresoNovias();
        this.mostrarNotificacion(`Comprado: ${paquete.nombre} (+${paquete.cantidad} condones)`, "success");
        
        return true;
    }

    comprarRegalo(regaloId, noviaId) {
        const novia = this.novias.find(n => n.id === noviaId);
        if (!novia) return false;
        
        const regalos = window.CONTENIDO?.items?.regalos || [
            { id: 0, nombre: "Ramo de Flores", precio: 30, exp: 50 }
        ];
        
        const regalo = regalos.find(r => r.id === regaloId);
        if (!regalo) return false;
        
        if (!sistemaJuego.gastarDinero(regalo.precio, regalo.nombre)) {
            return false;
        }
        
        // Dar EXP a la novia
        this.agregarExp(noviaId, regalo.exp, `Regalo: ${regalo.nombre}`);
        
        // Agregar al inventario
        this.inventario.regalos.push({
            ...regalo,
            fecha: new Date().toISOString(),
            destinataria: novia.nombre
        });
        
        this.guardarProgresoNovias();
        this.mostrarNotificacion(`Le diste ${regalo.nombre} a ${novia.nombre}`, "success");
        
        return true;
    }

    // ========== INTERFAZ DE USUARIO ==========
    mostrarDetallesNovia(noviaId) {
        const novia = this.novias.find(n => n.id === noviaId);
        if (!novia) return;
        
        // Actualizar elementos de la UI
        const nombreElement = document.getElementById('novia-nombre');
        const nivelElement = document.getElementById('novia-nivel');
        const expBar = document.getElementById('novia-exp-bar');
        const expText = document.getElementById('novia-exp-text');
        const imagenElement = document.getElementById('novia-img');
        
        if (nombreElement) nombreElement.textContent = novia.nombre;
        if (nivelElement) nivelElement.textContent = novia.nivel;
        
        // Calcular EXP para la barra
        const expParaSiguiente = this.calcularExpParaSiguienteNivel(novia.exp);
        const expAnteriorNivel = Math.pow((novia.nivel - 1) * 100, 2);
        const expEnEsteNivel = novia.exp - expAnteriorNivel;
        const porcentaje = (expEnEsteNivel / (expAnteriorNivel + expParaSiguiente - expAnteriorNivel)) * 100;
        
        if (expBar) expBar.style.width = `${porcentaje}%`;
        if (expText) expText.textContent = `${novia.exp} EXP (${expParaSiguiente} para siguiente nivel)`;
        
        // Actualizar imagen (usando contenido.js)
        if (imagenElement && window.obtenerFotoNovia) {
            const foto = window.obtenerFotoNovia(novia.nombre, novia.nivel);
            if (foto && foto.url) {
                imagenElement.src = foto.url;
                imagenElement.alt = foto.descripcion;
            }
        }
        
        // Actualizar actividades
        this.actualizarActividadesNovia(novia);
        this.actualizarActividadesIntimasNovia(novia);
    }

    actualizarActividadesNovia(novia) {
        const container = document.getElementById('actividades-container');
        if (!container) return;
        
        const actividades = window.obtenerActividadesNovia?.(novia.nombre, novia.nivel) || [];
        
        container.innerHTML = actividades.map(actividad => `
            <div class="actividad-item" data-id="${actividad.id}">
                <div class="actividad-header">
                    <i class="fas ${actividad.icono.startsWith('fa-') ? actividad.icono : `fa-${actividad.icono}`}"></i>
                    <h5>${actividad.nombre}</h5>
                </div>
                <p>${actividad.descripcion}</p>
                <div class="actividad-details">
                    <span class="actividad-costo">${actividad.costo} soles</span>
                    <span class="actividad-exp">+${actividad.exp} EXP</span>
                </div>
                <small>Nivel ${actividad.nivelRequerido}+</small>
            </div>
        `).join('');
        
        // Agregar event listeners
        container.querySelectorAll('.actividad-item').forEach(item => {
            item.addEventListener('click', () => {
                const actividadId = parseInt(item.dataset.id);
                this.realizarActividad(novia.id, actividadId);
            });
        });
    }

    actualizarActividadesIntimasNovia(novia) {
        const container = document.getElementById('intimas-container');
        if (!container) return;
        
        const actividades = window.obtenerVideosIntimosNovia?.(novia.nombre, novia.nivel) || [];
        
        container.innerHTML = actividades.map(actividad => `
            <div class="actividad-item" data-id="${actividad.id}">
                <div class="actividad-header">
                    <i class="fas ${actividad.icono.startsWith('fa-') ? actividad.icono : `fa-${actividad.icono}`}"></i>
                    <h5>${actividad.nombre}</h5>
                </div>
                <p>Requiere condón</p>
                <div class="actividad-details">
                    <span class="actividad-costo">${actividad.costo} soles</span>
                    <span class="actividad-exp">+${actividad.exp} EXP</span>
                </div>
                <small>Nivel ${actividad.nivelRequerido}+ • ${(actividad.probabilidad * 100).toFixed(1)}% éxito</small>
            </div>
        `).join('');
        
        // Agregar event listeners
        container.querySelectorAll('.actividad-item').forEach(item => {
            item.addEventListener('click', () => {
                const actividadId = parseInt(item.dataset.id);
                this.realizarActividadIntima(novia.id, actividadId);
            });
        });
    }

    actualizarListaNovias() {
        const container = document.getElementById('novias-list');
        if (!container) return;
        
        container.innerHTML = this.novias.map(novia => `
            <div class="novia-card ${novia.seleccionada ? 'active' : ''}" data-id="${novia.id}">
                <div class="novia-avatar" style="background: ${this.obtenerColorNovia(novia.id)}">
                    ${novia.nombre.charAt(0)}
                </div>
                <div class="novia-card-info">
                    <h4>${novia.nombre}</h4>
                    <div class="level">Nivel ${novia.nivel}</div>
                    <div class="exp">${novia.exp} EXP</div>
                </div>
            </div>
        `).join('');
        
        // Agregar event listeners
        container.querySelectorAll('.novia-card').forEach(card => {
            card.addEventListener('click', () => {
                const noviaId = parseInt(card.dataset.id);
                this.seleccionarNovia(noviaId);
                this.actualizarListaNovias(); // Re-render para actualizar clase active
            });
        });
    }

    actualizarUINovia(noviaId) {
        this.mostrarDetallesNovia(noviaId);
        this.actualizarListaNovias();
    }

    obtenerColorNovia(noviaId) {
        const colores = ['#FF4081', '#7C4DFF', '#00BCD4', '#4CAF50', '#FF9800'];
        return colores[noviaId] || colores[0];
    }

    // ========== GUARDADO Y CARGA ==========
    guardarProgresoNovias() {
        const progreso = {
            novias: this.novias,
            noviaActual: this.noviaActual,
            inventario: this.inventario
        };
        
        try {
            localStorage.setItem('japaneseRPG_novias', JSON.stringify(progreso));
        } catch (e) {
            console.error("Error guardando progreso de novias:", e);
        }
    }

    cargarProgresoNovias() {
        try {
            const guardado = localStorage.getItem('japaneseRPG_novias');
            if (guardado) {
                const progreso = JSON.parse(guardado);
                this.novias = progreso.novias || this.novias;
                this.noviaActual = progreso.noviaActual || 0;
                this.inventario = progreso.inventario || this.inventario;
            }
        } catch (e) {
            console.error("Error cargando progreso de novias:", e);
        }
    }

    // ========== NOTIFICACIONES ==========
    mostrarNotificacion(mensaje, tipo = "info") {
        if (window.sistemaJuego && sistemaJuego.mostrarNotificacion) {
            sistemaJuego.mostrarNotificacion(mensaje, tipo);
        } else {
            console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
        }
    }
}

// Crear instancia global del sistema RPG
let sistemaRPG;

// Inicializar sistema cuando se cargue la página
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        sistemaRPG = new SistemaRPGNovias();
        sistemaRPG.actualizarListaNovias();
        sistemaRPG.mostrarDetallesNovia(sistemaRPG.noviaActual);
    });
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SistemaRPGNovias;
}
