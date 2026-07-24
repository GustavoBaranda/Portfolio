import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validar campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const rawPass = process.env.EMAIL_PASS || "";
    const emailPass = rawPass.replace(/\s+/g, "");

    if (!emailUser || !emailPass || emailPass === "tu_contraseña_de_aplicacion") {
      return NextResponse.json(
        {
          error:
            "El servicio de correo no está configurado aún. Por favor verifica tu EMAIL_PASS en el archivo .env",
        },
        { status: 500 }
      );
    }

    // Configurar transporte SMTP con Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailSubject = subject && subject.trim() !== "" 
      ? `📬 [Contacto Web] ${subject}`
      : `📬 Nuevo mensaje de ${name}`;

    const formattedDate = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Configurar opciones del correo con diseño HTML Premium
    const mailOptions = {
      from: `"Portfolio Contacto" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: mailSubject,
      text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject || "Sin asunto"}\n\nMensaje:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 10px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04); border: 1px solid #e2e8f0;">
                  
                  <!-- HEADER -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 36px 32px; text-align: left;">
                      <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 20px; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">
                        GusDev Portfolio
                      </div>
                      <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px;">
                        ¡Nuevo mensaje de contacto! 📩
                      </h1>
                      <p style="color: #e0e7ff; font-size: 14px; margin: 0; opacity: 0.95;">
                        Has recibido una nueva consulta desde tu sitio web.
                      </p>
                    </td>
                  </tr>

                  <!-- CONTENIDO -->
                  <tr>
                    <td style="padding: 32px;">
                      
                      <!-- DATOS DEL REMITENTE -->
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #f1f5f9; margin-bottom: 24px;">
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Remitente</span>
                            <div style="color: #0f172a; font-size: 16px; font-weight: 700; margin-top: 2px;">${name}</div>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Correo Electrónico</span>
                            <div style="margin-top: 2px;">
                              <a href="mailto:${email}" style="color: #4f46e5; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
                            </div>
                          </td>
                        </tr>
                        ${
                          subject
                            ? `
                        <tr>
                          <td>
                            <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Asunto</span>
                            <div style="color: #334155; font-size: 14px; font-weight: 600; margin-top: 2px;">${subject}</div>
                          </td>
                        </tr>
                        `
                            : ""
                        }
                      </table>

                      <!-- CUERPO DEL MENSAJE -->
                      <div style="margin-bottom: 28px;">
                        <span style="color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Mensaje</span>
                        <div style="background-color: #faf5ff; border-left: 4px solid #8b5cf6; border-radius: 0 12px 12px 0; padding: 20px; color: #1e1b4b; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                      </div>

                      <!-- BOTÓN DE RESPUESTA RÁPIDA -->
                      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);">
                              Responder directamente a ${name}
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #f1f5f9; text-align: center;">
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                        Mensaje enviado desde tu sitio web <strong style="color: #64748b;">GusDev</strong> · ${formattedDate}
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

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Mensaje enviado exitosamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el correo con Nodemailer:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al intentar enviar el mensaje." },
      { status: 500 }
    );
  }
}
