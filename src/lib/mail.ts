// Envío de mails con Resend (https://resend.com) usando su API REST.
// Variables de entorno necesarias (ver .env.example):
//   RESEND_API_KEY  clave de la API de Resend
//   MAIL_FROM       remitente con dominio verificado en Resend, ej. "Web Tecvol <web@tecvol.com.ar>"
//   MAIL_TO         destinatario de las consultas (por defecto info@tecvol.com.ar)
import { MAIL_FROM, MAIL_TO, RESEND_API_KEY } from 'astro:env/server';

export interface Attachment {
  filename: string;
  content: string; // base64
}

export interface MailInput {
  subject: string;
  replyTo?: string;
  rows: [label: string, value: string][];
  attachments?: Attachment[];
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function sendMail({ subject, replyTo, rows, attachments }: MailInput): Promise<void> {
  if (!RESEND_API_KEY || !MAIL_FROM) {
    throw new Error('El envío de mails todavía no está configurado (faltan RESEND_API_KEY o MAIL_FROM).');
  }

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#ff8929">${escapeHtml(subject)}</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top">${escapeHtml(label)}</td>` +
            `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value || '-')}</td></tr>`,
        )
        .join('')}
    </table>`;
  const text = rows.map(([label, value]) => `${label}: ${value || '-'}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: MAIL_TO.split(',').map((s) => s.trim()),
      reply_to: replyTo,
      subject,
      html,
      text,
      attachments,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend respondió ${res.status}: ${detail}`);
  }
}

// Validaciones compartidas por los formularios
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isPhone = (v: string) => v.replace(/\D/g, '').length >= 6 && !/[^\d\s+()\-.]/.test(v);
export const clean = (v: FormDataEntryValue | null, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
