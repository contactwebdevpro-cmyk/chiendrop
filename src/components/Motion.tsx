"use client";
import { useEffect } from "react";

/** Révélations au scroll (IntersectionObserver) + état du header. Respecte prefers-reduced-motion. */
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      root.classList.add("motion");
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io?.unobserve(e.target); } }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      els.forEach((el) => io!.observe(el));
    }
    const onScroll = () => root.toggleAttribute("data-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io?.disconnect(); window.removeEventListener("scroll", onScroll); root.classList.remove("motion"); };
  }, []);
  return null;
}
