# TechTree Studies

**Learn the concepts. Practise the questions. Track your progress.**

TechTree Studies is a web-based platform for people preparing for
cybersecurity certification exams. It brings study notes, practice
exams, exam history, and personal study activity together in one place,
so learners can spend less time managing resources and more time
preparing.

The project currently focuses on CompTIA Security+ preparation, with a
structure that can support additional certification paths over time.

------------------------------------------------------------------------

## Contents

-   [What the platform offers](#what-the-platform-offers)
-   [How it works](#how-it-works)
-   [Technology](#technology)
-   [Project structure](#project-structure)
-   [Run it locally](#run-it-locally)
-   [Available commands](#available-commands)
-   [Data and storage](#data-and-storage)
-   [Current scope](#current-scope)
-   [Ideas for future development](#ideas-for-future-development)

------------------------------------------------------------------------

## What the platform offers

### Dashboard

A central view of study activity and exam performance, including score
summaries, recent attempts, certification progress, and a calendar view.

### Study notes

Study material is organised by domain and module. Learners can search
for topics, filter the available notes, open a summary card, and read
the full note.

### Practice exams

An interactive exam experience lets learners answer multiple-choice
questions and review their results. Scores and answer feedback help
identify topics that may need more attention.

### Progress and exam history

Learners can review previous attempts and use their results to see how
their preparation is developing.

### Personal profile

Users can customise their displayed name and avatar. Profile preferences
and study streak information are stored in the browser.

### Responsive interface

The layout adapts to different screen sizes, with a mobile navigation
drawer and a full sidebar on larger screens. Keyboard navigation and
focus handling are part of the interface considerations.

------------------------------------------------------------------------

## How it works

At a high level, the application is a Next.js frontend with a small API
route for retrieving individual study notes. Much of the learning
content is imported from local TypeScript data, while profile settings
and study streak information are kept in the browser's `localStorage`.

``` text
┌───────────────────────────────┐
│          Web browser          │
│                               │
│  Next.js / React interface    │
│  ├─ Dashboard                 │
│  ├─ Study notes               │
│  ├─ Practice exams             │
│  ├─ Exam attempts              │
│  └─ Profile                    │
│                               │
│  Browser localStorage         │
│  ├─ Profile settings          │
│  └─ Study streak               │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Next.js API route       │
│                               │
│  GET /api/study-notes/[id]    │
│  Returns a selected study note│
└───────────────────────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Local content data      │
│  Study notes and app assets   │
│  imported from TypeScript     │
└───────────────────────────────┘
```

### Typical learner journey

1.  Open the application and view the dashboard.
2.  Choose a topic from Study Notes and use search or filters to find
    relevant material.
3.  Review the material, then test your understanding with a practice
    exam.
4.  Check the result and review the answers.
5.  Return to the dashboard or Attempts page to review your study
    activity.

The exact information retained between sessions depends on the data
source. Profile settings and streak data use browser storage; the
project does not currently describe a central database for synchronising
a learner's progress between devices.

------------------------------------------------------------------------

## Technology

  Area                       Tools
  -------------------------- ------------------------
  Framework                  Next.js 16.4.0
  UI library                 React 19.3.0
  Language                   TypeScript 5
  Styling                    Tailwind CSS 4
  Icons                      Lucide React
  Notifications              Sonner
  Linting                    ESLint 9
  Build and development      Next.js with Turbopack
  Browser-side persistence   `localStorage`

> These versions reflect the project details documented for this
> repository. Check `package.json` if you need to confirm the versions
> installed in your current checkout.

------------------------------------------------------------------------

## Project structure

The main application lives in `frontend/`.

``` text
frontend/
├── app/
│   ├── api/
│   │   └── study-notes/
│   │       └── [id]/
│   │           └── route.ts        # API endpoint for an individual note
│   ├── components/
│   │   ├── Calendar.tsx            # Study activity calendar
│   │   ├── Sidebar.tsx              # Responsive navigation
│   │   ├── StudyNoteCard.tsx        # Study note preview
│   │   └── StudyNotesFilter.tsx     # Domain and module filters
│   ├── dashboard/
│   │   ├── page.tsx                 # Main dashboard
│   │   └── calendar/
│   │       └── page.tsx             # Calendar page
│   ├── study-notes/
│   │   ├── page.tsx                 # Study notes listing and search
│   │   ├── [id]/
│   │   │   └── page.tsx             # Individual study note
│   │   └── notes/
│   │       └── page.tsx             # Note creation or editing
│   ├── practice-exam/
│   │   └── page.tsx                 # Practice exam interface
│   ├── attempts/
│   │   └── page.tsx                 # Past exam attempts
│   ├── pricing-billing/
│   │   └── page.tsx                 # Billing page
│   ├── profile/
│   │   └── page.tsx                 # Profile settings
│   ├── providers/
│   │   └── ToasterProvider.tsx      # Sonner notification provider
│   ├── types/
│   │   └── assets.ts                # Static content and TypeScript types
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   └── favicon.ico
├── lib/
│   ├── storage.ts                   # Browser storage and streak helpers
│   └── dates.ts                     # Date utilities
├── public/
│   ├── logo.png
│   ├── TechTree Studies Network Logo.png
│   ├── Magenta Purple Circuit Tree.png
│   └── user.png
├── package.json
├── tsconfig.json
├── next.config.ts
└── .eslintrc.json
```

File names and folders may change as the project develops. Use the
actual repository contents as the source of truth if your checkout
differs from this outline.

------------------------------------------------------------------------

## Run it locally

### Requirements

-   Node.js 18 or later
-   npm (or another package manager supported by the project)
-   A modern web browser

### 1. Open the frontend folder

``` bash
cd frontend
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 4. Create a production build

When you're ready to check the production build:

``` bash
npm run build
npm start
```

The production server uses the start script configured in
`package.json`.

------------------------------------------------------------------------

## Available commands

Run these commands from the `frontend/` directory.

  Command           Purpose
  ----------------- -------------------------------------
  `npm run dev`     Starts the local development server
  `npm run build`   Creates a production build
  `npm start`       Starts the production server
  `npm run lint`    Runs ESLint

If a command is unavailable, check the scripts section of
`package.json`.

------------------------------------------------------------------------

## Data and storage

### Study content

Study notes and related static content are imported from
`app/types/assets.ts`. The study notes API route at
`/api/study-notes/[id]` provides the detail for a selected note. Search
and filtering are performed in the frontend.

### Browser storage

The current implementation uses `localStorage` for profile preferences
and study streak information. This keeps those values available in the
same browser between visits, but it is not a replacement for server-side
account storage.

A few things to keep in mind:

-   Clearing browser data can remove locally stored settings.
-   Local data is not automatically shared between browsers or devices.
-   A central database and account system would be needed for reliable
    cross-device progress synchronisation.

Avoid storing passwords, access tokens, or other sensitive information
in `localStorage`.

------------------------------------------------------------------------

## Current scope

TechTree Studies currently brings together the main parts of a
certification study routine: learning material, exam practice, results,
and personal activity.

The documented project structure includes dashboard, study notes,
practice exams, attempts, profile, calendar, and pricing/billing pages.
Features that depend on a backend database, account authentication, or
server-side progress storage should be considered separate work unless
they have been implemented elsewhere in the codebase.

------------------------------------------------------------------------

## Ideas for future development

Potential next steps include:

-   **Accounts and authentication:** let learners sign in and access
    their profile securely.
-   **Persistent progress:** store exam attempts and study activity in a
    database.
-   **More certification paths:** organise content for additional
    certifications alongside Security+.
-   **Spaced repetition:** bring important concepts back at useful
    intervals.
-   **Adaptive practice:** recommend topics and question difficulty
    based on previous results.
-   **Deeper performance insights:** show progress by domain, strengths,
    and areas to revisit.
-   **Study groups:** support shared revision and peer discussion.
-   **Mobile experience:** explore a dedicated mobile app if there is a
    clear need.

These are possible improvements, not claims about features already
available.

------------------------------------------------------------------------

## About

**TechTree Studies** is built around a simple idea: make it easier to
keep study material, practice, and progress in one place.

Learn a topic. Test what you know. Use the results to decide what to
study next.
