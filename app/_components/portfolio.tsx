import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { links, profiles, type Language } from "../_content/profile";
import Sculpture from "./sculpture";
import PageMotion from "./page-motion";

export function profileMetadata(lang: Language): Metadata {
  const p = profiles[lang];
  const title = `${p.name} · ML Engineer · ${p.specialization}`;
  return {
    title, description: p.description,
    openGraph: { title, description: p.description, type: "profile", firstName: "Marat", lastName: "Gazizulin", locale: lang === "ru" ? "ru_RU" : "en_US" },
    twitter: { card: "summary", title, description: p.description },
  };
}

export function Arrow({ down = false }: { down?: boolean }) {
  return <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={down ? { transform: "rotate(135deg)" } : undefined}><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Portfolio({ lang }: { lang: Language }) {
  const p = profiles[lang];
  const ids = ["approach", "experience", "expertise"];
  const person = { "@context": "https://schema.org", "@type": "Person", name: p.name, alternateName: "MaratG2", jobTitle: "ML Engineer", sameAs: [links.github, links.linkedin, links.hh], knowsLanguage: ["Russian", "English"] };
  return <>
    <a className="skip-link" href="#main">{p.skip}</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    <PageMotion />
    <header className="site-header" id="top">
      <div className="header-inner">
        <Link href={lang === "ru" ? "/" : "/en"} className="wordmark">{p.name}<span className="wordmark-dot" aria-hidden="true" /></Link>
        <nav className="section-nav" aria-label={lang === "ru" ? "Разделы" : "Sections"}>{ids.map((id, i) => <a key={id} href={`#${id}`}>{p.nav[i]}</a>)}</nav>
        <nav className="language-nav" aria-label={lang === "ru" ? "Язык" : "Language"}>
          <Link href="/" hrefLang="ru" lang="ru" aria-current={lang === "ru" ? "page" : undefined}>RU</Link>
          <Link href="/en" hrefLang="en" lang="en" aria-current={lang === "en" ? "page" : undefined}>EN</Link>
        </nav>
        <a href="#contact" className="header-contact" aria-label={p.contactAction}><Arrow /></a>
      </div>
    </header>
    <main id="main">
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title"><span>ML</span> Engineer</h1>
          <p className="specialization">{p.specialization}</p>
          <p className="hero-statement">{p.headline}</p>
          <div className="hero-actions">
            <a href={links.email} className="button button-primary">{p.contactAction}<Arrow /></a>
            <a href={`/cv/marat-gazizulin-cv-${lang}.pdf`} download className="button button-secondary">{p.resumeAction}<Arrow down /></a>
          </div>
        </div>
        <Sculpture pauseLabel={p.pause} playLabel={p.play} label={p.sculpture} hint={p.motionHint} />
        <div className="hero-bottom">
          <a href="#approach" className="scroll-link">{p.nav[0]}<Arrow down /></a>
          <div className="social-links"><a href={links.github}>GitHub<Arrow /></a><a href={links.linkedin}>LinkedIn<Arrow /></a></div>
        </div>
      </section>
      <section className="about page-width section-space" id="approach" aria-labelledby="about-title">
        <div className="section-heading"><h2 id="about-title" data-reveal>{p.aboutTitle}</h2></div>
        <div className="about-body">
          <p className="large-copy">{p.introduction}</p>
          <div className="person-note">
            <Image src="/photo.png" alt={p.name} width={88} height={88} className="portrait" sizes="88px" />
            <div><p>{p.name}</p><span>{p.aboutNote}</span></div>
          </div>
        </div>
      </section>
      <section className="experience page-width section-space" id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title" data-reveal>{p.experienceTitle}</h2>
        <div className="experience-list">{p.experience.map((item, i) =>
          <article className={`experience-item ${i === 0 ? "current-experience" : ""}`} key={item.company}>
            <div className="experience-meta"><p>{item.period}</p><h3>{item.company}</h3></div>
            <div className="experience-body"><h4>{item.role}</h4><p>{item.description}</p></div>
          </article>
        )}</div>
      </section>
      <section className="expertise-wrap" id="expertise" aria-labelledby="expertise-title">
        <div className="expertise page-width section-space">
          <div className="expertise-heading"><h2 id="expertise-title" data-reveal>{p.skillsTitle}</h2><div className="expertise-symbol" aria-hidden="true"><span /><span /><span /></div></div>
          <div className="skills-list">{p.skills.map(skill => <article className="skill-item" key={skill.title}><h3>{skill.title}</h3><p>{skill.description}</p><span>{skill.tools}</span></article>)}</div>
        </div>
      </section>
      <section className="education page-width" aria-labelledby="education-title">
        <h2 id="education-title">{p.educationTitle}</h2>
        <div><p>{p.education}</p><p>{p.course}</p><p className="languages">{p.languages}</p></div>
      </section>
      <section className="contact page-width section-space" id="contact" aria-labelledby="contact-title">
        <div><h2 id="contact-title" data-reveal>{p.contactTitle}</h2><p>{p.contactText}</p></div>
        <a href={links.email} className="contact-orbit" aria-label={p.emailLabel}><Arrow /></a>
        <div className="contact-bottom"><a href={links.email} className="email-link">maratg2develop@gmail.com</a><div className="social-links"><a href={links.telegram}>Telegram<Arrow /></a><a href={links.hh}>HH.ru<Arrow /></a><a href={links.github}>GitHub<Arrow /></a><a href={links.linkedin}>LinkedIn<Arrow /></a></div></div>
      </section>
    </main>
    <footer className="site-footer page-width"><span>{p.footer} · ML Engineer</span><a href="#top">{p.backTop}<Arrow /></a></footer>
  </>;
}
