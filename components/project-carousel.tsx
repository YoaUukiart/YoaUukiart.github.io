"use client";

import { useRef, useState } from "react";

import type { PortfolioWork } from "@/content/portfolio";

type ProjectCarouselProps = {
  title: string;
  year: string;
  medium: string;
  works: PortfolioWork[];
};

export function ProjectCarousel({
  title,
  year,
  medium,
  works,
}: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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

  return (
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
              {work.image ? (
                // The original artwork files must be shown without image optimization or recompression.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${basePath}${work.image}`}
                  alt={work.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              ) : (
                <div className={`artwork-placeholder art--${work.artClass}`}>
                  <span className="placeholder-label">
                    IMAGE COMING SOON
                  </span>
                </div>
              )}
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
          <p>PROJECT 01</p>
          <h2>{title}</h2>
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
  );
}
