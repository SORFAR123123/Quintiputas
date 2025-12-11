// ============================================================================
// CONFIGURACIÓN PRINCIPAL
// ============================================================================

// Variables globales
let contenedorActual = '';
let subcontenedorActual = '';
let mazoActual = [];
let preguntaActual = 0;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;
let respuestaSeleccionada = null;

// ============================================================================
// ESTRUCTURA DE CONTENEDORES
// ============================================================================

const estructura = {
    'contenedor1': {
        nombre: 'THE LAST SUMMER 1',
        subcontenedores: {
            'sub1_1': { nombre: 'Sub-Contenedor 1.1', mazos: 5 },
            'sub1_2': { nombre: 'Sub-Contenedor 1.2', mazos: 5 },
            'sub1_3': { nombre: 'Sub-Contenedor 1.3', mazos: 5 }
        }
    },
    'contenedor2': {
        nombre: 'THE LAST SUMMER 2',
        subcontenedores: {
            'sub2_1': { nombre: 'Sub-Contenedor 2.1', mazos: 5 },
            'sub2_2': { nombre: 'Sub-Contenedor 2.2', mazos: 5 },
            'sub2_3': { nombre: 'Sub-Contenedor 2.3', mazos: 5 },
            'sub2_4': { nombre: 'Sub-Contenedor 2.4', mazos: 6 }
        }
    },
    'contenedor3': {
        nombre: 'YAMADA',
        subcontenedores: {
            'sub3_1': { nombre: 'Sub-Contenedor 3.1', mazos: 6 },
            'sub3_2': { nombre: 'Sub-Contenedor 3.2', mazos: 5 },
            'sub3_3': { nombre: 'Sub-Contenedor 3.3', mazos: 5 }
        }
    },
    'contenedor4': {
        nombre: 'CONTENEDOR 4',
        subcontenedores: {
            'sub4_1': { nombre: 'Sub-Contenedor 4.1', mazos: 6 },
            'sub4_2': { nombre: 'Sub-Contenedor 4.2', mazos: 5 },
            'sub4_3': { nombre: 'Sub-Contenedor 4.3', mazos: 5 }
        }
    },
    'contenedor5': {
        nombre: 'CONTENEDOR 5',
        subcontenedores: {
            'sub5_1': { nombre: 'Sub-Contenedor 5.1', mazos: 5 },
            'sub5_2': { nombre: 'Sub-Contenedor 5.2', mazos: 5 },
            'sub5_3': { nombre: 'Sub-Contenedor 5.3', mazos: 5 }
        }
    },
    'contenedor6': {
        nombre: 'CONTENEDOR 6',
        subcontenedores: {
            'sub6_1': { nombre: 'Sub-Contenedor 6.1', mazos: 5 },
            'sub6_2': { nombre: 'Sub-Contenedor 6.2', mazos: 5 },
            'sub6_3': { nombre: 'Sub-Contenedor 6.3', mazos: 5 }
        }
    },
    'contenedor7': {
        nombre: 'CONTENEDOR 7',
        subcontenedores: {
            'sub7_1': { nombre: 'Sub-Contenedor 7.1', mazos: 5 },
            'sub7_2': { nombre: 'Sub-Contenedor 7.2', mazos: 5 },
            'sub7_3': { nombre: 'Sub-Contenedor 7.3', mazos: 5 }
        }
    },
    'contenedor8': {
        nombre: 'CONTENEDOR 8',
        subcontenedores: {
            'sub8_1': { nombre: 'Sub-Contenedor 8.1', mazos: 5 },
            'sub8_2': { nombre: 'Sub-Contenedor 8.2', mazos: 5 },
            'sub8_3': { nombre: 'Sub-Contenedor 8.3', mazos: 5 }
        }
    },
    'contenedor9': {
        nombre: 'CONTENEDOR 9',
        subcontenedores: {
            'sub9_1': { nombre: 'Sub-Contenedor 9.1', mazos: 5 },
            'sub9_2': { nombre: 'Sub-Contenedor 9.2', mazos: 5 },
            'sub9_3': { nombre: 'Sub-Contenedor 9.3', mazos: 5 }
        }
    },
    'contenedor10': {
        nombre: 'CONTENEDOR 10',
        subcontenedores: {
            'sub10_1': { nombre: 'Sub-Contenedor 10.1', mazos: 5 },
            'sub10_2': { nombre: 'Sub-Contenedor 10.2', mazos: 5 },
            'sub10_3': { nombre: 'Sub-Contenedor 10.3', mazos: 5 }
        }
    }
};

// ============================================================================
// FUNCIONES DE NAVEGACIÓN
// ============================================================================

function cambiarPantalla(idPantalla) {
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    document.getElementById(idPantalla).classList.add('activa');
}

function irAlMenu() {
    cambiarPantalla('pantalla-inicio');
}

function cargarContenedor(idContenedor) {
    if (estructura[idContenedor]) {
        contenedorActual = idContenedor;
        const contenedor = estructura[idContenedor];
        
        document.getElementById('titulo-contenedor').textContent = contenedor.nombre;
        
        const contenedorSub = document.getElementById('contenedor-subcontenedores');
        contenedorSub.innerHTML = '';
        
        Object.keys(contenedor.subcontenedores).forEach(key => {
            const sub = contenedor.subcontenedores[key];
            const subDiv = document.createElement('div');
            subDiv.className = 'subcontenedor-card';
            subDiv.onclick = () => cargarSubcontenedor(key);
            
            // Solo el nombre, sin información extra
            subDiv.innerHTML = `<div class="subcontenedor-texto">${sub.nombre}</div>`;
            
            contenedorSub.appendChild(subDiv);
        });
        
        cambiarPantalla('pantalla-subcontenedores');
    }
}

function cargarSubcontenedor(idSubcontenedor) {
    const contenedor = estructura[contenedorActual];
    if (contenedor && contenedor.subcontenedores[idSubcontenedor]) {
        subcontenedorActual = idSubcontenedor;
        const subcontenedor = contenedor.subcontenedores[idSubcontenedor];
        
        document.getElementById('titulo-subcontenedor').textContent = subcontenedor.nombre;
        
        const contenedorMazos = document.getElementById('contenedor-mazos');
        contenedorMazos.innerHTML = '';
        
        // Generar mazos dinámicamente
        for (let i = 1; i <= subcontenedor.mazos; i++) {
            const mazoDiv = document.createElement('div');
            mazoDiv.className = 'mazo-card';
            mazoDiv.onclick = () => cargarMazo(i);
            
            // Solo el número del mazo, sin información extra
            mazoDiv.innerHTML = `<div class="mazo-texto">MAZO ${i}</div>`;
            
            contenedorMazos.appendChild(mazoDiv);
        }
        
        cambiarPantalla('pantalla-mazos');
    }
}

// ============================================================================
// FUNCIONES DEL QUIZ
// ============================================================================

function cargarMazo(numeroMazo) {
    // Obtener palabras del vocabulario específico
    const palabras = obtenerVocabularioEspecifico(subcontenedorActual, numeroMazo);
    
    // REINICIAR EL MAZO: Mezclar y comenzar desde cero
    mazoActual = [...palabras];
    preguntaActual = 0;
    respuestasCorrectas = 0;
    respuestasIncorrectas = 0;
    respuestaSeleccionada = null;
    
    // Mezclar las preguntas
    mezclarPreguntas();
    
    // Cambiar a pantalla de quiz y mostrar primera pregunta
    cambiarPantalla('pantalla-quiz');
    mostrarPregunta();
}

function obtenerVocabularioEspecifico(subcontenedorId, numeroMazo) {
    // Usar la base de datos de vocabulario si está disponible
    if (typeof vocabularioDatabase !== 'undefined' && 
        vocabularioDatabase[subcontenedorId] && 
        vocabularioDatabase[subcontenedorId][numeroMazo]) {
        return vocabularioDatabase[subcontenedorId][numeroMazo];
    }
    
    // Fallback a vocabulario genérico
    return generarPalabras(10);
}

function generarPalabras(cantidad) {
    const palabrasBase = [
        { japones: '言葉', lectura: 'kotoba', opciones: ['Palabra', 'Lenguaje', 'Expresión', 'Término'], respuesta: 0 },
        { japones: '時間', lectura: 'jikan', opciones: ['Tiempo', 'Hora', 'Momento', 'Duración'], respuesta: 0 },
        { japones: '場所', lectura: 'basho', opciones: ['Lugar', 'Espacio', 'Sitio', 'Ubicación'], respuesta: 0 },
        { japones: '人', lectura: 'hito', opciones: ['Persona', 'Gente', 'Humano', 'Individuo'], respuesta: 0 },
        { japones: '物', lectura: 'mono', opciones: ['Cosa', 'Objeto', 'Artículo', 'Elemento'], respuesta: 0 }
    ];
    
    const palabras = [];
    for (let i = 0; i < cantidad; i++) {
        palabras.push({...palabrasBase[i % palabrasBase.length]});
    }
    return palabras;
}

function mezclarPreguntas() {
    for (let i = mazoActual.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazoActual[i], mazoActual[j]] = [mazoActual[j], mazoActual[i]];
    }
}

function mostrarPregunta() {
    if (preguntaActual < mazoActual.length) {
        const pregunta = mazoActual[preguntaActual];
        
        // Actualizar contador
        document.getElementById('numero-pregunta').textContent = preguntaActual + 1;
        document.getElementById('total-preguntas').textContent = mazoActual.length;
        
        // Mostrar palabra japonesa
        document.getElementById('palabra-japones').textContent = pregunta.japones;
        document.getElementById('lectura').textContent = ''; // Se mostrará después
        
        // Limpiar resultado anterior
        document.getElementById('resultado').textContent = '';
        document.getElementById('resultado').className = 'resultado';
        document.getElementById('boton-siguiente').style.display = 'none';
        
        // Generar opciones
        const contenedorOpciones = document.getElementById('contenedor-opciones');
        contenedorOpciones.innerHTML = '';
        
        // Mezclar opciones
        const opcionesMezcladas = [...pregunta.opciones];
        for (let i = opcionesMezcladas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opcionesMezcladas[i], opcionesMezcladas[j]] = [opcionesMezcladas[j], opcionesMezcladas[i]];
        }
        
        // Crear botones de opciones
        opcionesMezcladas.forEach((opcion, index) => {
            const botonOpcion = document.createElement('button');
            botonOpcion.className = 'opcion';
            botonOpcion.textContent = opcion;
            botonOpcion.onclick = () => seleccionarRespuesta(opcion, pregunta);
            contenedorOpciones.appendChild(botonOpcion);
        });
        
        // Resetear respuesta seleccionada
        respuestaSeleccionada = null;
    } else {
        mostrarResultados();
    }
}

function seleccionarRespuesta(opcionSeleccionada, pregunta) {
    // Guardar la respuesta seleccionada
    respuestaSeleccionada = opcionSeleccionada;
    
    // Deshabilitar todos los botones
    const opcionesDOM = document.querySelectorAll('.opcion');
    opcionesDOM.forEach(boton => {
        boton.disabled = true;
        // Marcar como seleccionada solo la que hizo clic
        if (boton.textContent === opcionSeleccionada) {
            boton.classList.add('seleccionada');
        }
    });
    
    // Verificar respuesta
    const esCorrecta = opcionSeleccionada === pregunta.opciones[pregunta.respuesta];
    
    // Mostrar pronunciación
    document.getElementById('lectura').textContent = `(${pregunta.lectura})`;
    
    // Mostrar resultado
    const resultado = document.getElementById('resultado');
    if (esCorrecta) {
        resultado.textContent = '¡Correcto!';
        resultado.className = 'resultado correcto';
        respuestasCorrectas++;
        
        // Marcar visualmente (solo la seleccionada)
        opcionesDOM.forEach(boton => {
            if (boton.textContent === opcionSeleccionada) {
                boton.classList.add('correcta');
            }
        });
        
        // Navegación automática después de 1 segundo
        setTimeout(() => {
            siguientePregunta();
        }, 1000);
    } else {
        resultado.textContent = `Incorrecto. La respuesta correcta es: ${pregunta.opciones[pregunta.respuesta]}`;
        resultado.className = 'resultado incorrecto';
        respuestasIncorrectas++;
        
        // Marcar visualmente (solo la seleccionada como incorrecta)
        opcionesDOM.forEach(boton => {
            if (boton.textContent === opcionSeleccionada) {
                boton.classList.add('incorrecta');
            }
        });
        
        // Mostrar botón "Continuar" para respuestas incorrectas
        document.getElementById('boton-siguiente').style.display = 'block';
        
        // Registrar palabra fallada si el sistema existe
        if (typeof sistemaPalabrasFalladas !== 'undefined') {
            sistemaPalabrasFalladas.registrarPalabraFallada(
                pregunta.japones,
                opcionSeleccionada,
                pregunta.opciones[pregunta.respuesta],
                pregunta.lectura,
                pregunta.opciones
            );
        }
    }
}

function siguientePregunta() {
    preguntaActual++;
    mostrarPregunta();
}

function mostrarResultados() {
    const porcentaje = Math.round((respuestasCorrectas / mazoActual.length) * 100);
    
    // Crear HTML de resultados
    const resultadoHTML = `
        <div class="resultado-detalle">
            <h3>Resumen del Quiz</h3>
            <div class="resultado-item">
                <span class="resultado-label">Preguntas totales:</span>
                <span class="resultado-valor">${mazoActual.length}</span>
            </div>
            <div class="resultado-item">
                <span class="resultado-label">Respuestas correctas:</span>
                <span class="resultado-valor">${respuestasCorrectas}</span>
            </div>
            <div class="resultado-item">
                <span class="resultado-label">Respuestas incorrectas:</span>
                <span class="resultado-valor">${respuestasIncorrectas}</span>
            </div>
            <div class="resultado-item">
                <span class="resultado-label">Porcentaje de aciertos:</span>
                <span class="resultado-valor resultado-porcentaje">${porcentaje}%</span>
            </div>
            <div class="resultado-mensaje">
                ${porcentaje === 100 ? '¡Perfecto! 🎉' : 
                  porcentaje >= 80 ? '¡Muy bien! 👍' : 
                  porcentaje >= 60 ? 'Buen trabajo 💪' : 
                  'Sigue practicando 💫'}
            </div>
        </div>
    `;
    
    document.getElementById('resultado-final').innerHTML = resultadoHTML;
    cambiarPantalla('pantalla-resultados');
    
    // Agregar dinero si hay sistema de economía
    if (typeof sistemaEconomia !== 'undefined') {
        if (porcentaje === 100) {
            sistemaEconomia.agregarDinero(1, "Mazo completado al 100%");
        } else if (porcentaje >= 80) {
            sistemaEconomia.agregarDinero(0.5, "Mazo completado al 80%+");
        }
    }
}

// ============================================================================
// FUNCIONES DE NAVEGACIÓN SECUNDARIA
// ============================================================================

function volverASubcontenedores() {
    cambiarPantalla('pantalla-subcontenedores');
}

function volverAMazos() {
    cambiarPantalla('pantalla-mazos');
}

function repetirQuiz() {
    // Reiniciar completamente el mazo
    preguntaActual = 0;
    respuestasCorrectas = 0;
    respuestasIncorrectas = 0;
    respuestaSeleccionada = null;
    
    // Mezclar nuevamente las preguntas
    mezclarPreguntas();
    
    // Volver al quiz
    cambiarPantalla('pantalla-quiz');
    mostrarPregunta();
}

function cerrarVideoRecompensaMazo() {
    const videoElement = document.getElementById('video-recompensa');
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
    
    // Mostrar resultados después del video
    mostrarResultados();
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Aplicación cargada correctamente");
    
    // Inicializar sistemas si existen
    if (typeof sistemaEconomia !== 'undefined' && sistemaEconomia.inicializar) {
        sistemaEconomia.inicializar();
    }
    
    if (typeof sistemaPalabrasFalladas !== 'undefined' && sistemaPalabrasFalladas.inicializar) {
        sistemaPalabrasFalladas.inicializar();
    }
});
