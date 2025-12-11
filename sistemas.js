// Sistema central de gestión
class SistemaJuego {
    constructor() {
        this.dinero = 100;
        this.chicaActiva = null;
        this.palabrasDificiles = [];
        this.mazoDificilTemporal = null;
        this.estadoMazos = JSON.parse(localStorage.getItem('estadoMazos')) || {};
        this.estadoChicas = JSON.parse(localStorage.getItem('estadoChicas')) || {};
        this.inventario = JSON.parse(localStorage.getItem('inventario')) || { condones: 0, flores: 0, chocolate: 0 };
    }
    
    // Sistema de dinero
    agregarDinero(cantidad) {
        this.dinero += cantidad;
        this.actualizarDisplayDinero();
        this.guardarEstado();
        this.reproducirSonido('dinero');
        return this.dinero;
    }
    
    gastarDinero(cantidad) {
        if (this.dinero >= cantidad) {
            this.dinero -= cantidad;
            this.actualizarDisplayDinero();
            this.guardarEstado();
            return true;
        }
        return false;
    }
    
    actualizarDisplayDinero() {
        const displays = ['dinero-total', 'dinero-mangas', 'dinero-rpg'];
        displays.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = this.dinero;
            }
        });
    }
    
    // Sistema de mazos
    calcularRecompensaMazo(mazoId, porcentajeCompletado) {
        const base = 2; // 2 soles por mazo al 100%
        let recompensa = (base * porcentajeCompletado) / 100;
        
        // Bonificación por mazo de palabras difíciles
        if (this.mazoDificilTemporal && this.mazoDificilTemporal.id === mazoId) {
            recompensa *= 3;
        }
        
        return Math.round(recompensa * 100) / 100;
    }
    
    marcarPalabraDificil(palabra) {
        palabra.dificil = true;
        if (!this.palabrasDificiles.some(p => p.id === palabra.id)) {
            this.palabrasDificiles.push(palabra);
        }
        this.guardarEstado();
    }
    
    crearMazoDificilTemporal() {
        if (this.palabrasDificiles.length > 0) {
            this.mazoDificilTemporal = {
                id: 'dificil-temporal',
                nombre: 'Palabras Difíciles',
                palabras: [...this.palabrasDificiles],
                temporal: true
            };
            return this.mazoDificilTemporal;
        }
        return null;
    }
    
    limpiarPalabrasDificiles() {
        this.palabrasDificiles = [];
        this.mazoDificilTemporal = null;
        this.guardarEstado();
    }
    
    // Sistema de eventos aleatorios
    generarEventoAleatorio() {
        const eventos = CONTENIDO.eventos;
        let totalProbabilidad = eventos.reduce((sum, e) => sum + e.probabilidad, 0);
        let random = Math.random() * totalProbabilidad;
        
        for (const evento of eventos) {
            if (random < evento.probabilidad) {
                return evento;
            }
            random -= evento.probabilidad;
        }
        
        return eventos[eventos.length - 1];
    }
    
    mostrarEvento(evento) {
        const modal = document.getElementById('modal-evento');
        const videoContainer = document.getElementById('video-evento-container');
        
        videoContainer.innerHTML = `
            <h4>${evento.nombre}</h4>
            <div class="video-placeholder">
                <i class="fas fa-video" style="font-size: 4rem;"></i>
                <p>Video especial desbloqueado</p>
                <p>+${evento.recompensa} Soles</p>
            </div>
        `;
        
        modal.classList.remove('oculto');
        
        // Agregar recompensa
        this.agregarDinero(evento.recompensa);
        
        return new Promise(resolve => {
            document.getElementById('btn-cerrar-evento').onclick = () => {
                modal.classList.add('oculto');
                resolve();
            };
        });
    }
    
    // Sistema de EXP para chicas
    agregarExpChica(chicaId, exp) {
        if (!this.estadoChicas[chicaId]) {
            this.estadoChicas[chicaId] = {
                exp: 0,
                nivel: 1,
                expParaSiguienteNivel: 100
            };
        }
        
        this.estadoChicas[chicaId].exp += exp;
        
        // Subir de nivel
        while (this.estadoChicas[chicaId].exp >= this.estadoChicas[chicaId].expParaSiguienteNivel) {
            this.estadoChicas[chicaId].exp -= this.estadoChicas[chicaId].expParaSiguienteNivel;
            this.estadoChicas[chicaId].nivel++;
            this.estadoChicas[chicaId].expParaSiguienteNivel = 
                Math.floor(this.estadoChicas[chicaId].expParaSiguienteNivel * 1.5);
            
            // Mostrar notificación de nivel
            this.mostrarNotificacion(`${this.obtenerNombreChica(chicaId)} ha subido al nivel ${this.estadoChicas[chicaId].nivel}!`);
        }
        
        this.guardarEstado();
        return this.estadoChicas[chicaId];
    }
    
    calcularExpPorPalabra(chicaId) {
        const nivel = this.estadoChicas[chicaId]?.nivel || 1;
        return 10 + (nivel * 2);
    }
    
    // Sistema de actividades íntimas
    realizarActividadIntima(chicaId, actividad) {
        const chicaEstado = this.estadoChicas[chicaId];
        if (!chicaEstado) return { exito: false, mensaje: 'Chica no encontrada' };
        
        // Verificar requisitos
        if (chicaEstado.nivel < actividad.nivelRequerido) {
            return { exito: false, mensaje: 'Nivel insuficiente' };
        }
        
        if (actividad.requiereCondones && this.inventario.condones <= 0) {
            return { exito: false, mensaje: 'Necesitas condones' };
        }
        
        // Verificar dinero
        if (!this.gastarDinero(actividad.costo)) {
            return { exito: false, mensaje: 'Dinero insuficiente' };
        }
        
        // Usar condones si es necesario
        if (actividad.requiereCondones) {
            this.inventario.condones--;
        }
        
        // Calcular probabilidad de éxito
        let probabilidad = actividad.probabilidadBase;
        probabilidad += (chicaEstado.nivel - actividad.nivelRequerido) * 0.02;
        probabilidad = Math.min(probabilidad, 0.95); // Máximo 95%
        
        const exito = Math.random() < probabilidad;
        
        if (exito) {
            this.agregarExpChica(chicaId, actividad.exp);
            return { 
                exito: true, 
                mensaje: '¡Éxito! La actividad fue especial',
                expGanada: actividad.exp
            };
        } else {
            return { 
                exito: false, 
                mensaje: CONTENIDO.chicas[chicaId].nombre + actividad.mensajeFallo
            };
        }
    }
    
    // Sistema de compras
    comprarItem(itemId, cantidad = 1) {
        const item = CONTENIDO.items[itemId];
        if (!item) return false;
        
        const costoTotal = item.precio * cantidad;
        if (this.gastarDinero(costoTotal)) {
            this.inventario[itemId] = (this.inventario[itemId] || 0) + cantidad;
            this.guardarEstado();
            return true;
        }
        return false;
    }
    
    // Utilidades
    obtenerNombreChica(chicaId) {
        return CONTENIDO.chicas[chicaId]?.nombre || 'Desconocida';
    }
    
    mostrarNotificacion(mensaje, tipo = 'info') {
        // Implementación básica de notificación
        console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
        alert(mensaje);
    }
    
    reproducirSonido(tipo) {
        const audio = document.getElementById(`audio-${tipo}`);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Error reproduciendo sonido:', e));
        }
    }
    
    mostrarResultado(titulo, mensaje, recompensa = null) {
        const modal = document.getElementById('modal-resultado');
        document.getElementById('titulo-resultado').textContent = titulo;
        document.getElementById('mensaje-resultado').textContent = mensaje;
        
        const recompensaContainer = document.getElementById('recompensa-resultado');
        if (recompensa) {
            recompensaContainer.innerHTML = `
                <div class="recompensa-display">
                    <i class="fas fa-coins"></i>
                    <span>+${recompensa} Soles</span>
                </div>
            `;
        } else {
            recompensaContainer.innerHTML = '';
        }
        
        modal.classList.remove('oculto');
        
        return new Promise(resolve => {
            document.getElementById('btn-cerrar-resultado').onclick = () => {
                modal.classList.add('oculto');
                resolve();
            };
        });
    }
    
    // Persistencia
    guardarEstado() {
        localStorage.setItem('estadoMazos', JSON.stringify(this.estadoMazos));
        localStorage.setItem('estadoChicas', JSON.stringify(this.estadoChicas));
        localStorage.setItem('inventario', JSON.stringify(this.inventario));
        localStorage.setItem('dinero', this.dinero.toString());
    }
    
    cargarEstado() {
        const dineroGuardado = localStorage.getItem('dinero');
        if (dineroGuardado) {
            this.dinero = parseInt(dineroGuardado);
        }
        this.actualizarDisplayDinero();
    }
    
    reiniciarJuego() {
        if (confirm('¿Estás seguro de reiniciar todo el progreso?')) {
            localStorage.clear();
            this.dinero = 100;
            this.estadoMazos = {};
            this.estadoChicas = {};
            this.inventario = { condones: 0, flores: 0, chocolate: 0 };
            this.palabrasDificiles = [];
            this.mazoDificilTemporal = null;
            this.guardarEstado();
            this.cargarEstado();
            location.reload();
        }
    }
}

// Instancia global del sistema
const sistemaJuego = new SistemaJuego();
