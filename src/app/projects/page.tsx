"use client";

export default function StillDeveloping() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-orange-500 mb-6 animate-pulse">🚧 Still Developing</h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8">This page is under construction. Please wait and check back soon!</p>
            <button
                onClick={() => window.history.back()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium shadow-lg hover:shadow-orange-500/30 transition"
            >
                Go Back
            </button>
        </div>
    );
}
