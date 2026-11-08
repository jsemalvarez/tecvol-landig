// Contenido del sitio en un solo lugar: para cambiar textos, teléfonos o
// trabajos alcanza con editar este archivo.

export const site = {
  name: 'Tecvol',
  url: 'https://tecvol.com.ar',
  description:
    'Ingeniería eléctrica al servicio de la industria. Construcción de tableros y montajes eléctricos.',
  email: 'info@tecvol.com.ar',
  phone: '+54 9 (0223) 489-7905',
  whatsapp: {
    display: '+54 223 422-6722',
    number: '5492234226722',
  },
  address: ['Lanzilota 1254', 'Mar del Plata', 'Argentina'],
  // Así está en la página original (no coincide con la dirección de arriba).
  mapQuery: 'edison 555, mar del plata',
  // Facebook y LinkedIn no tienen link en la página original.
  social: {
    facebook: null as string | null,
    instagram: 'https://www.instagram.com/tecvol.ar/',
    linkedin: null as string | null,
  },
  copyright: 'Todos los derechos reservados 2024',
};

export const whatsappUrl = `https://wa.me/+${site.whatsapp.number}`;

export const nav = [
  { label: 'Inicio', href: '/', id: 'inicio' },
  { label: 'Sobre nosotros', href: '/#nosotros', id: 'nosotros' },
  { label: 'Servicios', href: '/#servicios', id: 'servicios' },
  { label: 'Obras', href: '/#obras', id: 'obras' },
  { label: 'Contacto', href: '/#contacto', id: 'contacto' },
  { label: 'RRHH', href: '/rrhh/', id: 'rrhh' },
];

export const clients = [
  { name: 'Acay', src: '/images/clientes/acay.png' },
  { name: 'Moscuzza', src: '/images/clientes/moscuzza.png' },
  { name: 'Artico', src: '/images/clientes/artico.png' },
  { name: 'Solimeno', src: '/images/clientes/solimeno.png' },
  { name: 'SPI', src: '/images/clientes/spi.png' },
];

export const services = [
  {
    title: 'Ingeniería',
    image: '/images/servicio-ingenieria.jpg',
    items: [
      'Especializada en diseños eléctricos navales',
      'Confección de planos eléctricos',
      'Relevamiento de instalaciones existente',
      'Diseño y desarrollo de tableros eléctricos',
      'Cálculos de cortocircuito',
      'Diseño de sistemas para automatización de procesos',
    ],
  },
  {
    title: 'Tableros eléctricos',
    image: '/images/servicio-tableros.jpg',
    items: [
      'Tableros eléctrico principales para buques',
      'Tableros de control de potencia',
      'Tableros de luces de navegación reglamentarios',
      'aprobados por PNA',
      'Tableros de 24 V reglamentarios aprobados por PNA',
      'Implementación de sistemas control de generación COMAP',
    ],
  },
];

export const works = [
  'Construcción eléctrica BP “Luigi”',
  'Construcción eléctrica BP “Anita”',
  'Construcción de tablero principal BP “Maria Eugenia”',
  'Construcción de tablero principal BP “Luca Mario”',
  'Construcción tablero repotenciación eléctrica BP “Don Francisco”',
  'Construcción de tablero repotenciación BP “Domaio”',
  'Construcción de tablero repotenciación BP “Scirocco”',
];

// Los títulos son los que muestra la galería ampliada en la página original.
export const gallery = [
  { src: '/images/obras/don-francisco.jpg', title: 'Buque Pesquero Don Francisco' },
  { src: '/images/obras/s4.jpg', title: 'S4' },
  { src: '/images/obras/sm.jpg', title: 'SM' },
  { src: '/images/obras/luigi.jpg', title: 'Buque Pesquero Luigi' },
  { src: '/images/obras/luigi-mando.jpg', title: 'Mando del Buque Pesquero Luigi' },
  { src: '/images/obras/s3.jpg', title: 'S3' },
];
