import nodemailer from "nodemailer";

export const sendMail = async ({ name, email, message }: { name: string; email: string; message: string }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: "damirtagilbayev17@gmail.com",
        subject: `New message from ${name}`,
        text: message,
    });
};
