// Rebuild web samples and publisher upload images without altering the originals.
// node scripts/build-publisher-assets.mjs <Media directory> <avatar PNG> <banner PNG>
import { createRequire } from "node:module";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(createRequire(path.join(root, "package.json")).resolve("next/package.json"));
const sharp = require("sharp");
const [media, avatar, banner] = process.argv.slice(2);
if (!media || !avatar || !banner) throw new Error("Provide the source Media directory, avatar PNG and banner PNG.");
const web = path.join(root, "public/assets");
const output = path.join(root, "output/asset-publisher");
await mkdir(path.join(web, "retro-kitchen"), { recursive: true });
await mkdir(output, { recursive: true });
const samples = [
  ["01_kitchen_1920x1080.png", "kitchen"],
  ["02_table_1920x1080.png", "table"],
  ["03_appliances_1920x1080.png", "appliances"],
  ["04_all_props_1920x1080.png", "all-props"],
];
for (const [source, name] of samples) {
  await sharp(path.join(media, source)).webp({ quality: 92 }).toFile(path.join(web, "retro-kitchen", `${name}.webp`));
}
await sharp(avatar).resize(256, 256).webp({ quality: 88 }).toFile(path.join(web, "publisher-avatar.webp"));
await copyFile(avatar, path.join(output, "profile-picture-original.png"));
await copyFile(banner, path.join(output, "promo-banner-original.png"));
await sharp(avatar).resize(512, 512).png().toFile(path.join(output, "profile-picture-512.png"));
await sharp(banner).resize(2400, 800, { fit: "contain", background: "#0a0c0b" }).png().toFile(path.join(output, "promo-banner-2400x800.png"));
for (const file of ["profile-picture-original.png", "profile-picture-512.png", "promo-banner-original.png", "promo-banner-2400x800.png"]) {
  const { width, height, size } = await sharp(path.join(output, file)).metadata();
  console.log(`${file}: ${width}x${height}, ${size} bytes`);
}
