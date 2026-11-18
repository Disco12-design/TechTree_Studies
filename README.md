# TechTree Studies

A comprehensive cybersecurity study and exam preparation platform designed to help learners master CompTIA Security+ and other cybersecurity certifications through interactive study materials, practice exams, and progress tracking.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Application Workflow](#application-workflow)

## Overview

TechTree Studies is a web-based learning platform tailored for cybersecurity certification exam preparation. It combines:

- **Study Materials**: Organized notes and resources across multiple cybersecurity domains
- **Practice Exams**: Interactive exam simulations with scoring and analytics
- **Progress Tracking**: Dashboard analytics including exam attempts, scores, and pass rates
- **User Profiles**: Personalized learning experience with streak tracking and custom profiles

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client Side)                     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Next.js Frontend Application (React)         │   │
│  │  - Pages: Dashboard, Study Notes, Practice Exams     │   │
│  │  - Components: Cards, Filters, Sidebar Navigation    │   │
│  │  - State: Local storage for profiles and streaks     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Local Storage (Client-Side Data)            │   │
│  │  - Profile settings (name, avatar)                   │   │
│  │  - Study streak tracking (visit count, dates)        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ↕
┌─────────────────────────────────────────────────────────────┐
│                  Next.js Backend API                         │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Routes (/api/study-notes)                       │   │
│  │  - GET /study-notes/[id]: Fetch individual notes     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Static Assets & Data (Imported from types/assets)   │   │
│  │  - Study notes data (213+ KB of content)             │   │
│  │  - Navigation links and images                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Initial Load**: User navigates to the platform
   - Sidebar loads with navigation links and user profile
   - Streak data loads from localStorage and updates (or resets if > 1 day passed)
   - Dashboard displays metrics and exam attempts

2. **Study Notes Flow**: 
   - User browses study notes filtered by domain/module
   - Frontend performs client-side filtering and search
   - Clicking a note fetches detailed content via API
   - Content displayed in detail view

3. **Practice Exam Flow**:
   - User selects exam type
   - Questions and answer options loaded from static data
   - Responses recorded in component state
   - Results calculated and displayed with score breakdown

4. **Profile Management**:
   - User settings saved to localStorage
   - Avatar and name persist across sessions
   - Streak data updates on daily visits

## Project Structure

```
frontend/
├── app/                              # Next.js App Router
│   ├── api/                          # API endpoints
│   │   └── study-notes/
│   │       └── [id]/
│   │           └── route.ts          # Study note detail API
│   │
│   ├── components/                   # Reusable React components
│   │   ├── Calendar.tsx              # Calendar visualization
│   │   ├── Sidebar.tsx               # Navigation sidebar (responsive)
│   │   ├── StudyNoteCard.tsx         # Study note preview card
│   │   └── StudyNotesFilter.tsx      # Filter controls (domain/module)
│   │
│   ├── dashboard/                    # Dashboard pages
│   │   ├── page.tsx                  # Main dashboard with metrics
│   │   └── calendar/
│   │       └── page.tsx              # Calendar view
│   │
│   ├── study-notes/                  # Study materials section
│   │   ├── page.tsx                  # Study notes list & search
│   │   ├── [id]/
│   │   │   └── page.tsx              # Individual note detail
│   │   └── notes/
│   │       └── page.tsx              # Note creation/editing
│   │
│   ├── practice-exam/                # Practice exam section
│   │   └── page.tsx                  # Exam interface
│   │
│   ├── attempts/                     # Exam attempt history
│   │   └── page.tsx                  # List of past attempts
│   │
│   ├── pricing-billing/              # Subscription management
│   │   └── page.tsx                  # Billing info
│   │
│   ├── profile/                      # User profile settings
│   │   └── page.tsx                  # Profile customization
│   │
│   ├── providers/                    # Context providers
│   │   └── ToasterProvider.tsx       # Toast notifications (Sonner)
│   │
│   ├── types/                        # TypeScript types & data
│   │   └── assets.ts                 # All static content & interfaces
│   │
│   ├── layout.tsx                    # Root layout with sidebar
│   ├── globals.css                   # Global styles
│   └── favicon.ico
│
├── lib/                              # Utility functions
│   ├── storage.ts                    # localStorage helpers & streak logic
│   └── dates.ts                      # Date utilities
│
├── public/                           # Static assets
│   ├── logo.png
│   ├── TechTree Studies Network Logo.png
│   ├── Magenta Purple Circuit Tree.png
│   └── user.png
│
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
└── .eslintrc.json                    # ESLint configuration
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16.4.0 (React 19.3.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with Turbopack
- **UI Components**: Lucide React icons
- **Notifications**: Sonner toasts
- **Linting**: ESLint 9

### Key Libraries
- `next` - React framework with server-side rendering and API routes
- `react` - UI library
- `lucide-react` - Icon library (40+ icons used for navigation and UI)
- `sonner` - Toast notification system
- `tailwindcss` - Utility-first CSS framework

### Storage & Data
- **Client-side Storage**: Browser localStorage
  - Profile settings (name, avatar)
  - Study streak data
- **Static Data**: Imported from `types/assets.ts` (213+ KB)
  - Study notes (~100+ notes organized by domain/module)
  - Navigation configuration
  - User metrics and exam attempt history

## Key Features

### 1. Dashboard
- **Metrics Overview**: Displays exam statistics
  - Exams taken (14)
  - Average score (782/900)
  - Best score (840/900)
  - Pass rate (85.7% - 12 of 14)
- **Certification Progress**: CompTIA Security+ accuracy (93.3%)
- **Recent Attempts**: Table of past exam attempts with scores
- **Calendar View**: Visual representation of study activity

### 2. Study Materials
- **Organized by Domains**: Cybersecurity topics (Network Security, Cryptography, etc.)
- **Modular Structure**: Concepts grouped by learning modules
- **Search & Filter**:
  - Full-text search across titles and descriptions
  - Filter by domain and module
  - Real-time filtering on the client
- **Study Note Cards**: Preview cards showing title, description, and metadata
- **Detail View**: Full content display when selecting a note

### 3. Practice Exams
- **Interactive Quiz Format**: Questions with multiple-choice answers
- **Score Calculation**: Tracks correct/incorrect responses
- **Answer Review**: Shows which questions were answered correctly
- **Exam Types**: Different exam simulations for practice

### 4. User Profile & Progress
- **Profile Customization**: User can set name and upload avatar
- **Study Streak**: Automatically tracks consecutive daily visits
  - Increments if user visits on consecutive days
  - Resets if > 1 day gap since last visit
- **Attempt History**: Records all exam attempts with dates and scores

### 5. Responsive Design
- **Mobile-First Approach**:
  - Hamburger menu on mobile (drawer navigation)
  - Full sidebar on desktop
  - Responsive grid layouts for content
- **Accessibility**: Focus management, keyboard navigation

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Application Workflow

### User Journey: Study → Practice → Track Progress

```
1. User Launches Application
   ↓
2. System loads profile from localStorage
   ↓ 
3. User navigates to desired section via Sidebar
   ├─ Dashboard: View overall progress metrics
   ├─ Study Notes: Browse and filter study materials
   ├─ Practice Exam: Take practice exams
   ├─ Attempts: Review past exam attempts
   └─ Profile: Customize settings and avatar
   ↓
4. Study/Practice: User interacts with content
   ├─ Search/filter content (client-side)
   ├─ Review materials or take exams
   ├─ Streak automatically updates on daily visit
   └─ Results saved to localStorage/component state
   ↓
5. Track Progress: Dashboard shows updated metrics
   ├─ Exam score history
   ├─ Current pass rate
   ├─ Study streak count
   └─ Certification accuracy
```

### Component Interaction Flow

```
Layout (Root)
├── ToasterProvider (Notifications)
├── Sidebar (Navigation)
│   └── Links to all pages
│
└── Main Content Area
    ├── Dashboard
    │   ├── Metrics display
    │   ├── Recent attempts table
    │   └── Calendar component
    │
    ├── Study Notes
    │   ├── StudyNotesFilter (domain/module)
    │   ├── Search input
    │   └── Grid of StudyNoteCards
    │       └── Each card links to /study-notes/[id]
    │           └── Detail page fetches via API
    │
    ├── Practice Exam
    │   ├── Question loader
    │   ├── Answer submission
    │   └── Score calculation
    │
    └── [Other Pages]
        └── Profile, Billing, Attempts
```

### Storage Architecture

**Client-Side Storage (localStorage)**:
```json
{
  "profile-settings:v1": {
    "form": { "name": "User Name" },
    "avatarDataUrl": "data:image/..."
  },
  "study-streak:v1": {
    "lastVisit": "2024-10-21",
    "count": 7
  }
}
```

**API Data**:
- Static study notes stored in `types/assets.ts`
- Served via `/api/study-notes/[id]` endpoint
- Frontend performs client-side filtering and search

## Future Enhancement Opportunities

- **Backend Database**: Migrate from static data to persistent database
- **User Authentication**: Add login/registration system
- **Progress Persistence**: Save study progress to backend
- **Spaced Repetition**: Implement algorithm to optimize study scheduling
- **Adaptive Difficulty**: Adjust exam questions based on performance
- **Mobile App**: Convert to React Native or Flutter
- **Real-time Collaboration**: Study groups and peer review features
- **Analytics Dashboard**: Detailed performance analytics and insights
