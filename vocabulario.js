// Sistema dinámico de vocabulario
const VOCABULARIO = {
    mangas: []
};

// Generar 10 mangas con 10 mazos cada uno
for (let mangaId = 1; mangaId <= 10; mangaId++) {
    const manga = {
        id: mangaId,
        nombre: `Manga ${mangaId}`,
        imagen: `https://picsum.photos/300/200?random=${mangaId}`,
        mazos: []
    };
    
    // Generar 10 mazos por manga
    for (let mazoId = 1; mazoId <= 10; mazoId++) {
        const mazo = {
            id: `${mangaId}-${mazoId}`,
            nombre: `Mazo ${mazoId}`,
            palabras: []
        };
        
        // Generar 10 palabras por mazo
        const categorias = ['Sustantivos', 'Verbos', 'Adjetivos', 'Expresiones'];
        for (let palabraId = 1; palabraId <= 10; palabraId++) {
            const categoria = categorias[Math.floor(Math.random() * categorias.length)];
            const palabra = generarPalabraJapones(categoria, palabraId);
            mazo.palabras.push(palabra);
        }
        
        manga.mazos.push(mazo);
    }
    
    VOCABULARIO.mangas.push(manga);
}

// Función para generar palabras japonesas realistas
function generarPalabraJapones(categoria, id) {
    const palabrasBase = {
        Sustantivos: [
            { japones: '本', romaji: 'hon', significado: 'libro' },
            { japones: '水', romaji: 'mizu', significado: 'agua' },
            { japones: '人', romaji: 'hito', significado: 'persona' },
            { japones: '時間', romaji: 'jikan', significado: 'tiempo' },
            { japones: '学校', romaji: 'gakkou', significado: 'escuela' },
            { japones: '食べ物', romaji: 'tabemono', significado: 'comida' },
            { japones: '友達', romaji: 'tomodachi', significado: 'amigo' },
            { japones: '家族', romaji: 'kazoku', significado: 'familia' },
            { japones: '仕事', romaji: 'shigoto', significado: 'trabajo' },
            { japones: '夢', romaji: 'yume', significado: 'sueño' }
        ],
        Verbos: [
            { japones: '食べる', romaji: 'taberu', significado: 'comer' },
            { japones: '飲む', romaji: 'nomu', significado: 'beber' },
            { japones: '行く', romaji: 'iku', significado: 'ir' },
            { japones: '来る', romaji: 'kuru', significado: 'venir' },
            { japones: '見る', romaji: 'miru', significado: 'ver' },
            { japones: '聞く', romaji: 'kiku', significado: 'escuchar' },
            { japones: '話す', romaji: 'hanasu', significado: 'hablar' },
            { japones: '読む', romaji: 'yomu', significado: 'leer' },
            { japones: '書く', romaji: 'kaku', significado: 'escribir' },
            { japones: '勉強する', romaji: 'benkyou suru', significado: 'estudiar' }
        ],
        Adjetivos: [
            { japones: '大きい', romaji: 'ookii', significado: 'grande' },
            { japones: '小さい', romaji: 'chiisai', significado: 'pequeño' },
            { japones: '楽しい', romaji: 'tanoshii', significado: 'divertido' },
            { japones: '難しい', romaji: 'muzukashii', significado: 'difícil' },
            { japones: '簡単', romaji: 'kantan', significado: 'fácil' },
            { japones: '新しい', romaji: 'atarashii', significado: 'nuevo' },
            { japones: '古い', romaji: 'furui', significado: 'viejo' },
            { japones: '暑い', romaji: 'atsui', significado: 'caliente' },
            { japones: '寒い', romaji: 'samui', significado: 'frío' },
            { japones: '美味しい', romaji: 'oishii', significado: 'delicioso' }
        ],
        Expresiones: [
            { japones: 'こんにちは', romaji: 'konnichiwa', significado: 'hola' },
            { japones: 'ありがとう', romaji: 'arigatou', significado: 'gracias' },
            { japones: 'すみません', romaji: 'sumimasen', significado: 'perdón' },
            { japones: 'お願いします', romaji: 'onegaishimasu', significado: 'por favor' },
            { japones: 'さようなら', romaji: 'sayounara', significado: 'adiós' },
            { japones: 'おはよう', romaji: 'ohayou', significado: 'buenos días' },
            { japones: 'おやすみ', romaji: 'oyasumi', significado: 'buenas noches' },
            { japones: 'いただきます', romaji: 'itadakimasu', significado: 'antes de comer' },
            { japones: 'ごちそうさま', romaji: 'gochisousama', significado: 'después de comer' },
            { japones: '頑張って', romaji: 'ganbatte', significado: '¡ánimo!' }
        ]
    };
    
    const lista = palabrasBase[categoria];
    const base = lista[(id - 1) % lista.length];
    
    // Generar opciones incorrectas
    const opciones = [base.significado];
    while (opciones.length < 4) {
        const randomCategoria = categorias[Math.floor(Math.random() * categorias.length)];
        const randomLista = palabrasBase[randomCategoria];
        const randomPalabra = randomLista[Math.floor(Math.random() * randomLista.length)].significado;
        
        if (!opciones.includes(randomPalabra)) {
            opciones.push(randomPalabra);
        }
    }
    
    // Mezclar opciones
    opciones.sort(() => Math.random() - 0.5);
    
    return {
        id: `${categoria}-${id}`,
        japones: base.japones,
        romaji: base.romaji,
        significado: base.significado,
        opciones: opciones,
        respuesta: base.significado,
        dificil: false,
        aprendida: false
    };
}

// Función para agregar mazos dinámicamente
function agregarMazo(mangaId, nombreMazo, palabrasPersonalizadas = null) {
    const manga = VOCABULARIO.mangas.find(m => m.id === mangaId);
    if (!manga) return null;
    
    const nuevoMazo = {
        id: `${mangaId}-${manga.mazos.length + 1}`,
        nombre: nombreMazo,
        palabras: palabrasPersonalizadas || generarPalabrasAleatorias(10)
    };
    
    manga.mazos.push(nuevoMazo);
    return nuevoMazo;
}

function generarPalabrasAleatorias(cantidad) {
    const palabras = [];
    const categorias = ['Sustantivos', 'Verbos', 'Adjetivos', 'Expresiones'];
    
    for (let i = 1; i <= cantidad; i++) {
        const categoria = categorias[Math.floor(Math.random() * categorias.length)];
        palabras.push(generarPalabraJapones(categoria, i));
    }
    
    return palabras;
}

// Exportar el vocabulario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VOCABULARIO, agregarMazo };
}
