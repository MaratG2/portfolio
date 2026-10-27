import { Geologica, JetBrains_Mono } from "next/font/google";
import type { Language } from "../_content/profile";
import "../globals.css";

const display = Geologica({ variable: "--nf-display", subsets: ["latin", "cyrillic"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--nf-mono", subsets: ["latin", "cyrillic"], display: "swap" });

export default function Document({ children, lang }: { children: React.ReactNode; lang: Language }) {
  return (
    <html lang={lang} className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
