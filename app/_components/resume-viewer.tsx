import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { profiles, type Language } from "../_content/profile";
import pages from "../_content/cv-pages.json";
import { Arrow } from "./portfolio";

export function resumeMetadata(lang: Language): Metadata {
  return { title: `${profiles[lang].name} · ${lang === "ru" ? "Резюме" : "Résumé"}`, description: profiles[lang].description };
}

export default function ResumeViewer({ lang }: { lang: Language }) {
  const ru = lang === "ru";
  return <main className="cv-viewer">
    <header className="cv-toolbar">
      <div className="cv-toolbar-inner">
        <Link href={ru ? "/" : "/en"} className="cv-back"><span aria-hidden="true">←</span>{ru ? "Назад" : "Back"}</Link>
        <h1>{profiles[lang].name}<span>ML Engineer</span></h1>
        <a href={`/cv/marat-gazizulin-cv-${lang}.pdf`} download className="btn btn-primary">{ru ? "Скачать PDF" : "Download PDF"}<Arrow down /></a>
      </div>
    </header>
    <div className="cv-pages">
      {pages[lang].map((page, index) => <section key={page.src} className="cv-page" aria-label={`${ru ? "Страница" : "Page"} ${index + 1}`}>
        <Image src={page.src} alt="" aria-hidden="true" width={page.width} height={page.height} unoptimized loading={index === 0 ? "eager" : "lazy"} />
        <div className="sr-only cv-transcript">{page.text}</div>
        {page.links.map((link, i) => <a key={i} className="cv-document-link" href={link.href} aria-label={link.label || link.href}
          style={{ left: `${link.left}%`, top: `${link.top}%`, width: `${link.width}%`, height: `${link.height}%` }} />)}
      </section>)}
    </div>
  </main>;
}
