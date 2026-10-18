import nodemailer from "nodemailer";
import { getSiteUrl } from "@/config/site";
import { escapeHtml, sanitizeHeader } from "@/lib/contact";
import { handleContactRequest } from "@/lib/contact-handler";

export const runtime = "nodejs";

export async function POST(req: Request) {
  return handleContactRequest(req, {
    originOptions: { baseUrl: getSiteUrl(), vercelUrl: process.env.VERCEL_URL, nodeEnv: process.env.NODE_ENV },
    send: async (data) => {
      const emailUser = process.env.EMAIL_USER;
      const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "");
      if (!emailUser || !emailPass) throw new Error("Correo no configurado");
      const senderName = sanitizeHeader(data.nombre);
      const senderEmail = sanitizeHeader(data.email);
      const senderSubject = sanitizeHeader(data.asunto);
      const senderMessage = data.mensaje;
      const transporter = nodemailer.createTransport({
        service: "gmail", auth: { user: emailUser, pass: emailPass },
        connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
      });
      const mailSubject = senderSubject
        ? `[Contacto] ${senderSubject}`
        : `Nuevo mensaje de ${senderName}`;

      const formattedDate = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const safeName = escapeHtml(senderName);
      const safeEmail = escapeHtml(senderEmail);
      const safeSubject = escapeHtml(senderSubject);
      const safeMessage = escapeHtml(senderMessage);

      const result = await transporter.sendMail({
        from: `"Portfolio GusDev Contacto" <${emailUser}>`,
        to: emailUser,
        replyTo: senderEmail,
        subject: mailSubject,
        text: `Nombre: ${senderName}\nEmail: ${senderEmail}\nAsunto: ${senderSubject || "Sin asunto"}\n\nMensaje:\n${senderMessage}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 12px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
                    <tr>
                      <td style="background-color: #0f172a; padding: 28px 32px; border-bottom: 3px solid #4f46e5;">
                        <span style="color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">GUSDEV · PORTFOLIO</span>
                        <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 6px 0 0 0;">Nuevo Mensaje de Contacto</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 32px;">
                        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                              <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 4px;">Remitente</span>
                              <span style="color: #0f172a; font-size: 15px; font-weight: 600;">${safeName}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                              <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 4px;">Correo Electrónico</span>
                              <a href="mailto:${safeEmail}" style="color: #4f46e5; font-size: 15px; font-weight: 600; text-decoration: none;">${safeEmail}</a>
                            </td>
                          </tr>
                          ${
                            senderSubject
                              ? `<tr>
                            <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                              <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 4px;">Asunto</span>
                              <span style="color: #334155; font-size: 14px; font-weight: 500;">${safeSubject}</span>
                            </td>
                          </tr>`
                              : ""
                          }
                        </table>
                        <div style="margin-bottom: 32px;">
                          <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 8px;">Mensaje</span>
                          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0f172a; border-radius: 6px; padding: 18px 20px; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</div>
                        </div>
                        <a href="mailto:${safeEmail}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px;">
                          Responder a ${safeName}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #fafafa; padding: 16px 32px; border-top: 1px solid #f1f5f9; text-align: center;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                          Formulario de contacto · gustavobaranda.com · ${formattedDate}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
      if (!result.accepted?.length || result.rejected?.length) {
        throw new Error("El servidor SMTP no aceptó el destinatario");
      }
    },
  });
}
