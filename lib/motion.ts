export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const sampleCurve = (time: number, point1: number, point2: number) => {
    const inverse = 1 - time;

    return (
      3 * inverse * inverse * time * point1 +
      3 * inverse * time * time * point2 +
      time * time * time
    );
  };

  const sampleSlope = (time: number, point1: number, point2: number) =>
    3 * (1 - time) * (1 - time) * point1 +
    6 * (1 - time) * time * (point2 - point1) +
    3 * time * time * (1 - point2);

  return (progress: number) => {
    if (progress <= 0 || progress >= 1) {
      return progress;
    }

    let time = progress;

    for (let iteration = 0; iteration < 7; iteration += 1) {
      const slope = sampleSlope(time, x1, x2);

      if (Math.abs(slope) < 0.000001) {
        break;
      }

      const currentX = sampleCurve(time, x1, x2) - progress;
      time = Math.min(1, Math.max(0, time - currentX / slope));
    }

    return sampleCurve(time, y1, y2);
  };
}

export const expressiveEase = cubicBezier(0.19, 1, 0.22, 1);
