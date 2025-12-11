// ============================================================================
// VOCABULARIO COMPLETO - ESTRUCTURA ORGANIZADA
// Temas -> Subtemas -> Mazos -> Palabras
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
                            nombre: "Mazo 1",
                            icono: "fas fa-list-ol",
                            descripcion: "10 palabras básicas",
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
                            nombre: "Mazo 2",
                            icono: "fas fa-list-ol",
                            descripcion: "10 palabras adicionales",
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
                            nombre: "Mazo 3",
                            icono: "fas fa-list-ol",
                            descripcion: "10 palabras más",
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
                            nombre: "Mazo 1 - Escuela",
                            icono: "fas fa-graduation-cap",
                            descripcion: "Vocabulario escolar básico",
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
                            nombre: "Mazo 2 - Actividades",
                            icono: "fas fa-futbol",
                            descripcion: "Eventos escolares",
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
                }
            ]
        },
        {
            id: "the-last-summer-2",
            nombre: "THE LAST SUMMER 2",
            icono: "fas fa-sun",
            descripcion: "Segunda parte de The Last Summer",
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
                    ]
                },
                {
                    id: "sub2_2",
                    nombre: "Volumen 2 - Parte 2",
                    icono: "fas fa-flask",
                    mazos: [
                        {
                            id: "sub2_2_mazo1",
                            nombre: "Mazo 1 - Ciencia",
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
                }
            ]
        },
        {
            id: "yamada",
            nombre: "YAMADA",
            icono: "fas fa-user-ninja",
            descripción: "Vocabulario de la serie Yamada",
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
                        },
                        {
                            id: "sub3_1_mazo2",
                            nombre: "Mazo 2 - Desarrollo",
                            icono: "fas fa-chart-line",
                            descripcion: "Desarrollo de la historia",
                            recompensa: 2,
                            palabras: [
                                { japones: '大変', lectura: 'taihen', opciones: ['duro', 'fácil', 'simple', 'sencillo'], respuesta: 0 },
                                { japones: '男女', lectura: 'danjo', opciones: ['hombre y mujer', 'amigos', 'familia', 'compañeros'], respuesta: 0 },
                                { japones: '流', lectura: 'nagare', opciones: ['fluir', 'estancar', 'parar', 'bloquear'], respuesta: 0 },
                                { japones: '初体験', lectura: 'hatsu taiken', opciones: ['primera experiencia íntima', 'última vez', 'experiencia común', 'práctica'], respuesta: 0 },
                                { japones: '成功', lectura: 'seikou', opciones: ['fue un éxito', 'fue un fracaso', 'fue normal', 'fue mediocre'], respuesta: 0 },
                                { japones: '更に', lectura: 'sara ni', opciones: ['todavía más', 'menos', 'igual', 'diferente'], respuesta: 0 },
                                { japones: '深まる', lectura: 'fukamaru', opciones: ['profundizar', 'superficial', 'disminuir', 'reducir'], respuesta: 0 },
                                { japones: 'タガ', lectura: 'taga', opciones: ['limitación', 'libertad', 'expansión', 'apertura'], respuesta: 0 },
                                { japones: '外れる', lectura: 'hazureru', opciones: ['salirse', 'quedarse', 'entrar', 'fijarse'], respuesta: 0 },
                                { japones: '初々しい', lectura: 'ui ui shii', opciones: ['primero', 'experimentado', 'viejo', 'usado'], respuesta: 0 }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.vocabulario = vocabulario;
}
