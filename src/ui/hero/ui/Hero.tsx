const HeroSection: React.FC = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
            {/* Фон — плавные линии */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg
                    className="w-[150%] max-w-none opacity-20 animate-pulse-slow"
                    viewBox="0 0 1440 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,96L60,122.7C120,149,240,203,360,197.3C480,192,600,128,720,101.3C840,75,960,85,1080,122.7C1200,160,1320,224,1380,256L1440,288"
                        stroke="url(#grad1)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <defs>
                        <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="0">
                            <stop stopColor="#fb923c" />
                            <stop offset="1" stopColor="#f97316" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Контент */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">Web Developer</span>
                </h1>

                <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                    Crafting fast, scalable, and creative digital experiences
                </p>

                <div className="mt-8 flex justify-center gap-4 text-sm">
                    <a
                        href="/projects"
                        className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-medium shadow-md hover:bg-orange-400 transition"
                    >
                        View Projects
                    </a>
                    <a
                        href="/contact"
                        className="px-6 py-3 rounded-2xl border border-orange-500 text-orange-400 font-medium hover:bg-orange-500/10 transition"
                    >
                        Contact Me
                    </a>
                </div>
            </div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />
        </section>
    );
};

export default HeroSection;
