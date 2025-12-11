const vocabulario = {
    temas: [
        {
            id: "manga",
            nombre: "Manga",
            icono: "fas fa-book",
            descripcion: "Personajes y términos de manga",
            subtemas: [
                {
                    id: "naruto",
                    nombre: "Naruto",
                    icono: "fas fa-leaf",
                    mazos: [
                        {
                            id: "naruto-personajes",
                            nombre: "Personajes Principales",
                            icono: "fas fa-user-ninja",
                            descripcion: "10 personajes principales de Naruto",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "Naruto Uzumaki",
                                    romaji: "Naruto Uzumaki",
                                    opciones: ["Sasuke Uchiha", "Kakashi Hatake", "Sakura Haruno", "Hinata Hyuga"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "Sasuke Uchiha",
                                    romaji: "Sasuke Uchiha",
                                    opciones: ["Naruto Uzumaki", "Itachi Uchiha", "Kakashi Hatake", "Shikamaru Nara"],
                                    respuesta: 1
                                },
                                {
                                    palabra: "Kakashi Hatake",
                                    romaji: "Kakashi Hatake",
                                    opciones: ["Might Guy", "Asuma Sarutobi", "Jiraiya", "Minato Namikaze"],
                                    respuesta: 3
                                },
                                {
                                    palabra: "Sakura Haruno",
                                    romaji: "Sakura Haruno",
                                    opciones: ["Ino Yamanaka", "Hinata Hyuga", "Tsunade", "Temari"],
                                    respuesta: 2
                                },
                                {
                                    palabra: "Hinata Hyuga",
                                    romaji: "Hinata Hyuga",
                                    opciones: ["Hanabi Hyuga", "Neji Hyuga", "Sakura Haruno", "Ino Yamanaka"],
                                    respuesta: 1
                                },
                                {
                                    palabra: "Jiraiya",
                                    romaji: "Jiraiya",
                                    opciones: ["Orochimaru", "Tsunade", "Hiruzen Sarutobi", "Minato Namikaze"],
                                    respuesta: 2
                                },
                                {
                                    palabra: "Tsunade",
                                    romaji: "Tsunade",
                                    opciones: ["Sakura Haruno", "Shizune", "Kushina Uzumaki", "Mei Terumi"],
                                    respuesta: 1
                                },
                                {
                                    palabra: "Gaara",
                                    romaji: "Gaara",
                                    opciones: ["Kankuro", "Temari", "Rasa", "Shukaku"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "Itachi Uchiha",
                                    romaji: "Itachi Uchiha",
                                    opciones: ["Sasuke Uchiha", "Shisui Uchiha", "Madara Uchiha", "Obito Uchiha"],
                                    respuesta: 1
                                },
                                {
                                    palabra: "Minato Namikaze",
                                    romaji: "Minato Namikaze",
                                    opciones: ["Kushina Uzumaki", "Jiraiya", "Hiruzen Sarutobi", "Tobirama Senju"],
                                    respuesta: 0
                                }
                            ]
                        },
                        {
                            id: "naruto-jutsus",
                            nombre: "Jutsus Especiales",
                            icono: "fas fa-fire",
                            descripcion: "Técnicas ninja famosas",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "Rasengan",
                                    romaji: "Rasengan",
                                    opciones: ["Chidori", "Kage Bunshin", "Sharingan", "Byakugan"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "Chidori",
                                    romaji: "Chidori",
                                    opciones: ["Rasengan", "Raikiri", "Amaterasu", "Susanoo"],
                                    respuesta: 1
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
                            id: "one-piece-tripulacion",
                            nombre: "Tripulación Sombrero de Paja",
                            icono: "fas fa-hat-cowboy",
                            descripcion: "Miembros de la tripulación",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "Monkey D. Luffy",
                                    romaji: "Monkī Dī Rufi",
                                    opciones: ["Roronoa Zoro", "Nami", "Usopp", "Sanji"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "Roronoa Zoro",
                                    romaji: "Roronoa Zoro",
                                    opciones: ["Sanji", "Brook", "Franky", "Jinbe"],
                                    respuesta: 1
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
            descripcion: "Canciones de apertura de anime",
            subtemas: [
                {
                    id: "shonen-openings",
                    nombre: "Openings Shonen",
                    icono: "fas fa-bolt",
                    mazos: [
                        {
                            id: "openings-naruto",
                            nombre: "Openings de Naruto",
                            icono: "fas fa-play-circle",
                            descripcion: "Canciones de apertura de Naruto",
                            recompensa: 2,
                            palabras: [
                                {
                                    palabra: "Silhouette",
                                    romaji: "Shiruetto",
                                    opciones: ["Blue Bird", "Sign", "Closer", "Diver"],
                                    respuesta: 0
                                },
                                {
                                    palabra: "Blue Bird",
                                    romaji: "Burū Bādo",
                                    opciones: ["Silhouette", "Sign", "Closer", "Newsong"],
                                    respuesta: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
