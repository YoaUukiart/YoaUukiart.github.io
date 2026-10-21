import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
const downloadDirectory = path.join(publicDirectory, "downloads");
const manifestPath = path.join(downloadDirectory, ".manifest.json");
const watermarkVersion = "yoauuki-center-v1";
const imageExtension = /\.(jpe?g|png|webp)$/i;

export function watermarkSvg(width, height) {
  const fontSize = Math.max(12, Math.round(Math.min(width, height) * 0.105));
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <g transform="translate(${width / 2} ${height / 2}) rotate(-24)">
        <text x="0" y="0" dy=".35em" text-anchor="middle"
          font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}"
          font-weight="600" letter-spacing="${fontSize * 0.035}"
          fill="white" fill-opacity=".36" stroke="black" stroke-opacity=".18"
          stroke-width="${Math.max(1, fontSize * 0.018)}" paint-order="stroke">yoauuki</text>
      </g>
    </svg>`);
}

async function listImages(directory, prefix = "") {
  const images = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (directory === publicDirectory && entry.name === "downloads") continue;
    const relativePath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      images.push(...await listImages(path.join(directory, entry.name), relativePath));
    } else if (entry.isFile() && imageExtension.test(entry.name)) {
      images.push(relativePath);
    }
  }
  return images.sort();
}

async function generateDownloads() {
  const images = await listImages(publicDirectory);
  const previousManifest = await readFile(manifestPath, "utf8")
    .then(JSON.parse)
    .catch((error) => {
      if (error.code === "ENOENT") return {};
      throw error;
    });
  const manifest = {};
  let generated = 0;

  // Process sequentially to keep memory bounded for large original artworks.
  for (const relativePath of images) {
    const input = await readFile(path.join(publicDirectory, relativePath));
    const signature = createHash("sha256").update(watermarkVersion).update(input).digest("hex");
    const key = relativePath.split(path.sep).join("/");
    const outputPath = path.join(downloadDirectory, relativePath);
    manifest[key] = signature;
    if (previousManifest[key] === signature) {
      const outputExists = await readFile(outputPath).then(() => true).catch((error) => {
        if (error.code === "ENOENT") return false;
        throw error;
      });
      if (outputExists) continue;
    }

    const { width, height, orientation } = await sharp(input).metadata();
    if (!width || !height) throw new Error(`Missing image dimensions: ${key}`);
    const rotated = orientation >= 5 && orientation <= 8;
    let output = sharp(input).autoOrient().composite([{
      input: watermarkSvg(rotated ? height : width, rotated ? width : height),
      blend: "over",
    }]);
    const extension = path.extname(relativePath).toLowerCase();
    if (extension === ".jpg" || extension === ".jpeg") {
      output = output.jpeg({ quality: 96, chromaSubsampling: "4:4:4", progressive: true });
    } else if (extension === ".webp") {
      output = output.webp({ quality: 96 });
    } else {
      output = output.png();
    }
    await mkdir(path.dirname(outputPath), { recursive: true });
    await output.toFile(outputPath);
    generated += 1;
  }

  await mkdir(downloadDirectory, { recursive: true });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Watermarked downloads ready: ${images.length} images (${generated} generated). Originals unchanged.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateDownloads();
}
