import { technologies } from "./About.techs";
import { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const HeroSection: React.FC = () => {
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
                        href="#projects"
                        className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-medium shadow-md hover:bg-orange-400 transition"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
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

export const AboutSection: React.FC = () => {
    const age = useMemo(() => {
        const birthDate = new Date(2006, 5, 19); // теперь создаётся внутри useMemo
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();

        const hasBirthdayPassed =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasBirthdayPassed) years--;
        return years;
    }, []);

    return (
        <section id="about" className="bg-neutral-950 min-h-screen flex items-center py-20 relative overflow-hidden">
            {/* мягкий фон */}
            <div className="absolute -top-50 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* текст */}
                    <div>
                        <h2 className="text-4xl font-bold text-orange-500 mb-6">About Me</h2>
                        <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                            I&apos;m a {age}-year-old developer from Almaty with expertise in creating web applications, bots, and
                            automation solutions. I specialize in both frontend and backend development, always eager to tackle interesting
                            challenges.
                        </p>
                        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                            When I&apos;m not coding, you&apos;ll find me exploring mountains and practicing hiking or mountaineering. I
                            love bringing creative ideas to life through technology.
                        </p>

                        {/* стек */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {technologies.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="p-4 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-orange-500/30 rounded-xl text-center hover:bg-orange-500/20 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="mb-2 flex justify-center">{tech.icon}</div>
                                    <span className="text-sm text-gray-300">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* декоративная часть */}
                    <div className="hidden lg:flex items-center justify-center relative">
                        {/* декоративная часть с код-блоком */}
                        <div className="hidden lg:flex items-center justify-center relative">
                            <div className="bg-neutral-900/80 border border-orange-500/30 rounded-xl shadow-xl backdrop-blur p-6 w-[420px] text-left font-mono text-sm leading-relaxed">
                                <SyntaxHighlighter
                                    language="python"
                                    style={oneDark}
                                    customStyle={{
                                        background: "rgba(23, 23, 23, 0.8)",
                                        border: "1px solid rgba(249, 115, 22, 0.3)",
                                        borderRadius: "12px",
                                        padding: "24px",
                                        width: "420px",
                                        fontSize: "14px",
                                        fontFamily: "ui-monospace, SFMono-Regular, monospace",
                                    }}
                                >
                                    {`from typing import Tuple, List, Dict

class damirTAG:
    def __init__(self):
        self.hatred     = True
        self.narciss    = False
        self.lazy       = False

class Attributes(damirTAG):
    def __init__(self):
        super().__init__()

    @property
    def life(self) -> Tuple[List[str], int, str]:
        interests   = [
            'code', 'mountains', 'sport', 'tech'
        ]
        age         = 18
        location    = "almaty, kz"
        return interests, age, location

    @property
    def personality(self) -> Dict[str, bool]:
        return {
            "spontaneous"       : False,
            "night_owl"         : True,
            "coffee_addicted"   : False,
            "hyperfix_addicted" : True
        }`}
                                </SyntaxHighlighter>
                            </div>

                            {/* подсветка вокруг */}
                            <div className="absolute inset-0 -z-10 flex justify-center items-center">
                                <div className="w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
