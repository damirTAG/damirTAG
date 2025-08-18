import { useState, useEffect } from "react";

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={`fixed top-0 w-full z-40 transition-all duration-300 ${
                isScrolled ? "bg-neutral-950/70 shadow-lg" : "bg-transparent"
            } backdrop-blur-lg`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-extrabold tracking-tight text-orange-500">@damirtag</div>
                    <nav className="hidden md:flex space-x-8">
                        {["Home", "About", "Portfolio", "GitHub", "Contact"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="hover-target text-gray-300 hover:text-orange-500 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};
