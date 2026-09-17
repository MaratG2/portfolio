import { Manrope } from "next/font/google";
import type { Language } from "../_content/profile";
import "../globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "cyrillic"], display: "swap" });

export default function Document({ children, lang }: { children: React.ReactNode; lang: Language }) {
  return (
    <html lang={lang}>
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
