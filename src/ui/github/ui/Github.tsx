import { useGitHubRepos } from "@/shared/hooks/gitrepo";
import { Star, GitFork, Github } from "lucide-react";

const GitHubSection: React.FC = () => {
    const { repos, loading, error } = useGitHubRepos("damirTAG");

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const getLanguageColor = (language: string | null) => {
        const colors: { [key: string]: string } = {
            JavaScript: "#f1e05a",
            TypeScript: "#2b7489",
            Python: "#3572A5",
            PHP: "#4F5D95",
        };
        return colors[language || ""] || "#8b949e";
    };

    return (
        <section id="github" className="relative bg-neutral-950 py-20 overflow-hidden">
            {/* Декоративный градиент в фоне */}
            <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-bold text-center mb-16">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                        GitHub Repositories
                    </span>
                </h2>

                {loading && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                )}

                {error && <div className="text-center text-red-400 mb-8">Error loading repositories: {error}</div>}

                <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden">
                    {repos.map((repo) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block w-full px-6 py-5 bg-neutral-950 hover:bg-neutral-900 transition-colors"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-medium text-gray-200 group-hover:text-orange-400 transition-colors">
                                        {repo.name}
                                    </h3>
                                    {repo.description && <p className="mt-1 text-sm text-gray-400 line-clamp-1">{repo.description}</p>}
                                </div>

                                <div className="flex items-center gap-6 text-xs text-gray-500 shrink-0">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4" />
                                        <span>{repo.stargazers_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="w-4 h-4" />
                                        <span>{repo.forks_count}</span>
                                    </div>
                                    {repo.language && (
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                                            />
                                            <span>{repo.language}</span>
                                        </div>
                                    )}
                                    <span className="hidden sm:inline text-gray-600">Updated {formatDate(repo.updated_at)}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://github.com/damirTAG?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition"
                    >
                        <Github className="w-5 h-5 mr-2" />
                        View All Repositories
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GitHubSection;
