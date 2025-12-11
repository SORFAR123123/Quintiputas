// ============================================================================
// SISTEMA DE ECONOMÍA
// ============================================================================

const sistemaEconomia = {
    saldoTotal: 0,
    transacciones: [],
    
    inicializar: function() {
        const guardado = localStorage.getItem('sistemaEconomia');
        if (guardado) {
            const datos = JSON.parse(guardado);
            this.saldoTotal = datos.saldoTotal || 0;
            this.transacciones = datos.transacciones || [];
        }
        this.actualizarInterfaz();
    },
    
    guardar: function() {
        const datos = {
            saldoTotal: this.saldoTotal,
            transacciones: this.transacciones
        };
        localStorage.setItem('sistemaEconomia', JSON.stringify(datos));
    },
    
    agregarDinero: function(cantidad, motivo) {
        this.saldoTotal += cantidad;
        
        // Registrar transacción
        const transaccion = {
            fecha: new Date().toLocaleString(),
            cantidad: cantidad,
            motivo: motivo,
            tipo: 'ingreso'
        };
        
        this.transacciones.unshift(transaccion);
        
        // Limitar historial a 50 transacciones
        if (this.transacciones.length > 50) {
            this.transacciones = this.transacciones.slice(0, 50);
        }
        
        this.guardar();
        this.actualizarInterfaz();
        
        // Mostrar notificación
        this.mostrarNotificacion(`+${cantidad} S/.`, motivo);
    },
    
    actualizarInterfaz: function() {
        const saldoElement = document.getElementById('saldo-total');
        if (saldoElement) {
            saldoElement.textContent = `${this.saldoTotal.toFixed(2)} S/.`;
        }
        
        const historialElement = document.getElementById('lista-transacciones');
        if (historialElement) {
            historialElement.innerHTML = '';
            
            this.transacciones.forEach(trans => {
                const item = document.createElement('div');
                item.className = 'item-transaccion';
                item.innerHTML = `
                    <div class="transaccion-info">
                        <div class="transaccion-motivo">${trans.motivo}</div>
                        <div class="transaccion-fecha">${trans.fecha}</div>
                    </div>
                    <div class="transaccion-cantidad ${trans.tipo}">+${trans.cantidad} S/.</div>
                `;
                historialElement.appendChild(item);
            });
        }
    },
    
    mostrarNotificacion: function(mensaje, detalle) {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #1a3a1a;
            color: #a0e0a0;
            padding: 15px 20px;
            border-radius: 8px;
            border: 1px solid #2a5a2a;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
        `;
        
        notificacion.innerHTML = `
            <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 5px;">${mensaje}</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">${detalle}</div>
        `;
        
        document.body.appendChild(notificacion);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    }
};

// ============================================================================
// SISTEMA DE PALABRAS FALLADAS
// ============================================================================

const sistemaPalabrasFalladas = {
    palabrasFalladasHoy: [],
    historialFalladas: [],
    
    inicializar: function() {
        const hoy = new Date().toDateString();
        const guardado = localStorage.getItem('sistemaPalabrasFalladas');
        
        if (guardado) {
            const datos = JSON.parse(guardado);
            this.historialFalladas = datos.historialFalladas || [];
            
            // Filtrar palabras falladas de hoy
            this.palabrasFalladasHoy = this.historialFalladas.filter(item => 
                new Date(item.fecha).toDateString() === hoy
            );
        }
        
        this.actualizarInterfaz();
    },
    
    guardar: function() {
        const datos = {
            historialFalladas: this.historialFalladas
        };
        localStorage.setItem('sistemaPalabrasFalladas', JSON.stringify(datos));
    },
    
    registrarPalabraFallada: function(palabra, respuestaDada, respuestaCorrecta, lectura, opciones) {
        const registro = {
            fecha: new Date().toISOString(),
            palabra: palabra,
            respuestaDada: respuestaDada,
            respuestaCorrecta: respuestaCorrecta,
            lectura: lectura,
            opciones: opciones
        };
        
        this.palabrasFalladasHoy.push(registro);
        this.historialFalladas.push(registro);
        
        // Limitar historial a 500 registros
        if (this.historialFalladas.length > 500) {
            this.historialFalladas = this.historialFalladas.slice(-500);
        }
        
        this.guardar();
        this.actualizarInterfaz();
    },
    
    obtenerEstadisticas: function() {
        const hoy = new Date().toDateString();
        const falladasHoy = this.historialFalladas.filter(item => 
            new Date(item.fecha).toDateString() === hoy
        ).length;
        
        return {
            hoy: falladasHoy,
            total: this.historialFalladas.length,
            ultimas24h: this.palabrasFalladasHoy.length
        };
    },
    
    actualizarInterfaz: function() {
        const hoyElement = document.getElementById('falladas-hoy');
        const totalElement = document.getElementById('falladas-total');
        
        if (hoyElement && totalElement) {
            const stats = this.obtenerEstadisticas();
            hoyElement.textContent = stats.hoy;
            totalElement.textContent = stats.total;
        }
        
        const listaElement = document.getElementById('lista-palabras-falladas');
        if (listaElement) {
            listaElement.innerHTML = '';
            
            // Mostrar solo las de hoy
            const palabrasHoy = this.palabrasFalladasHoy.slice().reverse(); // Más recientes primero
            
            if (palabrasHoy.length === 0) {
                listaElement.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px; color: #888;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                        <p>¡No has fallado ninguna palabra hoy!</p>
                    </div>
                `;
                return;
            }
            
            palabrasHoy.forEach((item, index) => {
                const palabraDiv = document.createElement('div');
                palabraDiv.className = 'palabra-fallada-item';
                palabraDiv.innerHTML = `
                    <div class="palabra-header">
                        <span class="palabra-japones">${item.palabra}</span>
                        <span class="palabra-lectura">(${item.lectura})</span>
                    </div>
                    <div class="palabra-datos">
                        <div class="respuesta-incorrecta">
                            <span class="label">Tu respuesta:</span>
                            <span class="valor incorrecto">${item.respuestaDada}</span>
                        </div>
                        <div class="respuesta-correcta">
                            <span class="label">Correcto:</span>
                            <span class="valor correcto">${item.respuestaCorrecta}</span>
                        </div>
                    </div>
                    <div class="palabra-fecha">
                        ${new Date(item.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                `;
                listaElement.appendChild(palabraDiv);
            });
        }
    },
    
    practicarPalabrasFalladas: function() {
        const palabras = this.palabrasFalladasHoy;
        
        if (palabras.length === 0) {
            alert("No hay palabras falladas para practicar hoy.");
            return;
        }
        
        // Convertir palabras falladas al formato del quiz
        mazoActual = palabras.map(item => ({
            japones: item.palabra,
            lectura: item.lectura,
            opciones: item.opciones,
            respuesta: item.opciones.indexOf(item.respuestaCorrecta)
        }));
        
        // Reiniciar quiz
        preguntaActual = 0;
        respuestasCorrectas = 0;
        respuestasIncorrectas = 0;
        respuestaSeleccionada = null;
        
        // Mezclar preguntas
        mezclarPreguntas();
        
        // Cambiar título del quiz
        document.getElementById('contador-preguntas').innerHTML = 
            `<span>PRÁCTICA ESPECIAL</span>`;
        
        // Ir al quiz
        cambiarPantalla('pantalla-quiz');
        mostrarPregunta();
    },
    
    limpiarPalabrasFalladas: function() {
        if (confirm("¿Estás seguro de limpiar todo el historial de palabras falladas?")) {
            this.palabrasFalladasHoy = [];
            this.historialFalladas = [];
            this.guardar();
            this.actualizarInterfaz();
        }
    }
};

// ============================================================================
// FUNCIONES GLOBALES
// ============================================================================

function practicarPalabrasFalladas() {
    if (typeof sistemaPalabrasFalladas !== 'undefined') {
        sistemaPalabrasFalladas.practicarPalabrasFalladas();
    }
}

function limpiarPalabrasFalladas() {
    if (typeof sistemaPalabrasFalladas !== 'undefined') {
        sistemaPalabrasFalladas.limpiarPalabrasFalladas();
    }
}

// ============================================================================
// INICIALIZAR SISTEMAS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    if (typeof sistemaEconomia !== 'undefined') {
        sistemaEconomia.inicializar();
    }
    
    if (typeof sistemaPalabrasFalladas !== 'undefined') {
        sistemaPalabrasFalladas.inicializar();
    }
});

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.sistemaEconomia = sistemaEconomia;
    window.sistemaPalabrasFalladas = sistemaPalabrasFalladas;
}
