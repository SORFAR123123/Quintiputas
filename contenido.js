// Contenido multimedia para el sistema RPG
const CONTENIDO = {
    chicas: {
        ichika: {
            id: 'ichika',
            nombre: 'Ichika',
            color: '#FF6B9D',
            imagenes: {
                perfil: 'https://i.pravatar.cc/300?img=1',
                nivel1: 'https://i.pravatar.cc/300?img=11',
                nivel5: 'https://i.pravatar.cc/300?img=12',
                nivel10: 'https://i.pravatar.cc/300?img=13'
            },
            videos: [
                { id: 1, nombre: 'Presentación', url: 'https://example.com/video1.mp4', nivelRequerido: 1 },
                { id: 2, nombre: 'Conversación casual', url: 'https://example.com/video2.mp4', nivelRequerido: 3 },
                { id: 3, nombre: 'Estudio juntos', url: 'https://example.com/video3.mp4', nivelRequerido: 5 }
            ],
            videosIntimos: [
                { id: 1, nombre: 'Momento especial', url: 'https://example.com/intimo1.mp4', nivelRequerido: 10, probabilidad: 0.01 },
                { id: 2, nombre: 'Noche romántica', url: 'https://example.com/intimo2.mp4', nivelRequerido: 15, probabilidad: 0.05 },
                { id: 3, nombre: 'Confesión', url: 'https://example.com/intimo3.mp4', nivelRequerido: 20, probabilidad: 0.1 }
            ]
        },
        nino: {
            id: 'nino',
            nombre: 'Nino',
            color: '#4ECDC4',
            imagenes: {
                perfil: 'https://i.pravatar.cc/300?img=2',
                nivel1: 'https://i.pravatar.cc/300?img=21',
                nivel5: 'https://i.pravatar.cc/300?img=22',
                nivel10: 'https://i.pravatar.cc/300?img=23'
            },
            videos: [
                { id: 1, nombre: 'Saludo especial', url: 'https://example.com/video4.mp4', nivelRequerido: 1 },
                { id: 2, nombre: 'Preparando comida', url: 'https://example.com/video5.mp4', nivelRequerido: 3 },
                { id: 3, nombre: 'Paseo nocturno', url: 'https://example.com/video6.mp4', nivelRequerido: 5 }
            ],
            videosIntimos: [
                { id: 1, nombre: 'Cena romántica', url: 'https://example.com/intimo4.mp4', nivelRequerido: 10, probabilidad: 0.01 },
                { id: 2, nombre: 'Baile íntimo', url: 'https://example.com/intimo5.mp4', nivelRequerido: 15, probabilidad: 0.05 },
                { id: 3, nombre: 'Confianza total', url: 'https://example.com/intimo6.mp4', nivelRequerido: 20, probabilidad: 0.1 }
            ]
        },
        miku: {
            id: 'miku',
            nombre: 'Miku',
            color: '#45B7D1',
            imagenes: {
                perfil: 'https://i.pravatar.cc/300?img=3',
                nivel1: 'https://i.pravatar.cc/300?img=31',
                nivel5: 'https://i.pravatar.cc/300?img=32',
                nivel10: 'https://i.pravatar.cc/300?img=33'
            },
            videos: [
                { id: 1, nombre: 'Primer encuentro', url: 'https://example.com/video7.mp4', nivelRequerido: 1 },
                { id: 2, nombre: 'Escuchando música', url: 'https://example.com/video8.mp4', nivelRequerido: 3 },
                { id: 3, nombre: 'Estrellas juntos', url: 'https://example.com/video9.mp4', nivelRequerido: 5 }
            ],
            videosIntimos: [
                { id: 1, nombre: 'Susurros', url: 'https://example.com/intimo7.mp4', nivelRequerido: 10, probabilidad: 0.01 },
                { id: 2, nombre: 'Caricias', url: 'https://example.com/intimo8.mp4', nivelRequerido: 15, probabilidad: 0.05 },
                { id: 3, nombre: 'Entrega total', url: 'https://example.com/intimo9.mp4', nivelRequerido: 20, probabilidad: 0.1 }
            ]
        },
        yotsuba: {
            id: 'yotsuba',
            nombre: 'Yotsuba',
            color: '#96CEB4',
            imagenes: {
                perfil: 'https://i.pravatar.cc/300?img=4',
                nivel1: 'https://i.pravatar.cc/300?img=41',
                nivel5: 'https://i.pravatar.cc/300?img=42',
                nivel10: 'https://i.pravatar.cc/300?img=43'
            },
            videos: [
                { id: 1, nombre: 'Energía positiva', url: 'https://example.com/video10.mp4', nivelRequerido: 1 },
                { id: 2, nombre: 'Deportes juntos', url: 'https://example.com/video11.mp4', nivelRequerido: 3 },
                { id: 3, nombre: 'Aventura divertida', url: 'https://example.com/video12.mp4', nivelRequerido: 5 }
            ],
            videosIntimos: [
                { id: 1, nombre: 'Risa compartida', url: 'https://example.com/intimo10.mp4', nivelRequerido: 10, probabilidad: 0.01 },
                { id: 2, nombre: 'Juegos íntimos', url: 'https://example.com/intimo11.mp4', nivelRequerido: 15, probabilidad: 0.05 },
                { id: 3, nombre: 'Felicidad plena', url: 'https://example.com/intimo12.mp4', nivelRequerido: 20, probabilidad: 0.1 }
            ]
        },
        itsuki: {
            id: 'itsuki',
            nombre: 'Itsuki',
            color: '#FFEAA7',
            imagenes: {
                perfil: 'https://i.pravatar.cc/300?img=5',
                nivel1: 'https://i.pravatar.cc/300?img=51',
                nivel5: 'https://i.pravatar.cc/300?img=52',
                nivel10: 'https://i.pravatar.cc/300?img=53'
            },
            videos: [
                { id: 1, nombre: 'Conociéndonos', url: 'https://example.com/video13.mp4', nivelRequerido: 1 },
                { id: 2, nombre: 'Leyendo juntos', url: 'https://example.com/video14.mp4', nivelRequerido: 3 },
                { id: 3, nombre: 'Filosofando', url: 'https://example.com/video15.mp4', nivelRequerido: 5 }
            ],
            videosIntimos: [
                { id: 1, nombre: 'Intimidad intelectual', url: 'https://example.com/intimo13.mp4', nivelRequerido: 10, probabilidad: 0.01 },
                { id: 2, nombre: 'Conocimiento mutuo', url: 'https://example.com/intimo14.mp4', nivelRequerido: 15, probabilidad: 0.05 },
                { id: 3, nombre: 'Sabiduría compartida', url: 'https://example.com/intimo15.mp4', nivelRequerido: 20, probabilidad: 0.1 }
            ]
        }
    },
    
    actividades: [
        { id: 1, nombre: 'Conversar', costo: 10, exp: 50, nivelRequerido: 1, descripcion: 'Hablar por 30 minutos' },
        { id: 2, nombre: 'Estudiar juntos', costo: 20, exp: 100, nivelRequerido: 2, descripcion: 'Ayudarla con sus estudios' },
        { id: 3, nombre: 'Ir al cine', costo: 50, exp: 200, nivelRequerido: 3, descripcion: 'Ver una película juntos' },
        { id: 4, nombre: 'Cena romántica', costo: 100, exp: 400, nivelRequerido: 5, descripcion: 'Cena en restaurante elegante' },
        { id: 5, nombre: 'Viaje sorpresa', costo: 200, exp: 800, nivelRequerido: 7, descripcion: 'Fin de semana especial' },
        { id: 6, nombre: 'Regalo especial', costo: 300, exp: 1200, nivelRequerido: 10, descripcion: 'Regalo muy significativo' }
    ],
    
    actividadesIntimas: [
        { 
            id: 7, 
            nombre: 'Intimidad nivel 1', 
            costo: 500, 
            exp: 2000, 
            nivelRequerido: 10, 
            descripcion: 'Momento especial juntos',
            requiereCondones: true,
            probabilidadBase: 0.01,
            mensajeFallo: ' no tiene ganas en este momento'
        },
        { 
            id: 8, 
            nombre: 'Intimidad nivel 2', 
            costo: 1000, 
            exp: 4000, 
            nivelRequerido: 15, 
            descripcion: 'Noche romántica especial',
            requiereCondones: true,
            probabilidadBase: 0.05,
            mensajeFallo: ' está cansada hoy'
        },
        { 
            id: 9, 
            nombre: 'Intimidad nivel 3', 
            costo: 2000, 
            exp: 8000, 
            nivelRequerido: 20, 
            descripcion: 'Experiencia inolvidable',
            requiereCondones: true,
            probabilidadBase: 0.1,
            mensajeFallo: ' no se siente preparada'
        }
    ],
    
    items: {
        condones: { precio: 50, nombre: 'Paquete de condones', descripcion: 'Necesario para actividades íntimas' },
        flores: { precio: 30, nombre: 'Ramo de flores', descripcion: 'Aumenta temporalmente las probabilidades' },
        chocolate: { precio: 20, nombre: 'Chocolate especial', descripcion: 'Mejora el ánimo de la chica' }
    },
    
    eventos: [
        { id: 1, nombre: 'Video Especial A', probabilidad: 0.1, recompensa: 50, video: 'https://example.com/evento1.mp4' },
        { id: 2, nombre: 'Video Especial B', probabilidad: 0.3, recompensa: 30, video: 'https://example.com/evento2.mp4' },
        { id: 3, nombre: 'Video Especial C', probabilidad: 0.5, recompensa: 20, video: 'https://example.com/evento3.mp4' },
        { id: 4, nombre: 'Video Ultra Raro', probabilidad: 0.01, recompensa: 200, video: 'https://example.com/evento4.mp4' }
    ]
};

// Funciones para agregar contenido dinámicamente
function agregarActividad(actividad) {
    CONTENIDO.actividades.push(actividad);
}

function agregarEvento(evento) {
    CONTENIDO.eventos.push(evento);
}

function agregarVideoChica(chicaId, video) {
    const chica = CONTENIDO.chicas[chicaId];
    if (chica) {
        chica.videos.push(video);
    }
}

// Exportar el contenido
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTENIDO, agregarActividad, agregarEvento, agregarVideoChica };
}
