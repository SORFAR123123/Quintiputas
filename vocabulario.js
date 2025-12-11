// ============================================================================
// VOCABULARIO REORGANIZADO
// Estructura: Temas -> Subtemas -> Mazos -> Palabras
// ============================================================================

const vocabulario = {
    temas: [
        {
            id: "the-last-summer",
            nombre: "THE LAST SUMMER",
            icono: "fas fa-sun",
            descripcion: "Vocabulario de la serie The Last Summer",
            subtemas: [
                {
                    id: "sub1_1",
                    nombre: "Volumen 1 - Parte 1",
                    icono: "fas fa-book-open",
                    mazos: [
                        {
                            id: "sub1_1_mazo1",
                            nombre: "Mazo 1 - Capítulo 1",
                            icono: "fas fa-list-ol",
                            descripcion: "Palabras básicas del inicio",
                            recompensa: 2,
                            palabras: [
                                { japones: '今朝', lectura: 'kesa', opciones: ['Esta mañana', 'Esta tarde', 'Anoche', 'Ayer'], respuesta: 0 },
                                { japones: '処', lectura: 'tokoro', opciones: ['Lugar', 'Tiempo', 'Persona', 'Cosa'], respuesta: 0 },
                                { japones: '出掛け', lectura: 'dekake', opciones: ['Salir', 'Entrar', 'Quedarse', 'Volver'], respuesta: 0 },
                                { japones: '女将', lectura: 'okami', opciones: ['Dueña', 'Mesera', 'Cliente', 'Cocinera'], respuesta: 0 },
                                { japones: '寂しい', lectura: 'sabishii', opciones: ['Solitario', 'Alegre', 'Ocupado', 'Ruidoso'], respuesta: 0 },
                                { japones: '憩い', lectura: 'ikoi', opciones: ['Descanso', 'Trabajo', 'Ejercicio', 'Estudio'], respuesta: 0 },
                                { japones: '手伝い', lectura: 'tetsudai', opciones: ['Ayuda', 'Obstáculo', 'Problema', 'Solución'], respuesta: 0 },
                                { japones: '撮る', lectura: 'toru', opciones: ['Tomar foto', 'Escribir', 'Leer', 'Escuchar'], respuesta: 0 },
                                { japones: '見送る', lectura: 'miokuru', opciones: ['Despedir', 'Recibir', 'Ignorar', 'Saludar'], respuesta: 0 },
                                { japones: '限る', lectura: 'kagiru', opciones: ['Limitar', 'Ampliar', 'Permitir', 'Prohibir'], respuesta: 0 }
                            ]
                        },
                        {
                            id: "sub1_1_mazo2",
                            nombre: "Mazo 2 - Capítulo 2",
                            icono: "fas fa-list-ol",
                            descripcion: "Expresiones emocionales",
                            recompensa: 2,
                            palabras: [
                                { japones: '吐息', lectura: 'toiki', opciones: ['Suspiro', 'Risa', 'Grito', 'Llanto'], respuesta: 0 },
                                { japones: '応援', lectura: 'ouen', opciones: ['Apoyo', 'Crítica', 'Indiferencia', 'Oposición'], respuesta: 0 },
                                { japones: '文句', lectura: 'monku', opciones: ['Queja', 'Elogio', 'Sugerencia', 'Pregunta'], respuesta: 0 },
                                { japones: '構う', lectura: 'kamau', opciones: ['Preocuparse', 'Ignorar', 'Aceptar', 'Rechazar'], respuesta: 0 },
                                { japones: '残り香', lectura: 'nokorika', opciones: ['Aroma residual', 'Sonido', 'Imagen', 'Sabor'], respuesta: 0 },
                                { japones: '減る', lectura: 'heru', opciones: ['Disminuir', 'Aumentar', 'Mantener', 'Cambiar'], respuesta: 0 },
                                { japones: '誰彼', lectura: 'dareka', opciones: ['Alguien', 'Nadie', 'Todos', 'Algo'], respuesta: 0 },
                                { japones: '過激', lectura: 'kageki', opciones: ['Extremo', 'Moderado', 'Suave', 'Normal'], respuesta: 0 },
                                { japones: '開き直る', lectura: 'hirakinarou', opciones: ['Cambiar de actitud', 'Mantenerse', 'Rendirse', 'Avanzar'], respuesta: 0 },
                                { japones: '関係ない', lectura: 'kankeinai', opciones: ['No relacionado', 'Importante', 'Relevante', 'Conectado'], respuesta: 0 }
                            ]
                        },
                        {
                            id: "sub1_1_mazo3",
                            nombre: "Mazo 3 - Capítulo 3",
                            icono: "fas fa-list-ol",
                            descripcion: "Temas complejos",
                            recompensa: 2,
                            palabras: [
                                { japones: '刺激', lectura: 'shigeki', opciones: ['Estímulo', 'Calma', 'Aburrimiento', 'Paz'], respuesta: 0 },
                                { japones: '否定', lectura: 'hitei', opciones: ['Negación', 'Afirmación', 'Duda', 'Aceptación'], respuesta: 0 },
                                { japones: '宝の持ち腐れ', lectura: 'takarano mochiguse', opciones: ['Talento desperdiciado', 'Tesoro', 'Pobreza', 'Generosidad'], respuesta: 0 },
                                { japones: '心配', lectura: 'shinpai', opciones: ['Preocupación', 'Tranquilidad', 'Confianza', 'Seguridad'], respuesta: 0 },
                                { japones: '性欲', lectura: 'seiyoku', opciones: ['Deseo sexual', 'Hambre', 'Sed', 'Cansancio'], respuesta: 0 },
                                { japones: '機会', lectura: 'kikai', opciones: ['Oportunidad', 'Peligro', 'Problema', 'Obstáculo'], respuesta: 0 },
                                { japones: '活かす', lectura: 'ikasu', opciones: ['Aprovechar', 'Desperdiciar', 'Ignorar', 'Rechazar'], respuesta: 0 },
                                { japones: '経験不足', lectura: 'keiken busoku', opciones: ['Falta de experiencia', 'Mucha experiencia', 'Talento', 'Habilidad'], respuesta: 0 },
                                { japones: '言い寄る', lectura: 'iiyoru', opciones: ['Acercarse a alguien', 'Alejarse', 'Ignorar', 'Evitar'], respuesta: 0 },
                                { japones: '飽きる', lectura: 'akiru', opciones: ['Cansarse', 'Entusiasmarse', 'Continuar', 'Empezar'], respuesta: 0 }
                            ]
                        },
                        {
                            id: "sub1_1_mazo4",
                            nombre: "Mazo 4 - Capítulo 4",
                            icono: "fas fa-list-ol",
                            descripcion: "Interacciones sociales",
                            recompensa: 2,
                            palabras: [
                                { japones: '合格', lectura: 'goukaku', opciones: ['Aprobar', 'Reprobar', 'Intentar', 'Estudiar'], respuesta: 0 },
                                { japones: '圧し潰す', lectura: 'asshitsubusu', opciones: ['Aplastar', 'Levantar', 'Construir', 'Reparar'], respuesta: 0 },
                                { japones: '密着', lectura: 'micchaku', opciones: ['Pegado', 'Separado', 'Distante', 'Aislado'], respuesta: 0 },
                                { japones: '届く', lectura: 'todoku', opciones: ['Llegar', 'Partir', 'Perderse', 'Desaparecer'], respuesta: 0 },
                                { japones: '巻きつく', lectura: 'makitsuku', opciones: ['Enrollarse', 'Desenrollar', 'Cortar', 'Pegar'], respuesta: 0 },
                                { japones: '惜しい', lectura: 'oshii', opciones: ['Lamentable', 'Afortunado', 'Normal', 'Extraño'], respuesta: 0 },
                                { japones: '拒否権', lectura: 'kyohiken', opciones: ['Derecho a veto', 'Permiso', 'Aprobación', 'Acuerdo'], respuesta: 0 },
                                { japones: '経験', lectura: 'keiken', opciones: ['Experiencia', 'Ignorancia', 'Teoría', 'Estudio'], respuesta: 0 },
                                { japones: '蒸す', lectura: 'musu', opciones: ['Humedecer', 'Secar', 'Calentar', 'Enfriar'], respuesta: 0 }
                            ]
                        },
                        {
                            id: "sub1_1_mazo5",
                            nombre: "Mazo 5 - Capítulo 5",
                            icono: "fas fa-list-ol",
                            descripcion: "Expresiones generales",
                            recompensa: 2,
                            palabras: [
                                { japones: '大体', lectura: 'daitai', opciones: ['Aproximadamente', 'Exactamente', 'Completamente', 'Parcialmente'], respuesta: 0 },
                                { japones: '起きる', lectura: 'okiru', opciones: ['Despertar', 'Dormir', 'Soñar', 'Descansar'], respuesta: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: "sub1_2",
                    nombre: "Volumen 1 - Parte 2",
                    icono: "fas fa-school",
                    mazos: [
                        {
                            id: "sub1_2_mazo1",
                            nombre: "Mazo 1 - Vocabulario escolar",
                            icono: "fas fa-graduation-cap",
                            descripcion: "Términos relacionados con la escuela",
                            recompensa: 2,
                            palabras: [
                                { japones: '学校', lectura: 'gakkou', opciones: ['Escuela', 'Casa', 'Trabajo', 'Parque'], respuesta: 0 },
                                { japones: '勉強', lectura: 'benkyou', opciones: ['Estudio', 'Juego', 'Descanso', 'Trabajo'], respuesta: 0 },
                                { japones: '教室', lectura: 'kyoushitsu', opciones: ['Salón de clases', 'Oficina', 'Cocina', 'Baño'], respuesta: 0 },
                                { japones: '先生', lectura: 'sensei', opciones: ['Profesor', 'Estudiante', 'Director', 'Padre'], respuesta: 0 },
                                { japones: '生徒', lectura: 'seito', opciones: ['Estudiante', 'Profesor', 'Padre', 'Vecino'], respuesta: 0 },
                                { japones: '試験', lectura: 'shiken', opciones: ['Examen', 'Tarea', 'Proyecto', 'Presentación'], respuesta: 0 },
                                { japones: '宿題', lectura: 'shukudai', opciones: ['Tarea', 'Examen', 'Proyecto', 'Investigación'], respuesta: 0 },
                                { japones: '卒業', lectura: 'sotsugyou', opciones: ['Graduación', 'Ingreso', 'Transferencia', 'Abandono'], respuesta: 0 },
                                { japones: '入学', lectura: 'nyuugaku', opciones: ['Ingreso', 'Graduación', 'Transferencia', 'Abandono'], respuesta: 0 },
                                { japones: 'クラス', lectura: 'kurasu', opciones: ['Clase', 'Escuela', 'Grupo', 'Equipo'], respuesta: 0 }
                            ]
                        },
                        {
                            id: "sub1_2_mazo2",
                            nombre: "Mazo 2 - Actividades escolares",
                            icono: "fas fa-futbol",
                            descripcion: "Eventos y actividades en la escuela",
                            recompensa: 2,
                            palabras: [
                                { japones: '部活', lectura: 'bukatsu', opciones: ['Club escolar', 'Trabajo', 'Estudio', 'Descanso'], respuesta: 0 },
                                { japones: '文化祭', lectura: 'bunkasai', opciones: ['Festival cultural', 'Deporte', 'Examen', 'Vacaciones'], respuesta: 0 },
                                { japones: '運動会', lectura: 'undoukai', opciones: ['Día deportivo', 'Ceremonia', 'Examen', 'Fiesta'], respuesta: 0 },
                                { japones: '修学旅行', lectura: 'shuugakuryokou', opciones: ['Viaje escolar', 'Vacaciones', 'Trabajo', 'Estudio'], respuesta: 0 },
                                { japones: '夏休み', lectura: 'natsuyasumi', opciones: ['Vacaciones de verano', 'Vacaciones de invierno', 'Fin de semana', 'Feriado'], respuesta: 0 },
                                { japones: '冬休み', lectura: 'fuyuyasumi', opciones: ['Vacaciones de invierno', 'Vacaciones de verano', 'Fin de semana', 'Feriado'], respuesta: 0 },
                                { japones: '春休み', lectura: 'haruyasumi', opciones: ['Vacaciones de primavera', 'Vacaciones de verano', 'Fin de semana', 'Feriado'], respuesta: 0 },
                                { japones: '新学期', lectura: 'shingakki', opciones: ['Nuevo semestre', 'Vacaciones', 'Exámenes', 'Graduación'], respuesta: 0 },
                                { japones: '終業式', lectura: 'shuugyoushiki', opciones: ['Ceremonia de fin de clases', 'Ceremonia de inicio', 'Graduación', 'Ingreso'], respuesta: 0 },
                                { japones: '始業式', lectura: 'shigyoushiki', opciones: ['Ceremonia de inicio de clases', 'Ceremonia de fin', 'Graduación', 'Ingreso'], respuesta: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: "sub1_3",
                    nombre: "Volumen 1 - Parte 3",
                    icono: "fas fa-home",
                    mazos: [
                        {
                            id: "sub1_3_mazo1",
                            nombre: "Mazo 1 - Familia",
                            icono: "fas fa-users",
                            descripcion: "Términos familiares",
                            recompensa: 2,
                            palabras: [
                                { japones: '家族', lectura: 'kazoku', opciones: ['Familia', 'Amigos', 'Vecinos', 'Compañeros'], respuesta: 0 },
                                { japones: '父', lectura: 'chichi', opciones: ['Padre', 'Madre', 'Hermano', 'Hermana'], respuesta: 0 },
                                { japones: '母', lectura: 'haha', opciones: ['Madre', 'Padre', 'Hermano', 'Hermana'], respuesta: 0 },
                                { japones: '兄弟', lectura: 'kyoudai', opciones: ['Hermanos', 'Padres', 'Abuelos', 'Tíos'], respuesta: 0 },
                                { japones: '姉妹', lectura: 'shimai', opciones: ['Hermanas', 'Hermanos', 'Primos', 'Tíos'], respuesta: 0 },
                                { japones: '祖父', lectura: 'sofu', opciones: ['Abuelo', 'Abuela', 'Padre', 'Madre'], respuesta: 0 },
                                { japones: '祖母', lectura: 'sobo', opciones: ['Abuela', 'Abuelo', 'Madre', 'Padre'], respuesta: 0 },
                                { japones: '親戚', lectura: 'shinseki', opciones: ['Parientes', 'Amigos', 'Vecinos', 'Conocidos'], respuesta: 0 },
                                { japones: '家庭', lectura: 'katei', opciones: ['Hogar', 'Escuela', 'Trabajo', 'Comunidad'], respuesta: 0 },
                                { japones: '愛情', lectura: 'aijou', opciones: ['Amor familiar', 'Amistad', 'Respeto', 'Admiración'], respuesta: 0 }
                            ]
                        }
                        // ... puedes agregar más mazos para sub1_3
                    ]
                }
            ]
        },
        {
            id: "the-last-summer-2",
            nombre: "THE LAST SUMMER 2",
            icono: "fas fa-sun",
            descripcion: "Continuación de The Last Summer",
            subtemas: [
                {
                    id: "sub2_1",
                    nombre: "Volumen 2 - Parte 1",
                    icono: "fas fa-comments",
                    mazos: [
                        {
                            id: "sub2_1_mazo1",
                            nombre: "Mazo 1 - Comunicación",
                            icono: "fas fa-comment-dots",
                            descripcion: "Términos de conversación",
                            recompensa: 2,
                            palabras: [
                                { japones: '会話', lectura: 'kaiwa', opciones: ['Conversación', 'Discusión', 'Debate', 'Charla'], respuesta: 0 },
                                { japones: '質問', lectura: 'shitsumon', opciones: ['Pregunta', 'Respuesta', 'Explicación', 'Afirmación'], respuesta: 0 },
                                { japones: '返事', lectura: 'henji', opciones: ['Respuesta', 'Pregunta', 'Solicitud', 'Propuesta'], respuesta: 0 },
                                { japones: '説明', lectura: 'setsumei', opciones: ['Explicación', 'Descripción', 'Interpretación', 'Traducción'], respuesta: 0 },
                                { japones: '意見', lectura: 'iken', opciones: ['Opinión', 'Hecho', 'Teoría', 'Hipótesis'], respuesta: 0 },
                                { japones: '賛成', lectura: 'sansei', opciones: ['Aprobación', 'Desaprobación', 'Neutralidad', 'Indiferencia'], respuesta: 0 },
                                { japones: '反対', lectura: 'hantai', opciones: ['Oposición', 'Apoyo', 'Aceptación', 'Acuerdo'], respuesta: 0 },
                                { japones: '同意', lectura: 'doui', opciones: ['Consentimiento', 'Rechazo', 'Duda', 'Indecisión'], respuesta: 0 },
                                { japones: '議論', lectura: 'giron', opciones: ['Discusión', 'Conversación', 'Monólogo', 'Diálogo'], respuesta: 0 },
                                { japones: '話題', lectura: 'wadai', opciones: ['Tema', 'Subtema', 'Asunto', 'Problema'], respuesta: 0 }
                            ]
                        }
                        // ... más mazos para sub2_1
                    ]
                },
                {
                    id: "sub2_2",
                    nombre: "Volumen 2 - Parte 2",
                    icono: "fas fa-flask",
                    mazos: [
                        {
                            id: "sub2_2_mazo1",
                            nombre: "Mazo 1 - Ciencia y Tecnología",
                            icono: "fas fa-microscope",
                            descripcion: "Términos científicos",
                            recompensa: 2,
                            palabras: [
                                { japones: '技術', lectura: 'gijutsu', opciones: ['Tecnología', 'Arte', 'Ciencia', 'Filosofía'], respuesta: 0 },
                                { japones: '科学', lectura: 'kagaku', opciones: ['Ciencia', 'Arte', 'Literatura', 'Historia'], respuesta: 0 },
                                { japones: '研究', lectura: 'kenkyuu', opciones: ['Investigación', 'Improvisación', 'Suposición', 'Adivinanza'], respuesta: 0 },
                                { japones: '開発', lectura: 'kaihatsu', opciones: ['Desarrollo', 'Destrucción', 'Abandono', 'Estancamiento'], respuesta: 0 },
                                { japones: '発明', lectura: 'hatsumei', opciones: ['Invención', 'Descubrimiento', 'Copia', 'Imitación'], respuesta: 0 },
                                { japones: '革新', lectura: 'kakushin', opciones: ['Innovación', 'Tradición', 'Conservación', 'Preservación'], respuesta: 0 },
                                { japones: '実験', lectura: 'jikken', opciones: ['Experimento', 'Teoría', 'Hipótesis', 'Conclusión'], respuesta: 0 },
                                { japones: '分析', lectura: 'bunseki', opciones: ['Análisis', 'Síntesis', 'Resumen', 'Conclusión'], respuesta: 0 },
                                { japones: '理論', lectura: 'riron', opciones: ['Teoría', 'Práctica', 'Evidencia', 'Hecho'], respuesta: 0 },
                                { japones: '応用', lectura: 'ouyou', opciones: ['Aplicación', 'Teoría', 'Abstracción', 'Concepto'], respuesta: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: "sub2_3",
                    nombre: "Volumen 2 - Parte 3",
                    icono: "fas fa-plane",
                    mazos: [
                        {
                            id: "sub2_3_mazo1",
                            nombre: "Mazo 1 - Viajes",
                            icono: "fas fa-suitcase",
                            descripcion: "Términos de viajes y turismo",
                            recompensa: 2,
                            palabras: [
                                { japones: '旅行', lectura: 'ryokou', opciones: ['Viaje', 'Estancia', 'Residencia', 'Hogar'], respuesta: 0 },
                                { japones: '観光', lectura: 'kankou', opciones: ['Turismo', 'Trabajo', 'Estudio', 'Residencia'], respuesta: 0 },
                                { japones: '目的地', lectura: 'mokutekichi', opciones: ['Destino', 'Origen', 'Partida', 'Llegada'], respuesta: 0 },
                                { japones: '出発', lectura: 'shuppatsu', opciones: ['Salida', 'Llegada', 'Estancia', 'Permanencia'], respuesta: 0 },
                                { japones: '到着', lectura: 'touchaku', opciones: ['Llegada', 'Salida', 'Partida', 'Inicio'], respuesta: 0 },
                                { japones: '宿泊', lectura: 'shukuhaku', opciones: ['Alojamiento', 'Comida', 'Transporte', 'Entretenimiento'], respuesta: 0 },
                                { japones: '旅程', lectura: 'ryotei', opciones: ['Itinerario', 'Destino', 'Origen', 'Medio'], respuesta: 0 },
                                { japones: '観光地', lectura: 'kankouchi', opciones: ['Atracción turística', 'Zona residencial', 'Área industrial', 'Barrio comercial'], respuesta: 0 },
                                { japones: '土産', lectura: 'miyage', opciones: ['Souvenir', 'Recuerdo', 'Regalo', 'Compra'], respuesta: 0 },
                                { japones: '冒険', lectura: 'bouken', opciones: ['Aventura', 'Rutina', 'Seguridad', 'Estabilidad'], respuesta: 0 }
                            ]
                        }
                    ]
                },
                {
                    id: "sub2_4",
                    nombre: "Volumen 2 - Parte 4",
                    icono: "fas fa-heart",
                    mazos: [
                        {
                            id: "sub2_4_mazo1",
                            nombre: "Mazo 1 - Relaciones",
                            icono: "fas fa-user-friends",
                            descripcion: "Términos de relaciones familiares",
                            recompensa: 2,
                            palabras: [
                                { japones: 'あらすじ', lectura: 'arasuji', opciones: ['sinopsis', 'título', 'capítulo', 'final'], respuesta: 0 },
                                { japones: '親', lectura: 'oya', opciones: ['padre/madre', 'hijo', 'hermano', 'amigo'], respuesta: 0 },
                                { japones: '再婚', lectura: 'saikon', opciones: ['nuevo matrimonio', 'divorcio', 'separación', 'compromiso'], respuesta: 0 },
                                { japones: '北欧', lectura: 'hokuō', opciones: ['países nórdicos', 'Asia', 'América', 'África'], respuesta: 0 },
                                { japones: '義妹', lectura: 'gimai', opciones: ['hermanastra', 'hermana', 'prima', 'sobrina'], respuesta: 0 },
                                { japones: '家族', lectura: 'kazoku', opciones: ['familia', 'amigos', 'compañeros', 'vecinos'], respuesta: 0 },
                                { japones: '歩み寄る', lectura: 'ayumiyoru', opciones: ['acercarse buscar entendimiento', 'alejarse', 'ignorar', 'confrontar'], respuesta: 0 },
                                { japones: '健気', lectura: 'kenage', opciones: ['valiente', 'cobarde', 'débil', 'indiferente'], respuesta: 0 },
                                { japones: '義兄', lectura: 'gikei', opciones: ['hermanastro mayor', 'hermano', 'primo', 'tío'], respuesta: 0 },
                                { japones: '応える', lectura: 'kotaeru', opciones: ['responder', 'preguntar', 'ignorar', 'escuchar'], respuesta: 0 }
                            ]
                        },
                        {
                            id: "sub2_4_mazo2",
                            nombre: "Mazo 2 - Situaciones",
                            icono: "fas fa-exclamation-circle",
                            descripcion: "Situaciones especiales",
                            recompensa: 2,
                            palabras: [
                                { japones: '偶然', lectura: 'gūzen', opciones: ['casualidad', 'destino', 'plan', 'intención'], respuesta: 0 },
                                { japones: '裸', lectura: 'hadaka', opciones: ['desnudo', 'vestido', 'parcial', 'cubierto'], respuesta: 0 },
                                { japones: '理性', lectura: 'risei', opciones: ['razón', 'emoción', 'instinto', 'pasión'], respuesta: 0 },
                                { japones: '崩壊', lectura: 'hōkai', opciones: ['colapso', 'construcción', 'estabilidad', 'fortalecimiento'], respuesta: 0 },
                                { japones: 'ぽよん', lectura: 'poyon', opciones: ['onomatopeya de rebote', 'sonido de agua', 'sonido de viento', 'sonido de golpe'], respuesta: 0 },
                                { japones: 'とうとう', lectura: 'tōtō', opciones: ['finalmente', 'nunca', 'pronto', 'tarde'], respuesta: 0 },
                                { japones: 'がっつり', lectura: 'gattsuri', opciones: ['intensamente', 'ligeramente', 'suavemente', 'moderadamente'], respuesta: 0 },
                                { japones: '生ハメ交尾', lectura: 'namahame kōbi', opciones: ['sexo sin protección', 'sexo protegido', 'beso', 'abrazo'], respuesta: 0 },
                                { japones: 'お国柄', lectura: 'okunikara', opciones: ['costumbres nacionales', 'costumbres familiares', 'costumbres personales', 'costumbres modernas'], respuesta: 0 },
                                { japones: '意外', lectura: 'igai', opciones: ['inesperado', 'obvio', 'predecible', 'común'], respuesta: 0 }
                            ]
                        }
                        // ... puedes agregar los mazos 3-6 aquí
                    ]
                }
            ]
        },
        {
            id: "yamada",
            nombre: "YAMADA",
            icono: "fas fa-user-ninja",
            descripcion: "Vocabulario de la serie Yamada",
            subtemas: [
                {
                    id: "sub3_1",
                    nombre: "Volumen 1",
                    icono: "fas fa-book",
                    mazos: [
                        {
                            id: "sub3_1_mazo1",
                            nombre: "Mazo 1 - Inicio",
                            icono: "fas fa-play",
                            descripcion: "Inicio de la historia",
                            recompensa: 2,
                            palabras: [
                                { japones: 'こんなこと', lectura: 'konna koto', opciones: ['algo así', 'nada', 'todo', 'alguien'], respuesta: 0 },
                                { japones: '俺達', lectura: 'oretachi', opciones: ['nosotros', 'ellos', 'ustedes', 'vosotros'], respuesta: 0 },
                                { japones: '伝える', lectura: 'tsutaeru', opciones: ['comunicar', 'escuchar', 'escribir', 'leer'], respuesta: 0 },
                                { japones: '無事', lectura: 'buji', opciones: ['sin problemas', 'con problemas', 'peligroso', 'difícil'], respuesta: 0 },
                                { japones: '順調', lectura: 'junchou', opciones: ['ir bien', 'ir mal', 'empeorar', 'estancarse'], respuesta: 0 },
                                { japones: '続', lectura: 'tsuzuku', opciones: ['continuar', 'parar', 'empezar', 'terminar'], respuesta: 0 },
                                { japones: '実際', lectura: 'jissai', opciones: ['en realidad', 'en teoría', 'aparentemente', 'posiblemente'], respuesta: 0 },
                                { japones: '周', lectura: 'mawari', opciones: ['alrededor', 'dentro', 'fuera', 'lejos'], respuesta: 0 },
                                { japones: 'ちょっかい', lectura: 'chokkai', opciones: ['molestias', 'ayuda', 'silencio', 'apoyo'], respuesta: 0 },
                                { japones: '厄介', lectura: 'yakkai', opciones: ['problemas', 'soluciones', 'facilidades', 'ventajas'], respuesta: 0 }
                            ]
                        }
                        // ... más mazos para sub3_1
                    ]
                }
                // ... más subtemas para YAMADA
            ]
        },
        {
            id: "contenedor-4",
            nombre: "Contenedor 4",
            icono: "fas fa-box",
            descripcion: "Cuarto contenedor de vocabulario",
            subtemas: [
                {
                    id: "sub4_1",
                    nombre: "Volumen 1",
                    icono: "fas fa-film",
                    mazos: [
                        {
                            id: "sub4_1_mazo1",
                            nombre: "Mazo 1 - Entretenimiento",
                            icono: "fas fa-tv",
                            descripcion: "Términos de entretenimiento",
                            recompensa: 2,
                            palabras: [
                                { japones: '今はちょうど', lectura: 'ima wa choudo', opciones: ['Justo ahora', 'Ya terminó', 'Hace mucho', 'Más tarde'], respuesta: 0 },
                                { japones: '芸能', lectura: 'geinou', opciones: ['Entretenimiento', 'Deporte', 'Política', 'Academia'], respuesta: 0 },
                                { japones: '活動', lectura: 'katsudou', opciones: ['Actividad', 'Descanso', 'Pausa', 'Inactividad'], respuesta: 0 },
                                { japones: '時期', lectura: 'jikan', opciones: ['Período/Época', 'Lugar', 'Persona', 'Razón'], respuesta: 0 },
                                { japones: 'せっかく 来れたのに', lectura: 'sekkaku korareta noni', opciones: ['Aunque vine con dificultad...', 'Porque fue fácil venir', 'Ya que no pude venir', 'Como no tenía planes'], respuesta: 0 },
                                { japones: '水の泡', lectura: 'mizu no awa', opciones: ['En vano/Agua pasada', 'Gran éxito', 'Sorpresa', 'Ceremonia'], respuesta: 0 },
                                { japones: 'そうなったら', lectura: 'sou nattara', opciones: ['Si eso sucede', 'Antes de que suceda', 'Aunque no suceda', 'Porque sucedió'], respuesta: 0 },
                                { japones: 'すればいい', lectura: 'sureba ii', opciones: ['Deberías hacer (sugerencia)', 'No deberías hacer', 'Es imposible hacer', 'Es obligatorio hacer'], respuesta: 0 },
                                { japones: '未来の明るい', lectura: 'mirai no akarui', opciones: ['Con un futuro brillante', 'Con un futuro oscuro', 'Sin futuro', 'Con un futuro incierto'], respuesta: 0 },
                                { japones: '元女優が', lectura: 'moto joyuu ga', opciones: ['Una ex actriz', 'Una actriz principiante', 'Una actriz famosa', 'Una directora'], respuesta: 0 }
                            ]
                        }
                        // ... más mazos para sub4_1
                    ]
                }
                // ... más subtemas para contenedor 4
            ]
        }
        // Puedes agregar más temas aquí (contenedores 5-10)
    ]
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.vocabulario = vocabulario;
}
