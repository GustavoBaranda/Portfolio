import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { nombre, name, email, asunto, subject, mensaje, message } = await req.json();

    const senderName = nombre || name;
    const senderSubject = asunto || subject;
    const senderMessage = mensaje || message;

    if (!senderName || !email || !senderMessage) {
      return NextResponse.json(
        { success: false, error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Por favor proporciona un correo electrónico válido." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const rawPass = process.env.EMAIL_PASS || "";
    const emailPass = rawPass.replace(/\s+/g, "");

    if (!emailUser || !emailPass || emailPass === "tu_contraseña_de_aplicacion") {
      return NextResponse.json(
        {
          success: false,
          error:
            "El servicio de correo no está configurado aún. Por favor verifica tu EMAIL_PASS en el archivo .env",
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

    const mailSubject = senderSubject && senderSubject.trim() !== "" 
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

    const logoPath = path.join(process.cwd(), "src", "assets", "logo.png");
    const hasLogo = fs.existsSync(logoPath);

    const attachments = hasLogo
      ? [
          {
            filename: "logo.png",
            path: logoPath,
            cid: "gusdev_logo",
          },
        ]
      : [];

    const mailOptions = {
      from: `"Portfolio GusDev Contacto" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: mailSubject,
      text: `Nombre: ${senderName}\nEmail: ${email}\nAsunto: ${senderSubject || "Sin asunto"}\n\nMensaje:\n${senderMessage}`,
      attachments: attachments,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                  
                  <tr>
                    <td style="background-color: #0f172a; padding: 28px 32px; border-bottom: 3px solid #4f46e5;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="left" style="vertical-align: middle;">
                            <span style="color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                              GUSDEV · PORTFOLIO
                            </span>
                            <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 6px 0 0 0; letter-spacing: -0.3px;">
                              Nuevo Mensaje de Contacto
                            </h1>
                          </td>
                          <td align="right" style="vertical-align: middle; width: 48px; padding-left: 16px;">
                            ${
                              hasLogo
                                ? `<img src="cid:gusdev_logo" alt="GusDev Logo" width="48" height="48" style="display: block; width: 48px; height: 48px; object-fit: contain;" />`
                                : `<div style="width: 44px; height: 44px; background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); border-radius: 10px; text-align: center; line-height: 44px; color: #ffffff; font-weight: 800;">GD</div>`
                            }
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 32px;">
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                        <tr>
                          <td style="padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                            <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 4px;">Remitente</span>
                            <span style="color: #0f172a; font-size: 15px; font-weight: 600;">${senderName}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                            <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 4px;">Correo Electrónico</span>
                            <a href="mailto:${email}" style="color: #4f46e5; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        ${
                          senderSubject
                            ? `
                        <tr>
                          <td style="padding: 16px 0; border-bottom: 1px solid #f1f5f9;">
                            <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 4px;">Asunto</span>
                            <span style="color: #334155; font-size: 14px; font-weight: 500;">${senderSubject}</span>
                          </td>
                        </tr>
                        `
                            : ""
                        }
                      </table>

                      <div style="margin-bottom: 32px;">
                        <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; display: block; margin-bottom: 8px;">Mensaje</span>
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #0f172a; border-radius: 6px; padding: 18px 20px; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${senderMessage}</div>
                      </div>

                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="left">
                            <a href="mailto:${email}" style="display: inline-block; background-color: #0f172a; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px; letter-spacing: 0.2px;">
                              Responder a ${senderName}
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <tr>
                    <td style="background-color: #fafafa; padding: 16px 32px; border-top: 1px solid #f1f5f9; text-align: center;">
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                        Formulario de contacto · <strong>gustavobaranda.com</strong> · ${formattedDate}
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
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Mensaje enviado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el correo con Nodemailer:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error al intentar enviar el mensaje." },
      { status: 500 }
    );
  }
}
