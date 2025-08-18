"use client";

import React from "react";
import { HeroSection, AboutSection } from "@/ui/About";
// import { PortfolioSection } from "@/ui/Portfolio";
import { GitHubSection } from "@/ui/Github";

// Main Portfolio Component
const Portfolio: React.FC = () => {
    return (
        <div className="bg-gray-950 text-white min-h-screen cursor-none overflow-x-hidden">
            <main>
                <HeroSection />
                <AboutSection />
                {/* TODO: upgrade portfolio and need to fill it with actual data */}
                {/* <PortfolioSection /> */}
                <GitHubSection />
            </main>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #1a1a1a;
                }
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #f97316, #fb923c);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #ea580c, #f97316);
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Portfolio;
