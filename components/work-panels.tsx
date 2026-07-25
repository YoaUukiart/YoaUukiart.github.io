"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const PANEL_TRANSITION_MS = 700;

type WorkPanelsProps = {
  selected: ReactNode;
  archive: ReactNode;
};

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function WorkPanels({ selected, archive }: WorkPanelsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const animationRef = useRef<number | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState<number>();

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

  const showPanel = useCallback(
    (requestedIndex: number, animate = true) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const index = requestedIndex <= 0 ? 0 : 1;
      const target = track.clientWidth * index;
      const start = track.scrollLeft;
      const distance = target - start;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      cancelAnimation();
      activeIndexRef.current = index;
      setActiveIndex(index);
      updateHeight(index);

      if (!animate || reduceMotion || Math.abs(distance) < 1) {
        track.scrollLeft = target;
        return;
      }

      const startTime = performance.now();
      track.classList.add("is-animating");

      const step = (time: number) => {
        const elapsed = Math.min((time - startTime) / PANEL_TRANSITION_MS, 1);
        track.scrollLeft = start + distance * easeInOutCubic(elapsed);

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
    [cancelAnimation, updateHeight],
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
    const panelLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-work-panel]"),
    );

    const handlePanelLink = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const panelName = link.dataset.workPanel;
      const index = panelName === "archive" ? 1 : 0;

      event.preventDefault();
      showPanel(index);
      document
        .getElementById("works")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", index === 1 ? "#archive" : "#selected");
    };

    panelLinks.forEach((link) =>
      link.addEventListener("click", handlePanelLink),
    );

    const initialIndex = window.location.hash === "#archive" ? 1 : 0;
    requestAnimationFrame(() => showPanel(initialIndex, false));

    return () => {
      panelLinks.forEach((link) =>
        link.removeEventListener("click", handlePanelLink),
      );
      cancelAnimation();
    };
  }, [cancelAnimation, showPanel]);

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track || animationRef.current !== null || track.clientWidth === 0) {
      return;
    }

    const index = Math.min(
      1,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
    );

    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
      updateHeight(index);
      window.history.replaceState(
        null,
        "",
        index === 1 ? "#archive" : "#selected",
      );
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "Home") {
      event.preventDefault();
      showPanel(0);
    }

    if (event.key === "ArrowRight" || event.key === "End") {
      event.preventDefault();
      showPanel(1);
    }
  };

  return (
    <section className="work-panels" id="works" aria-label="作品展示">
      <nav className="work-panels__switcher" aria-label="切换作品页面">
        <button
          className={activeIndex === 0 ? "is-active" : undefined}
          type="button"
          aria-pressed={activeIndex === 0}
          onClick={() => showPanel(0)}
        >
          Selected
        </button>
        <button
          className={activeIndex === 1 ? "is-active" : undefined}
          type="button"
          aria-pressed={activeIndex === 1}
          onClick={() => showPanel(1)}
        >
          Archive
        </button>
      </nav>

      <div
        className="work-panels__viewport"
        style={
          viewportHeight === undefined ? undefined : { height: viewportHeight }
        }
      >
        <div
          className="work-panels__track"
          ref={trackRef}
          tabIndex={0}
          aria-label="左右滑动切换 Selected 与 Archive"
          onKeyDown={handleKeyDown}
          onPointerDown={cancelAnimation}
          onWheel={cancelAnimation}
          onScroll={handleScroll}
        >
          <section
            className="work-panels__panel selected-section"
            id="selected"
            aria-labelledby="selected-title"
            ref={(panel) => {
              panelRefs.current[0] = panel;
            }}
          >
            {selected}
          </section>

          <section
            className="work-panels__panel archive-section"
            id="archive"
            aria-labelledby="archive-title"
            ref={(panel) => {
              panelRefs.current[1] = panel;
            }}
          >
            {archive}
          </section>
        </div>
      </div>
    </section>
  );
}
