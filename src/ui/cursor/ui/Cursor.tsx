"use client";

import { useState, useEffect, useRef } from "react";

interface CursorPosition {
    x: number;
    y: number;
}

interface TrailDot {
    x: number;
    y: number;
    opacity: number;
}

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [trails, setTrails] = useState<TrailDot[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);
    const requestRef = useRef<number>(0);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(!("ontouchstart" in window || navigator.maxTouchPoints > 0));
        };
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const trailLength = 12;

        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            setTrails((prev) => {
                const newTrail = { x: e.clientX, y: e.clientY, opacity: 1 };
                const nextTrails = [newTrail, ...prev].slice(0, trailLength);

                return nextTrails.map((trail, index) => ({
                    ...trail,
                    opacity: ((trailLength - index) / trailLength) * 0.5,
                }));
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches("a, button, .hover-target")) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches("a, button, .hover-target")) {
                setIsHovering(false);
            }
        };

        document.addEventListener("mousemove", updateCursor);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mousemove", updateCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, [isDesktop]);

    useEffect(() => {
        if (!isDesktop) return;

        const animate = () => {
            setTrails((prev) =>
                prev.map((trail) => ({
                    ...trail,
                    x: trail.x + (position.x - trail.x) * 0.2,
                    y: trail.y + (position.y - trail.y) * 0.2,
                }))
            );
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [position, isDesktop]);

    if (!isDesktop) return null;

    return (
        <>
            {trails.map((trail, index) => (
                <div
                    key={index}
                    className="fixed w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference"
                    style={{
                        left: trail.x - 6,
                        top: trail.y - 6,
                        opacity: trail.opacity,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            ))}
            <div
                className={`fixed w-5 h-5 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out ${
                    isHovering ? "scale-150 bg-yellow-400" : "scale-100"
                }`}
                style={{
                    left: position.x,
                    top: position.y,
                    transform: "translate(-50%, -50%)",
                }}
            />
        </>
    );
};

export default CustomCursor;
