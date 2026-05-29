# Student Survival Hub

Student Survival Hub is a React-powered personal dashboard for students who want to manage assignments, calendar events, budget tracking, habits, notes, and wellness in one place.

## Features

- **Dashboard overview** with quick daily highlights, pending assignment count, balance summary, habits snapshot, and wellness score.
- **Assignments manager** with create, status update, filter, and delete actions.
- **Calendar & schedule** support for event planning and quick daily glimpses.
- **Budget tracker** for income and expense entries.
- **Notes & resources** hub for study notes and useful link collection.
- **Habit tracker** for progress, goals, and streaks.
- **Wellness logging** for mood, energy, sleep, hydration, and notes.
- **Local storage persistence** keeps app data saved between browser sessions.
- **Responsive layout** with a sidebar and animated page transitions.

## Tech Stack

- React 
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- React Icons

## Folder Structure

- `src/`
  - `App.jsx` — root router and layout.
  - `context/StudentHubContext.jsx` — app state, local storage sync, and actions.
  - `pages/` — main page views for dashboard, assignments, calendar, budget, notes, habits, wellness, and settings.
  - `components/` — reusable dashboard UI pieces, sidebar, navbar, cards.
  - `styles/` — app-specific CSS.

## Getting Started

### Prerequisites

- Node.js 20+ or a compatible version installed
- npm or yarn available in your terminal

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local Vite server URL shown in the terminal to view the app.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Notes

- The app uses browser local storage to persist data.
- Example seed data is included for assignments, events, budgets, notes, habits, wellness logs, and profile information.
- Customize the UI and behavior by editing `src/context/StudentHubContext.jsx` and the page components in `src/pages/`.

## License

This project is currently set up as a private application in `package.json`.
