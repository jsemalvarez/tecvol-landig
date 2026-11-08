import type { APIRoute } from 'astro';
import { clean, isEmail, isPhone, json, sendMail } from '../../lib/mail';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json({ ok: false, error: 'Datos inválidos' }, 400);
  }

  // Campo trampa: si viene completo es un bot. Respondemos OK sin mandar nada.
  if (clean(data.get('empresa_web'))) return json({ ok: true });

  const nombre = clean(data.get('nombre'), 200);
  const email = clean(data.get('email'), 200);
  const telefono = clean(data.get('telefono'), 50);
  const consulta = clean(data.get('consulta'), 5000);

  if (!nombre || !email || !telefono) {
    return json({ ok: false, error: 'Por favor completar todos los campos requeridos' }, 400);
  }
  if (!isEmail(email)) return json({ ok: false, error: 'Mail inválido' }, 400);
  if (!isPhone(telefono)) return json({ ok: false, error: 'Teléfono inválido' }, 400);

  try {
    await sendMail({
      subject: `Nueva consulta desde la web - ${nombre}`,
      replyTo: email,
      rows: [
        ['Nombre', nombre],
        ['Mail', email],
        ['Teléfono o Whatsapp', telefono],
        ['Consulta', consulta],
      ],
    });
    return json({ ok: true });
  } catch (err) {
    console.error('[contacto]', err);
    return json({ ok: false, error: 'No pudimos enviar tu mensaje. Por favor intentá de nuevo o escribinos por Whatsapp.' }, 500);
  }
};
