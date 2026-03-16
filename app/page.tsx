"use client";

import Image from "next/image";
import { useState } from "react";

const sections = [
  { id: "about", label: "О себе" },
  { id: "resume", label: "Резюме" },
  { id: "krem", label: "krem.digital" },
  { id: "adventarium", label: "Adventarium" },
  { id: "agency", label: "Model Agency" },
  { id: "other", label: "Другие проекты" },
];

const sectionPreviews: Record<string, string> = {
  about: "Ключевые навыки, стек и фокус в Gen AI/ML/DevOps.",
  resume: "Позиция, образование, курс, карьерный трек и контакты.",
  krem: "Рост от Gen AI Developer до CTO, app.artillect.pro и leadership.",
  adventarium: "Dify/LLM воркфлоу, боты, API, тесты и база данных.",
  agency: "RunPod + ComfyUI, архитектура и fashion-oriented AI решения.",
  other: "Опыт в Unity/gamedev: проекты, стек, multiplayer и systems design.",
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const activeIndex = sections.findIndex((section) => section.id === activeSection);

  const selectSection = (id: string) => {
    setActiveSection(id);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <>
            <h2 className="section-title">О себе</h2>
            <p className="section-text">
              ИИ-разработчик с начала 2024 года: проектирую и внедряю end-to-end решения
              на стыке ML, full-stack и DevOps, управляю командами и веду проекты «под
              ключ».
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Специализация: построение AI-пайплайнов, интеграция LLM/генеративных
              моделей, разработка backend API, запуск продуктовых решений и техническое
              руководство от этапа требований до production.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "AI-пайплайны: ComfyUI, Dify, n8n, make, SD WebUI",
                "LLM/QLoRA (+обучение), RAG",
                "SD, SDXL, Flux, LoRA (+обучение), ControlNet, IP Adapter, PuLID",
                "AnimateDiff, Hunyuan, Runway, Kling, TTS, STT",
                "ML & DS: Python, Pandas, NumPy, SciKit Learn, Seaborn",
                "EDA, PCA, регрессия/классификация, SVM, NN, XGBoost",
                "AI/ML инфраструктура: FastAPI, Flask, Quart, Docker, Hugging Face",
                "Full-stack/DevOps: Next.js/React, Node.js, JS/TS, Bootstrap",
                "БД: MySQL/MariaDB/PostgreSQL + Django ORM/Prisma/Drizzle",
                "GitLab CI/CD, GitFlow, On-Cloud/On-Premise, Telegram/Discord боты",
                "Управление: требования, ТЗ, постановка задач, agile/водопад",
                "Английский B2 · Русский родной",
              ].map((skill) => (
                <div key={skill} className="mini-card">
                  {skill}
                </div>
              ))}
            </div>
          </>
        );
      case "resume":
        return (
          <>
            <h2 className="section-title">Резюме</h2>
            <p className="section-text">
              Позиция: <span className="font-semibold">Gen AI Developer</span>. Карьерный
              трек: <span className="font-semibold">Gen AI Developer → Lead Gen AI Developer → CTO</span>.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Образование</h3>
                <p className="mt-2 text-sm text-black/65">
                  Ижевский государственный технический университет им. М.Т. Калашникова,
                  Ижевск
                </p>
                <p className="mt-1 text-sm text-black/65">
                  Программная инженерия · 2024 · Бакалавр
                </p>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Курсы</h3>
                <p className="mt-2 text-sm text-black/65">
                  Unity Game Developer. Professional
                </p>
                <p className="mt-1 text-sm text-black/65">OTUS · 2023</p>
              </article>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  role: "Gen AI Developer → CTO",
                  company: "krem.digital",
                  period: "Январь 2024 — Март 2026 · 2 года и 3 месяца",
                },
                {
                  role: "Lead AI Developer",
                  company: "Model Agency",
                  period: "Февраль 2025 — Июнь 2025 · 5 месяцев",
                },
                {
                  role: "Gen AI Developer",
                  company: "Adventarium",
                  period: "Февраль 2025 — Август 2025 · 7 месяцев",
                },
                {
                  role: "Unity Разработчик",
                  company: "Manka Games / ISTU / krem.digital / 23:23 team",
                  period: "Май 2021 — Июнь 2023",
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

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Контакты</h3>
                <p className="mt-2 text-sm text-black/70">
                  Телефон: <a className="underline" href="tel:+79128711665">+7 912 871-16-65</a>
                </p>
                <p className="mt-1 text-sm text-black/70">
                  Email: <a className="underline" href="mailto:maratg2develop@gmail.com">maratg2develop@gmail.com</a>
                </p>
                <p className="mt-1 text-sm text-black/70">
                  Telegram: <a className="underline" href="https://t.me/maratg2" target="_blank" rel="noreferrer">@maratg2</a>
                </p>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Геймдев-бэкграунд</h3>
                <p className="mt-2 text-sm text-black/65">
                  C# Unity, DoTween, UniTask, Zenject, Photon, ECS, FMOD, ООП,
                  SOLID/GRASP и системное мышление, которое применяю в AI-проектах.
                </p>
              </article>
            </div>
          </>
        );
      case "krem":
        return (
          <>
            <h2 className="section-title">krem.digital</h2>
            <p className="section-text">
              Gen AI Developer → CTO · Январь 2024 — Март 2026 (2 года и 3 месяца).
              Разработка ИИ-сервисов, custom nodes в ComfyUI + Python, интеграция и
              настройка LLM/генеративных моделей, разработка Python Backend API для
              использования созданных AI-сервисов.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-black/75 marker:text-[rgb(62,195,123)]">
              <li>Продукт app.artillect.pro создан с нуля</li>
              <li>Построение end-to-end AI-архитектур для бизнес-задач</li>
              <li>Развитие команды и управление проектами «под ключ»</li>
              <li>Сопровождение production-решений и техпроцессов</li>
            </ul>
          </>
        );
      case "adventarium":
        return (
          <>
            <h2 className="section-title">Adventarium</h2>
            <p className="section-text">
              Gen AI Developer · Февраль 2025 — Август 2025 (7 месяцев). Фокус на
              практическое применение AI-воркфлоу и интеграции LLM в продуктовые
              сценарии.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Основные задачи</h3>
                <p className="mt-2 text-sm text-black/65">
                  Создание и настройка комплексных AI-воркфлоу в Dify, работа с LLM,
                  разработка Telegram/Discord-ботов.
                </p>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Результат</h3>
                <p className="mt-2 text-sm text-black/65">
                  Написание API-сервера, тестов, MySQL-таблиц и интеграция data-потоков
                  в стабильный production-контур.
                </p>
              </article>
            </div>
          </>
        );
      case "agency":
        return (
          <>
            <h2 className="section-title">Model Agency</h2>
            <p className="section-text">
              Lead Gen AI Developer · Февраль 2025 — Июнь 2025 (5 месяцев). Построение
              AI-инфраструктуры для fashion-сферы и перевод задач заказчика в работающие
              технологические решения.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Архитектура и процессы</h3>
                <p className="mt-2 text-sm text-black/65">
                  Уточнение бизнес-процессов, подготовка технического задания,
                  проектирование архитектуры и окружения на RunPod + ComfyUI.
                </p>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">AI-решения под домен</h3>
                <p className="mt-2 text-sm text-black/65">
                  Создание уникальных ComfyUI-воркфлоу и custom nodes для задач клиента
                  в fashion-направлении.
                </p>
              </article>
            </div>
          </>
        );
      case "other":
        return (
          <>
            <h2 className="section-title">Другие проекты</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Manka Games · Unity Разработчик",
                  text: "Февраль 2023 — Июнь 2023 (5 месяцев). Разработка игр Neon Blago и (non)trivial; ECS (Morpeh), Dialogue System, FMOD, Unity Localization, 2D/3D сцены, система плавной смены времени суток.",
                },
                {
                  title: "ISTU · Unity Разработчик",
                  text: "Сентябрь 2022 — Май 2023 (9 месяцев). Разработал веб-приложение виртуального музея, документацию и обучающие ресурсы; HTTP requests, PHP-сервер, MySQL и интеграция с веб-приложениями.",
                },
                {
                  title: "krem.digital · Junior+ Unity Разработчик",
                  text: "Май 2022 — Август 2022 (4 месяца). Гиперказуальные игры Maze Clog и Rail Maker; The App Core (Action Component System), SDK (Facebook, AppMetrica, AppLovin, AppsFlyer), URP/NavMesh/Splines.",
                },
                {
                  title: "23:23 team · Unity Разработчик",
                  text: "Май 2021 — Май 2022 (1 год и 1 месяц). Мидкорный кроссплатформенный шутер Ricochet Tanks, Steam-игра Try To Reach 10 и другие проекты; multiplayer на Photon, реализация сложных ботов.",
                },
              ].map((project) => (
                <article key={project.title} className="mini-card min-h-28">
                  <h3 className="text-base font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-black/65">
                    {project.text}
                  </p>
                </article>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-col px-5 pb-16 pt-3 md:px-10 md:pt-4">
      <div className="motion-bg" aria-hidden="true">
        <span className="mg-orb orb-1" />
        <span className="mg-orb orb-2" />
        <span className="mg-orb orb-3" />
        <span className="mg-grid" />
      </div>

      <header className="hero-header reveal in-view relative mb-4 grid items-center gap-3 rounded-3xl p-3 md:grid-cols-[1.45fr_auto] md:p-4">
        <div>
          <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            Марат Газизулин
            <span className="block text-[rgb(62,195,123)]">Gen AI Developer</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70">
            Проектирую и внедряю AI-решения, которые приносят бизнес-результат: от MVP
            до production-систем. Фокус — GenAI, full-stack, DevOps.
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs md:text-sm">
            <a className="chip" href="tel:+79128711665">
              +7 912 871-16-65
            </a>
            <a className="chip" href="https://t.me/maratg2" target="_blank" rel="noreferrer">
              Telegram: @maratg2
            </a>
            <a className="chip" href="mailto:maratg2develop@gmail.com">
              maratg2develop@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center p-1">
          <Image
            src="/photo.png"
            alt="Фото Марата Газизулина"
            width={144}
            height={144}
            className="h-28 w-28 rounded-full object-cover shadow-[0_20px_40px_rgba(0,0,0,0.26)] md:h-36 md:w-36"
            priority
          />
        </div>
      </header>

      <nav className="sticky-nav mb-4">
        <ul className="flex min-w-max items-center gap-2">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => selectSection(item.id)}
                className={`nav-pill ${activeSection === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section-carousel-wrap">
        <div className="carousel-track">
          {[-1, 0, 1].map((offset) => {
            const index = (activeIndex + offset + sections.length) % sections.length;
            const section = sections[index];
            const isActive = offset === 0;

            return (
              <article
                key={`${section.id}-${offset}`}
                className={`carousel-card ${isActive ? "active" : "side"}`}
                onClick={() => !isActive && selectSection(section.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (!isActive && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    selectSection(section.id);
                  }
                }}
              >
                <div className="carousel-card-inner">
                  {!isActive ? (
                    <>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/45">Раздел</p>
                      <h3 className="mt-1 text-base font-semibold md:text-lg">{section.label}</h3>
                      <p className="mt-2 text-sm text-black/60">{sectionPreviews[section.id]}</p>
                    </>
                  ) : (
                    <div className="section-pane-scroll mt-3">
                      <div key={activeSection} className="section-pane reveal in-view">
                        {renderSectionContent()}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mt-3 flex justify-center gap-1.5">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            aria-label={`Открыть раздел ${section.label}`}
            className={`h-1.5 rounded-full transition-all ${
              section.id === activeSection ? "w-7 bg-[rgb(62,195,123)]" : "w-2.5 bg-black/20"
            }`}
            onClick={() => selectSection(section.id)}
          />
        ))}
      </div>
    </main>
  );
}
