// ===== SISTEMA DE ESTADO Y GESTIÓN =====
// Maneja el estado de la aplicación y la lógica principal

class SistemaAprendizaje {
    constructor() {
        this.estado = {
            pantallaActual: 'inicio',
            mangaSeleccionado: null,
            mazoSeleccionado: null,
            palabrasDificiles: JSON.parse(localStorage.getItem('palabrasDificiles')) || [],
            progresoMazo: {
                palabrasRespondidas: 0,
                correctas: 0,
                incorrectas: 0,
                palabrasActuales: [],
                palabraIndex: 0,
                opciones: []
            }
        };
        
        this.eventos = {};
    }
    
    // ===== GESTIÓN DE ESTADO =====
    cambiarPantalla(pantalla) {
        this.estado.pantallaActual = pantalla;
        this.dispararEvento('cambioPantalla', pantalla);
    }
    
    seleccionarManga(mangaId) {
        this.estado.mangaSeleccionado = mangaId;
        this.dispararEvento('mangaSeleccionado', mangaId);
    }
    
    seleccionarMazo(mazoId) {
        this.estado.mazoSeleccionado = mazoId;
        this.dispararEvento('mazoSeleccionado', mazoId);
    }
    
    // ===== GESTIÓN DE PALABRAS DIFÍCILES =====
    agregarPalabraDificil(palabraInfo) {
        const palabraId = `${palabraInfo.japones}-${palabraInfo.mangaId}-${palabraInfo.mazoId}`;
        
        if (!this.estado.palabrasDificiles.some(p => p.id === palabraId)) {
            const palabraDificil = {
                id: palabraId,
                japones: palabraInfo.japones,
                romaji: palabraInfo.romaji,
                lectura: palabraInfo.lectura,
                significado: palabraInfo.significado,
                mangaId: palabraInfo.mangaId,
                mangaNombre: palabraInfo.mangaNombre,
                mazoId: palabraInfo.mazoId,
                fecha: new Date().toISOString()
            };
            
            this.estado.palabrasDificiles.push(palabraDificil);
            this.guardarPalabrasDificiles();
            this.dispararEvento('palabraDificilAgregada', palabraDificil);
            
            return true;
        }
        return false;
    }
    
    eliminarPalabraDificil(palabraId) {
        const index = this.estado.palabrasDificiles.findIndex(p => p.id === palabraId);
        if (index !== -1) {
            this.estado.palabrasDificiles.splice(index, 1);
            this.guardarPalabrasDificiles();
            this.dispararEvento('palabraDificilEliminada', palabraId);
            return true;
        }
        return false;
    }
    
    obtenerPalabrasDificiles() {
        return [...this.estado.palabrasDificiles];
    }
    
    obtenerPalabrasDificilesPorManga(mangaId) {
        return this.estado.palabrasDificiles.filter(p => p.mangaId === mangaId);
    }
    
    crearMazoDificil() {
        return this.estado.palabrasDificiles.map(p => ({
            japones: p.japones,
            romaji: p.romaji,
            lectura: p.lectura,
            significado: p.significado,
            esDificil: true,
            origen: `${p.mangaNombre} - ${p.mazoId}`
        }));
    }
    
    guardarPalabrasDificiles() {
        localStorage.setItem('palabrasDificiles', JSON.stringify(this.estado.palabrasDificiles));
    }
    
    // ===== GESTIÓN DEL QUIZ =====
    iniciarQuiz(palabras) {
        this.estado.progresoMazo = {
            palabrasRespondidas: 0,
            correctas: 0,
            incorrectas: 0,
            palabrasActuales: [...palabras],
            palabraIndex: 0,
            opciones: [],
            respuestasUsuario: [],
            quizActivo: true
        };
        
        this.prepararSiguientePregunta();
        this.dispararEvento('quizIniciado', this.estado.progresoMazo);
    }
    
    prepararSiguientePregunta() {
        if (this.estado.progresoMazo.palabraIndex >= this.estado.progresoMazo.palabrasActuales.length) {
            this.finalizarQuiz();
            return null;
        }
        
        const palabraActual = this.estado.progresoMazo.palabrasActuales[this.estado.progresoMazo.palabraIndex];
        const opciones = this.generarOpciones(palabraActual);
        
        this.estado.progresoMazo.opciones = opciones;
        this.dispararEvento('nuevaPregunta', {
            palabra: palabraActual,
            opciones: opciones,
            indice: this.estado.progresoMazo.palabraIndex,
            total: this.estado.progresoMazo.palabrasActuales.length
        });
        
        return { palabra: palabraActual, opciones };
    }
    
    generarOpciones(palabraCorrecta) {
        // Para una implementación real, aquí se mezclarian con palabras de otros mazos
        // Por simplicidad, creamos opciones aleatorias
        const opciones = [
            { significado: palabraCorrecta.significado, esCorrecta: true }
        ];
        
        // Opciones incorrectas (en una implementación real vendrían de una base de datos)
        const opcionesIncorrectas = [
            'personaje',
            'técnica',
            'objeto',
            'lugar',
            'acción',
            'emoción',
            'animal',
            'comida',
            'ropa',
            'color'
        ].filter(sig => sig !== palabraCorrecta.significado);
        
        // Mezclar y seleccionar 3 opciones incorrectas
        const opcionesAleatorias = [...opcionesIncorrectas]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(significado => ({ significado, esCorrecta: false }));
        
        // Combinar y mezclar todas las opciones
        const todasOpciones = [...opciones, ...opcionesAleatorias]
            .sort(() => Math.random() - 0.5)
            .map((opcion, index) => ({
                ...opcion,
                id: index + 1
            }));
        
        return todasOpciones;
    }
    
    verificarRespuesta(opcionId) {
        const opcionSeleccionada = this.estado.progresoMazo.opciones.find(op => op.id === opcionId);
        const esCorrecta = opcionSeleccionada ? opcionSeleccionada.esCorrecta : false;
        
        const respuesta = {
            palabra: this.estado.progresoMazo.palabrasActuales[this.estado.progresoMazo.palabraIndex],
            opcionSeleccionada: opcionSeleccionada ? opcionSeleccionada.significado : null,
            esCorrecta,
            timestamp: new Date().toISOString()
        };
        
        this.estado.progresoMazo.respuestasUsuario.push(respuesta);
        
        if (esCorrecta) {
            this.estado.progresoMazo.correctas++;
        } else {
            this.estado.progresoMazo.incorrectas++;
        }
        
        this.estado.progresoMazo.palabrasRespondidas++;
        
        this.dispararEvento('respuestaVerificada', respuesta);
        
        return respuesta;
    }
    
    avanzarPregunta() {
        this.estado.progresoMazo.palabraIndex++;
        
        if (this.estado.progresoMazo.palabraIndex < this.estado.progresoMazo.palabrasActuales.length) {
            return this.prepararSiguientePregunta();
        } else {
            this.finalizarQuiz();
            return null;
        }
    }
    
    finalizarQuiz() {
        this.estado.progresoMazo.quizActivo = false;
        
        const resultados = {
            correctas: this.estado.progresoMazo.correctas,
            incorrectas: this.estado.progresoMazo.incorrectas,
            total: this.estado.progresoMazo.palabrasActuales.length,
            porcentaje: (this.estado.progresoMazo.correctas / this.estado.progresoMazo.palabrasActuales.length) * 100
        };
        
        this.dispararEvento('quizFinalizado', resultados);
        return resultados;
    }
    
    obtenerProgreso() {
        return { ...this.estado.progresoMazo };
    }
    
    reiniciarMazo() {
        // Mezclar las palabras para un nuevo intento
        const palabrasMezcladas = [...this.estado.progresoMazo.palabrasActuales]
            .sort(() => Math.random() - 0.5);
        
        this.estado.progresoMazo = {
            palabrasRespondidas: 0,
            correctas: 0,
            incorrectas: 0,
            palabrasActuales: palabrasMezcladas,
            palabraIndex: 0,
            opciones: [],
            respuestasUsuario: [],
            quizActivo: true
        };
        
        this.prepararSiguientePregunta();
        this.dispararEvento('mazoReiniciado');
    }
    
    // ===== SISTEMA DE EVENTOS =====
    on(evento, callback) {
        if (!this.eventos[evento]) {
            this.eventos[evento] = [];
        }
        this.eventos[evento].push(callback);
    }
    
    off(evento, callback) {
        if (this.eventos[evento]) {
            this.eventos[evento] = this.eventos[evento].filter(cb => cb !== callback);
        }
    }
    
    dispararEvento(evento, datos) {
        if (this.eventos[evento]) {
            this.eventos[evento].forEach(callback => {
                try {
                    callback(datos);
                } catch (error) {
                    console.error(`Error en evento ${evento}:`, error);
                }
            });
        }
    }
    
    // ===== UTILIDADES =====
    obtenerEstado() {
        return JSON.parse(JSON.stringify(this.estado));
    }
    
    resetearEstado() {
        this.estado = {
            pantallaActual: 'inicio',
            mangaSeleccionado: null,
            mazoSeleccionado: null,
            palabrasDificiles: JSON.parse(localStorage.getItem('palabrasDificiles')) || [],
            progresoMazo: {
                palabrasRespondidas: 0,
                correctas: 0,
                incorrectas: 0,
                palabrasActuales: [],
                palabraIndex: 0,
                opciones: []
            }
        };
    }
}

// Crear instancia global del sistema
const sistema = new SistemaAprendizaje();

export default sistema;
