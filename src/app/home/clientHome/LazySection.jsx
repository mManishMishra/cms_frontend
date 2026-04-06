"use client";
import { useState, useEffect, useRef } from "react";

export default function LazySection({ children, placeholderHeight = "500px", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ minHeight: isVisible ? "auto" : placeholderHeight }}>
      {isVisible ? children : null}
    </div>
  );
}