"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { PortfolioWork } from "@/content/portfolio";

type ProjectCarouselProps = {
  projectNumber: number;
  title: string;
  year: string;
  medium: string;
  description: string;
  works: PortfolioWork[];
};

function getTouchDistance(touches: React.TouchList) {
  const firstTouch = touches[0];
  const secondTouch = touches[1];

  return Math.hypot(
    secondTouch.clientX - firstTouch.clientX,
    secondTouch.clientY - firstTouch.clientY,
  );
}

function getTouchCenter(touches: React.TouchList) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  };
}

export function ProjectCarousel({
  projectNumber,
  title,
  year,
  medium,
  description,
  works,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const lightboxScrollRef = useRef<HTMLDivElement>(null);
  const lightboxGestureRef = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    startDistance: 0,
    startZoom: 1,
    startScrollLeft: 0,
    startScrollTop: 0,
    pinchOriginX: 0,
    pinchOriginY: 0,
    pinching: false,
    moved: false,
  });
  const suppressImageClickUntilRef = useRef(0);
  const entryScrollYRef = useRef(0);
  const entryElementRef = useRef<HTMLElement | null>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const overlayOpen = lightboxIndex !== null || infoOpen;
  const projectLabel = projectNumber.toString().padStart(2, "0");
  const projectTitleId = `project-info-title-${projectLabel}`;

  const rememberEntryPosition = useCallback(() => {
    entryScrollYRef.current = window.scrollY;
    entryElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }, []);

  const restoreEntryPosition = useCallback(() => {
    const scrollY = entryScrollYRef.current;
    const entryElement = entryElementRef.current;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
        entryElement?.focus({ preventScroll: true });
      });
    });
  }, []);

  useEffect(() => {
    if (!overlayOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleGlobalKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (lightboxIndex !== null) {
          const track = trackRef.current;

          track?.scrollTo({
            left: track.clientWidth * lightboxIndex,
            behavior: "auto",
          });
        }

        setLightboxIndex(null);
        setInfoOpen(false);
        setZoom(1);
        restoreEntryPosition();
        return;
      }

      if (lightboxIndex === null) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setLightboxIndex((current) => {
          const next = Math.max((current ?? 0) - 1, 0);
          setActiveIndex(next);
          return next;
        });
        setZoom(1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setLightboxIndex((current) => {
          const next = Math.min((current ?? 0) + 1, works.length - 1);
          setActiveIndex(next);
          return next;
        });
        setZoom(1);
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [lightboxIndex, overlayOpen, restoreEntryPosition, works.length]);

  function showSlide(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), works.length - 1);
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({
      left: track.clientWidth * nextIndex,
      behavior: "smooth",
    });
    setActiveIndex(nextIndex);
  }

  function handleScroll() {
    const track = trackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), works.length - 1));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      showSlide(works.length - 1);
    }
  }

  function openLightbox(index: number) {
    rememberEntryPosition();
    setLightboxIndex(index);
    setActiveIndex(index);
    setZoom(1);
  }

  function closeLightbox() {
    if (lightboxIndex !== null) {
      showSlide(lightboxIndex);
    }

    setLightboxIndex(null);
    setZoom(1);
    restoreEntryPosition();
  }

  function openProjectInfo() {
    rememberEntryPosition();
    setInfoOpen(true);
  }

  function closeProjectInfo() {
    setInfoOpen(false);
    restoreEntryPosition();
  }

  function moveLightbox(direction: -1 | 1) {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }

      const next = Math.min(
        Math.max(current + direction, 0),
        works.length - 1,
      );
      setActiveIndex(next);
      return next;
    });
    setZoom(1);
  }

  function handleLightboxTouchStart(
    event: React.TouchEvent<HTMLDivElement>,
  ) {
    const gesture = lightboxGestureRef.current;

    if (event.touches.length === 2) {
      event.preventDefault();
      const scrollContainer = lightboxScrollRef.current;
      const scrollBounds = scrollContainer?.getBoundingClientRect();
      const pinchCenter = getTouchCenter(event.touches);

      gesture.startDistance = getTouchDistance(event.touches);
      gesture.startZoom = zoom;
      gesture.startScrollLeft = scrollContainer?.scrollLeft ?? 0;
      gesture.startScrollTop = scrollContainer?.scrollTop ?? 0;
      gesture.pinchOriginX = scrollBounds
        ? pinchCenter.x - scrollBounds.left
        : 0;
      gesture.pinchOriginY = scrollBounds
        ? pinchCenter.y - scrollBounds.top
        : 0;
      gesture.pinching = true;
      gesture.moved = true;
      suppressImageClickUntilRef.current = Date.now() + 500;
      return;
    }

    if (event.touches.length === 1) {
      const touch = event.touches[0];
      gesture.startX = touch.clientX;
      gesture.startY = touch.clientY;
      gesture.lastX = touch.clientX;
      gesture.lastY = touch.clientY;
      gesture.pinching = false;
      gesture.moved = false;
    }
  }

  function handleLightboxTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    const gesture = lightboxGestureRef.current;

    if (event.touches.length === 2 && gesture.startDistance > 0) {
      event.preventDefault();
      const scale = getTouchDistance(event.touches) / gesture.startDistance;
      const nextZoom = Math.min(
        Math.max(gesture.startZoom * scale, 1),
        4,
      );
      const scrollContainer = lightboxScrollRef.current;
      const scrollBounds = scrollContainer?.getBoundingClientRect();
      const pinchCenter = getTouchCenter(event.touches);
      const currentCenterX = scrollBounds
        ? pinchCenter.x - scrollBounds.left
        : gesture.pinchOriginX;
      const currentCenterY = scrollBounds
        ? pinchCenter.y - scrollBounds.top
        : gesture.pinchOriginY;
      const zoomRatio = nextZoom / gesture.startZoom;

      gesture.pinching = true;
      gesture.moved = true;
      suppressImageClickUntilRef.current = Date.now() + 500;
      setZoom(Number(nextZoom.toFixed(3)));
      requestAnimationFrame(() => {
        if (!scrollContainer) {
          return;
        }

        scrollContainer.scrollLeft =
          (gesture.startScrollLeft + gesture.pinchOriginX) * zoomRatio -
          currentCenterX;
        scrollContainer.scrollTop =
          (gesture.startScrollTop + gesture.pinchOriginY) * zoomRatio -
          currentCenterY;
      });
      return;
    }

    if (event.touches.length !== 1 || gesture.pinching) {
      return;
    }

    const touch = event.touches[0];
    const deltaX = touch.clientX - gesture.lastX;
    const deltaY = touch.clientY - gesture.lastY;

    if (
      Math.abs(touch.clientX - gesture.startX) > 8 ||
      Math.abs(touch.clientY - gesture.startY) > 8
    ) {
      gesture.moved = true;
    }

    if (zoom > 1) {
      event.preventDefault();
      lightboxScrollRef.current?.scrollBy({
        left: -deltaX,
        top: -deltaY,
        behavior: "auto",
      });
    }

    gesture.lastX = touch.clientX;
    gesture.lastY = touch.clientY;
  }

  function handleLightboxTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    const gesture = lightboxGestureRef.current;

    if (event.touches.length > 0) {
      return;
    }

    if (gesture.pinching) {
      gesture.pinching = false;
      gesture.moved = false;
      suppressImageClickUntilRef.current = Date.now() + 500;
      return;
    }

    const deltaX = gesture.lastX - gesture.startX;
    const deltaY = gesture.lastY - gesture.startY;
    const isHorizontalSwipe =
      zoom === 1 &&
      Math.abs(deltaX) >= 52 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

    if (isHorizontalSwipe) {
      moveLightbox(deltaX < 0 ? 1 : -1);
    }

    if (gesture.moved || isHorizontalSwipe) {
      suppressImageClickUntilRef.current = Date.now() + 500;
    }

    gesture.moved = false;
  }

  function handleLightboxTouchCancel() {
    lightboxGestureRef.current.pinching = false;
    lightboxGestureRef.current.moved = false;
    suppressImageClickUntilRef.current = Date.now() + 500;
  }

  const lightboxWork =
    lightboxIndex === null ? null : works[lightboxIndex] ?? null;

  return (
    <>
      <article className="project-carousel">
        <div
          className="project-carousel__viewer"
          role="region"
          aria-roledescription="carousel"
          aria-label={`${title}, ${works.length} images`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <div
            ref={trackRef}
            className="project-carousel__track"
            onScroll={handleScroll}
          >
            {works.map((work, index) => (
              <figure
                className="project-slide"
                key={work.slug}
                aria-label={`${index + 1} of ${works.length}`}
                aria-hidden={index !== activeIndex}
              >
                <button
                  className="project-slide__open"
                  type="button"
                  aria-label={`Open image ${index + 1} in full-screen viewer`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => openLightbox(index)}
                >
                  {work.image ? (
                    <>
                      {/* Original artwork files are shown without recompression. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${basePath}${work.image}`}
                        alt={work.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        draggable={false}
                      />
                    </>
                  ) : (
                    <div
                      className={`artwork-placeholder art--${work.artClass}`}
                    >
                      <span className="placeholder-label">
                        IMAGE COMING SOON
                      </span>
                    </div>
                  )}
                </button>
              </figure>
            ))}
          </div>

          <button
            className="project-carousel__arrow project-carousel__arrow--previous"
            type="button"
            aria-label="Previous image"
            onClick={() => showSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
          >
            ←
          </button>
          <button
            className="project-carousel__arrow project-carousel__arrow--next"
            type="button"
            aria-label="Next image"
            onClick={() => showSlide(activeIndex + 1)}
            disabled={activeIndex === works.length - 1}
          >
            →
          </button>
        </div>

        <div className="project-carousel__caption">
          <div>
            <p>PROJECT {projectLabel}</p>
            <h2>
              <button
                className="project-carousel__title"
                type="button"
                aria-haspopup="dialog"
                onClick={openProjectInfo}
              >
                {title}
                <span aria-hidden="true">↗</span>
              </button>
            </h2>
          </div>
          <p className="project-carousel__details">
            {medium}
            <span>{year}</span>
            <span>{works.length} IMAGES</span>
          </p>
          <p className="project-carousel__counter" aria-live="polite">
            {(activeIndex + 1).toString().padStart(2, "0")}
            <span> / {works.length.toString().padStart(2, "0")}</span>
          </p>
        </div>

        <div className="project-carousel__pagination" aria-label="Choose image">
          {works.map((work, index) => (
            <button
              key={work.slug}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => showSlide(index)}
            />
          ))}
        </div>
      </article>

      {lightboxWork?.image && lightboxIndex !== null ? (
        <div
          className="artwork-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, full-screen image ${lightboxIndex + 1}`}
        >
          <header className="artwork-lightbox__header">
            <button
              className="artwork-lightbox__back"
              type="button"
              aria-label="Back to project"
              onClick={closeLightbox}
            >
              ←
            </button>

            <div className="artwork-lightbox__identity">
              <strong>{title}</strong>
              <span>
                {(lightboxIndex + 1).toString().padStart(2, "0")} /{" "}
                {works.length.toString().padStart(2, "0")}
              </span>
            </div>
          </header>

          <div
            ref={lightboxScrollRef}
            className="artwork-lightbox__scroll"
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
            onTouchCancel={handleLightboxTouchCancel}
          >
            <div
              className="artwork-lightbox__stage"
              style={{
                width: `${zoom * 100}%`,
                height: `${zoom * 100}%`,
              }}
            >
              {/* Original artwork files are shown without recompression. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${lightboxWork.image}`}
                alt={lightboxWork.alt}
                draggable={false}
                title="Click to return · Swipe to change · Pinch to zoom"
                onClick={(event) => {
                  if (Date.now() < suppressImageClickUntilRef.current) {
                    event.preventDefault();
                    return;
                  }

                  closeLightbox();
                }}
              />
            </div>
          </div>
        </div>
      ) : null}

      {infoOpen ? (
        <div
          className="project-info"
          role="dialog"
          aria-modal="true"
          aria-labelledby={projectTitleId}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProjectInfo();
            }
          }}
        >
          <article className="project-info__panel">
            <header>
              <button
                className="project-info__back"
                type="button"
                aria-label="Back to projects"
                onClick={closeProjectInfo}
              >
                ←
              </button>
              <span>YoaUuki / Project {projectLabel}</span>
            </header>

            <div className="project-info__layout">
              <div className="project-info__image">
                {/* Original artwork files are shown without recompression. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${works[0]?.image ?? ""}`}
                  alt=""
                  draggable={false}
                />
              </div>

              <div className="project-info__copy">
                <p>PROJECT {projectLabel}</p>
                <h2 id={projectTitleId}>{title}</h2>

                <dl>
                  <div>
                    <dt>Medium</dt>
                    <dd>{medium}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{year}</dd>
                  </div>
                  <div>
                    <dt>Series</dt>
                    <dd>{works.length} digital paintings</dd>
                  </div>
                </dl>

                <p className="project-info__description">{description}</p>
                <p className="project-info__copyright">
                  © {year} YoaUuki. All works reserved.
                </p>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </>
  );
}
