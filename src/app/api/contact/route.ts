import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSiteUrl } from "@/config/site";
import {
  EMAIL_REGEX,
  clientIp,
  escapeHtml,
  isAllowedOrigin,
  isHoneypot,
  isRateLimited,
  isTooFast,
  sanitizeHeader,
} from "@/lib/contact";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    if (
      !isAllowedOrigin(origin, {
        baseUrl: getSiteUrl(),
        vercelUrl: process.env.VERCEL_URL,
        nodeEnv: process.env.NODE_ENV,
      })
    ) {
      return NextResponse.json(
        { success: false, error: "Origen no permitido." },
        { status: 403 }
      );
    }

    if (isRateLimited(clientIp(req.headers))) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Demasiados intentos. Por favor esperá unos minutos antes de volver a enviar.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (isHoneypot(body.company) || isTooFast(body.t)) {
      return NextResponse.json(
        { success: true, message: "Mensaje enviado exitosamente." },
        { status: 200 }
      );
    }

    const senderName = sanitizeHeader(String(body.nombre ?? ""));
    const senderSubject = sanitizeHeader(String(body.asunto ?? ""));
    const senderMessage = String(body.mensaje ?? "").trim();
    const senderEmail = sanitizeHeader(String(body.email ?? ""));

    if (!senderName || !senderEmail || !senderMessage) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos obligatorios deben ser completados.",
        },
        { status: 400 }
      );
    }

    if (senderName.length > 100) {
      return NextResponse.json(
        { success: false, error: "El nombre no puede superar los 100 caracteres." },
        { status: 400 }
      );
    }
    if (senderEmail.length > 254) {
      return NextResponse.json(
        { success: false, error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }
    if (senderSubject.length > 200) {
      return NextResponse.json(
        { success: false, error: "El asunto no puede superar los 200 caracteres." },
        { status: 400 }
      );
    }
    if (senderMessage.length > 2000) {
      return NextResponse.json(
        { success: false, error: "El mensaje no puede superar los 2000 caracteres." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(senderEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor proporcioná un correo electrónico válido.",
        },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "");

    if (!emailUser || !emailPass) {
      return NextResponse.json(
        {
          success: false,
          error: "El servicio de correo no está disponible en este momento.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
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

    await transporter.sendMail({
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

    return NextResponse.json(
      { success: true, message: "Mensaje enviado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("[contact] Error al enviar correo:", errorMessage);
    return NextResponse.json(
      {
        success: false,
        error:
          "Ocurrió un error al intentar enviar el mensaje. Por favor intentá de nuevo.",
      },
      { status: 500 }
    );
  }
}
