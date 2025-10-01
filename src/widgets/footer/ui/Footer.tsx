"use client";

import { MessageCircle, Mail, Github, MapPin } from "lucide-react";
import { SilhouetteSvg } from "./Footer.silhouette";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Footer: React.FC = () => {
    const [location, setLocation] = useState<{
        ip: string;
        countryCode: string;
        city: string;
    } | null>(null);

    const contactLinks = [
        { icon: Mail, label: "Email", href: "mailto:damirtagilbayev17@gmail.com" },
        { icon: MessageCircle, label: "Telegram", href: "https://t.me/damirtag" },
        { icon: Github, label: "GitHub", href: "https://github.com/damirtag" },
    ];

    const pathname = usePathname();

    const getFlagEmoji = (countryCode: string) => {
        return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
    };

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const res = await fetch("/api/ip");
                const data = await res.json();
                setLocation({
                    ip: data.ip,
                    countryCode: data.country_code,
                    city: data.city || "Unknown",
                });
            } catch (err) {
                console.error("Error fetching IP info:", err);
            }
        };
        fetchIP();
    }, []);

    if (pathname === "/photos" || pathname.startsWith("/photos/")) {
        return null;
    }

    return (
        <footer className="relative bg-neutral-950" id="contact">
            <div className="max-w-full mx-auto px-6 py-16 relative z-10">
                <div className="flex flex-col items-center gap-8">
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent mb-3">
                            Get In Touch
                        </h2>
                        <p className="text-gray-400">Ready to collaborate on your next project</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-10">
                        {contactLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex flex-col items-center gap-2 text-gray-400 hover:text-orange-400 transition"
                            >
                                <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span className="text-sm">{link.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div className="w-full border-t border-neutral-800/50 pt-6 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} Damir. Built with passion ⚡
                        {location && (
                            <div className="mt-2 text-gray-400 flex items-center justify-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>
                                    {location.city}, {location.ip} {getFlagEmoji(location.countryCode)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Mountain Silhouette */}
                    <div className="absolute bottom-0 left-0 w-full">
                        <SilhouetteSvg />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
