const vocabulario = {
    temas: [
        {
            id: "manga",
            nombre: "Manga/Anime",
            icono: "fas fa-book",
            descripcion: "Vocabulario y frases de manga/anime",
            subtemas: [
                {
                    id: "naruto",
                    nombre: "Naruto",
                    icono: "fas fa-leaf",
                    mazos: [
                        {
                            id: "naruto-frases",
                            nombre: "Frases Comunes",
                            icono: "fas fa-comment",
                            descripcion: "10 frases frecuentes en Naruto",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "いい加減",
                                    romaji: "ii kagen",
                                    opciones: ["Ya basta", "Perfecto", "Misión", "Comienzo"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "傳説",
                                    romaji: "densetsu",
                                    opciones: ["Leyenda", "Noche", "Primera vez", "Mitad"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "もんかな",
                                    romaji: "mon ka na",
                                    opciones: ["Supongo", "Leyenda", "Tarea", "Noche"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "今夜",
                                    romaji: "kon'ya",
                                    opciones: ["Esta noche", "Ya basta", "Leyenda", "Perfecto"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "完璧",
                                    romaji: "kanpeki",
                                    opciones: ["Perfecto", "Misión", "Primera vez", "Final"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "任務",
                                    romaji: "ninmu",
                                    opciones: ["Misión", "Leyenda", "Esta noche", "Mitad"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "遂行",
                                    romaji: "suikō",
                                    opciones: ["Ejecución", "Supongo", "Perfecto", "Leyenda"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "初体験ということ",
                                    romaji: "hatsu taiken to iu koto",
                                    opciones: ["Es mi primera vez", "Misión cumplida", "Noche perfecta", "Media leyenda"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "最終日",
                                    romaji: "saishūbi",
                                    opciones: ["Día final", "Primera vez", "Noche de leyenda", "Media misión"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "両等分",
                                    romaji: "ryō tōbun",
                                    opciones: ["Dividido a la mitad", "Completamente", "Por primera vez", "Esta noche"],
                                    respuesta: 0
                                }
                            ]
                        },
                        {
                            id: "naruto-jutsus",
                            nombre: "Técnicas Ninja",
                            icono: "fas fa-fire",
                            descripcion: "Nombres de jutsus y técnicas",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "影分身の術",
                                    romaji: "kage bunshin no jutsu",
                                    opciones: ["Técnica de clonación de sombras", "Técnica de bola de fuego", "Técnica de ilusión", "Técnica de curación"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "螺旋丸",
                                    romaji: "rasengan",
                                    opciones: ["Esfera giratoria", "Bola de fuego", "Corte relámpago", "Ojo copiador"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "千鳥",
                                    romaji: "chidori",
                                    opciones: ["Mil pájaros", "Esfera giratoria", "Bola de fuego", "Clon de sombra"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "写輪眼",
                                    romaji: "sharingan",
                                    opciones: ["Ojo copiador", "Ojo byakugan", "Ojo de sabio", "Ojo de águila"],
                                    respuesta: 0
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "one-piece",
                    nombre: "One Piece",
                    icono: "fas fa-skull-crossbones",
                    mazos: [
                        {
                            id: "one-piece-frases",
                            nombre: "Frases de Tripulación",
                            icono: "fas fa-hat-cowboy",
                            descripcion: "Frases famosas de One Piece",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "俺は海賊王になる",
                                    romaji: "ore wa kaizoku-ō ni naru",
                                    opciones: ["Seré el Rey de los Piratas", "Soy el espadachín más fuerte", "Encontraré el One Piece", "Navegaré por todos los mares"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "三刀流",
                                    romaji: "santōryū",
                                    opciones: ["Estilo de tres espadas", "Estilo de dos espadas", "Estilo de espada única", "Estilo de garra"],
                                    respuesta: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "openings",
            nombre: "Openings",
            icono: "fas fa-music",
            descripcion: "Letras de openings de anime",
            subtemas: [
                {
                    id: "shonen-openings",
                    nombre: "Openings Shonen",
                    icono: "fas fa-bolt",
                    mazos: [
                        {
                            id: "openings-naruto",
                            nombre: "Naruto Openings",
                            icono: "fas fa-play-circle",
                            descripcion: "Letras de openings de Naruto",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "R★O★C★K★S",
                                    romaji: "rokkusu",
                                    opciones: ["Opening 3 de Naruto", "Opening 1 de Naruto", "Ending de Naruto", "Opening de Shippuden"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "ブルーバード",
                                    romaji: "burūbādo",
                                    opciones: ["Blue Bird - Opening 3 Shippuden", "Silhouette", "Sign", "Diver"],
                                    respuesta: 0
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
