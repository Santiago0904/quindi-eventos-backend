import type { Event } from "../types/evento.types";

export const events: Event[] = [
    {
        id: "1",
        nombre: "Festival del Café del Quindío",
        descripcion: "Celebración anual de la cosecha cafetera con exposiciones, catas guiadas y actividades culturales. Reúne productores locales, baristas de clase mundial y amantes del café de toda Colombia y el extranjero. Durante tres días completos los visitantes pueden participar en talleres de catación, aprender técnicas de preparación artesanal y degustar gastronomía típica quindiana basada en el café como ingrediente principal.",
        municipio: "Armenia",
        lugar: "Parque Sucre, Armenia",
        fecha: "2026-08-10",
        hora: "10:00",
        categoria: "Gastronomía",
        imagen: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
        ],
        precio: 0,
        edadMinima: 0
    },
    {
        id: "2",
        nombre: "Senderismo Valle del Cocora",
        descripcion: "Caminata guiada entre las majestuosas palmas de cera, árbol nacional de Colombia que puede alcanzar hasta 60 metros de altura. La ruta de 14 kilómetros atraviesa bosques de niebla, puentes colgantes sobre ríos cristalinos y zonas de avistamiento de más de 200 especies de aves endémicas. Los guías certificados explican la importancia ecológica del ecosistema y las iniciativas de conservación del Paisaje Cultural Cafetero declarado Patrimonio de la Humanidad.",
        municipio: "Salento",
        lugar: "Valle del Cocora, Salento",
        fecha: "2026-07-15",
        hora: "07:00",
        categoria: "Ecoturismo",
        imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80",
            "https://images.unsplash.com/photo-1510901132756-51bcb7a29d62?w=500&q=80"
        ],
        precio: 15000,
        edadMinima: 0
    },
    {
        id: "3",
        nombre: "Festival del Globo de Filandia",
        descripcion: "Tradición centenaria de lanzamiento de globos artesanales de colores que iluminan el cielo nocturno de Filandia en las festividades de fin de año. Las familias artesanas del municipio elaboran globos de papel durante semanas previas al evento, decorados con figuras tradicionales y mensajes de esperanza. La festividad incluye música en vivo, gastronomía típica, exposición de artesanías en madera y una muestra fotográfica sobre la historia y cultura del municipio.",
        municipio: "Filandia",
        lugar: "Parque Principal, Filandia",
        fecha: "2026-12-28",
        hora: "18:00",
        categoria: "Eventos especiales",
        imagen: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=500&q=80",
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80"
        ],
        precio: 0,
        edadMinima: 0
    },
    {
        id: "4",
        nombre: "Noche de Fincas en Montenegro",
        descripcion: "Recorrido nocturno por las fincas cafeteras más tradicionales de Montenegro, municipio conocido como la capital mundial del café especial. Los visitantes recorren los cafetales bajo las estrellas acompañados de guías expertos que explican el proceso de cultivo, cosecha y beneficio del café. La experiencia incluye degustación de productos artesanales locales como bocadillo veleño, natillas y aguardiente de caña, amenizado con música de cuerda y danza folclórica.",
        municipio: "Montenegro",
        lugar: "Fincas cafeteras, Montenegro",
        fecha: "2026-09-20",
        hora: "17:00",
        categoria: "Agroturismo",
        imagen: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80",
            "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500&q=80"
        ],
        precio: 35000,
        edadMinima: 0
    },
    {
        id: "5",
        nombre: "Festival de la Guadua",
        descripcion: "Muestra cultural y artesanal que celebra la guadua como recurso natural emblemático del Quindío y el Eje Cafetero. El festival reúne arquitectos, artesanos, ecoconstructores y artistas que demuestran las infinitas posibilidades de este bambú gigante en construcción sostenible, instrumentos musicales, muebles y artesanías. Incluye talleres participativos para niños y adultos, conciertos de música andina colombiana y una feria gastronómica con los sabores más representativos del Quindío.",
        municipio: "Quimbaya",
        lugar: "Plaza Central, Quimbaya",
        fecha: "2026-06-15",
        hora: "09:00",
        categoria: "Cultural",
        imagen: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
        ],
        precio: 0,
        edadMinima: 0
    },
    {
        id: "6",
        nombre: "Avistamiento de Aves Calarcá",
        descripcion: "Ruta guiada especializada por el Jardín Botánico del Quindío, uno de los centros de investigación y conservación más importantes de Colombia con más de 300 especies de aves registradas. El tour matutino aprovecha las primeras horas del día cuando las aves son más activas, permitiendo observar tangaras multicolores, tucanes, colibríes endémicos y el esquivo pájaro carpintero gigante. Los ornitólogos guías facilitan binoculares y listas de chequeo para que los visitantes registren sus observaciones científicamente.",
        municipio: "Calarcá",
        lugar: "Jardín Botánico del Quindío, Calarcá",
        fecha: "2026-05-10",
        hora: "06:00",
        categoria: "Ecoturismo",
        imagen: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&q=80",
            "https://images.unsplash.com/photo-1502674931009-788f75a59338?w=500&q=80"
        ],
        precio: 20000,
        edadMinima: 0
    },
    {
        id: "7",
        nombre: "Ciclovía Cafetera Armenia",
        descripcion: "Recorrido familiar en bicicleta por las principales vías de Armenia con cierre total al tráfico vehicular durante seis horas. El evento recorre más de 15 kilómetros de circuito urbano pasando por los parques, monumentos y espacios culturales más importantes de la ciudad. En el trayecto se instalan estaciones de hidratación, zonas de aeróbicos, presentaciones artísticas, stands de emprendedores locales y espacios de juego para los más pequeños.",
        municipio: "Armenia",
        lugar: "Avenida Bolívar, Armenia",
        fecha: "2026-10-05",
        hora: "07:00",
        categoria: "Deporte y aventura",
        imagen: "https://images.unsplash.com/photo-1502674931009-788f75a59338?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1502674931009-788f75a59338?w=500&q=80",
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80"
        ],
        precio: 0,
        edadMinima: 0
    },
    {
        id: "8",
        nombre: "Festival de la Cosecha Cafetera",
        descripcion: "Vivencia auténtica del proceso completo de la cosecha cafetera en una finca tradicional de la vereda La Julia, reconocida por producir algunos de los cafés especiales más premiados del mundo. Los participantes realizan la recolección manual del grano rojo maduro, aprenden el proceso de despulpado, fermentación, lavado y secado al sol, y finalmente realizan una cata profesional del producto terminado. Incluye almuerzo típico campesino con sancocho de gallina criolla, frijoles y postres artesanales.",
        municipio: "Calarcá",
        lugar: "Vereda La Julia, Calarcá",
        fecha: "2026-11-12",
        hora: "08:00",
        categoria: "Gastronomía",
        imagen: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500&q=80",
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80"
        ],
        precio: 45000,
        edadMinima: 0
    },
    {
        id: "9",
        nombre: "Feria Taurina de Salento",
        descripcion: "Tradicional feria taurina que forma parte del patrimonio cultural inmaterial del municipio de Salento, celebrada desde finales del siglo XIX durante las festividades patronales de enero. El evento convoca a los mejores toreros del Eje Cafetero en una tarde de arte taurino acompañada de la banda municipal, vendedores de fritanga y la infaltable limonada de panela. Los días previos incluyen exposición ganadera, cabalgata por el pueblo y velada folclórica en la plaza principal.",
        municipio: "Salento",
        lugar: "Plaza de toros, Salento",
        fecha: "2026-01-20",
        hora: "15:00",
        categoria: "Cultural",
        imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80"
        ],
        precio: 25000,
        edadMinima: 18
    },
    {
        id: "10",
        nombre: "Turismo de Aventura en Génova",
        descripcion: "Aventura extrema por el Páramo del Chili en Génova, uno de los ecosistemas de alta montaña mejor conservados del sur del Quindío a más de 3.500 metros sobre el nivel del mar. El recorrido de día completo incluye senderismo de alta montaña, rappel en cascadas, cruce de ríos y observación de flora y fauna paramuna como frailejones, osos de anteojos y cóndores andinos. Los grupos son pequeños de máximo 10 personas para minimizar el impacto ambiental y garantizar atención personalizada.",
        municipio: "Génova",
        lugar: "Páramo del Chili, Génova",
        fecha: "2026-04-18",
        hora: "08:00",
        categoria: "Deporte y aventura",
        imagen: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80",
            "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&q=80"
        ],
        precio: 60000,
        edadMinima: 14
    },
    {
        id: "11",
        nombre: "Festival del Campesino de Circasia",
        descripcion: "Celebración anual en honor al campesino quindiano que durante generaciones ha cultivado la tierra y preservado las tradiciones del Paisaje Cultural Cafetero. El festival incluye desfile de colonias con trajes típicos, exposición agropecuaria, concurso de recolectores de café, demostraciones de oficios tradicionales como la tejeduría en fique y la alfarería, y una gran velada folclórica nocturna con los mejores exponentes de la música andina colombiana y el pasillo.",
        municipio: "Circasia",
        lugar: "Parque Principal, Circasia",
        fecha: "2026-07-04",
        hora: "09:00",
        categoria: "Cultural",
        imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&q=80",
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=500&q=80"
        ],
        precio: 0,
        edadMinima: 0
    },
    {
        id: "12",
        nombre: "Recorrido Paisaje Cultural Cafetero",
        descripcion: "Tour guiado de día completo por los elementos más representativos del Paisaje Cultural Cafetero, declarado Patrimonio Cultural de la Humanidad por la UNESCO en 2011. El recorrido visita fincas cafeteras centenarias con arquitectura de bahareque, pueblos con colores vibrantes en sus fachadas, miradores naturales con vistas panorámicas de los valles, y comunidades campesinas que mantienen vivas las tradiciones de la colonización antioqueña. El guía narra la historia del café en Colombia y explica por qué esta región es única en el mundo.",
        municipio: "Salento",
        lugar: "Salento y alrededores",
        fecha: "2026-03-22",
        hora: "09:00",
        categoria: "Patrimonio cultural",
        imagen: "https://images.unsplash.com/photo-1510901132756-51bcb7a29d62?w=500&q=80",
        imagenes: [
            "https://images.unsplash.com/photo-1510901132756-51bcb7a29d62?w=500&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
        ],
        precio: 50000,
        edadMinima: 0
    },
];