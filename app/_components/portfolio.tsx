import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import portraitPhoto from "../../public/photo.png";
import { links, maskroute, profiles, projectMeta, type Language } from "../_content/profile";
import { MotionProvider, CopyEmail } from "./motion";
import HeroFilm from "./hero-film";
import { ArtillectDiagram, AdventariumDiagram } from "./diagrams";

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
  return <svg className={`arrow-icon ${down ? "arrow-down" : ""}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SectionHead({ id, title }: { id: string; title: string }) {
  return <header className="section-head" data-reveal><h2 id={id}>{title}</h2></header>;
}

export default function Portfolio({ lang }: { lang: Language }) {
  const p = profiles[lang];
  const s = p.site;
  const ru = lang === "ru";
  const home = ru ? "/" : "/en";
  const resumeHref = ru ? "/resume" : "/en/resume";
  const pdfHref = `/cv/marat-gazizulin-cv-${lang}.pdf`;
  const nav = [["work", s.nav.work], ["open-source", s.nav.open], ["experience", s.nav.experience], ["skills", s.nav.stack], ["contact", s.nav.contact]];
  const person = { "@context": "https://schema.org", "@type": "Person", name: p.name, alternateName: "MaratG2", jobTitle: "ML Engineer", sameAs: [links.github, links.linkedin, links.hh], knowsLanguage: ["Russian", "English"] };
  const { artillect, adventarium, agency } = s.work;
  const [atelier] = s.open.projects;
  const mr = s.open.maskroute;

  return <MotionProvider>
    <a className="skip-link" href="#main">{p.skip}</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />

    <header className="topbar" id="top">
      <Link href={home} className="brand">{p.name}</Link>
      <nav className="topnav" aria-label={ru ? "Разделы" : "Sections"}>{nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="top-tools">
        <nav className="lang" aria-label={ru ? "Язык" : "Language"}>
          <Link href="/" hrefLang="ru" lang="ru" aria-current={ru ? "page" : undefined}>RU</Link>
          <Link href="/en" hrefLang="en" lang="en" aria-current={!ru ? "page" : undefined}>EN</Link>
        </nav>
        <Link className="top-cv" href={resumeHref}>{s.resume}</Link>
      </div>
    </header>

    <main id="main">
      <HeroFilm
        captions={s.film}
        fallback={<Image src={portraitPhoto} alt={s.hero.portraitAlt} priority sizes="(max-width: 760px) 100vw, 50vw" className="film-photo" />}
        copy={<>
          <h1 id="hero-title">{p.name}</h1>
          <p className="hero-role">{s.hero.role}</p>
          <p className="hero-lede">{s.hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={links.email}>{p.contactAction}</a>
            <Link className="btn btn-ghost" href={resumeHref}>{p.resumeAction}</Link>
          </div>
        </>}
      />

      <section className="section" id="work" aria-labelledby="work-title">
        <SectionHead id="work-title" title={s.work.title} />

        <article className="case">
          <div className="case-copy" data-reveal>
            <h3>{artillect.title}</h3>
            <p className="case-meta">{artillect.meta}<br />{artillect.role}</p>
            <p className="case-summary">{artillect.summary}</p>
            <ul className="case-points">{artillect.points.map(point => <li key={point}>{point}</li>)}</ul>
            <a className="text-link" href={links.artillect} target="_blank" rel="noopener noreferrer">{artillect.link}<Arrow /></a>
          </div>
          <figure className="case-figure" data-reveal><ArtillectDiagram labels={artillect.diagram} /></figure>
        </article>

        <article className="case">
          <div className="case-copy" data-reveal>
            <h3>{adventarium.title}</h3>
            <p className="case-meta">{adventarium.meta}<br />{adventarium.role}</p>
            <p className="case-summary">{adventarium.summary}</p>
            <ul className="case-points">{adventarium.points.map(point => <li key={point}>{point}</li>)}</ul>
          </div>
          <figure className="case-figure" data-reveal><AdventariumDiagram labels={adventarium.diagram} /></figure>
        </article>

        <article className="case-compact" data-reveal>
          <div>
            <h3>{agency.title}</h3>
            <p className="case-meta">{agency.meta}<br />{agency.role}</p>
          </div>
          <p className="case-summary">{agency.summary}</p>
        </article>
      </section>

      <section className="section" id="open-source" aria-labelledby="open-title">
        <SectionHead id="open-title" title={s.open.title} />

        <article className="project-feature" data-reveal>
          <div className="project-shots">
            {projectMeta[atelier.id].images!.map((img, i) => <figure key={img.src} className={`shot shot-${i}`}>
              <Image src={img.src} alt={`${atelier.id} — ${img.label}`} width={img.width} height={img.height} sizes="(max-width: 900px) 92vw, 60vw" />
            </figure>)}
          </div>
          <div className="project-copy">
            <h3>{atelier.id}</h3>
            <p>{atelier.summary}</p>
            <ul className="tags">{atelier.tags.map(t => <li key={t}>{t}</li>)}</ul>
            <a className="text-link" href={projectMeta[atelier.id].repo} target="_blank" rel="noopener noreferrer">{s.open.repo}<Arrow /></a>
          </div>
        </article>

        <article className="project-case" data-reveal>
          <div className="project-copy">
            <h3>MaskRoute</h3>
            <p className="case-meta">{mr.subtitle}</p>
            <p>{mr.summary}</p>
            <ul className="tags">{mr.tags.map(t => <li key={t}>{t}</li>)}</ul>
            <div className="project-links">
              <a className="text-link" href={maskroute.source} target="_blank" rel="noopener noreferrer">{mr.source}<Arrow /></a>
              <a className="text-link" href={maskroute.report} target="_blank" rel="noopener noreferrer">{mr.report}<Arrow /></a>
            </div>
          </div>
          <ul className="metrics">{mr.metrics.map(m => <li key={m.value}><strong>{m.value}</strong><span>{m.label}</span></li>)}</ul>
        </article>

        <a className="text-link all-repos" href={links.github} target="_blank" rel="noopener noreferrer">{s.open.allRepos}<Arrow /></a>
      </section>

      <section className="section" id="experience" aria-labelledby="experience-title">
        <SectionHead id="experience-title" title={s.experience.title} />
        <ol className="timeline">
          {p.experience.map((item, i) => {
            const row = <>
              <p className="timeline-period">{item.period.replace(/\s[—–]\s/g, " — ")}</p>
              <div className="timeline-head"><h3>{item.company.replace(/ \/ /g, ", ")}</h3><p>{item.role}</p></div>
              <p className="timeline-text">{s.experience.lines[i]}</p>
            </>;
            const more = s.experience.details[i];
            if (!more) return <li key={item.company} data-reveal><div className="timeline-row">{row}</div></li>;
            return <li key={item.company} data-reveal>
              <details className="timeline-item">
                <summary className="timeline-row">
                  {row}
                  <span className="timeline-toggle"><span className="toggle-more">{s.experience.more}</span><span className="toggle-less">{s.experience.less}</span><span className="toggle-icon" aria-hidden="true" /></span>
                </summary>
                <div className="timeline-more">
                  <p className="timeline-intro">{more.intro}</p>
                  <div className="timeline-groups">
                    {more.groups.map(group => <section key={group.title}>
                      <h4>{group.title}</h4>
                      <ul>{group.items.map(text => <li key={text}>{text}</li>)}</ul>
                    </section>)}
                  </div>
                  <ul className="tags">{more.tools.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
              </details>
            </li>;
          })}
        </ol>
        <dl className="facts" data-reveal>
          <div><dt>{s.experience.education}</dt><dd>{s.experience.school}<span>{s.experience.degree}, 2024</span></dd></div>
          <div><dt>{s.experience.languages}</dt><dd>{s.experience.ru}<span>{s.experience.en}</span></dd></div>
        </dl>
      </section>

      <section className="section" id="skills" aria-labelledby="skills-title">
        <SectionHead id="skills-title" title={s.stack.title} />
        <dl className="skills">
          {p.skills.map(skill => <div key={skill.title} data-reveal>
            <dt>{skill.title}</dt>
            <dd>{skill.tools.split(" / ").join(", ")}</dd>
          </div>)}
        </dl>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-inner" data-reveal>
          <h2 id="contact-title">{p.contactTitle}</h2>
          <p className="contact-text">{p.contactText}</p>
          <div className="contact-email">
            <a href={links.email} aria-label={p.emailLabel}>{links.emailAddress}</a>
            <CopyEmail address={links.emailAddress} copy={s.contact.copy} copied={s.contact.copied} />
          </div>
          <div className="contact-row">
            <ul className="contact-links">
              <li><a href={links.telegram}>Telegram<Arrow /></a></li>
              <li><a href={links.github}>GitHub<Arrow /></a></li>
              <li><a href={links.linkedin}>LinkedIn<Arrow /></a></li>
              <li><a href={links.hh}>HH.ru<Arrow /></a></li>
            </ul>
            <div className="contact-cv">
              <Link className="btn btn-ghost" href={resumeHref}>{p.resumeAction}</Link>
              <a className="btn btn-primary" href={pdfHref} download>{s.contact.download}<Arrow down /></a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer">
      <span>© 2026 {p.footer}</span>
      <a href="#top">{p.backTop}</a>
    </footer>
  </MotionProvider>;
}
