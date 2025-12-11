// ============================================================================
// IMÁGENES Y RECURSOS VISUALES
// ============================================================================

const Imagenes = {
    // URLs de imágenes (usaremos placeholders o enlaces a imágenes públicas)
    recursos: {
        // Imágenes del menú principal
        menu: {
            entrenamiento: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop",
            biblioteca: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
            estadisticas: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-400&h=300&fit=crop",
            tienda: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
        },
        
        // Imágenes de entrenamiento
        entrenamiento: {
            quintillizas: "https://i.imgur.com/0Q8eG5K.png", // Placeholder para quintillizas
            falladas: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
            rapidos: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
        },
        
        // Imágenes de mangas
        mangas: {
            // THE LAST SUMMER
            "the-last-summer": {
                portada: "https://images.unsplash.com/photo-1544717305-99670f9c28f4?w=600&h=400&fit=crop",
                icono: "https://cdn-icons-png.flaticon.com/512/2909/2909787.png",
                banner: "https://images.unsplash.com/photo-1544717305-99670f9c28f4?w=1200&h=300&fit=crop"
            },
            
            // THE LAST SUMMER 2
            "the-last-summer-2": {
                portada: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
                icono: "https://cdn-icons-png.flaticon.com/512/2909/2909806.png",
                banner: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&h=300&fit=crop"
            },
            
            // YAMADA
            "yamada": {
                portada: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
                icono: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=300&fit=crop"
            }
        },
        
        // Imágenes de subtemas
        subtemas: {
            // THE LAST SUMMER
            "sub1_1": {
                icono: "https://cdn-icons-png.flaticon.com/512/3208/3208720.png",
                fondo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
            },
            "sub1_2": {
                icono: "https://cdn-icons-png.flaticon.com/512/2883/2883922.png",
                fondo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop"
            },
            
            // THE LAST SUMMER 2
            "sub2_1": {
                icono: "https://cdn-icons-png.flaticon.com/512/2936/2936736.png",
                fondo: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=400&h=250&fit=crop"
            },
            "sub2_2": {
                icono: "https://cdn-icons-png.flaticon.com/512/2936/2936775.png",
                fondo: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop"
            },
            
            // YAMADA
            "sub3_1": {
                icono: "https://cdn-icons-png.flaticon.com/512/1998/1998595.png",
                fondo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop"
            }
        },
        
        // Iconos de mazos
        mazos: {
            basico: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            escuela: "https://cdn-icons-png.flaticon.com/512/3135/3135753.png",
            actividades: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
            comunicacion: "https://cdn-icons-png.flaticon.com/512/3135/3135692.png",
            ciencia: "https://cdn-icons-png.flaticon.com/512/3135/3135707.png",
            inicio: "https://cdn-icons-png.flaticon.com/512/3135/3135724.png",
            desarrollo: "https://cdn-icons-png.flaticon.com/512/3135/3135746.png"
        }
    },
    
    // Métodos para cargar imágenes
    cargarImagenesMenu: function() {
        // Cargar imágenes del menú principal
        document.getElementById('img-entrenamiento').src = this.recursos.menu.entrenamiento;
        document.getElementById('img-biblioteca').src = this.recursos.menu.biblioteca;
        document.getElementById('img-estadisticas').src = this.recursos.menu.estadisticas;
        document.getElementById('img-tienda').src = this.recursos.menu.tienda;
    },
    
    cargarImagenEntrenamiento: function() {
        // Cargar imagen de quintillizas
        document.getElementById('img-quintillizas').src = this.recursos.entrenamiento.quintillizas;
    },
    
    obtenerImagenManga: function(mangaId) {
        return this.recursos.mangas[mangaId] || this.recursos.mangas["the-last-summer"];
    },
    
    obtenerImagenSubtema: function(subtemaId) {
        return this.recursos.subtemas[subtemaId] || this.recursos.subtemas["sub1_1"];
    },
    
    obtenerIconoMazo: function(mazoNombre) {
        // Mapear nombres de mazos a iconos
        const mapeo = {
            'Mazo 1': this.recursos.mazos.basico,
            'Mazo 2': this.recursos.mazos.basico,
            'Mazo 3': this.recursos.mazos.basico,
            'Mazo 1 - Escuela': this.recursos.mazos.escuela,
            'Mazo 2 - Actividades': this.recursos.mazos.actividades,
            'Mazo 1 - Comunicación': this.recursos.mazos.comunicacion,
            'Mazo 1 - Ciencia': this.recursos.mazos.ciencia,
            'Mazo 1 - Inicio': this.recursos.mazos.inicio,
            'Mazo 2 - Desarrollo': this.recursos.mazos.desarrollo
        };
        
        return mapeo[mazoNombre] || this.recursos.mazos.basico;
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.Imagenes = Imagenes;
}
