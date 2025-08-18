import { ExternalLink } from "lucide-react";

export const PortfolioSection: React.FC = () => {
    const projects = [
        {
            title: "E-commerce Platform",
            description: "Full-stack e-commerce solution with admin dashboard, payment integration, and inventory management.",
            image: "Project Image 1",
            tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
            link: "#",
        },
        {
            title: "Telegram Bot Framework",
            description: "Intelligent bot for business process automation with external API integrations and analytics.",
            image: "Project Image 2",
            tags: ["Python", "aiogram", "Redis", "Docker"],
            link: "#",
        },
        {
            title: "Task Automation Suite",
            description: "Web-based automation system for routine tasks with scheduling and monitoring capabilities.",
            image: "Project Image 3",
            tags: ["Python", "FastAPI", "React", "Celery"],
            link: "#",
        },
        {
            title: "Real-time Chat App",
            description: "Modern chat application with real-time messaging, file sharing, and video calls.",
            image: "Project Image 4",
            tags: ["Next.js", "Socket.io", "WebRTC", "MongoDB"],
            link: "#",
        },
    ];

    return (
        <section id="projects" className="min-h-screen bg-neutral-950 flex items-center py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-orange-500 text-center mb-12">Portfolio</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="hover-target bg-gray-900/50 border border-orange-500/20 rounded-xl overflow-hidden hover:border-orange-500/60 hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-gray-600">
                                {project.image}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-orange-500 mb-3">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={project.link}
                                    className="hover-target inline-flex items-center text-orange-500 hover:text-orange-400 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    View Project
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
