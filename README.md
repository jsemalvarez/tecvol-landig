# Tecvol – landing

Copia de https://tecvol.com.ar (antes en WordPress + Elementor) hecha con [Astro](https://astro.build).
Es el punto de partida para los cambios que pida el cliente.

## Uso

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera el sitio para producción
```

Requiere Node 20.3 o superior.

## Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Teléfonos, mail, dirección, redes, clientes, servicios, obras, fotos de la galería | `src/data/site.ts` |
| Página de inicio (secciones y estilos) | `src/pages/index.astro` |
| Página RRHH | `src/pages/rrhh.astro` |
| Encabezado y menú | `src/components/Header.astro` |
| Pie (franja Whatsapp, clientes, mapa, datos) | `src/components/Footer.astro` |
| Imágenes | `public/images/` |

## Formularios

El formulario de contacto y el de RRHH (con CV adjunto) envían un mail con [Resend](https://resend.com)
mediante `/api/contacto` y `/api/rrhh`. Hay que cargar estas variables en Vercel
(ver `.env.example`):

- `RESEND_API_KEY`
- `MAIL_FROM`: remitente de un dominio verificado en Resend (por ejemplo `web@tecvol.com.ar`)
- `MAIL_TO`: a quién llegan (por defecto `info@tecvol.com.ar`)

Si faltan, los formularios muestran un mensaje de error y sugieren escribir por Whatsapp.

## Publicación

El proyecto ya trae el adaptador de Vercel (`@astrojs/vercel`). Las páginas son estáticas y solo
`/api/*` corre como función.
