// Contenido multimedia para las quintillizas
// Fotos, videos, actividades, etc.

const CONTENIDO = {
    // Nombres de las quintillizas
    quintillizas: [
        { id: 0, nombre: "Ichika", color: "#FF4081", icono: "🌸" },
        { id: 1, nombre: "Nino", color: "#7C4DFF", icono: "💫" },
        { id: 2, nombre: "Miku", color: "#00BCD4", icono: "🎧" },
        { id: 3, nombre: "Yotsuba", color: "#4CAF50", icono: "🎀" },
        { id: 4, nombre: "Itsuki", color: "#FF9800", icono: "📚" }
    ],

    // Fotos por nivel para cada chica
    fotos: {
        ichika: [
            { nivel: 1, url: "https://i.pravatar.cc/300?img=1", descripcion: "Ichika - Nivel 1" },
            { nivel: 3, url: "https://i.pravatar.cc/300?img=11", descripcion: "Ichika - Nivel 3" },
            { nivel: 5, url: "https://i.pravatar.cc/300?img=21", descripcion: "Ichika - Nivel 5" },
            { nivel: 10, url: "https://i.pravatar.cc/300?img=31", descripcion: "Ichika - Nivel 10" }
        ],
        nino: [
            { nivel: 1, url: "https://i.pravatar.cc/300?img=2", descripcion: "Nino - Nivel 1" },
            { nivel: 3, url: "https://i.pravatar.cc/300?img=12", descripcion: "Nino - Nivel 3" },
            { nivel: 5, url: "https://i.pravatar.cc/300?img=22", descripcion: "Nino - Nivel 5" },
            { nivel: 10, url: "https://i.pravatar.cc/300?img=32", descripcion: "Nino - Nivel 10" }
        ],
        miku: [
            { nivel: 1, url: "https://i.pravatar.cc/300?img=3", descripcion: "Miku - Nivel 1" },
            { nivel: 3, url: "https://i.pravatar.cc/300?img=13", descripcion: "Miku - Nivel 3" },
            { nivel: 5, url: "https://i.pravatar.cc/300?img=23", descripcion: "Miku - Nivel 5" },
            { nivel: 10, url: "https://i.pravatar.cc/300?img=33", descripcion: "Miku - Nivel 10" }
        ],
        yotsuba: [
            { nivel: 1, url: "https://i.pravatar.cc/300?img=4", descripcion: "Yotsuba - Nivel 1" },
            { nivel: 3, url: "https://i.pravatar.cc/300?img=14", descripcion: "Yotsuba - Nivel 3" },
            { nivel: 5, url: "https://i.pravatar.cc/300?img=24", descripcion: "Yotsuba - Nivel 5" },
            { nivel: 10, url: "https://i.pravatar.cc/300?img=34", descripcion: "Yotsuba - Nivel 10" }
        ],
        itsuki: [
            { nivel: 1, url: "https://i.pravatar.cc/300?img=5", descripcion: "Itsuki - Nivel 1" },
            { nivel: 3, url: "https://i.pravatar.cc/300?img=15", descripcion: "Itsuki - Nivel 3" },
            { nivel: 5, url: "https://i.pravatar.cc/300?img=25", descripcion: "Itsuki - Nivel 5" },
            { nivel: 10, url: "https://i.pravatar.cc/300?img=35", descripcion: "Itsuki - Nivel 10" }
        ]
    },

    // Videos normales por chica
    videos: {
        ichika: [
            { id: 0, nombre: "Canto en el Karaoke", duracion: "2:30", icono: "🎤" },
            { id: 1, nombre: "Preparando Comida", duracion: "3:15", icono: "🍳" },
            { id: 2, nombre: "Estudiando Juntos", duracion: "4:20", icono: "📖" },
            { id: 3, nombre: "Paseo en el Parque", duracion: "2:45", icono: "🌳" }
        ],
        nino: [
            { id: 0, nombre: "Cocinando Postres", duracion: "3:30", icono: "🍰" },
            { id: 1, nombre: "Arreglo Personal", duracion: "2:15", icono: "💄" },
            { id: 2, nombre: "Compras en Tienda", duracion: "4:10", icono: "🛍️" },
            { id: 3, nombre: "Clase de Baile", duracion: "3:45", icono: "💃" }
        ],
        miku: [
            { id: 0, nombre: "Escuchando Música", duracion: "3:20", icono: "🎵" },
            { id: 1, nombre: "Jugando Videojuegos", duracion: "4:30", icono: "🎮" },
            { id: 2, nombre: "Coleccionando Figuras", duracion: "2:55", icono: "🏆" },
            { id: 3, nombre: "Noche de Películas", duracion: "3:40", icono: "🎬" }
        ],
        yotsuba: [
            { id: 0, nombre: "Corriendo en el Parque", duracion: "2:20", icono: "🏃" },
            { id: 1, nombre: "Ayudando a Otros", duracion: "3:10", icono: "🤝" },
            { id: 2, nombre: "Deportes al Aire Libre", duracion: "3:50", icono: "⚽" },
            { id: 3, nombre: "Risa Contagiosa", duracion: "2:45", icono: "😄" }
        ],
        itsuki: [
            { id: 0, nombre: "Leyendo un Libro", duracion: "3:15", icono: "📚" },
            { id: 1, nombre: "Probando Comida", duracion: "4:05", icono: "🍜" },
            { id: 2, nombre: "Estudiando Historia", duracion: "3:30", icono: "🏛️" },
            { id: 3, nombre: "Tarde de Estudio", duracion: "4:20", icono: "✏️" }
        ]
    },

    // Videos íntimos por chica (desbloqueables)
    videosIntimos: {
        ichika: [
            { id: 0, nombre: "Momentos Especiales", nivelRequerido: 5, costo: 50, exp: 100, probabilidad: 0.05, icono: "💋" },
            { id: 1, nombre: "Noche Romántica", nivelRequerido: 10, costo: 100, exp: 200, probabilidad: 0.10, icono: "🌙" },
            { id: 2, nombre: "Confesión Sincera", nivelRequerido: 15, costo: 200, exp: 400, probabilidad: 0.20, icono: "💌" },
            { id: 3, nombre: "Vínculo Eterno", nivelRequerido: 20, costo: 500, exp: 1000, probabilidad: 0.50, icono: "💍" }
        ],
        nino: [
            { id: 0, nombre: "Cena Íntima", nivelRequerido: 5, costo: 50, exp: 100, probabilidad: 0.05, icono: "🍷" },
            { id: 1, nombre: "Baño Relajante", nivelRequerido: 10, costo: 100, exp: 200, probabilidad: 0.10, icono: "🛁" },
            { id: 2, nombre: "Masaje Especial", nivelRequerido: 15, costo: 200, exp: 400, probabilidad: 0.20, icono: "💆" },
            { id: 3, nombre: "Compromiso Secreto", nivelRequerido: 20, costo: 500, exp: 1000, probabilidad: 0.50, icono: "💎" }
        ],
        miku: [
            { id: 0, nombre: "Música y Privacidad", nivelRequerido: 5, costo: 50, exp: 100, probabilidad: 0.05, icono: "🎶" },
            { id: 1, nombre: "Juego de Susurros", nivelRequerido: 10, costo: 100, exp: 200, probabilidad: 0.10, icono: "👂" },
            { id: 2, nombre: "Colección Privada", nivelRequerido: 15, costo: 200, exp: 400, probabilidad: 0.20, icono: "🔐" },
            { id: 3, nombre: "Melodía del Corazón", nivelRequerido: 20, costo: 500, exp: 1000, probabilidad: 0.50, icono: "🎹" }
        ],
        yotsuba: [
            { id: 0, nombre: "Correr Juntos", nivelRequerido: 5, costo: 50, exp: 100, probabilidad: 0.05, icono: "👫" },
            { id: 1, nombre: "Atardecer Compartido", nivelRequerido: 10, costo: 100, exp: 200, probabilidad: 0.10, icono: "🌅" },
            { id: 2, nombre: "Abrazo Caluroso", nivelRequerido: 15, costo: 200, exp: 400, probabilidad: 0.20, icono: "🤗" },
            { id: 3, nombre: "Promesa Deportiva", nivelRequerido: 20, costo: 500, exp: 1000, probabilidad: 0.50, icono: "🏅" }
        ],
        itsuki: [
            { id: 0, nombre: "Lectura Privada", nivelRequerido: 5, costo: 50, exp: 100, probabilidad: 0.05, icono: "📖" },
            { id: 1, nombre: "Degustación Especial", nivelRequerido: 10, costo: 100, exp: 200, probabilidad: 0.10, icono: "🍓" },
            { id: 2, nombre: "Estudio Nocturno", nivelRequerido: 15, costo: 200, exp: 400, probabilidad: 0.20, icono: "🌌" },
            { id: 3, nombre: "Sabiduría Compartida", nivelRequerido: 20, costo: 500, exp: 1000, probabilidad: 0.50, icono: "🎓" }
        ]
    },

    // Actividades normales por chica
    actividades: {
        ichika: [
            { id: 0, nombre: "Ir al Karaoke", costo: 10, exp: 20, nivelRequerido: 1, icono: "🎤", descripcion: "Cantar canciones juntos" },
            { id: 1, nombre: "Preparar Cena", costo: 15, exp: 30, nivelRequerido: 2, icono: "🍝", descripcion: "Cocinar una comida especial" },
            { id: 2, nombre: "Ver una Película", costo: 20, exp: 40, nivelRequerido: 3, icono: "🎬", descripcion: "Noche de cine en casa" },
            { id: 3, nombre: "Paseo Nocturno", costo: 25, exp: 50, nivelRequerido: 5, icono: "🌃", descripcion: "Caminar bajo las estrellas" },
            { id: 4, nombre: "Clase de Cocina", costo: 30, exp: 60, nivelRequerido: 7, icono: "👨‍🍳", descripcion: "Aprender nuevas recetas" }
        ],
        nino: [
            { id: 0, nombre: "Ir de Compras", costo: 10, exp: 20, nivelRequerido: 1, icono: "🛍️", descripcion: "Comprar ropa y accesorios" },
            { id: 1, nombre: "Tomar Té", costo: 15, exp: 30, nivelRequerido: 2, icono: "🍵", descripcion: "Tarde de té y conversación" },
            { id: 2, nombre: "Sesión de Belleza", costo: 20, exp: 40, nivelRequerido: 3, icono: "💄", descripcion: "Cuidado personal juntos" },
            { id: 3, nombre: "Cena Elegante", costo: 25, exp: 50, nivelRequerido: 5, icono: "🍽️", descripcion: "Cena en restaurante fino" },
            { id: 4, nombre: "Baile en Pareja", costo: 30, exp: 60, nivelRequerido: 7, icono: "💃", descripcion: "Clase de baile romántico" }
        ],
        miku: [
            { id: 0, nombre: "Escuchar Música", costo: 10, exp: 20, nivelRequerido: 1, icono: "🎵", descripcion: "Compartir gustos musicales" },
            { id: 1, nombre: "Jugar Videojuegos", costo: 15, exp: 30, nivelRequerido: 2, icono: "🎮", descripcion: "Competencia amistosa" },
            { id: 2, nombre: "Visitar Tienda Anime", costo: 20, exp: 40, nivelRequerido: 3, icono: "🏪", descripcion: "Buscar figuras y manga" },
            { id: 3, nombre: "Maratón de Series", costo: 25, exp: 50, nivelRequerido: 5, icono: "📺", descripcion: "Ver anime todo el día" },
            { id: 4, nombre: "Concierto Virtual", costo: 30, exp: 60, nivelRequerido: 7, icono: "🎸", descripcion: "Disfrutar música en vivo" }
        ],
        yotsuba: [
            { id: 0, nombre: "Correr Juntos", costo: 10, exp: 20, nivelRequerido: 1, icono: "🏃", descripcion: "Ejercicio matutino" },
            { id: 1, nombre: "Deportes al Aire", costo: 15, exp: 30, nivelRequerido: 2, icono: "⚽", descripcion: "Jugar fútbol o básquet" },
            { id: 2, nombre: "Día en el Parque", costo: 20, exp: 40, nivelRequerido: 3, icono: "🌳", descripcion: "Picnic y juegos" },
            { id: 3, nombre: "Competencia Amistosa", costo: 25, exp: 50, nivelRequerido: 5, icono: "🏆", descripcion: "Retos deportivos" },
            { id: 4, nombre: "Acampada", costo: 30, exp: 60, nivelRequerido: 7, icono: "🏕️", descripcion: "Noche bajo las estrellas" }
        ],
        itsuki: [
            { id: 0, nombre: "Leer en Biblioteca", costo: 10, exp: 20, nivelRequerido: 1, icono: "📚", descripcion: "Estudio silencioso" },
            { id: 1, nombre: "Probar Comida Nueva", costo: 15, exp: 30, nivelRequerido: 2, icono: "🍜", descripcion: "Degustar platillos" },
            { id: 2, nombre: "Visitar Museo", costo: 20, exp: 40, nivelRequerido: 3, icono: "🏛️", descripcion: "Aprender historia" },
            { id: 3, nombre: "Clase de Cocina", costo: 25, exp: 50, nivelRequerido: 5, icono: "🍳", descripcion: "Cocinar recetas nuevas" },
            { id: 4, nombre: "Tour Histórico", costo: 30, exp: 60, nivelRequerido: 7, icono: "🗺️", descripcion: "Recorrer lugares históricos" }
        ]
    },

    // Videos de eventos aleatorios
    eventos: [
        { id: 0, nombre: "Video Especial A", probabilidad: 0.10, recompensa: 50, icono: "🎁", descripcion: "Contenido exclusivo limitado" },
        { id: 1, nombre: "Video Especial B", probabilidad: 0.30, recompensa: 30, icono: "🎉", descripcion: "Momento memorable" },
        { id: 2, nombre: "Video Especial C", probabilidad: 0.50, recompensa: 20, icono: "✨", descripcion: "Escena especial" },
        { id: 3, nombre: "Video Especial D", probabilidad: 0.70, recompensa: 15, icono: "🌟", descripcion: "Contenido bonus" },
        { id: 4, nombre: "Video Especial E", probabilidad: 0.90, recompensa: 10, icono: "💫", descripcion: "Momento casual" }
    ],

    // Precios de items
    items: {
        condones: [
            { id: 0, nombre: "Paquete Básico", precio: 20, cantidad: 3, icono: "📦" },
            { id: 1, nombre: "Paquete Estándar", precio: 50, cantidad: 10, icono: "📦" },
            { id: 2, nombre: "Paquete Premium", precio: 100, cantidad: 25, icono: "📦" },
            { id: 3, nombre: "Caja Deluxe", precio: 200, cantidad: 60, icono: "🎁" }
        ],
        regalos: [
            { id: 0, nombre: "Ramo de Flores", precio: 30, exp: 50, icono: "💐" },
            { id: 1, nombre: "Caja de Chocolate", precio: 50, exp: 80, icono: "🍫" },
            { id: 2, nombre: "Joyas Elegantes", precio: 100, exp: 150, icono: "💎" },
            { id: 3, nombre: "Viaje Sorpresa", precio: 300, exp: 500, icono: "✈️" }
        ]
    },

    // Mensajes de fallo en actividades íntimas
    mensajesFallo: {
        ichika: [
            "Ichika no tiene ganas en este momento",
            "Ichika prefiere esperar un poco más",
            "Ichika no se siente preparada",
            "Ichika quiere conocerte mejor primero",
            "Ichika necesita más tiempo"
        ],
        nino: [
            "Nino no está de humor ahora",
            "Nino quiere tomar las cosas con calma",
            "Nino prefiere otra actividad",
            "Nino no se siente cómoda aún",
            "Nino necesita más confianza"
        ],
        miku: [
            "Miku está muy nerviosa",
            "Miku quiere esperar un poco más",
            "Miku prefiere mantener la distancia por ahora",
            "Miku no se siente lista",
            "Miku necesita más tiempo para pensar"
        ],
        yotsuba: [
            "Yotsuba está muy cansada ahora",
            "Yotsuba quiere hacer algo más activo",
            "Yotsuba no se siente preparada",
            "Yotsuba prefiere algo más casual",
            "Yotsuba necesita más energía"
        ],
        itsuki: [
            "Itsuki está concentrada en sus estudios",
            "Itsuki prefiere algo más intelectual",
            "Itsuki no se siente cómoda aún",
            "Itsuki quiere conocerte mejor primero",
            "Itsuki necesita más tiempo"
        ]
    }
};

// Funciones para obtener contenido
function obtenerFotoNovia(nombre, nivel) {
    const fotos = CONTENIDO.fotos[nombre.toLowerCase()];
    if (!fotos) return null;
    
    // Encontrar la foto correspondiente al nivel (la más alta disponible)
    let fotoSeleccionada = fotos[0];
    for (const foto of fotos) {
        if (foto.nivel <= nivel) {
            fotoSeleccionada = foto;
        }
    }
    return fotoSeleccionada;
}

function obtenerActividadesNovia(nombre, nivel) {
    return CONTENIDO.actividades[nombre.toLowerCase()].filter(a => a.nivelRequerido <= nivel);
}

function obtenerVideosIntimosNovia(nombre, nivel) {
    return CONTENIDO.videosIntimos[nombre.toLowerCase()].filter(v => v.nivelRequerido <= nivel);
}

function obtenerMensajeFallo(nombre) {
    const mensajes = CONTENIDO.mensajesFallo[nombre.toLowerCase()];
    if (!mensajes) return "No está interesada en este momento";
    return mensajes[Math.floor(Math.random() * mensajes.length)];
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTENIDO, obtenerFotoNovia, obtenerActividadesNovia, obtenerVideosIntimosNovia, obtenerMensajeFallo };
}
