# Tasks: Task Manager

**Input**: Design documents from `/specs/001-task-manager/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Not included because no automated tests were requested for this version.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and app structure for the Expo mobile app

- [x] T001 Create Expo app structure and package layout for the task manager
- [x] T002 Initialize TypeScript configuration and app entry files in app/ and package metadata
- [x] T003 [P] Configure Expo Router and the root navigation shell in app/_layout.tsx
- [x] T004 [P] Add app-level constants and shared task types in types/task.ts and constants/*.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data access and shared behavior required before story work can begin

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Create SQLite database bootstrap and schema initialization in db/index.ts
- [x] T006 Implement task repository functions for create, read, update, and delete operations in db/tasks.ts
- [x] T007 [P] Add shared date and formatting utilities in lib/date.ts and lib/format.ts
- [x] T008 [P] Implement task priority and status constants in constants/priorities.ts and constants/statuses.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Manage daily tasks (Priority: P1) 🎯 MVP

**Goal**: Allow the user to create, view, and update daily tasks with core fields and statuses.

**Independent Test**: Create a task, edit it, and confirm it appears in the list with the expected title, date, priority, and status.

### Implementation for User Story 1

- [x] T009 [P] [US1] Build the task form UI and validation flow in components/TaskForm.tsx
- [x] T010 [P] [US1] Build the task list display and per-task card view in components/TaskList.tsx and components/TaskCard.tsx
- [x] T011 [US1] Implement task creation and editing flow from app/index.tsx and app/task/[id].tsx
- [x] T012 [US1] Connect the form and list screens to the SQLite repository for create, read, and update operations
- [x] T013 [US1] Implement status transitions for pending, in progress, and completed task states
- [x] T014 [US1] Add direct task validation for required title and valid field values

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Filter and organize tasks by priority, status, or date (Priority: P2)

**Goal**: Help the user focus on the tasks that matter most using filters by priority, status, and date.

**Independent Test**: Apply a priority, status, or date filter and confirm the visible list matches only the selected subset.

### Implementation for User Story 2

- [x] T015 [P] [US2] Build the filter controls UI in components/FilterBar.tsx
- [x] T016 [US2] Implement filter state handling and list filtering logic for priority, status, and date
- [x] T017 [US2] Connect filtered results to the task list rendering and empty-state behavior
- [x] T018 [US2] Add date-based sorting and filtered view boundaries in the task query flow

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - Track progress across the day (Priority: P3)

**Goal**: Keep the user aware of what is pending, what is running, and what has been completed.

**Independent Test**: Change a task status across the allowed states and confirm the list reflects the updated progress accurately.

### Implementation for User Story 3

- [x] T019 [P] [US3] Add status summary and progress affordances in the main task screen
- [x] T020 [US3] Implement task state transitions and update timestamps in the database layer
- [x] T021 [US3] Review task detail display to ensure completion state and metadata remain readable

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup and quality pass across the complete feature

- [x] T022 [P] Review all screens and components for small-scope readability and consistent naming
- [x] T023 [P] Clean up duplicate logic and reduce unnecessary complexity across the task flow
- [x] T024 Verify app behavior against the quickstart scenarios in specs/001-task-manager/quickstart.md
- [x] T025 Ensure the app remains aligned with the project constitution: small scope, clean code, and no automated test requirement

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 - no dependencies on other stories
- **User Story 2 (P2)**: Can start after Phase 2 - independent of User Story 1 at the API/data layer
- **User Story 3 (P3)**: Can start after Phase 2 - independent of the other stories at the screen level

### Parallel Opportunities

- T003 and T004 can run in parallel during setup
- T007 and T008 can run in parallel during foundational setup
- T009 and T010 can run in parallel within User Story 1
- T015 can run in parallel with T019 during story work, if the team is splitting UI tasks
- Multiple story tasks can be worked in parallel once the foundation is complete

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the core task creation and editing flow manually
5. Stop and confirm the app provides real value before adding filters or progress refinements

### Incremental Delivery

1. Setup + Foundation -> app is ready for data and navigation
2. Add User Story 1 -> MVP task manager with task creation and updates
3. Add User Story 2 -> filtered task views for daily prioritization
4. Add User Story 3 -> clear progress tracking and completion visibility
5. Finish with cross-cutting polish and validation

### Parallel Team Strategy

With multiple developers:

1. One developer handles infrastructure and database setup
2. One developer handles the core task form and list UI
3. One developer handles filtering and status/progress improvements
4. Final pass is shared for polish and validation

---

## Notes

- [P] tasks = different files, no dependency coupling
- [Story] label maps tasks to a user story for traceability
- Each story remains independently completable and testable by manual validation
- Keep scope small and avoid features like notifications, sync, or collaborative flows unless explicitly added later
- Favor straightforward, readable code and direct SQLite queries over abstraction layers
