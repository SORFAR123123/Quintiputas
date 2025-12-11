// Sistema RPG de las quintillizas
class SistemaRPG {
    constructor() {
        this.chicaSeleccionada = null;
        this.sistema = sistemaJuego;
        this.estadoChicas = this.sistema.estadoChicas;
    }
    
    inicializar() {
        this.cargarSeleccionChicas();
        this.cargarChicaActiva();
        this.actualizarDisplayChicaActiva();
    }
    
    cargarSeleccionChicas() {
        const contenedor = document.querySelector('.seleccion-chicas');
        if (!contenedor) return;
        
        contenedor.innerHTML = '';
        
        Object.values(CONTENIDO.chicas).forEach(chica => {
            const estado = this.estadoChicas[chica.id] || { nivel: 1, exp: 0, expParaSiguienteNivel: 100 };
            const porcentajeExp = (estado.exp / estado.expParaSiguienteNivel) * 100;
            
            const elemento = document.createElement('div');
            elemento.className = 'chica-selector';
            elemento.dataset.chicaId = chica.id;
            elemento.innerHTML = `
                <img src="${chica.imagenes.perfil}" alt="${chica.nombre}">
                <div>
                    <h4>${chica.nombre}</h4>
                    <div class="nivel-chica">Nivel ${estado.nivel}</div>
                    <div class="barra-exp pequena">
                        <div class="exp-progreso" style="width: ${porcentajeExp}%"></div>
                    </div>
                </div>
            `;
            
            elemento.addEventListener('click', () => this.seleccionarChica(chica.id));
            contenedor.appendChild(elemento);
        });
    }
    
    seleccionarChica(chicaId) {
        this.chicaSeleccionada = chicaId;
        this.sistema.chicaActiva = chicaId;
        this.actualizarDisplayChicaActiva();
        this.cargarPerfilChica();
        this.cargarContenidoChica();
        this.cargarActividadesChica();
        
        // Actualizar selección visual
        document.querySelectorAll('.chica-selector').forEach(sel => {
            sel.classList.toggle('activa', sel.dataset.chicaId === chicaId);
        });
    }
    
    cargarPerfilChica() {
        const contenedor = document.querySelector('.perfil-chica');
        if (!contenedor || !this.chicaSeleccionada) return;
        
        const chica = CONTENIDO.chicas[this.chicaSeleccionada];
        const estado = this.estadoChicas[this.chicaSeleccionada] || { nivel: 1, exp: 0, expParaSiguienteNivel: 100 };
        const porcentajeExp = (estado.exp / estado.expParaSiguienteNivel) * 100;
        
        // Determinar imagen según nivel
        let imagenPerfil = chica.imagenes.perfil;
        if (estado.nivel >= 10) {
            imagenPerfil = chica.imagenes.nivel10;
        } else if (estado.nivel >= 5) {
            imagenPerfil = chica.imagenes.nivel5;
        }
        
        contenedor.innerHTML = `
            <div class="perfil-header">
                <img src="${imagenPerfil}" alt="${chica.nombre}" class="imagen-perfil-grande">
                <div class="perfil-info">
                    <h2>${chica.nombre}</h2>
                    <div class="nivel-display">Nivel ${estado.nivel}</div>
                    <div class="exp-display">
                        <span>EXP: ${estado.exp}/${estado.expParaSiguienteNivel}</span>
                        <div class="barra-exp">
                            <div class="exp-progreso" style="width: ${porcentajeExp}%"></div>
                        </div>
                    </div>
                    <div class="estado-relacion">
                        <i class="fas fa-heart" style="color: ${chica.color}"></i>
                        <span>Relación: ${this.obtenerEstadoRelacion(estado.nivel)}</span>
                    </div>
                </div>
            </div>
            <div class="inventario-chica">
                <h4>Tu Inventario</h4>
                <div class="items-inventario">
                    <div class="item-inventario">
                        <i class="fas fa-condom"></i>
                        <span>${this.sistema.inventario.condones || 0}</span>
                    </div>
                    <div class="item-inventario">
                        <i class="fas fa-flower"></i>
                        <span>${this.sistema.inventario.flores || 0}</span>
                    </div>
                    <div class="item-inventario">
                        <i class="fas fa-candy-cane"></i>
                        <span>${this.sistema.inventario.chocolate || 0}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    cargarContenidoChica() {
        const contenedor = document.querySelector('.contenido-chica');
        if (!contenedor || !this.chicaSeleccionada) return;
        
        const chica = CONTENIDO.chicas[this.chicaSeleccionada];
        const estado = this.estadoChicas[this.chicaSeleccionada] || { nivel: 1 };
        
        // Videos disponibles
        const videosDisponibles = chica.videos.filter(v => estado.nivel >= v.nivelRequerido);
        const videosIntimosDisponibles = chica.videosIntimos.filter(v => estado.nivel >= v.nivelRequerido);
        
        let contenidoHTML = `
            <h3><i class="fas fa-video"></i> Contenido Disponible</h3>
            <div class="videos-container">
                <h4>Videos Normales</h4>
                <div class="videos-grid">
        `;
        
        videosDisponibles.forEach(video => {
            contenidoHTML += `
                <div class="video-item">
                    <div class="video-icon">
                        <i class="fas fa-play-circle"></i>
                    </div>
                    <div class="video-info">
                        <h5>${video.nombre}</h5>
                        <p>Nivel requerido: ${video.nivelRequerido}</p>
                    </div>
                </div>
            `;
        });
        
        contenidoHTML += `
                </div>
                <h4>Videos Especiales</h4>
                <div class="videos-grid">
        `;
        
        videosIntimosDisponibles.forEach(video => {
            const probabilidadPorcentaje = (video.probabilidad * 100).toFixed(1);
            contenidoHTML += `
                <div class="video-item especial">
                    <div class="video-icon">
                        <i class="fas fa-lock-open"></i>
                    </div>
                    <div class="video-info">
                        <h5>${video.nombre}</h5>
                        <p>Nivel: ${video.nivelRequerido}</p>
                        <p>Probabilidad: ${probabilidadPorcentaje}%</p>
                    </div>
                </div>
            `;
        });
        
        contenidoHTML += `
                </div>
            </div>
        `;
        
        contenedor.innerHTML = contenidoHTML;
    }
    
    cargarActividadesChica() {
        const contenedor = document.querySelector('.actividades-chica');
        if (!contenedor || !this.chicaSeleccionada) return;
        
        const estado = this.estadoChicas[this.chicaSeleccionada] || { nivel: 1 };
        
        let actividadesHTML = `
            <h3><i class="fas fa-gamepad"></i> Actividades con ${CONTENIDO.chicas[this.chicaSeleccionada].nombre}</h3>
            <div class="actividades-grid">
        `;
        
        // Actividades normales
        CONTENIDO.actividades.forEach(actividad => {
            const desbloqueada = estado.nivel >= actividad.nivelRequerido;
            actividadesHTML += `
                <div class="actividad-card ${desbloqueada ? 'desbloqueado' : 'bloqueado'}" 
                     data-actividad-id="${actividad.id}">
                    <h4>${actividad.nombre}</h4>
                    <p>${actividad.descripcion}</p>
                    <div class="actividad-costo">
                        <i class="fas fa-coins"></i> ${actividad.costo} Soles
                    </div>
                    <div class="actividad-exp">
                        <i class="fas fa-star"></i> +${actividad.exp} EXP
                    </div>
                    ${!desbloqueada ? `<div class="nivel-requerido">Nivel ${actividad.nivelRequerido}+</div>` : ''}
                </div>
            `;
        });
        
        // Actividades íntimas
        CONTENIDO.actividadesIntimas.forEach(actividad => {
            const desbloqueada = estado.nivel >= actividad.nivelRequerido;
            const tieneCondones = this.sistema.inventario.condones > 0;
            const puedeRealizar = desbloqueada && (actividad.requiereCondones ? tieneCondones : true);
            
            actividadesHTML += `
                <div class="actividad-card ${puedeRealizar ? 'desbloqueado' : 'bloqueado'} intimo" 
                     data-actividad-intima-id="${actividad.id}">
                    <h4><i class="fas fa-heart"></i> ${actividad.nombre}</h4>
                    <p>${actividad.descripcion}</p>
                    <div class="actividad-costo">
                        <i class="fas fa-coins"></i> ${actividad.costo} Soles
                        ${actividad.requiereCondones ? '<i class="fas fa-condom"></i>' : ''}
                    </div>
                    <div class="actividad-exp">
                        <i class="fas fa-star"></i> +${actividad.exp} EXP
                    </div>
                    <div class="probabilidad-exito">
                        Éxito: ${(actividad.probabilidadBase * 100).toFixed(1)}%
                    </div>
                    ${!desbloqueada ? `<div class="nivel-requerido">Nivel ${actividad.nivelRequerido}+</div>` : ''}
                    ${desbloqueada && actividad.requiereCondones && !tieneCondones ? 
                      '<div class="requiere-item">Necesitas condones</div>' : ''}
                </div>
            `;
        });
        
        actividadesHTML += `
            </div>
            <div class="tienda-actividades">
                <h4><i class="fas fa-shopping-cart"></i> Tienda</h4>
                <div class="items-tienda">
        `;
        
        // Items de tienda
        Object.entries(CONTENIDO.items).forEach(([id, item]) => {
            actividadesHTML += `
                <div class="item-tienda" data-item-id="${id}">
                    <h5>${item.nombre}</h5>
                    <p>${item.descripcion}</p>
                    <div class="item-precio">
                        <i class="fas fa-coins"></i> ${item.precio} Soles
                    </div>
                    <button class="btn-comprar" data-item-id="${id}">Comprar</button>
                </div>
            `;
        });
        
        actividadesHTML += `
                </div>
            </div>
        `;
        
        contenedor.innerHTML = actividadesHTML;
        
        // Agregar event listeners a las actividades
        this.agregarEventListenersActividades();
    }
    
    agregarEventListenersActividades() {
        // Actividades normales
        document.querySelectorAll('.actividad-card[data-actividad-id]').forEach(card => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('bloqueado')) {
                    const actividadId = parseInt(card.dataset.actividadId);
                    const actividad = CONTENIDO.actividades.find(a => a.id === actividadId);
                    this.realizarActividadNormal(actividad);
                }
            });
        });
        
        // Actividades íntimas
        document.querySelectorAll('.actividad-card[data-actividad-intima-id]').forEach(card => {
            card.addEventListener('click', () => {
                if (!card.classList.contains('bloqueado')) {
                    const actividadId = parseInt(card.dataset.actividadIntimaId);
                    const actividad = CONTENIDO.actividadesIntimas.find(a => a.id === actividadId);
                    this.realizarActividadIntima(actividad);
                }
            });
        });
        
        // Items de tienda
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.dataset.itemId;
                this.comprarItem(itemId);
            });
        });
    }
    
    realizarActividadNormal(actividad) {
        if (this.sistema.gastarDinero(actividad.costo)) {
            const resultado = this.sistema.agregarExpChica(this.chicaSeleccionada, actividad.exp);
            this.sistema.mostrarResultado(
                '¡Actividad Completada!',
                `Has realizado "${actividad.nombre}" con ${CONTENIDO.chicas[this.chicaSeleccionada].nombre}.`,
                null
            );
            this.cargarPerfilChica();
            this.cargarActividadesChica();
        } else {
            this.sistema.mostrarResultado(
                'Error',
                'No tienes suficiente dinero para esta actividad.'
            );
        }
    }
    
    realizarActividadIntima(actividad) {
        const resultado = this.sistema.realizarActividadIntima(this.chicaSeleccionada, actividad);
        
        if (resultado.exito) {
            this.sistema.mostrarResultado(
                '¡Éxito!',
                `${resultado.mensaje}\nGanaste ${resultado.expGanada} EXP.`
            );
        } else {
            this.sistema.mostrarResultado(
                'No esta vez...',
                resultado.mensaje
            );
        }
        
        this.cargarPerfilChica();
        this.cargarActividadesChica();
    }
    
    comprarItem(itemId) {
        if (this.sistema.comprarItem(itemId)) {
            this.sistema.mostrarResultado(
                'Compra Exitosa',
                `Has comprado ${CONTENIDO.items[itemId].nombre}.`
            );
            this.cargarPerfilChica();
            this.cargarActividadesChica();
        } else {
            this.sistema.mostrarResultado(
                'Error en la compra',
                'No tienes suficiente dinero.'
            );
        }
    }
    
    // Utilidades
    obtenerEstadoRelacion(nivel) {
        if (nivel >= 20) return 'Noviazgo Avanzado';
        if (nivel >= 15) return 'Noviazgo';
        if (nivel >= 10) return 'Muy Cercanos';
        if (nivel >= 5) return 'Amigos Cercanos';
        if (nivel >= 3) return 'Conociéndose';
        return 'Conocidos';
    }
    
    cargarChicaActiva() {
        const chicaGuardada = localStorage.getItem('chicaActiva');
        if (chicaGuardada && CONTENIDO.chicas[chicaGuardada]) {
            this.seleccionarChica(chicaGuardada);
        } else {
            // Seleccionar primera chica por defecto
            const primeraChica = Object.keys(CONTENIDO.chicas)[0];
            if (primeraChica) {
                this.seleccionarChica(primeraChica);
            }
        }
    }
    
    actualizarDisplayChicaActiva() {
        const imgElement = document.getElementById('chica-activa-img');
        const nombreElement = document.getElementById('chica-activa-nombre');
        
        if (this.chicaSeleccionada && imgElement && nombreElement) {
            const chica = CONTENIDO.chicas[this.chicaSeleccionada];
            imgElement.src = chica.imagenes.perfil;
            imgElement.alt = chica.nombre;
            nombreElement.textContent = chica.nombre;
            
            // Guardar en localStorage
            localStorage.setItem('chicaActiva', this.chicaSeleccionada);
        }
    }
}

// Instancia global del sistema RPG
const sistemaRPG = new SistemaRPG();
