// ===== VOCABULARIO DINÁMICO =====
// Estructura de datos completamente dinámica
// Puedes agregar más mangas, mazos y palabras fácilmente

const vocabulario = {
    // Cada manga es un objeto con sus mazos
    mangas: {
        // Manga 1
        'naruto': {
            id: 'naruto',
            nombre: 'Naruto',
            icono: 'fas fa-user-ninja',
            color: '#f97316',
            descripcion: 'Vocabulario del mundo ninja',
            mazos: {
                // Cada mazo tiene 10 palabras
                'mazo1': {
                    id: 'mazo1',
                    nombre: 'Mazo Básico',
                    descripcion: 'Palabras fundamentales del anime',
                    palabras: [
                        { japones: '忍者', romaji: 'ninja', lectura: 'にんじゃ', significado: 'ninja' },
                        { japones: '火影', romaji: 'hokage', lectura: 'ほかげ', significado: 'sombra de fuego' },
                        { japones: '術', romaji: 'jutsu', lectura: 'じゅつ', significado: 'técnica' },
                        { japones: '影分身', romaji: 'kage bunshin', lectura: 'かげぶんしん', significado: 'clon de sombra' },
                        { japones: '螺旋丸', romaji: 'rasengan', lectura: 'らせんがん', significado: 'esfera espiral' },
                        { japones: '写輪眼', romaji: 'sharingan', lectura: 'しゃりんがん', significado: 'ojo copiador' },
                        { japones: '尾獣', romaji: 'bijū', lectura: 'びじゅう', significado: 'bestia con cola' },
                        { japones: '忍術', romaji: 'ninjutsu', lectura: 'にんじゅつ', significado: 'técnica ninja' },
                        { japones: '里', romaji: 'sato', lectura: 'さと', significado: 'aldea' },
                        { japones: '戦い', romaji: 'tatakai', lectura: 'たたかい', significado: 'batalla' }
                    ]
                },
                'mazo2': {
                    id: 'mazo2',
                    nombre: 'Personajes',
                    descripcion: 'Nombres y títulos importantes',
                    palabras: [
                        { japones: 'うずまきナルト', romaji: 'Uzumaki Naruto', lectura: 'うずまきなると', significado: 'Naruto Uzumaki' },
                        { japones: 'うちはサスケ', romaji: 'Uchiha Sasuke', lectura: 'うちはさすけ', significado: 'Sasuke Uchiha' },
                        { japones: '春野サクラ', romaji: 'Haruno Sakura', lectura: 'はるのさくら', significado: 'Sakura Haruno' },
                        { japones: 'はたけカカシ', romaji: 'Hatake Kakashi', lectura: 'はたけかかし', significado: 'Kakashi Hatake' },
                        { japones: '自来也', romaji: 'Jiraiya', lectura: 'じらいや', significado: 'Jiraiya' },
                        { japones: '大蛇丸', romaji: 'Orochimaru', lectura: 'おろちまる', significado: 'Orochimaru' },
                        { japones: '綱手', romaji: 'Tsunade', lectura: 'つなで', significado: 'Tsunade' },
                        { japones: '我愛羅', romaji: 'Gaara', lectura: 'がいら', significado: 'Gaara' },
                        { japones: '日向ヒナタ', romaji: 'Hyūga Hinata', lectura: 'ひゅうがひなた', significado: 'Hinata Hyūga' },
                        { japones: '奈良シカマル', romaji: 'Nara Shikamaru', lectura: 'ならしかまる', significado: 'Shikamaru Nara' }
                    ]
                }
            }
        },
        // Manga 2
        'one-piece': {
            id: 'one-piece',
            nombre: 'One Piece',
            icono: 'fas fa-skull-crossbones',
            color: '#3b82f6',
            descripcion: 'Vocabulario pirata y aventuras',
            mazos: {
                'mazo1': {
                    id: 'mazo1',
                    nombre: 'Tripulación',
                    descripcion: 'Miembros de los Piratas del Sombrero de Paja',
                    palabras: [
                        { japones: '麦わら', romaji: 'mugiwara', lectura: 'むぎわら', significado: 'sombrero de paja' },
                        { japones: '海賊', romaji: 'kaizoku', lectura: 'かいぞく', significado: 'pirata' },
                        { japones: '船長', romaji: 'senchō', lectura: 'せんちょう', significado: 'capitán' },
                        { japones: '航海士', romaji: 'kōkaishi', lectura: 'こうかいし', significado: 'navegante' },
                        { japones: '船医', romaji: 'sen\'i', lectura: 'せんい', significado: 'médico de a bordo' },
                        { japones: '戦闘員', romaji: 'sentōin', lectura: 'せんとういん', significado: 'luchador' },
                        { japones: 'コック', romaji: 'kokku', lectura: 'こっく', significado: 'cocinero' },
                        { japones: '考古学者', romaji: 'kōkogakusha', lectura: 'こうこがくしゃ', significado: 'arqueólogo' },
                        { japones: '船大工', romaji: 'funa daiku', lectura: 'ふなだいく', significado: 'carpintero naval' },
                        { japones: '音楽家', romaji: 'ongakuka', lectura: 'おんがくか', significado: 'músico' }
                    ]
                }
            }
        },
        // Manga 3 - EJEMPLO DE CÓMO AGREGAR MÁS
        'attack-on-titan': {
            id: 'attack-on-titan',
            nombre: 'Attack on Titan',
            icono: 'fas fa-chess-rook',
            color: '#dc2626',
            descripcion: 'Vocabulario de titanes y batallas',
            mazos: {
                'mazo1': {
                    id: 'mazo1',
                    nombre: 'Términos Militares',
                    descripcion: 'Vocabulario de las fuerzas militares',
                    palabras: [
                        { japones: '巨人', romaji: 'kyojin', lectura: 'きょじん', significado: 'titan' },
                        { japones: '兵団', romaji: 'heidan', lectura: 'へいだん', significado: 'cuerpo militar' },
                        { japones: '立体機動装置', romaji: 'rittai kidō sōchi', lectura: 'りったいきどうそうち', significado: 'dispositivo de movilidad tridimensional' },
                        { japones: '壁', romaji: 'kabe', lectura: 'かべ', significado: 'muro' },
                        { japones: '調査兵団', romaji: 'chōsa heidan', lectura: 'ちょうさへいだん', significado: 'cuerpo de reconocimiento' },
                        { japones: '駐屯兵団', romaji: 'chūton heidan', lectura: 'ちゅうとんへいだん', significado: 'cuerpo de guarnición' },
                        { japones: '憲兵団', romaji: 'kenpeidan', lectura: 'けんぺいだん', significado: 'policía militar' },
                        { japones: '巨人化', romaji: 'kyojinka', lectura: 'きょじんか', significado: 'transformación en titán' },
                        { japones: '始祖の巨人', romaji: 'shiso no kyojin', lectura: 'しそのきょじん', significado: 'titan fundador' },
                        { japones: '進撃の巨人', romaji: 'shingeki no kyojin', lectura: 'しんげきのきょじん', significado: 'titan de ataque' }
                    ]
                }
            }
        }
    },
    
    // Función para obtener todos los mangas
    obtenerMangas() {
        return Object.values(this.mangas);
    },
    
    // Función para obtener un manga específico
    obtenerManga(id) {
        return this.mangas[id];
    },
    
    // Función para obtener los mazos de un manga
    obtenerMazos(mangaId) {
        const manga = this.obtenerManga(mangaId);
        return manga ? Object.values(manga.mazos) : [];
    },
    
    // Función para obtener un mazo específico
    obtenerMazo(mangaId, mazoId) {
        const manga = this.obtenerManga(mangaId);
        return manga ? manga.mazos[mazoId] : null;
    },
    
    // Función para agregar un nuevo manga (ejemplo de extensión dinámica)
    agregarManga(nuevoManga) {
        this.mangas[nuevoManga.id] = nuevoManga;
    },
    
    // Función para agregar un nuevo mazo a un manga existente
    agregarMazo(mangaId, nuevoMazo) {
        if (this.mangas[mangaId]) {
            this.mangas[mangaId].mazos[nuevoMazo.id] = nuevoMazo;
        }
    }
};

// Ejemplo de cómo agregar más contenido dinámicamente:
/*
vocabulario.agregarManga({
    id: 'dragon-ball',
    nombre: 'Dragon Ball',
    icono: 'fas fa-dragon',
    color: '#10b981',
    descripcion: 'Vocabulario de artes marciales y batallas',
    mazos: {
        'mazo1': {
            id: 'mazo1',
            nombre: 'Técnicas de Combate',
            descripcion: 'Ataques y técnicas famosas',
            palabras: [
                { japones: 'かめはめ波', romaji: 'kamehameha', lectura: 'かめはめは', significado: 'onda kamehameha' },
                // ... más palabras
            ]
        }
    }
});
*/

export default vocabulario;
