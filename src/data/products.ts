import { Product } from '../types';

import poncheImg from '../assets/images/product_ponche_tradicional_1792413778648.jpg';
import dulceLecheImg from '../assets/images/product_dulce_leche_artesanal_1792413779635.jpg';
import alfajoresImg from '../assets/images/product_alfajores_polvorosas_1792413780097.jpg';
import heroImg from '../assets/images/hero_dulcito_table_1792413778114.jpg';

export { poncheImg, dulceLecheImg, alfajoresImg, heroImg };

export const ALL_PRODUCTS_CHRISTMAS_IMAGE_URL = '/assets/aistudio/n7RgekrjbB3WJPHEori0sC_1793105069738_na1fn_L2hvbWUvdWJ1bnR1L3Byb2R1Y3Rfc2NlbmUvZHVsY2l0b19ncnVwb19uYXZpZGFkX2Nob2NvbGF0ZXNfdmlzaWJsZXM_399a3c3e.webp';

export const VITRINA_SHOWCASE_VIDEO_URL = '/assets/aistudio/VITRINA_CON_SELLO_09528d7d.mp4';
export const OFFICIAL_BRAND_VIDEO_URL = '/assets/aistudio/dulcito_final_con_voz_100ad8c0.mp4';
export const TEQUENOS_VIDEO_URL = '/assets/aistudio/dulcito_tequenos_queso_final_c0efbc82.mp4';
export const CHOCOLATES_VIDEO_URL = '/assets/aistudio/video_con_musica_arabe_mas_alta_090909c5.mp4';
export const QUESILLO_VIDEO_URL = '/assets/aistudio/dulcito_quesillo_voz_musica_final_f1985a57.mp4';
export const ALFAJORES_VIDEO_URL = '/assets/aistudio/dulcito_alfajores_narracion_final_576b6396.mp4';
export const PAN_JAMON_VIDEO_URL = '/assets/aistudio/pan_de_jamon_1750ddbf.mp4';

export const LOGOS = {
  ponche: '/assets/aistudio/PONCHE_CREMA_LOGO_bbe2a4ae.jpg',
  tequenos: '/assets/aistudio/Gemini_Generated_Image_7c4os47c4os47c4o_b0abb632.jpg',
  dulceLeche: '/assets/aistudio/DULCE_DE_LECHE_LOGO_34768add.jpg',
  chocolates: '/assets/aistudio/CHOCOLATES_LOGO_51b91f48.jpg',
  quesillo: '/assets/aistudio/QUESILLO_LOGO_5a52b8cf.jpg',
  panJamon: '/assets/aistudio/PAN_DE_JAMON_LOGO_f66ef27c.jpg',
};

/**
 * Flagship Curated Artisanal Products for DULCITO
 * Complete product catalog with dedicated video presentations and artisanal watermark logos
 */
export const PRODUCTS: Product[] = [
  {
    id: 'ponche-crema-tradicional',
    name: 'Ponche Crema Tradicional. DULCITO',
    tagline: 'Ponche tradicional a base de leche, especias y ron ámbar.',
    category: 'ponche',
    categoryLabel: 'Ponche Crema',
    description: 'Ponche tradicional a base de leche, especias y ron ámbar.',
    story: 'La abuela Carmen encendía el fogón a primera hora de la mañana. En la paila de cobre, la leche y las especias perfumaban toda la casa antes de que nadie despertara. Ese mismo aroma nostálgico es el que sellamos a mano en cada botella con tapón basculante swing-top, lazo de mecatillo rústico, anís estrellado y canela en rama, tal como se aprecia en nuestro spot publicitario oficial.',
    image: LOGOS.ponche,
    badge: 'Spot Oficial en Video',
    rating: 5.0,
    reviewsCount: 142,
    isBestseller: true,
    basePrice: 9.00,
    videoUrl: OFFICIAL_BRAND_VIDEO_URL,
    videoCaption: 'Spot Publicitario Oficial: Sabor a tradición. Hecho con amor.',
    logoUrl: LOGOS.ponche,
    presentationDetails: [
      'Presentación de 500 ml en botella de vidrio con tapón basculante hermético',
      'Lazo rústico de mecatillo atado a mano en el cuello',
      'Flor de anís estrellado natural y vara de canela Ceilán',
      'Servido frío sobre roca de hielo en vaso bajo festivo'
    ],
    variants: [
      { id: 'pct-500', name: 'Botella Tradicional DULCITO (500 ml)', size: '500 ml', price: 9.00, inStock: true },
    ],
    ingredients: [
      'Leche condensada artesanal',
      'Ron añejo reserva especial',
      'Yemas de huevo de pastoreo',
      'Canela en rama de Ceilán',
      'Anís estrellado seleccionado',
      'Nuez moscada recién rallada',
      'Extracto de vainilla natural'
    ],
    tastingNotes: {
      texture: 'Untuosa, aterciopelada y densa, cubre la copa suavemente.',
      finish: 'Cálido y reconfortante, con el balance perfecto entre dulzor lácteo y el vigor del ron añejo.',
      identity: 'Cálido y reconfortante, con el balance perfecto entre dulzor lácteo y el vigor del ron añejo.'
    },
    servingSuggestion: 'Servir muy frío (4°C) en vaso bajo sobre roca de hielo cristalino, decorado con rama de canela, exactamente como en nuestro video oficial.',
    alcoholByVolume: '14.5% Alc. Vol.',
    shelfLife: '6 meses en refrigeración / 3 meses a temperatura fresca',
    storage: 'Mantener en lugar fresco o refrigerar antes de descorchar. Agitar suavemente antes de servir.'
  },
  {
    id: 'alfajores-dulce-de-leche',
    name: 'Dulce de Leche Tradicional. DULCITO',
    tagline: 'Dulce de leche con base infusionada de especias, cocido a fuego lento en paila de cobre y paleta de madera, sabor a tradición.',
    category: 'tradicionales',
    categoryLabel: 'Dulce de Leche',
    description: 'Dulce de leche con base infusionada de especias, cocido a fuego lento en paila de cobre y paleta de madera, sabor a tradición.',
    story: 'El secreto está en el fuego paciente y en la paila de cobre: cada frasco celebra la tradición auténtica del dulce de leche criollo, preparado a diario con amor de hogar.',
    image: LOGOS.dulceLeche,
    badge: 'Video & Hecho al Día',
    rating: 5.0,
    reviewsCount: 167,
    isBestseller: true,
    basePrice: 4.50,
    videoUrl: ALFAJORES_VIDEO_URL,
    videoCaption: 'Presentación en Video: Dulce de leche tradicional narrado con amor familiar.',
    logoUrl: LOGOS.dulceLeche,
    presentationDetails: [
      'Elaborado a fuego lento con pura leche fresca de vaca',
      'Textura densa y acaramelada cocinada en paila tradicional de cobre',
      'Presentación artesanal de 200 gramos con sello DULCITO',
      'Elaboración diaria 100% artesanal'
    ],
    variants: [
      { id: 'ddl-200g', name: 'Frasco Artesanal DULCITO (200 g)', size: '200 g', price: 4.50, inStock: true }
    ],
    ingredients: [
      'Pura leche entera de vaca',
      'Azúcar de caña seleccionada',
      'Fécula de maíz suave',
      'Mantequilla de leche pura',
      'Coco rallado tostado',
      'Esencia de vainilla natural'
    ],
    tastingNotes: {
      texture: 'Untuosa, cremosa y densa, se deshace suavemente en el paladar.',
      finish: 'Caramelizado criollo en paila de cobre, con la golosidad noble de fiesta familiar.',
      identity: 'Caramelizado criollo en paila de cobre, con la golosidad noble de fiesta familiar.'
    },
    servingSuggestion: 'Disfrutar a cucharadas o untar sobre pan tostado, galletas o alfajores junto a un buen café caliente recién colado.',
    shelfLife: '3 meses en frasco hermético',
    storage: 'Conservar en lugar fresco y seco. Refrigerar una vez abierto.'
  },
  {
    id: 'chocolates-arabes-tradicionales',
    name: 'Chocolates Árabes Tradicionales. DULCITO',
    tagline: 'Cacao de fino aroma, pistachos, maní, coco, cardamomo y azahar en bombones y lingotes tradicionales árabes.',
    category: 'chocolates',
    categoryLabel: 'Chocolates con Cacao Criollo',
    description: 'Cacao de fino aroma, pistachos, maní, coco, cardamomo y azahar en bombones y lingotes tradicionales árabes.',
    story: 'Una fusión celestial entre el mejor cacao de nuestra tierra y la repostería perfumada del Medio Oriente. Cada pieza es moldeada a mano, bañada en chocolate brillante y coronada con tropezones de pistachos tostados al sol.',
    image: LOGOS.chocolates,
    badge: 'Video & Receta Árabe',
    rating: 5.0,
    reviewsCount: 128,
    isBestseller: true,
    basePrice: 5.00,
    videoUrl: CHOCOLATES_VIDEO_URL,
    videoCaption: 'Presentación en Video: Chocolates Árabes con narración alegre y música festiva.',
    logoUrl: LOGOS.chocolates,
    presentationDetails: [
      'Caja dorada tradicional con sello DULCITO',
      'Bombones con polvo de pistacho verde tostado y pétalos secos',
      'Infusión fina de cardamomo recién molido y azahar natural',
      'Disponible en presentaciones de 6, 12 y 20 piezas'
    ],
    variants: [
      { id: 'ca-6', name: 'Caja de 6 piezas', size: '6 piezas', price: 5.00, inStock: true },
      { id: 'ca-12', name: 'Caja de 12 piezas', size: '12 piezas', price: 10.00, inStock: true },
      { id: 'ca-20', name: 'Caja de 20 piezas', size: '20 piezas', price: 18.00, inStock: true }
    ],
    ingredients: [
      'Cacao criollo venezolano al 70%',
      'Pistachos tostados de primera selección',
      'Cardamomo verde molido a la piedra',
      'Agua de azahar natural destilada',
      'Manteca pura de cacao y miel de caña'
    ],
    tastingNotes: {
      texture: 'Crocante en el quiebre exterior de chocolate brillante y sedoso fundente en el corazón.',
      finish: 'Cacao venezolano noble al 70%, perfume sutil de cardamomo, azahar y el tostado del pistacho.',
      identity: 'Cacao venezolano noble al 70%, perfume sutil de cardamomo, azahar y el tostado del pistacho.'
    },
    servingSuggestion: 'Degustar a temperatura ambiente (20°C) dejando que el bombón se funda lentamente en el paladar junto a un café recién colado.',
    shelfLife: '4 meses en lugar fresco y seco',
    storage: 'Mantener protegido de la luz solar directa y alejado de fuentes de calor.'
  },
  {
    id: 'quesillo-tradicional-criollo',
    name: 'Quesillo Tradicional. DULCITO',
    tagline: 'Tradición nacional, huevos, leche, azúcar, ron y ¡corazón!',
    category: 'quesillo',
    categoryLabel: 'Quesillo Tradicional',
    description: 'Tradición nacional, huevos, leche, azúcar, ron y ¡corazón!',
    story: 'No hay fiesta sin quesillo en la mesa. La abuela nos enseñó el punto exacto del caramelo para que conserve ese amargor sutil que contrasta con la dulzura aterciopelada de la crema horneada. Cada rebanada es un pasaporte a los domingos de infancia.',
    image: LOGOS.quesillo,
    badge: 'Video & Caramelo Vivo',
    rating: 5.0,
    reviewsCount: 184,
    isBestseller: true,
    basePrice: 5.00,
    videoUrl: QUESILLO_VIDEO_URL,
    videoCaption: 'Presentación en Video: Auténtico quesillo venezolano con música tradicional y voz alegre.',
    logoUrl: LOGOS.quesillo,
    presentationDetails: [
      'Bañado en abundante caramelo ámbar dorado casero',
      'Elaborado a fuego lento a baño de María tradicional',
      'Textura porosa clásica ("con sus huequitos") que absorbe el caramelo',
      'Presentaciones en bandeja pequeña de 250 g y quesillo de 500 g'
    ],
    variants: [
      { id: 'que-250g', name: 'Bandeja Pequeña (250 g)', size: '250 g', price: 5.00, inStock: true },
      { id: 'que-500g', name: 'Quesillo Grande (500 g)', size: '500 g', price: 10.00, inStock: true }
    ],
    ingredients: [
      'Leche condensada artesanal',
      'Huevos enteros frescos de granja',
      'Leche entera pura de vaca',
      'Azúcar caramelizada a fuego vivo',
      'Ron añejo reserva criollo',
      'Esencia pura de vainilla y toque de limón'
    ],
    tastingNotes: {
      texture: 'Suave, sedosa, con la porosidad clásica ("sus huequitos") que absorbe el caramelo.',
      finish: 'El alma dulce del domingo familiar, bañado en caramelo dorado con toque maestro de ron.',
      identity: 'El alma dulce del domingo familiar, bañado en caramelo dorado con toque maestro de ron.'
    },
    servingSuggestion: 'Servir bien frío directo del refrigerador, asegurando un baño generoso de caramelo sobre la porción.',
    shelfLife: '10 días en estricta refrigeración (4°C)',
    storage: 'Conservar tapado en refrigerador para preservar su humedad y caramelo líquido.'
  },
  {
    id: 'tequenos-de-queso-dulcito',
    name: 'Tequeños de Queso Artesanales. DULCITO',
    tagline: 'Masa peculiar, queso llanero, freír y ¡a disfrutar!',
    category: 'tequenos',
    categoryLabel: 'Pasapalos y Tradición',
    description: 'Masa peculiar, queso llanero, freír y ¡a disfrutar!',
    story: 'No existe fiesta, domingo familiar o tertulia navideña sin una bandeja de tequeños de queso humeantes. En Dulcito preparamos la masa con reposo paciente y queso de corral seleccionado para que al freír o llevar al Air Fryer queden dorados por fuera y con el corazón de queso derretido más elástico y sabroso.',
    image: LOGOS.tequenos,
    badge: 'Spot Oficial en Video',
    rating: 5.0,
    reviewsCount: 189,
    isBestseller: true,
    basePrice: 4.50,
    videoUrl: TEQUENOS_VIDEO_URL,
    videoCaption: 'Spot Publicitario Oficial: Tequeños de queso. Sabor a tradición. Hecho con amor.',
    logoUrl: LOGOS.tequenos,
    presentationDetails: [
      'Empaque domo hermético para freír o preparar en Air Fryer',
      'Queso blanco semiduro criollo con fundido elástico irresistible',
      'Masa fina artesanal con mantequilla de pastura que dora crujiente',
      'Bandeja de tequeños 20 piezas y gran tequeño de 6 piezas'
    ],
    variants: [
      { id: 'teq-20', name: 'Bandeja Tequeños (20 piezas)', size: '20 piezas', price: 4.50, inStock: true },
      { id: 'teq-gran-6', name: 'Bandeja Gran Tequeño (6 piezas)', size: 'Gran tequeño (6 piezas)', price: 8.00, inStock: true }
    ],
    ingredients: [
      'Queso blanco semiduro llanero tradicional',
      'Harina de trigo de primera flor seleccionada',
      'Mantequilla de leche pura de vaca',
      'Huevos de corral frescos',
      'Agua filtrada, pizca de sal marina y toque de azúcar'
    ],
    tastingNotes: {
      texture: 'Corteza fina hojaldrada crujiente con corazón de queso blanco derretido y elástico.',
      finish: 'El pasapalo rey de toda celebración venezolana, masa artesanal dorada y queso llanero.',
      identity: 'El pasapalo rey de toda celebración venezolana, masa artesanal dorada y queso llanero.'
    },
    servingSuggestion: 'Freír en abundante aceite a 180°C durante 3 a 4 minutos hasta dorar parejo, o en Air Fryer a 190°C por 7-8 minutos con ligera pincelada de aceite. Servir de inmediato mientras el queso estira.',
    shelfLife: '3 meses congelados (-18°C) / 3 días en refrigeración',
    storage: 'Mantener congelados en su empaque hermético. No descongelar antes de freír.'
  },
  {
    id: 'pan-de-jamon-navideno',
    name: 'Pan de Jamón Navideño. DULCITO',
    tagline: 'Ese toque navideño que no puede faltar en tu mesa. Sabor a tradición, ¡hecho con amor!',
    category: 'pan-jamon',
    categoryLabel: 'Panadería Navideña Dulcito',
    description: 'Ese toque navideño que no puede faltar en tu mesa. Sabor a tradición, ¡hecho con amor!',
    story: 'El olor a pan de jamón saliendo del horno marca el inicio oficial de la Navidad en cada hogar. Relleno sin mezquindades de punta a punta, con la trenza tradicional y el crujido suave de la corteza dorada.',
    image: LOGOS.panJamon,
    badge: 'Spot Oficial en Video',
    rating: 5.0,
    reviewsCount: 156,
    isBestseller: true,
    basePrice: 5.00,
    videoUrl: PAN_JAMON_VIDEO_URL,
    videoCaption: 'Spot Publicitario Oficial: El sabor de nuestra Navidad. Hecho con amor.',
    logoUrl: LOGOS.panJamon,
    presentationDetails: [
      'Empaque domo cristalino con sello artesanal DULCITO',
      'Masa brioche con fermentación lenta y barniz de papelón',
      'Jamón ahumado de pierna y tocineta seleccionada',
      'Presentación Pequeño y Grande'
    ],
    variants: [
      { id: 'pdj-pequeno', name: 'Pan de Jamón Pequeño', size: 'Pequeño', price: 5.00, inStock: true },
      { id: 'pdj-grande', name: 'Pan de Jamón Grande', size: 'Grande', price: 10.00, inStock: true }
    ],
    ingredients: [
      'Harina de trigo de fuerza seleccionada',
      'Mantequilla pura y papelón de caña',
      'Jamón ahumado de pierna artesanal',
      'Tocineta ahumada crujiente',
      'Aceitunas verdes rellenas con pimentón',
      'Uvas pasas maceradas en ron añejo'
    ],
    tastingNotes: {
      texture: 'Miga brioche tierna y húmeda barnizada en papelón, con el crujido salado de la tocineta.',
      finish: 'El aroma y sabor oficial de la Navidad venezolana, relleno generoso de jamón, pasas y aceitunas.',
      identity: 'El aroma y sabor oficial de la Navidad venezolana, relleno generoso de jamón, pasas y aceitunas.'
    },
    servingSuggestion: 'Calentar ligeramente 5 minutos al horno antes de cortar en rebanadas gruesas. Acompañar con copa de Ponche Crema frío.',
    shelfLife: '5 días a temperatura fresca / 12 días refrigerado',
    storage: 'Conservar envuelto en paño limpio o bolsa hermética.'
  }
];

export const NOSTALGIA_STORIES = [
  {
    quote: 'Destapar la botella de Dulcito con su mecatillo y sentir ese olorcito a canela fue como viajar de un solo golpe a la cocina de mi abuela un 24 de diciembre. ¡Qué cosa tan buena, se me aguaron los ojos de la pura emoción!',
    author: 'Mariana Villalobos',
    location: 'Madrid, España',
    favorite: 'Ponche Crema Tradicional'
  },
  {
    quote: 'Este dulce de leche tiene el propio sabor de paila de cobre y ese cremosito sabroso que creía perdido en la infancia. ¡Una delicia total, puro sabor a tradición de la buena!',
    author: 'Carlos Eduardo Mendoza',
    location: 'Caracas, Venezuela',
    favorite: 'Dulce de Leche Tradicional'
  },
  {
    quote: 'Ese quesillo con sus huequitos perfectos bien bañadito en caramelo y los chocolates árabes fueron la sensación de la mesa. ¡Nos devolvió completica la alegría de la Navidad en familia!',
    author: 'Beatriz Salazar',
    location: 'Santiago, Chile',
    favorite: 'Quesillo Tradicional & Chocolates Árabes'
  }
];

export const RITUAL_STEPS = [
  {
    number: '01',
    title: 'Despertar las Especias',
    desc: 'Voltea suavemente la botella dos veces para que la infusión de canela, vainilla y nuez moscada se integre de manera homogénea con la crema.',
    detail: 'No agites con fuerza; trátalo con la misma suavidad con la que fue preparado.'
  },
  {
    number: '02',
    title: 'El Frío Sagrado (4°C)',
    desc: 'El ponche crema jamás se bebe caliente. Déjalo reposar al menos 4 horas en la nevera antes del descorche.',
    detail: 'El frío resalta la sedosidad láctea y atenúa el golpe inicial del ron añejo.'
  },
  {
    number: '03',
    title: 'Copa Corta y Roca de Hielo',
    desc: 'Sirve en vaso bajo o copa de licor sobre un solo cubo de hielo grande y compacto para no aguar su densidad.',
    detail: 'El tintineo del hielo es el preámbulo oficial de la tertulia y la añoranza.'
  },
  {
    number: '04',
    title: 'Ralladura al Momento',
    desc: 'Corona la superficie con una leve lluvia de nuez moscada fresca recién rallada y remueve con una vara de canela.',
    detail: 'Al acercar el vaso a los labios, el aroma viajará directo a tus recuerdos más felices.'
  }
];
