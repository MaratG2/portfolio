# Working analysis: ML Engineer positioning

20 September 2026. Analysis of the user-supplied **MWS AI HR Guidebook (2026), 85 pages**, updated with Marat's subsequent details about Artillect and Adventarium. Page references below are the PDF's numbered pages. The source document and extracted pages are not included in this repository.

## Conclusion

The earlier recommendation was directionally correct: position Marat as an **ML Engineer building applied AI systems**, with agents, business process automation and system design at the center. Make evaluation more visible. Keep LLM application engineering as an explicit technical capability, without reducing the professional identity to prompt writing or one model family.

The stronger organizing principle is:

> Translate a business problem into a bounded system, compare credible alternatives, test the important assumptions, deliver the implementation, and use evidence to decide what to improve or stop.

This is a positioning and development direction, not a claim that every part has already been demonstrated publicly.

## What the guide actually says

- **Page 14: ML Engineer role.** The three areas are LLM application engineering, agents/RAG and evaluation-driven development. The role connects a business problem, a working prototype, validation on real data and iterative delivery into production. The requirements also include Python, retrieval, observability and backend infrastructure. The page asks for 3+ years of applied AI/ML work with an NLP/LLM focus.
- **Page 23: competency matrix.** Eight dimensions: LLM engineering, AI agents, RAG, ML/NLP, evaluation, Python backend, MLOps and system design. The four levels are Basic, Good, Strong and Expert. Architecture is already part of ML Engineer; it is not reserved for AI Architect.
- **Pages 13 and 22: AI Architect.** The separate role extends into platform-wide architecture, inference infrastructure, security, standards and cross-team responsibilities. These are useful growth directions, not an automatic new title.
- **Pages 30–32: how to use the matrix.** The guide explicitly requires adaptation to company context. Strength in key competencies matters more than uniform scores. Its competency levels are not a universal Junior/Middle/Senior translation.
- **Page 66: screening.** Emphasis on delivered work, evaluation discipline, business outcomes and external artifacts. It challenges unsupported technology lists and asks candidates to discuss failures and decisions.
- **Page 73: interviews.** The tradeoff discussion matters: alternatives considered, speed and cost, and the reasoning behind decisions. This interview concerns senior leadership screening; we borrow the evidence format, not its role requirements.
- **Page 75: engineering judgment.** Experiments, engineering fundamentals, comparison of tools and communication are emphasized together.
- **Pages 61, 67 and 74: prototype versus operation.** Discovery is judged through learning and experiment economics; deployed services add reliability, quality, adoption and cost per task. A working demonstration is not evidence of a production SLA.

The role profile and matrix were visually inspected, including the table columns. Text extraction from this PDF is irregular and would otherwise misplace some Good-level MLOps and system-design entries.

## Critique of the earlier interpretation

1. **Keep its three-pillar reading.** It correctly identifies the ML Engineer profile on page 14.
2. **Do not make architecture a substitute for delivery.** A diagram and a comparison table become persuasive when linked to an implementation and an experiment, including unsuccessful choices.
3. **Do not borrow the AI Architect title to imply seniority.** Use ML Engineer, retain actual Lead/CTO progression, and show ownership through specific evidence.
4. **Do not translate every named tool into a résumé skill.** Kafka, Kubernetes, vLLM, LangGraph and RAGAS in a guide are requirements or examples, not evidence that Marat used them.
5. **Do not equate visual LoRA work with NLP fine-tuning.** The existing generative-media experience is valuable, but does not establish BERT fine-tuning, QLoRA, DPO, distillation or LLM serving.
6. **Keep the chronology accurate.** The supplied AI roles begin in January 2024. As of September 2026, that does not establish three full years of applied AI/NLP experience. Earlier C#/Unity experience remains relevant software engineering experience; overlapping project roles do not add elapsed years.
7. **Treat the guide as a useful employer-side lens, not a universal hiring standard.** Its methodology combines market material, internal hiring analysis and expert interviews (page 5). Interview predictions and strong market statements are not independently validated here. We are not deriving salary promises or an automatic grade from them.

## Evidence map

“Confirmed” below means supported by Marat's supplied history, not independently audited employment evidence. Missing public evidence does not mean missing ability. No overall grade is assigned.

| Competency | Guide progression, paraphrased from p. 23 | Available evidence | Public positioning / next evidence |
|---|---|---|---|
| LLM engineering | API use → versioned chains and cost control → integrated retrieval/tooling and monitoring → shared enterprise infrastructure | Artillect model integration and RAG; multiple Dify workflows with different prompts/models and memory | State LLM applications and integration with concrete examples. Demonstrate prompt/config versioning and model comparisons publicly. |
| Agents | Basic tool use → planning/history/debugging → coordinated agents and failure tolerance → organization-wide framework | Adventarium: multiple workflows, over 100 nodes in total, models, prompts, knowledge/memory, tracing and monitoring | State multi-stage agent workflows. Node count establishes scope, not superiority. Do not infer autonomous multi-agent hierarchies or fault tolerance. |
| RAG | Basic retrieval → hybrid search/reranking/evaluation → multi-hop/conflicts/monitoring → shared platform ownership | RAG for generating prompts by selected type in Artillect, explicitly confirmed by Marat | State the use case. Hybrid search, reranking, permission-aware retrieval and evaluation methods remain unspecified. |
| ML/NLP | Pretrained models → domain adaptation → distillation/quantization/reproduction → original architectures and research direction | Generative-media pipelines and visual LoRA training | Keep the visual domain explicit. NLP training and inference optimization are development targets. |
| AI evaluation | Metrics/manual review → datasets and automated evaluation → continuous evaluation/business measures → shared standards | Automated dataset-based answer evaluation in Adventarium; tracing/monitoring; Langfuse experience also explicitly confirmed | State automated evaluation and observability. CI quality gates, A/B tests, sample sizes, measured gains and judge calibration are outside the current evidence set. Publish an independent reproducible suite. |
| Python backend | API/containers → tested production services → distributed scale → platform standards | Python APIs, tests, MySQL, platform backend and infrastructure | Show services, tests and integration. Do not imply high-load Kubernetes/Kafka experience from API development. |
| MLOps | Containerized serving → serving stack/registry/monitoring → autoscaling/drift → platform reliability | Artillect: company-hosted ComfyUI GPU execution, external fal.ai APIs, task distribution and render workers; Docker and GPU environments | Describe the actual execution architecture. vLLM, registries, autoscaling, drift detection and SLA ownership are development targets. |
| System design | Components → workload-aware service design → end-to-end tradeoffs and observability → architectural strategy | Requirements, architecture, full-cycle platform ownership and technical leadership | Lead with system design. Publish alternatives and validation for the independent assistant; enterprise standards remain unclaimed. |

## What changed in the public materials

- **Website and CV:** the same factual introduction, clearer system-design and LLM/agent/RAG competencies, automated evaluation, observability and backend delivery. Generative media stays as a differentiated specialization.
- **Website:** a new Engineering approach section connected to delivered Artillect and Adventarium work. Future assistant work is kept in the separate development plan.
- **HH and LinkedIn:** retain concrete employment details, emphasize requirements-to-deployment ownership, add Artillect's execution/RAG architecture and Adventarium's workflows/evaluation, and mark the confirmed part-time project engagements.
- **GitHub:** concise ownership and engineering focus, no mixed toolkit catalogue. Links to the existing portfolio; no future assistant claims.
- **Current employer:** only the previously approved experience sentence. The guide does not override confidentiality.

## One public project to close the most important gaps

The chosen direction remains the reusable website assistant, with the portfolio as its first installation and a fictional-company example using synthetic data. This supersedes the earlier report-tool shortlist.

### First decision: knowledge access

Compare full approved-profile context, simple retrieval and hybrid retrieval plus reranking. A small résumé may not need retrieval. Test the retrieval alternatives on a separate larger public/synthetic corpus, including conflicting versions and unanswerable questions. Do not make the small portfolio artificially complex to obtain a RAG label.

### Second decision: workflow and tools

Compare one bounded tool-using agent with an explicit staged workflow. Measure task completion, invalid actions, retries and latency. Introduce multiple agents only when an experiment justifies the coordination cost. Enforce authentication and authorization in the application, independently of generated text.

### Third decision: evaluation and operation

Create development and held-out evaluation sets. Record retrieval recall/ranking measures, citation correctness, abstention, task completion, false refusals and unauthorized actions. Track p50/p95 latency and cost per completed task. Keep deterministic assertions separate from model-graded judgments; calibrate the latter against human labels. Report sample sizes, versions and failures. Avoid claiming general security from a small attack suite.

### Delivery sequence

1. Design brief, alternatives and a simple baseline.
2. Labelled public/synthetic questions and expected evidence.
3. Small working portfolio assistant with visible authorship and citations.
4. Reproducible comparisons and failure analysis; publish the first completed decision record.
5. Fictional-company example with authenticated synthetic records and one confirmed action.
6. Regression checks, operational traces and cost/latency reports.

## Interview preparation

Prepare one public example for each of these questions:

- What did you personally own and deliver, and what belonged to product or other engineers?
- Which alternative did you reject, and on what evidence?
- How did you know the result was correct enough for the task?
- What failed, how did you diagnose it, and what changed afterward?
- What became more expensive or slower as the workload grew?
- When would you revisit the architecture?

The new details substantially strengthen the case for the guide's applied ML Engineer profile. Automated dataset evaluation is more specific than basic manual checking, and end-to-end platform work supports the system-design emphasis. The evidence does not justify mechanically assigning Good/Strong across complete rows: each row also contains requirements that need their own examples.

The next step toward stronger Senior-level evidence is publicly demonstrated judgment under constraints, reproducible evaluation and ownership through operation. A guide-aligned headline alone cannot establish that level.
