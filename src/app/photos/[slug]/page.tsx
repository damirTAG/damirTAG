"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { PhotosAPI, Photo } from "@/lib/api/photos";
import { ArrowLeft, ArrowRight, Link2, X, Share2, Tag, Calendar, Eye, EyeOff, Home, Loader2 } from "lucide-react";

const api = new PhotosAPI();

export default function PhotoPage() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    const [photo, setPhoto] = useState<Photo | null>(null);
    const [photosList, setPhotosList] = useState<Photo[]>([]);
    const [showMeta, setShowMeta] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!slug) return;
        setIsLoading(true);

        api.getAll({ limit: 50 })
            .then((response) => {
                const photosArray = response.photos;

                const sorted = [...photosArray].sort((a, b) => b.id - a.id);
                setPhotosList(sorted);

                const found = sorted.find((p) => encodeURIComponent(p.title.toLowerCase()) === slug);

                if (found) setPhoto(found);
                else router.push("/404");

                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                router.push("/404");
            });
    }, [slug, router]);

    const index = photo ? photosList.findIndex((p) => p.id === photo.id) : -1;
    const prevPhoto = index > 0 ? photosList[index - 1] : undefined;
    const nextPhoto = index >= 0 && index < photosList.length - 1 ? photosList[index + 1] : undefined;

    const handleNavigation = useCallback(
        (p?: Photo) => {
            if (!p) return;
            setImageLoaded(false);
            router.push(`/photos/${encodeURIComponent(p.title.toLowerCase())}`);
        },
        [router]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!photo) return;
            if (e.key === "Escape") router.push("/photos");
            if (e.key === "ArrowLeft") handleNavigation(prevPhoto);
            if (e.key === "ArrowRight") handleNavigation(nextPhoto);
            if (e.key === " ") {
                e.preventDefault();
                setShowMeta((prev) => !prev);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [photo, prevPhoto, nextPhoto, handleNavigation, router]);

    if (!photo) return null;

    if (isLoading) {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg">Loading photo...</p>
                </div>
            </div>
        );
    }

    const humanizeDate = (iso: string) => {
        const date = new Date(iso);
        const now = new Date();
        const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

        if (isToday) {
            return `Today at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        }

        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const isYesterday =
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear();

        if (isYesterday) {
            return `Yesterday at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        }

        return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: photo.title,
                    text: `Check out this photo: ${photo.title}`,
                    url: window.location.href,
                });
            } catch {
                handleCopyLink();
            }
        } else {
            handleCopyLink();
        }
    };

    return (
        <div className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
            {/* Background blur effect */}
            <div className="absolute inset-0 opacity-20">
                <Image src={photo.url} alt="" fill className="object-cover blur-2xl scale-110" priority />
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full cursor-pointer flex items-center justify-center" onClick={() => setShowMeta(!showMeta)}>
                {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                    </div>
                )}

                <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className={`object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                    priority
                />
            </div>

            {/* Top Navigation Bar */}
            <div
                className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300 ${
                    showMeta ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                }`}
            >
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.push("/photos")}
                        className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                        <Home className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Gallery</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-white/60 text-sm hidden sm:inline">
                            {index + 1} of {photosList.length}
                        </span>

                        <button
                            onClick={() => setShowMeta(!showMeta)}
                            className="text-white hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                            title={showMeta ? "Hide info" : "Show info"}
                        >
                            {showMeta ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={() => router.push("/photos")}
                            className="text-white hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Photo Metadata */}
            <div
                className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-300 ${
                    showMeta ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
            >
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{photo.title}</h1>

                    <div className="flex items-center gap-4 mb-4 text-white/80">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{humanizeDate(photo.created_at)}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {photo.tags.split(",").map((tag) => (
                            <span
                                key={tag.trim()}
                                className="inline-flex items-center gap-1 bg-orange-500/20 text-orange-300 text-sm px-3 py-1 rounded-full backdrop-blur"
                            >
                                <Tag className="w-3 h-3" />
                                {tag.trim()}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleCopyLink}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur"
                        >
                            <Link2 className="w-4 h-4" />
                            {copied ? "Copied!" : "Copy Link"}
                        </button>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {prevPhoto && (
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur"
                    onClick={() => handleNavigation(prevPhoto)}
                    title={`Previous: ${prevPhoto.title}`}
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            )}

            {nextPhoto && (
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-200 hover:scale-110 backdrop-blur"
                    onClick={() => handleNavigation(nextPhoto)}
                    title={`Next: ${nextPhoto.title}`}
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            )}

            {/* Progress indicator */}
            <div
                className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    showMeta ? "opacity-0" : "opacity-100"
                }`}
            >
                <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full backdrop-blur">
                    <span className="text-white/60 text-sm">
                        {index + 1} / {photosList.length}
                    </span>
                </div>
            </div>

            {/* Instructions overlay */}
            <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ${
                    showMeta ? "opacity-0" : "opacity-60"
                }`}
            >
                <div className="text-center text-white/60 text-sm">
                    <p>Click to toggle info • Space to hide/show • Arrow keys to navigate • ESC to close</p>
                </div>
            </div>
        </div>
    );
}
