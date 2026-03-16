"use client";

import { useRef, useState } from "react";

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
  const contentRef = useRef<HTMLDivElement>(null);

  const activeIndex = sections.findIndex((item) => item.id === activeSection);

  const selectSection = (id: string) => {
    setActiveSection(id);
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <>
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
          </>
        );
      case "resume":
        return (
          <>
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
          </>
        );
      case "krem":
        return (
          <>
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
              <li>Стандартизация процессов разработки и код-ревью практик</li>
              <li>Сильное взаимодействие с продуктом и бизнес-стейкхолдерами</li>
            </ul>
          </>
        );
      case "adventarium":
        return (
          <>
            <h2 className="section-title">Adventarium</h2>
            <p className="section-text">
              Работа над одноименным проектом: фокус на практическое применение AI,
              повышение качества решений и быстрый цикл итераций вместе с командой.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Основные задачи</h3>
                <p className="mt-2 text-sm text-black/65">
                  Разработка и интеграция AI-модулей, участие в архитектурных решениях,
                  улучшение качества и скорости релизов.
                </p>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Результат</h3>
                <p className="mt-2 text-sm text-black/65">
                  Улучшение стабильности AI-сценариев и ускорение цикла поставки
                  функциональности для продукта.
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
              Разработка AI-функциональности в контексте агентства: автоматизация рутинных
              задач, ускорение процессов и создание интеллектуальных инструментов для
              внутренних и клиентских сценариев.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Автоматизация процессов</h3>
                <p className="mt-2 text-sm text-black/65">
                  Сокращение ручной работы через AI-инструменты и pipeline-подход.
                </p>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Внутренние инструменты</h3>
                <p className="mt-2 text-sm text-black/65">
                  Создание утилит и сервисов для команд, которые ускоряют бизнес-операции.
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col px-5 pb-24 pt-6 md:px-10 md:pt-8">
      <header className="reveal in-view relative mb-8 grid items-center gap-4 rounded-3xl border border-black/10 bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.06)] md:grid-cols-[1.4fr_auto] md:p-5">
        <div>
          <span className="mb-2 inline-flex rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/70">
            Открыт к предложениям • AI Engineer
          </span>
          <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
            Марат Газизулин
            <span className="block text-[rgb(62,195,123)]">Инженер искусственного интеллекта</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70">
            Проектирую и внедряю AI-решения, которые дают реальную пользу бизнесу: от
            MVP до production-систем. Фокус — ML/NLP/LLM и управление AI-командами.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <a className="btn btn-solid" href="mailto:maratg2develop@gmail.com">
              Написать на почту
            </a>
            <button className="btn btn-outline" onClick={() => selectSection("resume")}>
              Смотреть резюме
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs md:text-sm">
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

        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-black/10 bg-black/[0.02] p-3 md:p-4">
          <div className="profile-circle">MG</div>
          <p className="text-center text-[11px] text-black/50 md:text-xs">
            Фото-заглушка
          </p>
        </div>
      </header>

      <nav className="sticky-nav mb-10">
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

      <section className="section-stage section-card">
        <div ref={contentRef} className="section-pane-scroll">
          <div key={activeSection} className="section-pane reveal in-view">
            {renderSectionContent()}
          </div>
        </div>
      </section>
    </main>
  );
}
