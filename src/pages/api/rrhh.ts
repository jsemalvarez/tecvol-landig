import type { APIRoute } from 'astro';
import { clean, isEmail, isPhone, json, sendMail } from '../../lib/mail';

export const prerender = false;

const ALLOWED = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg'];
// Vercel acepta hasta 4,5 MB por pedido; dejamos margen para el resto del formulario.
const MAX_BYTES = 4 * 1024 * 1024;

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, error: 'Datos inválidos' }, 400);
  }

  if (clean(data.get('empresa_web'))) return json({ ok: true });

  const nombre = clean(data.get('nombre'), 200);
  const email = clean(data.get('email'), 200);
  const telefono = clean(data.get('telefono'), 50);
  const cv = data.get('cv');

  if (!nombre || !email || !telefono || !(cv instanceof File) || cv.size === 0) {
    return json({ ok: false, error: 'Por favor completar todos los campos requeridos' }, 400);
  }
  if (!isEmail(email)) return json({ ok: false, error: 'Mail inválido' }, 400);
  if (!isPhone(telefono)) return json({ ok: false, error: 'Teléfono inválido' }, 400);

  const filename = cv.name.replace(/[^\w.\- ()áéíóúñÁÉÍÓÚÑ]/g, '_').slice(0, 120) || 'cv';
  if (!ALLOWED.some((ext) => filename.toLowerCase().endsWith(ext))) {
    return json({ ok: false, error: 'Extensión de archivo no permitida' }, 400);
  }
  if (cv.size > MAX_BYTES) {
    return json({ ok: false, error: 'Tamaño de archivo excede el límite permitido' }, 400);
  }

  try {
    const content = Buffer.from(await cv.arrayBuffer()).toString('base64');
    await sendMail({
      subject: `Nuevo CV desde la web - ${nombre}`,
      replyTo: email,
      rows: [
        ['Nombre', nombre],
        ['Mail', email],
        ['Teléfono o Whatsapp', telefono],
        ['CV', filename],
      ],
      attachments: [{ filename, content }],
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[rrhh]', err);
    return json({ ok: false, error: 'No pudimos enviar tu CV. Por favor intentá de nuevo o escribinos por Whatsapp.' }, 500);
  }
};
