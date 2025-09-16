"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Tag, Loader2, Eye, RefreshCw } from "lucide-react";
import { PhotosAPI, Photo } from "@/lib/api/photos";

const api = new PhotosAPI();

const MasonryGrid: React.FC<{
    photos: Photo[];
    onPhotoClick: (photo: Photo) => void;
    onTagClick: (tag: string) => void;
    searchTerm: string;
    isLoadingMore?: boolean;
}> = ({ photos, onPhotoClick, onTagClick, searchTerm, isLoadingMore }) => {
    const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageLoad = (photoId: number) => {
        setImageLoading((prev) => ({ ...prev, [photoId]: false }));
    };

    const handleImageError = (photoId: number) => {
        setImageLoading((prev) => ({ ...prev, [photoId]: false }));
        setImageErrors((prev) => ({ ...prev, [photoId]: true }));
    };

    const highlightText = (text: string, search: string) => {
        if (!search) return text;
        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-orange-500/30 text-orange-300 rounded px-1">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    const sortedPhotos = [...photos].sort((a, b) => b.id - a.id);

    return (
        <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
                {sortedPhotos.map((photo) => (
                    <div
                        key={photo.id}
                        className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer shadow-lg bg-neutral-900 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        onClick={(e) => {
                            e.preventDefault();
                            onPhotoClick(photo);
                        }}
                    >
                        {/* Image container */}
                        <div className="relative">
                            {imageLoading[photo.id] && (
                                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 min-h-[200px]">
                                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                </div>
                            )}

                            {imageErrors[photo.id] ? (
                                <div className="w-full min-h-[200px] bg-neutral-800 flex items-center justify-center">
                                    <p className="text-gray-500">Failed to load image</p>
                                </div>
                            ) : (
                                <Image
                                    src={photo.url}
                                    alt={photo.title}
                                    width={400}
                                    height={300}
                                    className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
                                        imageLoading[photo.id] ? "opacity-0" : "opacity-100"
                                    }`}
                                    onLoad={() => handleImageLoad(photo.id)}
                                    onError={() => handleImageError(photo.id)}
                                    onLoadStart={() => setImageLoading((prev) => ({ ...prev, [photo.id]: true }))}
                                />
                            )}

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h2 className="text-white text-lg font-semibold mb-2 line-clamp-2">
                                        {highlightText(photo.title, searchTerm)}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* Info overlay - always visible */}
                        <div className="p-4 bg-neutral-900">
                            <h3 className="text-white font-medium mb-2 line-clamp-2">{highlightText(photo.title, searchTerm)}</h3>

                            {photo.tags && (
                                <div className="flex flex-wrap gap-1">
                                    {photo.tags
                                        .split(",")
                                        .slice(0, 3)
                                        .map((tag) => (
                                            <button
                                                key={tag.trim()}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    onTagClick(tag.trim());
                                                }}
                                                className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full hover:bg-orange-500/30 transition-colors inline-flex items-center gap-1"
                                            >
                                                <Tag className="w-3 h-3" />
                                                {tag.trim()}
                                            </button>
                                        ))}
                                    {photo.tags.split(",").length > 3 && (
                                        <span className="text-gray-500 text-xs px-2 py-1">+{photo.tags.split(",").length - 3} more</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading more indicator */}
            {isLoadingMore && (
                <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3 text-orange-500">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="text-lg">Loading more photos...</span>
                    </div>
                </div>
            )}
        </>
    );
};

// Loading Component
const LoadingGrid: React.FC = () => (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-6 space-y-6">
        {Array.from({ length: 12 }).map((_, i) => (
            <div
                key={i}
                className="break-inside-avoid rounded-xl overflow-hidden bg-neutral-900 animate-pulse"
                style={{ height: Math.floor(Math.random() * 200) + 200 }}
            >
                <div className="w-full h-full bg-neutral-800" />
            </div>
        ))}
    </div>
);

const PhotosPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingTriggerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const ITEMS_PER_PAGE = 20;

    // Initial load
    useEffect(() => {
        loadInitialPhotos();
    }, []);

    const loadInitialPhotos = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await api.getAll({ offset: 0, limit: ITEMS_PER_PAGE });
            setAllPhotos(response.photos || response); // Handle different response structures
            setCurrentOffset(ITEMS_PER_PAGE);
            setTotalCount(response.total || response.length);
            setHasMore(response.photos ? response.photos.length === ITEMS_PER_PAGE : response.length === ITEMS_PER_PAGE);
        } catch (err) {
            console.error("Error loading initial photos:", err);
            setError("Failed to load photos. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const loadMorePhotos = useCallback(async () => {
        if (!hasMore || isLoadingMore || debouncedSearch) return;

        try {
            setIsLoadingMore(true);

            const response = await api.getAll({
                offset: currentOffset,
                limit: ITEMS_PER_PAGE,
            });

            const newPhotos = response.photos || response;

            if (newPhotos.length === 0) {
                setHasMore(false);
                return;
            }

            setAllPhotos((prev) => [...prev, ...newPhotos]);
            setCurrentOffset((prev) => prev + ITEMS_PER_PAGE);
            setHasMore(newPhotos.length === ITEMS_PER_PAGE);
        } catch (err) {
            console.error("Error loading more photos:", err);
            setError("Failed to load more photos.");
        } finally {
            setIsLoadingMore(false);
        }
    }, [currentOffset, hasMore, isLoadingMore, debouncedSearch]);

    // Intersection observer for infinite scroll
    useEffect(() => {
        if (!loadingTriggerRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasMore && !isLoadingMore && !debouncedSearch) {
                    loadMorePhotos();
                }
            },
            {
                threshold: 0.1,
                rootMargin: "100px",
            }
        );

        if (loadingTriggerRef.current) {
            observerRef.current.observe(loadingTriggerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loadMorePhotos, hasMore, isLoadingMore, debouncedSearch]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    // TODO: Reset pagination when search changes
    // useEffect(() => {
    //     if (debouncedSearch) {

    //     }
    // }, [debouncedSearch]);

    const filteredPhotos = useMemo(() => {
        if (!debouncedSearch) return allPhotos;

        const searchLower = debouncedSearch.toLowerCase();
        return allPhotos.filter((p) => {
            const titleMatch = p.title.toLowerCase().includes(searchLower);
            const tagsArray = p.tags.split(",").map((t) => t.trim().toLowerCase());
            const tagsMatch = tagsArray.some((tag) => tag.includes(searchLower));
            return titleMatch || tagsMatch;
        });
    }, [allPhotos, debouncedSearch]);

    const handlePhotoClick = (photo: Photo) => {
        router.push(`/photos/${encodeURIComponent(photo.title.toLowerCase())}`);
    };

    const handleTagClick = (tag: string) => {
        setSearch(tag);
        searchInputRef.current?.focus();
    };

    const clearSearch = () => {
        setSearch("");
        searchInputRef.current?.focus();
    };

    const handleRefresh = async () => {
        setCurrentOffset(0);
        setHasMore(true);
        setAllPhotos([]);
        await loadInitialPhotos();
    };

    if (error && allPhotos.length === 0) {
        return (
            <section className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
                        <X className="w-12 h-12 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-300 mb-3">Error Loading Photos</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">{error}</p>
                    <button
                        onClick={handleRefresh}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="min-h-screen bg-neutral-950 text-white relative">
                <div className="relative bg-gradient-to-br from-orange-900/20 via-neutral-950 to-neutral-950 text-center py-16 px-6">
                    {/* Radial overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1),transparent_70%)]" />

                    <div className="relative max-w-4xl mx-auto">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
                            <Eye className="w-6 h-6 text-white" />
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                            Visual Collection
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-gray-300 mb-2 leading-relaxed">
                            Discover a curated gallery of moments, memories, and inspirations
                        </p>
                        <div className="text-sm text-gray-500 mb-8 flex items-center justify-center gap-4">
                            <span>
                                {allPhotos.length} loaded{totalCount ? ` of ${totalCount} total` : ""}
                            </span>
                            {!debouncedSearch && hasMore && <span>• Loading more as you scroll</span>}
                            <button
                                onClick={handleRefresh}
                                className="text-orange-500 hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                                disabled={isLoading}
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                                Refresh
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="w-5 h-5 text-white absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search by title or tags..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-neutral-900/70 border border-orange-500/20 backdrop-blur placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
                            />
                            {search && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                            {debouncedSearch && (
                                <div className="mt-2 text-sm text-gray-400">
                                    Found {filteredPhotos.length} result{filteredPhotos.length !== 1 ? "s" : ""} for &quot;{debouncedSearch}
                                    &quot; in loaded photos
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {isLoading ? (
                        <LoadingGrid />
                    ) : filteredPhotos.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neutral-900 flex items-center justify-center">
                                <Search className="w-12 h-12 text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-300 mb-3">No photos found</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Try adjusting your search terms or browse all photos by clearing the search.
                            </p>
                            {search && (
                                <button
                                    onClick={clearSearch}
                                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <MasonryGrid
                                photos={filteredPhotos}
                                onPhotoClick={handlePhotoClick}
                                onTagClick={handleTagClick}
                                searchTerm={debouncedSearch}
                                isLoadingMore={isLoadingMore}
                            />

                            {!debouncedSearch && hasMore && !isLoading && (
                                <div ref={loadingTriggerRef} className="h-20 flex items-center justify-center">
                                    {/* trigger */}
                                </div>
                            )}

                            {!debouncedSearch && !hasMore && allPhotos.length > 0 && (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">🎉 You&apos;ve reached the end! {allPhotos.length} photos loaded.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default PhotosPage;
