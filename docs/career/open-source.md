# Working plan: reusable website assistant

The selected project is a reusable assistant for public website knowledge, with the portfolio as its first installation. This replaces the earlier shortlist. This is a development plan, separate from the résumé and profile copy.

## Value

Help a visitor find supported answers, inspect the sources and reach the right next step. Make authorship visible through a small “Built by Marat” link to the implementation and completed engineering case studies.

A second installation for a fictional company will demonstrate larger knowledge collections and tool access using synthetic records. Build the widget as a separate repository; the portfolio consumes it as an integration.

## Decisions to demonstrate

1. **Knowledge access:** compare full context and simple retrieval first. Add hybrid retrieval/reranking only if it improves the measured task. A short résumé alone does not require a retrieval system.
2. **Control flow:** compare one bounded tool-using agent with a staged workflow. Add multiple agents when coordination improves measured results enough to justify complexity.
3. **Quality:** use versioned development and held-out datasets, deterministic checks and human-calibrated model judgments. Report citation correctness, abstention, task completion, failures, latency and cost.
4. **Trust boundaries:** treat retrieved text as data. Enforce access control outside model prompts. Validate tool arguments and require explicit confirmation for consequential actions. Begin with read-only tools.
5. **Operation:** include timeouts, bounded retries, rate limits, traces, cost limits and a clear failure state.

## First release

- A simple embeddable widget with accessible keyboard navigation and streaming responses.
- An API serving answers from an approved public knowledge set, with source citations and an honest fallback when evidence is insufficient.
- A reproducible baseline comparison, evaluation dataset, execution command and error analysis.
- One completed architecture decision record linking requirements, alternatives, measurements and implementation.
- A documented local installation, synthetic example, license and contribution guide.

Keep scope narrow enough for an independent user to install and evaluate it. Record measurements with model/config versions and sample sizes. Do not claim injection-proof behavior from passing a finite test suite.

## Building attention

Start with a reproducible example that helps another developer. Explain one measured tradeoff in each technical write-up, invite installation feedback, and fix the friction users encounter. Add integrations in response to real requests. Stars are a possible consequence of usefulness, not a release criterion.

Use only original code and public or synthetic data. Publish completed case studies when their implementation and results are available.
