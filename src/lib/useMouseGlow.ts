"use client";

import { useCallback } from "react";

/**
 * Hook that returns a mousemove handler to set --mouse-x / --mouse-y CSS vars
 * on the card element. Attach to onMouseMove on any `.glass-card` element.
 */
export function useMouseGlow() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return handleMouseMove;
}
