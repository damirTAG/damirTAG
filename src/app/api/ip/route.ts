import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("IP API fetch failed:", error);
        return NextResponse.json({ error: "Failed to fetch IP" }, { status: 500 });
    }
}
