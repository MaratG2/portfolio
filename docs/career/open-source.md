# Independent open-source proposals

Research snapshot: 17 September 2026. These are future, independent projects, not descriptions of current employment. Use synthetic or public data and original code.

No search can establish that an idea is completely nonexistent. Stars cannot be promised; usefulness, documentation and ongoing maintenance matter more than novelty claims.

## 1. Research Report Guard

A local validator that checks numerical claims against structured source tables. Accept CSV data and a JSON claim manifest; recalculate declared values and report mismatches in denominators, filters, units and rounding.

Start with a narrow CLI, synthetic fixtures, clear unsupported cases and machine-readable findings. A generator must provide the manifest: the MVP does not infer every intended meaning from an arbitrary slide deck.

Related work: [PPTAgent](https://github.com/icip-cas/PPTAgent), [Presenton](https://github.com/presenton/presenton), [paper2ppt](https://github.com/celestial-micha/paper2ppt), [pptx-compiler](https://github.com/why7682/pptx-compiler). Validate the proposed numerical-checking distinction against their current features before building.

## 2. Survey Spec Check

An independent checker for a public questionnaire definition format. Given explicit requirements and routing rules, identify unreachable questions and inconsistent branches, with reproducible counterexamples.

Begin with a small JSON schema, deterministic checks and synthetic examples. Compare with [Siamang](https://github.com/Siamang-Labs/siamang). Avoid proprietary formats and internal implementation assumptions.

## 3. Codebook Regression Lab

A regression tool for classification workflows. Compare codebook and model versions on a frozen public or synthetic dataset; explain label changes, per-class errors and cases needing review.

Start with dataset versioning, simple baselines, evaluation and a readable change report. Compare with [LLMCode](https://github.com/PerttuHamalainen/LLMCode); generic coding and reliability analysis already exist.

## Recommended sequence

Choose the first project only after speaking with potential users. Publish a reproducible example that catches a real class of error, then add an integration users request. Use the working component to demonstrate system design and evaluation.

Build community through helpful issues, upstream contributions, good examples and responsive maintenance. Do not buy stars or promise an adoption target. These working names have not been checked for availability.

