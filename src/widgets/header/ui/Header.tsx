"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "Photos", href: "/photos" },
        { name: "Contact", href: "/contact" },
    ];

    const headerPositionClass = pathname === "/photos" || pathname.startsWith("/photos/") ? "relative" : "fixed top-0";

    return (
        <header className={`${headerPositionClass} w-full z-50 transition-all duration-300 bg-transparent backdrop-blur-lg`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-extrabold tracking-tight text-orange-500">
                    @damirtag
                </Link>

                <nav className="hidden md:flex space-x-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-gray-300 hover:text-orange-500 transition-colors group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-orange-500 transition-colors">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-neutral-950/95 backdrop-blur-lg shadow-lg">
                    <ul className="flex flex-col space-y-4 py-6 px-6">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="block text-gray-300 hover:text-orange-500 text-lg font-medium transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
