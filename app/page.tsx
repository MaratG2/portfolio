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
  about: "AI Engineer / Tech Lead: end-to-end AI-продукты от архитектуры до production.",
  resume: "Позиция, образование, курс, карьерный трек и контакты.",
  krem: "Gen AI Developer → Lead AI Developer → CTO, AI-платформа с нуля и leadership.",
  adventarium: "LLM-боты для ролевой игры, Dify orchestration, backend и production-контур.",
  agency: "Fashion AI-инфраструктура: консистентные модели и повторяемый контент-пайплайн.",
  other: "Коммерческий Unity/GameDev бэкграунд: systems thinking и сложные pipeline-подходы.",
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
              AI Engineer / Tech Lead с коммерческим опытом построения end-to-end решений
              на базе генеративного ИИ. Проектирую и внедряю AI-продукты полного цикла:
              от требований и архитектуры до production-систем, поддержки и развития.
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Моя специализация — AI-пайплайны, LLM и генеративные модели, backend API,
              full-stack интеграции и инфраструктура. Я умею не только собрать отдельный
              workflow или интегрировать модель, но и выстроить целостную систему:
              orchestration, backend-логику, data flow, пользовательский сценарий,
              DevOps-контур и процессы команды.
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              В коммерческих проектах закрывал роли AI Engineer, Lead AI Developer и
              CTO: запускал AI-платформу с нуля, строил production-пайплайны для
              генерации изображений, видео, аудио и текстовых сценариев, внедрял LLM в
              продуктовые сценарии, управлял разработчиками и вел проекты от брифа до
              релиза.
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Бэкграунд в Unity/GameDev дал мне сильную инженерную базу: системное
              мышление, архитектурный подход, работа со сложными пайплайнами, real-time
              сценариями и production-ограничениями. Сейчас ищу роль, где смогу
              приносить максимум пользы как сильный hands-on AI Engineer с опытом
              архитектуры и технического лидерства.
            </p>

            <h3 className="mt-6 text-lg font-semibold">Навыки</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "GenAI / LLM: LLM, RAG, QLoRA, prompt/system design, AI agents, generative pipelines",
                "Image / Video / Audio AI: Stable Diffusion, SDXL, Flux, LoRA, ControlNet, IP-Adapter, PuLID, AnimateDiff, TTS, STT, voice cloning",
                "AI Workflow / Automation: ComfyUI, custom nodes, Dify, n8n, Make, RunPod",
                "Backend / API: Python, FastAPI, Flask, Quart, REST API, integrations, bot backends",
                "Infra / DevOps: Docker, CI/CD, GPU environments, production deployment, on-cloud / on-premise",
                "Full-stack / Data / DB: Next.js, React, JS/TS, Node.js, PostgreSQL, MySQL, MariaDB, Prisma, Drizzle, Pandas, NumPy, scikit-learn",
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
              <span className="font-semibold">Gen AI Developer → Lead AI Developer → CTO</span>
              <br />
              Январь 2024 — Март 2026
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Отвечал за разработку и запуск AI-продуктов полного цикла: от
              формализации требований и проектирования архитектуры до
              production-внедрения, сопровождения и развития команды. Прошел путь от
              hands-on AI Engineer до технического руководителя компании.
            </p>
            <h3 className="mt-6 text-lg font-semibold">Ключевые зоны ответственности</h3>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-black/75 marker:text-[rgb(62,195,123)]">
              <li>Проектирование end-to-end AI-архитектур под бизнес-задачи</li>
              <li>Разработка и интеграция AI-сервисов в продуктовые сценарии</li>
              <li>Построение backend/API-слоя и production-контура</li>
              <li>Организация техпроцессов, декомпозиция задач, координация разработчиков</li>
              <li>Сопровождение релизов, развитие продукта и техническое руководство</li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold">Ключевые проекты</h3>
            <div className="mt-4 space-y-4">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Artillect — AI-платформа для генерации контента</h3>
                <p className="mt-2 text-sm text-black/65">
                  Ключевой продукт компании, который развивал с нуля как full-stack +
                  backend + AI + DevOps инженер, а позже — как tech lead/CTO.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 marker:text-[rgb(62,195,123)]">
                  <li>Спроектировал и реализовал платформу для запуска и масштабирования AI-сервисов в едином продукте</li>
                  <li>Построил backend-архитектуру, логику интеграции AI-функций и контур выполнения генераций</li>
                  <li>Разработал и внедрил десятки AI-воркфлоу под разные сервисы: генерация и редактирование изображений, video generation/editing, voice workflows, text workflows, utility AI-tools</li>
                  <li>Выстроил модульный подход к подключению новых моделей и сервисов</li>
                  <li>После перехода в CTO управлял развитием продукта, планированием задач, наймом и координацией команды</li>
                </ul>
              </article>

              <article className="mini-card">
                <h3 className="text-base font-semibold">AI Creative Generator</h3>
                <p className="mt-2 text-sm text-black/65">
                  Продукт для генерации рекламных креативов из короткой идеи.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 marker:text-[rgb(62,195,123)]">
                  <li>Реализовал пайплайн: идея → сценарий → раскадровка → промпты → изображения/видео</li>
                  <li>Прорабатывал логику пользовательского сценария и генеративного контура</li>
                  <li>Участвовал в обучении и применении кастомных моделей под контентные задачи</li>
                </ul>
              </article>

              <article className="mini-card">
                <h3 className="text-base font-semibold">Интерактивный стенд с AI-аватарами (ЦИПР 2025)</h3>
                <p className="mt-2 text-sm text-black/65">
                  Вел проект от лица компании как технический лидер.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 marker:text-[rgb(62,195,123)]">
                  <li>Собрал решение на стыке интерактивного приложения, видеообработки и AI-стилизации</li>
                  <li>Выстроил пайплайн обработки пользовательского видео в целевой визуальный стиль</li>
                  <li>Координировал реализацию с учетом требований заказчика, сроков, инфраструктуры и сопровождения на площадке</li>
                  <li>Закрыл проект от требований до демонстрации и эксплуатации</li>
                </ul>
              </article>

              <article className="mini-card">
                <h3 className="text-base font-semibold">Генератор 3D-моделей</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 marker:text-[rgb(62,195,123)]">
                  <li>Разрабатывал AI/backend-логику генерации 3D-контента на основе входных сцен и карт признаков</li>
                  <li>Интегрировал генеративную обработку в продуктовый пайплайн</li>
                  <li>Работал на стыке Python backend, AI pipeline и клиентского интерфейса</li>
                </ul>
              </article>
            </div>
          </>
        );
      case "adventarium":
        return (
          <>
            <h2 className="section-title">Adventarium</h2>
            <p className="section-text">
              <span className="font-semibold">Gen AI Developer</span>
              <br />
              Февраль 2025 — Август 2025
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Разрабатывал AI-продукт в формате Telegram и Discord-ботов для текстовой
              ролевой игры, где LLM выступает как интерактивный ведущий/мастер сюжета.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Основные задачи</h3>
                <p className="mt-2 text-sm text-black/65">
                  Проектирование AI-сценариев и логики взаимодействия пользователя с
                  системой.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 marker:text-[rgb(62,195,123)]">
                  <li>Использование Dify для сложных сценариев и orchestration</li>
                  <li>Разработка backend API на Python</li>
                  <li>Реализация логики лимитов, подписок и пользовательских ограничений</li>
                  <li>Проработка БД, интеграций и тестов для стабильного production-контура</li>
                </ul>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Результат</h3>
                <p className="mt-2 text-sm text-black/65">
                  Собран и выведен в рабочий контур AI-продукт, где пользователь может
                  задать сеттинг, создать персонажа и взаимодействовать с LLM как с
                  ведущим истории: система генерирует сюжет, поворотные точки, цели и
                  адаптирует развитие истории под действия игрока.
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
              <span className="font-semibold">Lead Gen AI Developer</span>
              <br />
              Февраль 2025 — Июнь 2025
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Участвовал в создании AI-инфраструктуры для fashion-направления:
              генерация консистентных цифровых моделей и автоматизация контентного
              пайплайна.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card">
                <h3 className="text-base font-semibold">Основные задачи</h3>
                <p className="mt-2 text-sm text-black/65">
                  Уточнил бизнес-требования совместно с владельцем продукта и командой.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70 marker:text-[rgb(62,195,123)]">
                  <li>Спроектировал технический подход и подготовил окружение для GPU-генерации</li>
                  <li>Собрал и настроил пайплайны для генерации лиц, персонажей, pose-based generation, face swap и обучения LoRA</li>
                  <li>Описывал документацию и структурировал подход к повторяемому использованию пайплайнов</li>
                </ul>
              </article>
              <article className="mini-card">
                <h3 className="text-base font-semibold">Результат</h3>
                <p className="mt-2 text-sm text-black/65">
                  Помог перевести создание AI-моделей из набора разрозненных
                  экспериментов в повторяемый процесс, пригодный для регулярного
                  производства контента.
                </p>
              </article>
            </div>
          </>
        );
      case "other":
        return (
          <>
            <h2 className="section-title">Другие проекты</h2>
            <p className="section-text">
              <span className="font-semibold">Unity Developer</span>
              <br />
              Май 2021 — Июнь 2023
            </p>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-black/70">
              Коммерческий опыт разработки на Unity до перехода в GenAI. Работал над
              игровыми и интерактивными проектами, включая gameplay systems,
              multiplayer, tools, интеграции, web/backend-связки и документацию. Этот
              бэкграунд сформировал сильное системное мышление, архитектурный подход и
              привычку работать с комплексными техническими пайплайнами.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="mini-card min-h-28">
                <h3 className="text-base font-semibold">Коммерческий бэкграунд</h3>
                <p className="mt-2 text-sm text-black/65">
                  Коммерческий бэкграунд в Unity/GameDev: gameplay, systems design,
                  backend-интеграции, tools, multiplayer, документация.
                </p>
              </article>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="relative z-10 flex w-full flex-col px-2 pb-16 pt-3 md:px-4 md:pt-4">
      <div className="motion-bg" aria-hidden="true">
        <span className="mg-orb orb-1" />
        <span className="mg-orb orb-2" />
        <span className="mg-orb orb-3" />
        <span className="mg-grid" />
      </div>

      <div className="matched-active-width">
        <header className="hero-header reveal in-view relative mb-4 grid items-center gap-3 rounded-3xl p-3 md:grid-cols-[1.45fr_auto] md:p-4">
          <div>
            <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              Марат Газизулин
              <span className="block text-[rgb(62,195,123)]">Gen AI Developer</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/70">
              Строю AI-продукты от идеи до прода: GenAI, LLM, full-stack, DevOps.
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
      </div>

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
