// Datos de vocabulario - 10 mangas con 10 mazos cada uno
// Cada mazo tiene 10 palabras japonesas únicas

const VOCABULARIO = {
    mangas: [
        {
            id: 0,
            nombre: "One Piece",
            icono: "🦜",
            color: "#FF9800",
            mazos: [
                {
                    id: 0,
                    nombre: "Fruta del Diablo",
                    palabras: [
                        { japones: "ゴムゴムの実", romaji: "Gomu Gomu no Mi", significado: "Fruta Gomu Gomu", opciones: ["Gomu Fruit", "Rubber Fruit", "Elastic Fruit", "Stretch Fruit"] },
                        { japones: "メラメラの実", romaji: "Mera Mera no Mi", significado: "Fruta Mera Mera", opciones: ["Fire Fruit", "Flame Fruit", "Blaze Fruit", "Burn Fruit"] },
                        { japones: "ヒエヒエの実", romaji: "Hie Hie no Mi", significado: "Fruta Hie Hie", opciones: ["Ice Fruit", "Cold Fruit", "Freeze Fruit", "Chill Fruit"] },
                        { japones: "ウシウシの実", romaji: "Ushi Ushi no Mi", significado: "Fruta Ushi Ushi", opciones: ["Cow Fruit", "Ox Fruit", "Bull Fruit", "Bovine Fruit"] },
                        { japones: "イトイトの実", romaji: "Ito Ito no Mi", significado: "Fruta Ito Ito", opciones: ["String Fruit", "Thread Fruit", "Wire Fruit", "Line Fruit"] },
                        { japones: "オペオペの実", romaji: "Ope Ope no Mi", significado: "Fruta Ope Ope", opciones: ["Op Op Fruit", "Operation Fruit", "Surgical Fruit", "Medical Fruit"] },
                        { japones: "ヤミヤミの実", romaji: "Yami Yami no Mi", significado: "Fruta Yami Yami", opciones: ["Dark Dark Fruit", "Darkness Fruit", "Shadow Fruit", "Void Fruit"] },
                        { japones: "マギマギの実", romaji: "Magi Magi no Mi", significado: "Fruta Magi Magi", opciones: ["Love Love Fruit", "Charm Fruit", "Allure Fruit", "Seduction Fruit"] },
                        { japones: "スナスナの実", romaji: "Suna Suna no Mi", significado: "Fruta Suna Suna", opciones: ["Sand Sand Fruit", "Desert Fruit", "Grit Fruit", "Dune Fruit"] },
                        { japones: "モチモチの実", romaji: "Mochi Mochi no Mi", significado: "Fruta Mochi Mochi", opciones: ["Mochi Mochi Fruit", "Sticky Fruit", "Glutinous Fruit", "Rice Cake Fruit"] }
                    ]
                },
                {
                    id: 1,
                    nombre: "Tripulación",
                    palabras: [
                        { japones: "船長", romaji: "Senchō", significado: "Capitán", opciones: ["Captain", "Leader", "Boss", "Chief"] },
                        { japones: "航海士", romaji: "Kōkaishi", significado: "Navegante", opciones: ["Navigator", "Sailor", "Helmsman", "Pilot"] },
                        { japones: "戦闘員", romaji: "Sentōin", significado: "Luchador", opciones: ["Fighter", "Warrior", "Combatant", "Battler"] },
                        { japones: "船医", romaji: "Sen'i", significado: "Médico del barco", opciones: ["Ship Doctor", "Surgeon", "Medic", "Physician"] },
                        { japones: "コック", romaji: "Kokku", significado: "Cocinero", opciones: ["Cook", "Chef", "Baker", "Kitchen Staff"] },
                        { japones: "考古学者", romaji: "Kōkogakusha", significado: "Arqueólogo", opciones: ["Archaeologist", "Historian", "Researcher", "Scholar"] },
                        { japones: "船大工", romaji: "Funadaiku", significado: "Carpintero naval", opciones: ["Shipwright", "Carpenter", "Builder", "Craftsman"] },
                        { japones: "音楽家", romaji: "Ongakuka", significado: "Músico", opciones: ["Musician", "Singer", "Player", "Performer"] },
                        { japones: "狙撃手", romaji: "Sogekishu", significado: "Francotirador", opciones: ["Sniper", "Marksman", "Sharpshooter", "Gunner"] },
                        { japones: "船員", romaji: "Sen'in", significado: "Tripulante", opciones: ["Crew Member", "Sailor", "Seaman", "Deckhand"] }
                    ]
                },
                {
                    id: 2,
                    nombre: "Islas y Lugares",
                    palabras: [
                        { japones: "島", romaji: "Shima", significado: "Isla", opciones: ["Island", "Isle", "Atoll", "Key"] },
                        { japones: "海", romaji: "Umi", significado: "Mar", opciones: ["Sea", "Ocean", "Waters", "Deep"] },
                        { japones: "港", romaji: "Minato", significado: "Puerto", opciones: ["Port", "Harbor", "Dock", "Marina"] },
                        { japones: "村", romaji: "Mura", significado: "Pueblo", opciones: ["Village", "Town", "Hamlet", "Settlement"] },
                        { japones: "町", romaji: "Machi", significado: "Ciudad", opciones: ["Town", "City", "Municipality", "Borough"] },
                        { japones: "国", romaji: "Kuni", significado: "País", opciones: ["Country", "Nation", "State", "Land"] },
                        { japones: "海賊", romaji: "Kaizoku", significado: "Pirata", opciones: ["Pirate", "Corsair", "Buccaneer", "Raider"] },
                        { japones: "海軍", romaji: "Kaigun", significado: "Marina", opciones: ["Navy", "Marines", "Fleet", "Seaborne"] },
                        { japones: "宝", romaji: "Takara", significado: "Tesoro", opciones: ["Treasure", "Wealth", "Fortune", "Bounty"] },
                        { japones: "冒険", romaji: "Bōken", significado: "Aventura", opciones: ["Adventure", "Quest", "Expedition", "Journey"] }
                    ]
                },
                {
                    id: 3,
                    nombre: "Técnicas de Combate",
                    palabras: [
                        { japones: "技", romaji: "Waza", significado: "Técnica", opciones: ["Technique", "Skill", "Move", "Ability"] },
                        { japones: "攻撃", romaji: "Kōgeki", significado: "Ataque", opciones: ["Attack", "Assault", "Strike", "Offensive"] },
                        { japones: "防御", romaji: "Bōgyo", significado: "Defensa", opciones: ["Defense", "Protection", "Shield", "Guard"] },
                        { japones: "回避", romaji: "Kaihi", significado: "Esquiva", opciones: ["Dodge", "Evade", "Avoid", "Duck"] },
                        { japones: "必殺技", romaji: "Hissatsu-waza", significado: "Técnica mortal", opciones: ["Finishing Move", "Special Attack", "Killer Technique", "Ultimate Move"] },
                        { japones: "修行", romaji: "Shugyō", significado: "Entrenamiento", opciones: ["Training", "Practice", "Discipline", "Exercise"] },
                        { japones: "強化", romaji: "Kyōka", significado: "Fortalecimiento", opciones: ["Strengthening", "Enhancement", "Boost", "Power-up"] },
                        { japones: "覚醒", romaji: "Kakusei", significado: "Despertar", opciones: ["Awakening", "Arousal", "Revival", "Enlightenment"] },
                        { japones: "覇気", romaji: "Haki", significado: "Haki", opciones: ["Haki", "Spirit", "Willpower", "Aura"] },
                        { japones: "戦闘", romaji: "Sentō", significado: "Batalla", opciones: ["Battle", "Fight", "Combat", "Conflict"] }
                    ]
                },
                {
                    id: 4,
                    nombre: "Objetos y Armas",
                    palabras: [
                        { japones: "刀", romaji: "Katana", significado: "Espada", opciones: ["Sword", "Katana", "Blade", "Saber"] },
                        { japones: "銃", romaji: "Jū", significado: "Pistola", opciones: ["Gun", "Pistol", "Firearm", "Weapon"] },
                        { japones: "棒", romaji: "Bō", significado: "Palo", opciones: ["Stick", "Rod", "Pole", "Staff"] },
                        { japones: "盾", romaji: "Tate", significado: "Escudo", opciones: ["Shield", "Buckler", "Protection", "Barrier"] },
                        { japones: "船", romaji: "Fune", significado: "Barco", opciones: ["Ship", "Boat", "Vessel", "Craft"] },
                        { japones: "宝箱", romaji: "Takarabako", significado: "Cofre del tesoro", opciones: ["Treasure Chest", "Strongbox", "Coffer", "Box"] },
                        { japones: "地図", romaji: "Chizu", significado: "Mapa", opciones: ["Map", "Chart", "Plan", "Diagram"] },
                        { japones: "日誌", romaji: "Nisshi", significado: "Diario", opciones: ["Logbook", "Journal", "Diary", "Record"] },
                        { japones: "貝", romaji: "Kai", significado: "Concha", opciones: ["Shell", "Seashell", "Conch", "Mollusk"] },
                        { japones: "罠", romaji: "Wana", significado: "Trampa", opciones: ["Trap", "Snare", "Ambush", "Pitfall"] }
                    ]
                },
                // 5 mazos más para One Piece...
                {
                    id: 5,
                    nombre: "Emociones",
                    palabras: [
                        { japones: "嬉しい", romaji: "Ureshii", significado: "Feliz", opciones: ["Happy", "Glad", "Joyful", "Delighted"] },
                        { japones: "悲しい", romaji: "Kanashii", significado: "Triste", opciones: ["Sad", "Sorrowful", "Unhappy", "Mournful"] },
                        { japones: "怒る", romaji: "Okoru", significado: "Enojarse", opciones: ["Get Angry", "Rage", "Fume", "Seethe"] },
                        { japones: "楽しい", romaji: "Tanoshii", significado: "Divertido", opciones: ["Fun", "Enjoyable", "Pleasant", "Amusing"] },
                        { japones: "怖い", romaji: "Kowai", significado: "Temeroso", opciones: ["Scary", "Frightening", "Terrifying", "Fearful"] },
                        { japones: "恥ずかしい", romaji: "Hazukashii", significado: "Vergonzoso", opciones: ["Embarrassing", "Shameful", "Awkward", "Humiliating"] },
                        { japones: "興奮", romaji: "Kōfun", significado: "Emoción", opciones: ["Excitement", "Thrill", "Arousal", "Stimulation"] },
                        { japones: "驚く", romaji: "Odoroku", significado: "Sorprenderse", opciones: ["Be Surprised", "Be Amazed", "Be Astonished", "Be Shocked"] },
                        { japones: "安心", romaji: "Anshin", significado: "Alivio", opciones: ["Relief", "Comfort", "Reassurance", "Peace of Mind"] },
                        { japones: "希望", romaji: "Kibō", significado: "Esperanza", opciones: ["Hope", "Wish", "Desire", "Aspiration"] }
                    ]
                }
            ]
        },
        {
            id: 1,
            nombre: "Naruto",
            icono: "🍥",
            color: "#FF5722",
            mazos: [
                {
                    id: 0,
                    nombre: "Jutsus",
                    palabras: [
                        { japones: "影分身の術", romaji: "Kage Bunshin no Jutsu", significado: "Técnica de Clonación de Sombras", opciones: ["Shadow Clone Technique", "Clone Jutsu", "Doppelganger Technique", "Mirror Image Jutsu"] },
                        { japones: "螺旋丸", romaji: "Rasengan", significado: "Esfera Espiral", opciones: ["Spiraling Sphere", "Whirlwind Sphere", "Cyclone Ball", "Vortex Sphere"] },
                        { japones: "写輪眼", romaji: "Sharingan", significado: "Ojo Copiador", opciones: ["Copy Wheel Eye", "Sharingan Eye", "Mirror Eye", "Duplicate Eye"] },
                        { japones: "輪廻眼", romaji: "Rinnegan", significado: "Ojo Samsara", opciones: ["Samsara Eye", "Reincarnation Eye", "Cycle Eye", "Transmigration Eye"] },
                        { japones: "白眼", romaji: "Byakugan", significado: "Ojo Blanco", opciones: ["White Eye", "All-Seeing Eye", "Pure Eye", "Clear Eye"] },
                        { japones: "忍術", romaji: "Ninjutsu", significado: "Técnica Ninja", opciones: ["Ninja Technique", "Ninjutsu", "Shinobi Art", "Stealth Technique"] },
                        { japones: "体術", romaji: "Taijutsu", significado: "Técnica Corporal", opciones: ["Body Technique", "Martial Arts", "Physical Technique", "Hand-to-Hand"] },
                        { japones: "幻術", romaji: "Genjutsu", significado: "Técnica Ilusoria", opciones: ["Illusion Technique", "Genjutsu", "Phantom Technique", "Mirage Jutsu"] },
                        { japones: "口寄せの術", romaji: "Kuchiyose no Jutsu", significado: "Técnica de Invocación", opciones: ["Summoning Technique", "Invocation Jutsu", "Calling Technique", "Conjuration Jutsu"] },
                        { japones: "封印術", romaji: "Fūinjutsu", significado: "Técnica de Sellado", opciones: ["Sealing Technique", "Confinement Jutsu", "Locking Technique", "Binding Jutsu"] }
                    ]
                },
                {
                    id: 1,
                    nombre: "Personajes",
                    palabras: [
                        { japones: "火影", romaji: "Hokage", significado: "Sombra del Fuego", opciones: ["Fire Shadow", "Hokage", "Fire Kage", "Flame Shadow"] },
                        { japones: "忍者", romaji: "Ninja", significado: "Ninja", opciones: ["Ninja", "Shinobi", "Stealth Warrior", "Shadow Warrior"] },
                        { japones: "下忍", romaji: "Genin", significado: "Ninja de Rango Bajo", opciones: ["Genin", "Low-Level Ninja", "Academy Graduate", "Beginner Ninja"] },
                        { japones: "中忍", romaji: "Chūnin", significado: "Ninja de Rango Medio", opciones: ["Chunin", "Middle-Level Ninja", "Journeyman Ninja", "Field Ninja"] },
                        { japones: "上忍", romaji: "Jōnin", significado: "Ninja de Rango Alto", opciones: ["Jonin", "High-Level Ninja", "Elite Ninja", "Master Ninja"] },
                        { japones: "暗部", romaji: "Anbu", significado: "Lado Oscuro", opciones: ["Anbu", "Dark Side", "Black Ops", "Covert Ops"] },
                        { japones: "忍村", romaji: "Ninpura", significado: "Aldea Oculta", opciones: ["Hidden Village", "Ninja Village", "Shinobi Settlement", "Clan Village"] },
                        { japones: "尾獣", romaji: "Bijū", significado: "Bestia con Cola", opciones: ["Tailed Beast", "Bijuu", "Tail Beast", "Chakra Beast"] },
                        { japones: "人柱力", romaji: "Jinchūriki", significado: "Recipiente de Poder", opciones: ["Jinchuriki", "Power Vessel", "Container", "Host"] },
                        { japones: "伝説", romaji: "Densetsu", significado: "Leyenda", opciones: ["Legend", "Myth", "Saga", "Folklore"] }
                    ]
                }
            ]
        },
        {
            id: 2,
            nombre: "Attack on Titan",
            icono: "⚔️",
            color: "#2196F3",
            mazos: [
                {
                    id: 0,
                    nombre: "Titanes",
                    palabras: [
                        { japones: "進撃の巨人", romaji: "Shingeki no Kyojin", significado: "Titán de Ataque", opciones: ["Attack Titan", "Assault Titan", "Offensive Titan", "Advancing Titan"] },
                        { japones: "鎧の巨人", romaji: "Yoroi no Kyojin", significado: "Titán Acorazado", opciones: ["Armored Titan", "Knight Titan", "Plated Titan", "Shelled Titan"] },
                        { japones: "超大型巨人", romaji: "Chō ōgata Kyojin", significado: "Titán Colosal", opciones: ["Colossus Titan", "Giant Titan", "Enormous Titan", "Massive Titan"] },
                        { japones: "獣の巨人", romaji: "Kemono no Kyojin", significado: "Titán Bestia", opciones: ["Beast Titan", "Animal Titan", "Creature Titan", "Monster Titan"] },
                        { japones: "女型の巨人", romaji: "Megata no Kyojin", significado: "Titán Hembra", opciones: ["Female Titan", "Woman Titan", "Feminine Titan", "Lady Titan"] },
                        { japones: "巨人化", romaji: "Kyojin-ka", significado: "Transformación en Titán", opciones: ["Titan Transformation", "Titan Shift", "Titan Change", "Titan Morph"] },
                        { japones: "巨人", romaji: "Kyojin", significado: "Titán", opciones: ["Titan", "Giant", "Colossus", "Behemoth"] },
                        { japones: "壁", romaji: "Kabe", significado: "Muro", opciones: ["Wall", "Barrier", "Fortification", "Rampart"] },
                        { japones: "立体機動装置", romaji: "Rittai kidō sōchi", significado: "Dispositivo de Movilidad Tridimensional", opciones: ["3D Maneuver Gear", "Omni-Directional Gear", "Vertical Maneuvering Equipment", "Aerial Mobility Device"] },
                        { japones: "調査兵団", romaji: "Chōsa Heidan", significado: "Cuerpo de Exploración", opciones: ["Scout Regiment", "Survey Corps", "Reconnaissance Unit", "Exploration Team"] }
                    ]
                }
            ]
        },
        {
            id: 3,
            nombre: "My Hero Academia",
            icono: "💥",
            color: "#E91E63",
            mazos: [
                {
                    id: 0,
                    nombre: "Quirks",
                    palabras: [
                        { japones: "ワンフォーオール", romaji: "Wan Fō Ōru", significado: "One For All", opciones: ["One For All", "All For One", "United Power", "Collective Strength"] },
                        { japones: "爆発", romaji: "Bakuhatsu", significado: "Explosión", opciones: ["Explosion", "Blast", "Detonation", "Burst"] },
                        { japones: "氷結", romaji: "Hyōketsu", significado: "Congelación", opciones: ["Freezing", "Ice Formation", "Frost", "Glaciation"] },
                        { japones: "重力", romaji: "Jūryoku", significado: "Gravedad", opciones: ["Gravity", "Weight", "Heaviness", "Mass"] },
                        { japones: "エンジン", romaji: "Enjin", significado: "Motor", opciones: ["Engine", "Motor", "Drive", "Propulsion"] },
                        { japones: "透視", romaji: "Tōshi", significado: "Visión a través", opciones: ["See-Through", "X-Ray Vision", "Transparency Sight", "Penetrating Gaze"] },
                        { japones: "創造", romaji: "Sōzō", significado: "Creación", opciones: ["Creation", "Manufacture", "Production", "Formation"] },
                        { japones: "半減", romaji: "Hangen", significado: "Mitigación", opciones: ["Half Reduction", "Mitigation", "Weakening", "Dampening"] },
                        { japones: "個性", romaji: "Kosei", significado: "Individualidad", opciones: ["Quirk", "Individuality", "Uniqueness", "Special Trait"] },
                        { japones: "ヒーロー", romaji: "Hīrō", significado: "Héroe", opciones: ["Hero", "Champion", "Protector", "Savior"] }
                    ]
                }
            ]
        },
        {
            id: 4,
            nombre: "Demon Slayer",
            icono: "🗡️",
            color: "#9C27B0",
            mazos: [
                {
                    id: 0,
                    nombre: "Respiración",
                    palabras: [
                        { japones: "水の呼吸", romaji: "Mizu no kokyū", significado: "Respiración del Agua", opciones: ["Water Breathing", "Aquatic Respiration", "Liquid Breath", "Hydro Breathing"] },
                        { japones: "炎の呼吸", romaji: "Honō no kokyū", significado: "Respiración de la Llama", opciones: ["Flame Breathing", "Fire Respiration", "Blaze Breath", "Inferno Breathing"] },
                        { japones: "雷の呼吸", romaji: "Kaminari no kokyū", significado: "Respiración del Trueno", opciones: ["Thunder Breathing", "Lightning Respiration", "Storm Breath", "Electric Breathing"] },
                        { japones: "岩の呼吸", romaji: "Iwa no kokyū", significado: "Respiración de la Roca", opciones: ["Stone Breathing", "Rock Respiration", "Boulder Breath", "Mountain Breathing"] },
                        { japones: "風の呼吸", romaji: "Kaze no kokyū", significado: "Respiración del Viento", opciones: ["Wind Breathing", "Gale Respiration", "Breeze Breath", "Air Breathing"] },
                        { japones: "蛇の呼吸", romaji: "Hebi no kokyū", significado: "Respiración de la Serpiente", opciones: ["Snake Breathing", "Serpent Respiration", "Viper Breath", "Reptile Breathing"] },
                        { japones: "蟲の呼吸", romaji: "Mushi no kokyū", significado: "Respiración del Insecto", opciones: ["Insect Breathing", "Bug Respiration", "Creepy Crawly Breath", "Arthropod Breathing"] },
                        { japones: "花の呼吸", romaji: "Hana no kokyū", significado: "Respiración de la Flor", opciones: ["Flower Breathing", "Blossom Respiration", "Bloom Breath", "Floral Breathing"] },
                        { japones: "獣の呼吸", romaji: "Kemono no kokyū", significado: "Respiración de la Bestia", opciones: ["Beast Breathing", "Animal Respiration", "Creature Breath", "Wild Breathing"] },
                        { japoneses: "鬼殺隊", romaji: "Kisatsutai", significado: "Cuerpo de Matademonios", opciones: ["Demon Slayer Corps", "Oni Extermination Squad", "Devil Killing Team", "Monster Elimination Force"] }
                    ]
                }
            ]
        },
        // Manga 5: Jujutsu Kaisen
        {
            id: 5,
            nombre: "Jujutsu Kaisen",
            icono: "🌀",
            color: "#00BCD4",
            mazos: [
                {
                    id: 0,
                    nombre: "Técnicas Malditas",
                    palabras: [
                        { japones: "呪力", romaji: "Juryoku", significado: "Energía Maldita", opciones: ["Cursed Energy", "Jujutsu Power", "Dark Energy", "Malevolent Power"] },
                        { japones: "領域展開", romaji: "Ryoiki Tenkai", significado: "Expansión de Dominio", opciones: ["Domain Expansion", "Territory Manifestation", "Realm Deployment", "Zone Unleash"] },
                        { japones: "術式", romaji: "Jutsushiki", significado: "Técnica Maldita", opciones: ["Cursed Technique", "Jujutsu Formula", "Sorcery Method", "Arcane Formula"] },
                        { japones: "呪具", romaji: "Jugu", significado: "Objeto Maldito", opciones: ["Cursed Tool", "Jujutsu Tool", "Sorcery Item", "Cursed Object"] },
                        { japones: "特級呪霊", romaji: "Tokkyū Jurei", significado: "Espíritu Maldito de Grado Especial", opciones: ["Special Grade Cursed Spirit", "Ultimate Grade Curse", "Supreme Cursed Being", "Highest Rank Curse"] },
                        { japones: "反転術式", romaji: "Hanten Jutsushiki", significado: "Técnica de Reversión", opciones: ["Reverse Cursed Technique", "Inversion Sorcery", "Reversal Jujutsu", "Counter Technique"] },
                        { japones: "呪術師", romaji: "Jujutsushi", significado: "Hechicero Jujutsu", opciones: ["Jujutsu Sorcerer", "Cursed Technique User", "Sorcery Master", "Arcane Practitioner"] },
                        { japones: "呪胎", romaji: "Jutai", significado: "Feto Maldito", opciones: ["Cursed Womb", "Malevolent Embryo", "Dark Fetus", "Cursed Fetus"] },
                        { japones: "帳", romaji: "To", significado: "Cortina", opciones: ["Curtain", "Veil", "Screen", "Shroud"] },
                        { japones: "黒閃", romaji: "Kokusan", significado: "Destello Negro", opciones: ["Black Flash", "Dark Flash", "Shadow Flash", "Void Flash"] }
                    ]
                }
            ]
        },
        // Manga 6: Dragon Ball
        {
            id: 6,
            nombre: "Dragon Ball",
            icono: "🐉",
            color: "#FFC107",
            mazos: [
                {
                    id: 0,
                    nombre: "Transformaciones",
                    palabras: [
                        { japones: "超サイヤ人", romaji: "Sūpā Saiya-jin", significado: "Super Saiyajin", opciones: ["Super Saiyan", "Ultra Saiyan", "Hyper Saiyan", "Mega Saiyan"] },
                        { japones: "元気玉", romaji: "Genki Dama", significado: "Esfera de Energía", opciones: ["Spirit Bomb", "Energy Sphere", "Life Force Ball", "Vitality Orb"] },
                        { japones: "かめはめ波", romaji: "Kamehameha", significado: "Onda Kamehameha", opciones: ["Kamehameha Wave", "Turtle Destruction Wave", "Energy Wave", "Beam Attack"] },
                        { japones: "舞空術", romaji: "Bukū-jutsu", significado: "Técnica de Vuelo", opciones: ["Flight Technique", "Sky Dancing", "Aerial Movement", "Levitation Art"] },
                        { japones: "戦闘力", romaji: "Sentōryoku", significado: "Poder de Combate", opciones: ["Battle Power", "Combat Strength", "Fighting Ability", "Warrior Power"] },
                        { japones: "仙豆", romaji: "Senzu", significado: "Frijol Mágico", opciones: ["Senzu Bean", "Magic Bean", "Recovery Bean", "Energy Bean"] },
                        { japones: "界王拳", romaji: "Kaiō-ken", significado: "Puño del Rey de los Mundos", opciones: ["Kaioken", "World King Fist", "Universe King Fist", "Galaxy King Technique"] },
                        { japones: "瞬間移動", romaji: "Shunkan idō", significado: "Teletransporte Instantáneo", opciones: ["Instant Transmission", "Teleportation", "Blink Movement", "Warp Travel"] },
                        { japones: "気", romaji: "Ki", significado: "Energía Vital", opciones: ["Ki", "Energy", "Life Force", "Spiritual Power"] },
                        { japones: "悟空", romaji: "Gokū", significado: "Goku", opciones: ["Goku", "Wukong", "Monkey King", "Son Goku"] }
                    ]
                }
            ]
        },
        // Manga 7: Bleach
        {
            id: 7,
            nombre: "Bleach",
            icono: "☠️",
            color: "#03A9F4",
            mazos: [
                {
                    id: 0,
                    nombre: "Zanpakutō",
                    palabras: [
                        { japones: "斬魄刀", romaji: "Zanpakutō", significado: "Espada Cortaalmas", opciones: ["Zanpakuto", "Soul Cutter", "Spirit Sword", "Death Blade"] },
                        { japones: "始解", romaji: "Shikai", significado: "Liberación Inicial", opciones: ["Initial Release", "First Release", "Primary Unsealing", "Beginning Liberation"] },
                        { japones: "卍解", romaji: "Bankai", significado: "Liberación Final", opciones: ["Final Release", "Bankai", "Ultimate Form", "Complete Unsealing"] },
                        { japones: "鬼道", romaji: "Kidō", significado: "Camino del Demonio", opciones: ["Kido", "Demon Way", "Spellcasting", "Magic Arts"] },
                        { japones: "死神", romaji: "Shinigami", significado: "Dios de la Muerte", opciones: ["Death God", "Soul Reaper", "Grim Reaper", "Death Spirit"] },
                        { japones: "虚", romaji: "Hollow", significado: "Hollow", opciones: ["Hollow", "Empty One", "Void", "Spirit Monster"] },
                        { japones: "破面", romaji: "Arrancar", significado: "Arrancar", opciones: ["Arrancar", "Torn Mask", "Broken Face", "Unmasked"] },
                        { japones: "滅却師", romaji: "Quincy", significado: "Quincy", opciones: ["Quincy", "Exterminator", "Purifier", "Spirit Archer"] },
                        { japones: "魂葬", romaji: "Konsō", significado: "Entierro de Almas", opciones: ["Soul Burial", "Spirit Send-off", "Soul Consignment", "Afterlife Ritual"] },
                        { japones: "義骸", romaji: "Gigai", significado: "Cuerpo Artificial", opciones: ["Gigai", "Artificial Body", "False Corpse", "Temporary Flesh"] }
                    ]
                }
            ]
        },
        // Manga 8: Hunter x Hunter
        {
            id: 8,
            nombre: "Hunter x Hunter",
            icono: "🎯",
            color: "#4CAF50",
            mazos: [
                {
                    id: 0,
                    nombre: "Nen",
                    palabras: [
                        { japones: "念", romaji: "Nen", significado: "Nen", opciones: ["Nen", "Aura", "Life Energy", "Spiritual Power"] },
                        { japones: "練", romaji: "Ren", significado: "Refinamiento", opciones: ["Ren", "Aura Output", "Energy Emission", "Power Release"] },
                        { japones: "絶", romaji: "Zetsu", significado: "Anulación", opciones: ["Zetsu", "Aura Concealment", "Energy Suppression", "Power Nullification"] },
                        { japones: "纏", romaji: "Ten", significado: "Envoltura", opciones: ["Ten", "Aura Guard", "Energy Shield", "Protective Coating"] },
                        { japones: "発", romaji: "Hatsu", significado: "Liberación", opciones: ["Hatsu", "Aura Type", "Nen Ability", "Personal Technique"] },
                        { japones: "具現化系", romaji: "Gugenka-kei", significado: "Tipo Materialización", opciones: ["Conjuration Type", "Materialization Class", "Manifestation Type", "Creation Category"] },
                        { japones: "変化系", romaji: "Henka-kei", significado: "Tipo Transformación", opciones: ["Transmutation Type", "Transformation Class", "Change Type", "Alteration Category"] },
                        { japones: "操作系", romaji: "Sōsa-kei", significado: "Tipo Manipulación", opciones: ["Manipulation Type", "Control Class", "Domination Type", "Command Category"] },
                        { japones: "放出系", romaji: "Hōshutsu-kei", significado: "Tipo Emisión", opciones: ["Emission Type", "Release Class", "Projection Type", "Discharge Category"] },
                        { japones: "ハンター", romaji: "Hantā", significado: "Cazador", opciones: ["Hunter", "Tracker", "Pursuer", "Seeker"] }
                    ]
                }
            ]
        },
        // Manga 9: Spy x Family
        {
            id: 9,
            nombre: "Spy x Family",
            icono: "🕵️",
            color: "#FF6B6B",
            mazos: [
                {
                    id: 0,
                    nombre: "Família",
                    palabras: [
                        { japones: "家族", romaji: "Kazoku", significado: "Familia", opciones: ["Family", "Household", "Kin", "Clan"] },
                        { japones: "父", romaji: "Chichi", significado: "Padre", opciones: ["Father", "Dad", "Papa", "Parent"] },
                        { japones: "母", romaji: "Haha", significado: "Madre", opciones: ["Mother", "Mom", "Mama", "Parent"] },
                        { japones: "娘", romaji: "Musume", significado: "Hija", opciones: ["Daughter", "Girl", "Child", "Offspring"] },
                        { japones: "秘密", romaji: "Himitsu", significado: "Secreto", opciones: ["Secret", "Confidential", "Hidden", "Classified"] },
                        { japones: "任務", romaji: "Ninmu", significado: "Misión", opciones: ["Mission", "Task", "Assignment", "Operation"] },
                        { japones: "平和", romaji: "Heiwa", significado: "Paz", opciones: ["Peace", "Harmony", "Tranquility", "Calm"] },
                        { japones: "学校", romaji: "Gakkō", significado: "Escuela", opciones: ["School", "Academy", "Institution", "Educational Facility"] },
                        { japones: "友達", romaji: "Tomodachi", significado: "Amigo", opciones: ["Friend", "Companion", "Buddy", "Pal"] },
                        { japones: "信頼", romaji: "Shinrai", significado: "Confianza", opciones: ["Trust", "Reliance", "Confidence", "Faith"] }
                    ]
                }
            ]
        }
    ]
};

// Función para agregar manga dinámicamente (si se necesitara en el futuro)
function agregarManga(nombre, icono, color, mazos) {
    const nuevoManga = {
        id: VOCABULARIO.mangas.length,
        nombre,
        icono,
        color,
        mazos
    };
    VOCABULARIO.mangas.push(nuevoManga);
    return nuevoManga;
}

// Función para agregar mazo a un manga existente
function agregarMazo(mangaId, nombre, palabras) {
    const manga = VOCABULARIO.mangas.find(m => m.id === mangaId);
    if (manga) {
        const nuevoMazo = {
            id: manga.mazos.length,
            nombre,
            palabras
        };
        manga.mazos.push(nuevoMazo);
        return nuevoMazo;
    }
    return null;
}

// Exportar para usar en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VOCABULARIO, agregarManga, agregarMazo };
}
