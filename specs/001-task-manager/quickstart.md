# Quickstart

## Prerequisites

- Node.js installed
- Expo Go installed on a mobile device or emulator
- A local development environment capable of running Expo projects

## Setup

1. Install project dependencies with the package manager of your choice.
2. Start the Expo development server.
3. Launch the app using Expo Go or a simulator.

## Validation scenarios

1. Create a task with title, description, date, priority, and status.
2. Confirm that the task appears in the list with the correct fields.
3. Change the task status from pending to in progress and then to completed.
4. Apply a filter by priority and verify only matching tasks remain visible.
5. Apply a filter by status and verify only matching tasks remain visible.
6. Apply a filter by date and verify only tasks for the chosen date are displayed.
7. Edit an existing task and confirm the updated values are reflected immediately.

## Expected outcomes

- Tasks are stored locally and remain available after reopening the app.
- The task list is easy to read and supports quick daily tracking.
- Filters improve visibility without introducing complexity.
- Manual verification confirms the feature works end-to-end without automated tests.
