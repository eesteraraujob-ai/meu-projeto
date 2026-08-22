# Feature Specification: Task Manager

**Feature Branch**: `001-task-manager`

**Created**: 2026-08-22

**Status**: Draft

**Input**: User description: "Construa uma aplicação que me ajude a gerenciar minhas tarefas para acompanhar atividades do dia a dia. As tarefas devem ter título, descrição, data de conclusão, prioridades e status (pendende, em andamento e concluída). Inclua filtros para visualizar tarefas por prioridade, status ou data."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage daily tasks (Priority: P1)

A user wants a simple way to record the tasks they need to complete during the day and keep track of what still needs attention.

**Why this priority**: This is the core value of the feature. Without a reliable task list, the user cannot organize daily activities or track completion.

**Independent Test**: A user can create, view, and update a task from a single task list and immediately see the task state change after each action.

**Acceptance Scenarios**:

1. **Given** the user has opened the task manager, **When** they create a task with a title, description, due date, priority, and status, **Then** the task appears in the list with the entered values preserved.
2. **Given** a task already exists in the list, **When** the user edits the task details, **Then** the updated information is saved and shown in the task list.
3. **Given** a task is marked as completed, **When** the user views the list, **Then** the task is shown with its completed state and remains identifiable as completed.

---

### User Story 2 - Filter and organize tasks by priority, status, or date (Priority: P2)

A user wants to focus on the most relevant items by narrowing the list according to urgency, completion state, or expected due date.

**Why this priority**: Filtering reduces overload and helps the user prioritize what matters most in a day-to-day workflow.

**Independent Test**: A user can select a filter and immediately see a reduced, relevant set of tasks matching the chosen criteria.

**Acceptance Scenarios**:

1. **Given** multiple tasks exist with different priorities, **When** the user filters by a selected priority, **Then** only tasks matching that priority are shown.
2. **Given** multiple tasks exist with different statuses, **When** the user filters by status, **Then** only tasks in that status are displayed.
3. **Given** tasks have different completion dates, **When** the user filters by date, **Then** the list shows only tasks matching the selected date scope.

---

### User Story 3 - Track progress across the day (Priority: P3)

A user wants to move tasks from pending to in progress to completed so they can understand what has been done and what remains.

**Why this priority**: Progress tracking supports accountability and helps the user maintain momentum during daily activities.

**Independent Test**: A user can change a task status and the visible task state changes accordingly without affecting unrelated tasks.

**Acceptance Scenarios**:

1. **Given** a task is pending, **When** the user marks it as in progress, **Then** the task status updates to in progress.
2. **Given** a task is in progress, **When** the user marks it as completed, **Then** the task status changes to completed and the task remains available for review.

---

### Edge Cases

- What happens when a user tries to save a task without a title?
- How does the system handle tasks with a due date in the past?
- What happens when a user applies multiple filters at the same time?
- How does the system behave when a task is edited after it has already been marked completed?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow users to create a task with a title, description, completion date, priority, and status.
- **FR-002**: The system MUST require a task title before a task can be saved.
- **FR-003**: The system MUST allow users to view all existing tasks in a single list.
- **FR-004**: The system MUST allow users to edit an existing task after it has been created.
- **FR-005**: The system MUST allow users to change a task status between pending, in progress, and completed.
- **FR-006**: The system MUST support task priorities for daily organization.
- **FR-007**: The system MUST allow users to filter the task list by priority, status, or date.
- **FR-008**: The system MUST display tasks clearly enough for the user to identify urgency, completion state, and due date.
- **FR-009**: The system MUST keep task information updated after any create, edit, or status change.
- **FR-010**: The system MUST support review of tasks that are pending, in progress, or completed without losing task details.

### Key Entities *(include if feature involves data)*

- **Task**: Represents a unit of work the user needs to complete. It includes a title, description, completion date, priority, and status.
- **User**: Represents the person managing daily activities and interacting with the task list.
- **Task Filter**: Represents a view that narrows tasks according to selected priority, status, or date criteria.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create and update a task in under 2 minutes without needing guidance.
- **SC-002**: Users can filter tasks by priority, status, or date and identify the relevant set within 10 seconds after selecting a filter.
- **SC-003**: At least 90% of tasks are correctly displayed with their intended status and priority after user actions.
- **SC-004**: Users can tell which tasks are pending, in progress, or completed at a glance from the main task list.
- **SC-005**: The task list supports daily planning for a recurring workflow without adding unnecessary friction or confusion.

## Assumptions

- The primary user is a single individual managing personal daily activities.
- The feature is intended for a lightweight task manager rather than a collaborative team tool.
- Task data is expected to be kept in a simple, local, and easy-to-understand structure.
- The initial release focuses on core task tracking and filtering rather than notifications, reminders, or integrations.
- The project remains intentionally small and simple, in line with the governing constitution.
