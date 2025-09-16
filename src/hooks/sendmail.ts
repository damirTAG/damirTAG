import nodemailer from "nodemailer";

export const sendMail = async ({ name, email, message }: { name: string; email: string; message: string }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "damirtagilbayev17@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"${name}" <damirtagilbayev17@gmail.com>`,
        to: "damirtagilbayev17@gmail.com",
        replyTo: email,
        subject: `✉️ Сообщение от ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 12px; background: #fefefe; border: 1px solid #eee;">
                <h2 style="color: #444; margin-bottom: 15px;">пацан тебе тут пишут с твоего говно сайта</h2>
                <p style="margin-bottom: 10px;">вот имя: <strong>${name}</strong></p>
                <p style="margin-bottom: 10px;">вот его почта: <a href="mailto:${email}" style="color:#2563eb;">${email}</a></p>
                
                <p style="margin: 20px 0 10px; font-weight: bold; color: #e11d48;">💩 вот че высрали:</p>
                
                <div style="padding: 15px; background: #f9fafb; border-left: 4px solid #2563eb; border-radius: 6px;">
                    <p style="margin: 0; white-space: pre-line; line-height: 1.5; color:#333;">${message}</p>
                </div>

                <div style="margin-top: 25px;">
                    <a href="mailto:${email}" style="display:inline-block; padding:10px 18px; background:#2563eb; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold;">
                        Ответить ${name}
                    </a>
                </div>

                <p style="margin-top: 30px; font-size: 13px; color: #888;">⚠️ это сообщение пришло с твоей говняной формы обратной связи.</p>
            </div>
        `,
    });
};
