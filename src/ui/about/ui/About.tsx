import { technologies } from "./About.techs";
import { useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AboutSection: React.FC = () => {
    const age = useMemo(() => {
        const birthDate = new Date(2006, 5, 19);
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
        age         = ${age}
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

export default AboutSection;
