"use client";

import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to send message");

            setSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-neutral-950 flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full text-gray-100">
                <h1 className="text-4xl font-bold text-orange-500 mb-8 text-center">Contact Me</h1>
                <p className="text-gray-400 mb-8 text-center">Tell me about your project, idea, or just say hi!</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-100 focus:border-orange-500 focus:outline-none transition"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-100 focus:border-orange-500 focus:outline-none transition"
                    />
                    <textarea
                        name="message"
                        placeholder="Tell me about your project"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                        className="px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-gray-100 focus:border-orange-500 focus:outline-none transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-orange-500 rounded-xl text-white font-medium hover:bg-orange-400 transition"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    {success && <p className="text-green-400 mt-2">Thank you! Message sent successfully!</p>}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </section>
    );
}
