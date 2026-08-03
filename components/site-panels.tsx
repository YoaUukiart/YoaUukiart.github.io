"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { expressiveEase } from "@/lib/motion";

const PANEL_TRANSITION_MS = 980;
const PAGE_IDS = ["selected", "archive", "about", "contact"] as const;
const PAGE_LABELS = ["Selected", "Archive", "About", "Contact"] as const;

type SitePanelsProps = {
  selected: ReactNode;
  archive: ReactNode;
  about: ReactNode;
  contact: ReactNode;
};

export function SitePanels({
  selected,
  archive,
  about,
  contact,
}: SitePanelsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const animationRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState<number>();
  const pageContent = [selected, archive, about, contact];

  const updateHeight = useCallback((index = activeIndexRef.current) => {
    const panel = panelRefs.current[index];

    if (panel) {
      setViewportHeight(panel.scrollHeight);
    }
  }, []);

  const cancelAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    trackRef.current?.classList.remove("is-animating");
  }, []);

  const updateActivePage = useCallback(
    (index: number) => {
      activeIndexRef.current = index;
      setActiveIndex(index);
      updateHeight(index);
      window.history.replaceState(null, "", `#${PAGE_IDS[index]}`);
    },
    [updateHeight],
  );

  const showPanel = useCallback(
    (requestedIndex: number, animate = true, resetScroll = false) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const index = Math.min(
        PAGE_IDS.length - 1,
        Math.max(0, requestedIndex),
      );
      const target = track.clientWidth * index;
      const start = track.scrollLeft;
      const distance = target - start;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      cancelAnimation();
      updateActivePage(index);

      if (resetScroll) {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      }

      if (!animate || reduceMotion || Math.abs(distance) < 1) {
        track.scrollLeft = target;
        return;
      }

      const startTime = performance.now();
      track.classList.add("is-animating");

      const step = (time: number) => {
        const elapsed = Math.min((time - startTime) / PANEL_TRANSITION_MS, 1);
        track.scrollLeft = start + distance * expressiveEase(elapsed);

        if (elapsed < 1) {
          animationRef.current = requestAnimationFrame(step);
          return;
        }

        track.scrollLeft = target;
        animationRef.current = null;
        track.classList.remove("is-animating");
      };

      animationRef.current = requestAnimationFrame(step);
    },
    [cancelAnimation, updateActivePage],
  );

  useEffect(() => {
    const panels = panelRefs.current.filter(
      (panel): panel is HTMLElement => panel !== null,
    );
    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    panels.forEach((panel) => observer.observe(panel));
    updateHeight();

    return () => observer.disconnect();
  }, [updateHeight]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-motion-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -7% 0px",
        threshold: 0.08,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const initialIndex = PAGE_IDS.findIndex(
      (pageId) => `#${pageId}` === window.location.hash,
    );

    requestAnimationFrame(() =>
      showPanel(initialIndex >= 0 ? initialIndex : 0, false),
    );

    return cancelAnimation;
  }, [cancelAnimation, showPanel]);

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track || animationRef.current !== null || track.clientWidth === 0) {
      return;
    }

    const index = Math.min(
      PAGE_IDS.length - 1,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
    );

    if (index !== activeIndexRef.current) {
      updateActivePage(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPanel(activeIndexRef.current - 1, true, true);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showPanel(activeIndexRef.current + 1, true, true);
    }

    if (event.key === "Home") {
      event.preventDefault();
      showPanel(0, true, true);
    }

    if (event.key === "End") {
      event.preventDefault();
      showPanel(PAGE_IDS.length - 1, true, true);
    }
  };

  return (
    <>
      <header className="minimal-header">
        <nav aria-label="Main navigation">
          {PAGE_LABELS.map((label, index) => (
            <button
              className={activeIndex === index ? "is-active" : undefined}
              type="button"
              key={label}
              aria-current={activeIndex === index ? "page" : undefined}
              onClick={() => showPanel(index, true, true)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <div
        className="site-panels__viewport"
        style={
          viewportHeight === undefined ? undefined : { height: viewportHeight }
        }
      >
        <div
          className="site-panels__track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Swipe between Selected, Archive, About and Contact"
          onKeyDown={handleKeyDown}
          onPointerDown={cancelAnimation}
          onWheel={cancelAnimation}
          onScroll={handleScroll}
        >
          {PAGE_IDS.map((pageId, index) => (
            <section
              className={`site-panels__panel${
                activeIndex === index ? " is-active" : ""
              }`}
              id={pageId}
              key={pageId}
              aria-label={PAGE_LABELS[index]}
              aria-hidden={activeIndex !== index}
              inert={activeIndex !== index}
              ref={(panel) => {
                panelRefs.current[index] = panel;
              }}
            >
              {pageContent[index]}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
