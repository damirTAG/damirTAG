import { useState, useEffect } from "react";

interface CursorPosition {
    x: number;
    y: number;
}

interface TrailDot {
    x: number;
    y: number;
    opacity: number;
}

// Custom Cursor Component
export const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [trails, setTrails] = useState<TrailDot[]>([]);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            setTrails((prev) => {
                const newTrails = [{ x: e.clientX, y: e.clientY, opacity: 1 }, ...prev.slice(0, 10)];
                return newTrails.map((trail, index) => ({
                    ...trail,
                    opacity: ((10 - index) / 10) * 0.6,
                }));
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches("a, button, .hover-target")) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        document.addEventListener("mousemove", updateCursor);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            document.removeEventListener("mousemove", updateCursor);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <>
            {trails.map((trail, index) => (
                <div
                    key={index}
                    className="fixed w-2 h-2 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference"
                    style={{
                        left: trail.x - 4,
                        top: trail.y - 4,
                        opacity: trail.opacity,
                    }}
                />
            ))}
            <div
                className={`fixed w-5 h-5 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ${
                    isHovering ? "scale-150" : "scale-100"
                }`}
                style={{
                    left: position.x - 10,
                    top: position.y - 10,
                }}
            />
        </>
    );
};
