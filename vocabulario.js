// ============================================================================
// VOCABULARIO COMPLETO - CON LÓGICA CORREGIDA
// LA PRIMERA OPCIÓN ES SIEMPRE LA RESPUESTA CORRECTA (respuesta: 0)
// ============================================================================

const vocabularioDatabase = {
    // THE LAST SUMMER 1 - Subcontenedor 1.1
    'sub1_1': {
        1: [
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
        ],
        2: [
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
        ],
        3: [
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
        ],
        4: [
            { japones: '合格', lectura: 'goukaku', opciones: ['Aprobar', 'Reprobar', 'Intentar', 'Estudiar'], respuesta: 0 },
            { japones: '圧し潰す', lectura: 'asshitsubusu', opciones: ['Aplastar', 'Levantar', 'Construir', 'Reparar'], respuesta: 0 },
            { japones: '密着', lectura: 'micchaku', opciones: ['Pegado', 'Separado', 'Distante', 'Aislado'], respuesta: 0 },
            { japones: '届く', lectura: 'todoku', opciones: ['Llegar', 'Partir', 'Perderse', 'Desaparecer'], respuesta: 0 },
            { japones: '巻きつく', lectura: 'makitsuku', opciones: ['Enrollarse', 'Desenrollar', 'Cortar', 'Pegar'], respuesta: 0 },
            { japones: '惜しい', lectura: 'oshii', opciones: ['Lamentable', 'Afortunado', 'Normal', 'Extraño'], respuesta: 0 },
            { japones: '拒否権', lectura: 'kyohiken', opciones: ['Derecho a veto', 'Permiso', 'Aprobación', 'Acuerdo'], respuesta: 0 },
            { japones: '経験', lectura: 'keiken', opciones: ['Experiencia', 'Ignorancia', 'Teoría', 'Estudio'], respuesta: 0 },
            { japones: '蒸す', lectura: 'musu', opciones: ['Humedecer', 'Secar', 'Calentar', 'Enfriar'], respuesta: 0 },
            { japones: '大体', lectura: 'daitai', opciones: ['Aproximadamente', 'Exactamente', 'Completamente', 'Parcialmente'], respuesta: 0 }
        ],
        5: [
            { japones: '大体', lectura: 'daitai', opciones: ['Aproximadamente', 'Exactamente', 'Completamente', 'Parcialmente'], respuesta: 0 },
            { japones: '起きる', lectura: 'okiru', opciones: ['Despertar', 'Dormir', 'Soñar', 'Descansar'], respuesta: 0 },
            { japones: '学校', lectura: 'gakkou', opciones: ['Escuela', 'Casa', 'Trabajo', 'Parque'], respuesta: 0 },
            { japones: '勉強', lectura: 'benkyou', opciones: ['Estudio', 'Juego', 'Descanso', 'Trabajo'], respuesta: 0 },
            { japones: '教室', lectura: 'kyoushitsu', opciones: ['Salón de clases', 'Oficina', 'Cocina', 'Baño'], respuesta: 0 },
            { japones: '先生', lectura: 'sensei', opciones: ['Profesor', 'Estudiante', 'Director', 'Padre'], respuesta: 0 },
            { japones: '生徒', lectura: 'seito', opciones: ['Estudiante', 'Profesor', 'Padre', 'Vecino'], respuesta: 0 },
            { japones: '試験', lectura: 'shiken', opciones: ['Examen', 'Tarea', 'Proyecto', 'Presentación'], respuesta: 0 },
            { japones: '宿題', lectura: 'shukudai', opciones: ['Tarea', 'Examen', 'Proyecto', 'Investigación'], respuesta: 0 },
            { japones: '卒業', lectura: 'sotsugyou', opciones: ['Graduación', 'Ingreso', 'Transferencia', 'Abandono'], respuesta: 0 }
        ]
    },

    // THE LAST SUMMER 2 - Subcontenedor 2.4 (ejemplo)
    'sub2_4': {
        1: [
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
        ],
        2: [
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
        ],
        // ... resto de mazos
    },

    // YAMADA - Subcontenedor 3.1
    'sub3_1': {
        1: [
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
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.vocabularioDatabase = vocabularioDatabase;
}
