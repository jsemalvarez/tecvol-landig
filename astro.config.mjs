// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://tecvol.com.ar',
  // Páginas estáticas; solo /api/* corre en el servidor (funciones de Vercel).
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  // Dominios desde los que se sirve el sitio. Sin esta lista, en Vercel Astro toma
  // "localhost" como dirección propia y rechaza los envíos de los formularios (403).
  security: {
    allowedDomains: [
      { hostname: 'tecvol.com.ar' },
      { hostname: 'www.tecvol.com.ar' },
      { hostname: '*.vercel.app' },
    ],
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_TO: envField.string({ context: 'server', access: 'secret', default: 'info@tecvol.com.ar' }),
    },
  },
});
