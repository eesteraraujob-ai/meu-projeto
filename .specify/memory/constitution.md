<!--
Sync Impact Report:
- Version change: 0.0.0 -> 1.0.0
- Modified principles: N/A -> I. Keep It Small and Simple; II. Prefer Readability Over Cleverness; III. Minimal Validation, No Automated Test Requirement; IV. Direct, Defensive, and Obvious Changes; V. Simplicity in Design and Delivery
- Added sections: Additional Constraints; Development Workflow
- Removed sections: none
- Deferred items: TODO(RATIFICATION_DATE): original adoption date is not yet defined.
-->

# Todo Constitution

## Core Principles

### I. Keep It Small and Simple
The project MUST remain intentionally small: one clear purpose, few moving parts, and no speculative abstraction. Features MUST be added only when they directly solve the current need. Complexity MUST be justified by a concrete requirement; otherwise, it MUST be removed.

This is non-negotiable because small systems are easier to reason about, maintain, and evolve without hidden cost.

### II. Prefer Readability Over Cleverness
Code MUST read like plain language. Names MUST describe intent, functions MUST do one job, and control flow MUST stay direct. The team MUST avoid clever tricks, hidden magic, and over-engineering; if a solution feels surprising, it is not accepted without clear justification.

Readable code reduces defects and makes everyday change safe in a small project.

### III. Minimal Validation, No Automated Test Requirement
This project MUST NOT require automated tests as a gate for change. Validation MUST happen through direct checks, manual verification, and simple code review that confirms behavior and readability. When a change cannot be validated by inspection or a focused manual run, the change MUST be simplified or split into smaller steps.

This project is intentionally small; a heavy automated test suite would create unnecessary process and maintenance cost.

### IV. Direct, Defensive, and Obvious Changes
Each change MUST be easy to follow. Guard clauses, clear conditions, and small functions MUST be favored over deep nesting or hidden state. Code MUST fail clearly when invalid input or inconsistent state appears; silent failure is forbidden.

Explicit behavior reduces ambiguity and keeps maintenance costs low.

### V. Simplicity in Design and Delivery
The project MUST favor straightforward structures, explicit dependencies, and minimal configuration. New libraries, frameworks, or tooling MUST only be introduced when the current approach is clearly insufficient. The default answer is the simplest working solution.

This reduces setup overhead and keeps the project sustainable for a small team or single contributor.

## Additional Constraints
- The project MUST stay focused on a single user-facing outcome.
- Documentation MUST be brief, practical, and close to the code it explains.
- No optional complexity, premature optimization, or speculative features.
- The codebase MUST avoid duplication by consolidating repeated logic into a single clear place.
- Any change that adds complexity MUST include a brief explanation of why the simpler option was rejected.

## Development Workflow
Changes MUST be small, reviewable, and easy to validate manually. The team MUST prefer incremental updates over large rewrites. Before a feature is considered complete, the code MUST be readable, its purpose MUST be obvious, and the result MUST be verifiable through a focused run or direct inspection.

No automated test suite is required for this project. Manual validation and clear code review are the default quality gates.

## Governance
This Constitution defines the non-negotiable rules for all changes in this project. Any departure from these principles MUST be documented, justified, and reviewed before merge or release. Governance is based on code clarity, not on formal process for its own sake.

Amendments MUST be made in the project constitution, with the reason for the change recorded in the version history. A change is considered valid only when it preserves the project’s small-scope, clean-code, low-overhead intent. Compliance review MUST confirm that the code remains simple, readable, and consistent with these rules.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date is not yet defined. | **Last Amended**: 2026-08-22
