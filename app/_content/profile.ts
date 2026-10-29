import content from "./profile.json";

export type Language = "ru" | "en";
export const profiles = content;
export const links = {
  email: "mailto:maratg2develop@gmail.com",
  emailAddress: "maratg2develop@gmail.com",
  telegram: "https://t.me/maratg2",
  github: "https://github.com/MaratG2",
  linkedin: "https://www.linkedin.com/in/maratg2/",
  hh: "https://hh.ru/resume/f3a8fe6fff0724cca70039ed1f646432357459",
  artillect: "https://artillect.pro",
};

// Language-independent project data; summaries and tags live in profile.json under site.open.projects.
export const projectMeta: Record<string, { repo: string; year: string; images?: { src: string; width: number; height: number; label: string }[] }> = {
  LocalAtelier: {
    repo: "https://github.com/MaratG2/LocalAtelier", year: "2026",
    images: [
      { src: "/work/local-atelier-images.webp", width: 1536, height: 1024, label: "Images" },
      { src: "/work/local-atelier-3d.webp", width: 1536, height: 1024, label: "3D" },
    ],
  },
};

// MaskRoute results come from its validation branch at commit 215c5365 (26 October 2026).
export const maskroute = {
  source: "https://github.com/MaratG2/MaskRoute/tree/codex/validation-reuse",
  report: "https://github.com/MaratG2/MaskRoute/blob/codex/validation-reuse/docs/VALIDATION_REPORT.md",
};
