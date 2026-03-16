"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "О себе" },
  { id: "resume", label: "Резюме" },
  { id: "krem", label: "krem.digital" },
  { id: "adventarium", label: "Adventarium" },
  { id: "agency", label: "Model Agency" },
  { id: "other", label: "Другие проекты" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.15,
      },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    const sectionNodes = document.querySelectorAll("section[id]");
    sectionNodes.forEach((node) => sectionObserver.observe(node));

    const revealNodes = document.querySelectorAll("[data-reveal]");
    revealNodes.forEach((node) => revealObserver.observe(node));

    return () => {
      sectionNodes.forEach((node) => sectionObserver.unobserve(node));
      revealNodes.forEach((node) => revealObserver.unobserve(node));
    };
  }, []);

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col px-5 pb-24 pt-7 md:px-10 md:pt-10">
      <header className="reveal relative mb-14 grid min-h-[80svh] items-center gap-10 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] md:grid-cols-[1.2fr_0.8fr] md:p-12" data-reveal>
        <div>
          <span className="mb-4 inline-flex rounded-full border border-black/15 px-4 py-1 text-sm font-medium text-black/70">
            Открыт к предложениям • AI Engineer
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Марат Газизулин
            <span className="block text-[rgb(62,195,123)]">Инженер искусственного интеллекта</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/70 md:text-lg">
            Проектирую и внедряю AI-решения, которые дают реальную пользу бизнесу: от
            прототипа и MVP до production-систем. Основной фокус — ML/NLP/LLM,
            автоматизация процессов и управление техническими командами.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="btn btn-solid" href="mailto:maratg2develop@gmail.com">
              Написать на почту
            </a>
            <a className="btn btn-outline" href="#resume">
              Смотреть резюме
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a className="chip" href="https://github.com/your-username" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="chip" href="https://linkedin.com/in/your-username" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="chip" href="mailto:maratg2develop@gmail.com">
              maratg2develop@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/10 bg-black/[0.02] p-8">
          <div className="profile-circle">MG</div>
          <p className="text-center text-sm text-black/55">
            Круглое фото-заглушка.
            <br />
            Замените на реальное фото в `public/`.
          </p>
        </div>
      </header>

      <nav className="sticky-nav mb-10">
        <ul className="flex min-w-max items-center gap-2">
          {sections.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-pill ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-8 md:space-y-10">
        <section id="about" className="reveal section-card" data-reveal>
          <h2 className="section-title">О себе</h2>
          <p className="section-text">
            Я AI-инженер с практическим опытом полного цикла: исследование, построение
            архитектуры, разработка моделей, интеграция, мониторинг и масштабирование.
            Работал как индивидуальный contributor и как руководитель команд.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "LLM-приложения и AI-ассистенты",
              "ML/NLP в production",
              "Системный дизайн AI-платформ",
              "MLOps и CI/CD подходы",
              "Техническое лидерство",
              "Продуктовое мышление",
            ].map((skill) => (
              <div key={skill} className="mini-card">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="resume" className="reveal section-card" data-reveal>
          <h2 className="section-title">Резюме</h2>
          <p className="section-text">
            Карьерный трек: <span className="font-semibold">AI Developer → Lead AI Developer → CTO</span>.
            Строю команды, развиваю инженерные процессы и запускаю проекты, которые
            влияют на ключевые метрики.
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                role: "CTO",
                company: "krem.digital",
                period: "последняя роль",
              },
              {
                role: "Lead AI Developer",
                company: "krem.digital",
                period: "этап роста",
              },
              {
                role: "AI Developer",
                company: "krem.digital / Adventarium / Model Agency",
                period: "ранний этап",
              },
            ].map((item) => (
              <article key={`${item.role}-${item.company}`} className="timeline-item">
                <div>
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="text-black/70">{item.company}</p>
                </div>
                <span className="text-sm text-black/50">{item.period}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="krem" className="reveal section-card" data-reveal>
          <h2 className="section-title">krem.digital</h2>
          <p className="section-text">
            Основной опыт и масштабный этап карьеры. От AI-разработки до CTO: построение
            команды, запуск AI-направления, сопровождение нескольких проектов и одного
            ключевого большого продукта.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-black/75 marker:text-[rgb(62,195,123)]">
            <li>Проектирование AI-архитектур под продуктовые задачи</li>
            <li>Переход от прототипов к стабильным production-решениям</li>
            <li>Управление roadmap, рисками и технической командой</li>
          </ul>
        </section>

        <section id="adventarium" className="reveal section-card" data-reveal>
          <h2 className="section-title">Adventarium</h2>
          <p className="section-text">
            Работа над одноименным проектом: фокус на практическое применение AI,
            повышение качества решений и быстрый цикл итераций вместе с командой.
          </p>
        </section>

        <section id="agency" className="reveal section-card" data-reveal>
          <h2 className="section-title">Model Agency</h2>
          <p className="section-text">
            Разработка AI-функциональности в контексте агентства: автоматизация рутинных
            задач, ускорение процессов и создание интеллектуальных инструментов для
            внутренних и клиентских сценариев.
          </p>
        </section>

        <section id="other" className="reveal section-card" data-reveal>
          <h2 className="section-title">Другие проекты</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "RAG-платформа для корпоративной базы знаний",
              "Внутренний AI-ассистент для команды разработки",
              "Автоматизация обработки заявок с NLP-классификацией",
              "Набор production-ready шаблонов для AI MVP",
            ].map((project) => (
              <article key={project} className="mini-card min-h-28">
                <h3 className="text-base font-semibold">{project}</h3>
                <p className="mt-2 text-sm text-black/65">
                  Временное описание проекта. Добавьте стек, результаты и ссылку на кейс.
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
