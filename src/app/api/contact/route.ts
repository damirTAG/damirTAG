"use server";
import { sendMail } from "@/shared/hooks/sendmail";

export async function POST(req: Request) {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) return new Response("Missing fields", { status: 400 });

    try {
        await sendMail({ name, email, message });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch {
        return new Response("Failed to send email", { status: 500 });
    }
}
