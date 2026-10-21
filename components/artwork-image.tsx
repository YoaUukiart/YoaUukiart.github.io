import type { ComponentPropsWithoutRef } from "react";

import { artworkDownloadPath } from "@/lib/artwork-download";

type ArtworkImageProps = Omit<ComponentPropsWithoutRef<"img">, "src"> & {
  image: string;
};

/** Keep the original visible; normal image-save actions target the watermarked file. */
export function ArtworkImage({ image, alt, ...props }: ArtworkImageProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <span className="artwork-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        src={`${basePath}${image}`}
        alt={alt}
        className="artwork-image__display"
      />
      {/* This transparent image is the native right-click / long-press save target. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        src={`${basePath}${artworkDownloadPath(image)}`}
        alt=""
        aria-hidden="true"
        className="artwork-image__save"
        data-watermarked-download="true"
      />
    </span>
  );
}
