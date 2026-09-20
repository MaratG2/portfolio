import Image from "next/image";
import portraitPhoto from "../../public/photo.png";
import Link from "next/link";
import type { Metadata } from "next";
import { links, profiles, type Language } from "../_content/profile";
import { ResumeMotion, MotionToggle, PortraitDepth, MagneticLink, Reveal, SectionNav, ExperiencePanel } from "./resume-motion";

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
  return <svg className={`arrow-icon ${down ? "arrow-down" : ""}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Portfolio({ lang }: { lang: Language }) {
  const p = profiles[lang];
  const ru = lang === "ru";
  const resumeHref = ru ? "/resume" : "/en/resume";
  const nav = [
    { id: "about", label: ru ? "О себе" : "About" },
    { id: "experience", label: ru ? "Опыт работы" : "Experience" },
    { id: "expertise", label: ru ? "Компетенции" : "Expertise" },
    { id: "engineering", label: ru ? "Подход" : "Approach" },
    { id: "contact", label: ru ? "Контакты" : "Contact" },
  ];
  const person = { "@context": "https://schema.org", "@type": "Person", name: p.name, alternateName: "MaratG2", jobTitle: "ML Engineer", sameAs: [links.github, links.linkedin, links.hh], knowsLanguage: ["Russian", "English"] };
  return <ResumeMotion>
    <a className="skip-link" href="#main">{p.skip}</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    <div className="ambient-scene" aria-hidden="true"><div className="ambient-light light-one" /><div className="ambient-light light-two" /><div className="ambient-ribbon ribbon-one" /><div className="ambient-ribbon ribbon-two" /></div>
    <header className="site-header page-width" id="top">
      <Link href={ru ? "/" : "/en"} className="wordmark" aria-label={p.name}><span className="monogram" aria-hidden="true">m.</span></Link>
      <div className="header-tools">
        <a href={links.github} className="header-social">GitHub<Arrow /></a>
        <MotionToggle label={ru ? "Выключить анимацию" : "Turn animation off"} play={ru ? "Включить анимацию" : "Turn animation on"} />
        <nav className="language-nav" aria-label={ru ? "Язык" : "Language"}><Link href="/" hrefLang="ru" lang="ru" aria-current={ru ? "page" : undefined}>RU</Link><Link href="/en" hrefLang="en" lang="en" aria-current={!ru ? "page" : undefined}>EN</Link></nav>
      </div>
    </header>
    <main className="page-width" id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-sheen" aria-hidden="true" />
        <div className="hero-main">
          <div className="hero-copy">
            <h1 id="hero-title">{p.name.split(" ").map(part => <span className="headline-word" key={part}>{part}</span>)}</h1>
            <p className="specialization">ML Engineer</p>
            <div className="hero-statement">{p.heroSummary.map(line => <p key={line}>{line}</p>)}</div>
            <div className="hero-actions"><MagneticLink href={links.email} className="button button-primary">{p.contactAction}<Arrow /></MagneticLink><MagneticLink href={resumeHref} className="button button-secondary">{p.resumeAction}<Arrow /></MagneticLink></div>
          </div>
          <div className="hero-person">
            <PortraitDepth><div className="portrait-mat"><Image src={portraitPhoto} alt={p.name} width={232} height={268} priority sizes="(max-width: 680px) 116px, 232px" className="portrait" /></div></PortraitDepth>
            <div className="person-links"><a href={links.email}>Mail<Arrow /></a><a href={links.telegram}>Telegram<Arrow /></a><a href={links.linkedin}>LinkedIn<Arrow /></a></div>
          </div>
        </div>
        <div className="hero-intro" id="about"><h2>{ru ? "О себе" : "About me"}</h2><p>{p.introduction}</p></div>
      </section>

      <SectionNav items={nav} />

      <div className="resume-content">
        <section className="experience-section" id="experience" aria-labelledby="experience-title">
          <Reveal><div className="section-heading"><h2 id="experience-title">{ru ? "Опыт работы" : "Experience"}</h2></div></Reveal>
          <div className="experience-list">{p.experience.map((item, i) =>
            <Reveal key={item.company} delay={i * 35}><ExperiencePanel initialOpen={i < 2} heading={<><h3>{item.company}</h3><p className="job-role">{item.role}</p></>} meta={item.period.replace(/—|–/g, "-")}>
              <p>{item.description}</p>
              {item.company === "krem.digital" && <a className="product-link" href="https://artillect.pro" target="_blank" rel="noopener noreferrer">{ru ? "Открыть Artillect" : "View Artillect"}<Arrow /></a>}
            </ExperiencePanel></Reveal>
          )}</div>
        </section>
        <aside className="resume-aside">
          <Reveal><section className="education-panel" aria-labelledby="education-title"><h2 id="education-title">{p.educationTitle}</h2>
            <div className="education-entry"><span className="education-year">2024</span><h3>{ru ? "Программная инженерия" : "Software Engineering"}</h3><p>{ru ? "ИжГТУ им. М. Т. Калашникова" : "Kalashnikov ISTU"}</p><span>{ru ? "Бакалавр" : "Bachelor's degree"}</span></div>
            <div className="language-list"><div><span>{ru ? "Русский" : "Russian"}</span><strong>{ru ? "Родной" : "Native"}</strong></div><div><span>{ru ? "Английский" : "English"}</span><strong>B2</strong></div></div>
          </section></Reveal>
          <Link className="aside-cv" href={resumeHref}><strong>{p.resumeAction}</strong><Arrow /></Link>
        </aside>
      </div>

      <section id="expertise" className="expertise-section" aria-labelledby="expertise-title">
        <Reveal><div className="section-heading"><h2 id="expertise-title">{ru ? "Компетенции" : "Expertise"}</h2></div></Reveal>
        <div className="expertise-layout">
          <div className="expertise-statement"><Reveal><p>{p.skillsTitle}</p></Reveal><div className="capability-orbit" aria-hidden="true"><span /><span /><span /><i /></div></div>
          <div className="skills-list">{p.skills.map(skill => <Reveal key={skill.title}><article className="skill-item"><h3>{skill.title}</h3><p>{skill.description}</p>{skill.tools ? <ul className="tech-list">{skill.tools.split(" / ").map(tool => <li key={tool}>{tool}</li>)}</ul> : null}</article></Reveal>)}</div>
        </div>
      </section>

      <section id="engineering" className="engineering-section" aria-labelledby="engineering-title">
        <Reveal><div className="section-heading"><h2 id="engineering-title">{p.engineering.title}</h2><p className="engineering-intro">{p.engineering.intro}</p></div></Reveal>
        <ol className="engineering-steps">{p.engineering.steps.map(step => <li key={step.title}><Reveal><h3>{step.title}</h3><p>{step.description}</p></Reveal></li>)}</ol>
        <div className="engineering-evidence"><h3>{p.engineering.evidenceTitle}</h3><div>{p.engineering.evidence.map(example => <Reveal key={example.title}><article><h4>{example.title}</h4><p>{example.text}</p></article></Reveal>)}</div></div>
      </section>

      <Reveal><section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-main"><div><h2 id="contact-title">{ru ? "Обсудим вашу задачу" : "Let's talk about your team"}</h2><p>{p.contactText}</p></div><MagneticLink href={links.email} className="contact-arrow" ><span className="sr-only">{p.emailLabel}</span><Arrow /></MagneticLink></div>
        <div className="contact-bottom"><a href={links.email} className="email-link">maratg2develop@gmail.com</a><div className="social-links"><a href={links.telegram}>Telegram<Arrow /></a><a href={links.github}>GitHub<Arrow /></a><a href={links.linkedin}>LinkedIn<Arrow /></a><a href={links.hh}>HH.ru<Arrow /></a></div></div>
      </section></Reveal>
    </main>
    <footer className="site-footer page-width"><span>{p.footer} · ML Engineer</span><a href="#top">{p.backTop}<Arrow /></a></footer>
  </ResumeMotion>;
}
