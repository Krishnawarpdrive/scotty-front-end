# Project Title: Applicant Management System (AMS)

## Project Purpose
A modern web application for managing talent acquisition workflows, streamlining the process from candidate sourcing to hiring.

## Architecture Overview
This project utilizes a modern tech stack to deliver a robust and scalable application:

*   **Vite:** Frontend build tool for fast development and optimized builds.
*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** Superset of JavaScript that adds static typing for enhanced code quality and maintainability.
*   **Redux Toolkit:** Opinionated, batteries-included toolset for efficient Redux development, used for global state management.
*   **Supabase:** Backend-as-a-Service (BaaS) providing database, authentication, real-time subscriptions, and storage.
*   **Material-UI (MUI):** A comprehensive suite of UI tools to help you ship new features faster.
*   **Shadcn/ui:** Re-usable components built using Radix UI and Tailwind CSS.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Vitest:** A blazing fast unit test framework powered by Vite.
*   **ESLint:** Pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript and TypeScript.

## Key Features
*   Comprehensive candidate tracking and management.
*   Efficient role and requirement definition.
*   Streamlined interview scheduling and feedback collection.
*   (Add 1-2 more high-level features)

## Environment Setup
To run this project locally, you need to set up environment variables.

1.  Create a `.env` file in the root of the project.
2.  This file will store sensitive credentials and project-specific settings.
3.  Refer to `.env.example` (to be created) for a template of required variables.
4.  Key variables include:
    *   `VITE_SUPABASE_URL`: The URL for your Supabase project.
    *   `VITE_SUPABASE_ANON_KEY`: The anonymous public key for your Supabase project.

## Project Structure
The project follows a standard structure for React applications:

*   `src/`: Contains all the main application source code.
    *   `App.tsx`: Main application component.
    *   `main.tsx`: Entry point of the application.
    *   `components/`: Reusable UI components.
        *   `ui/`: Components from Shadcn/ui.
        *   `ui-mui/`: Custom components built using Material-UI or Material-UI styled components.
        *   `common/`: General-purpose components used across multiple features.
        *   (other feature-specific component directories)
    *   `pages/`: Top-level page components, representing different views of the application.
    *   `store/`: Redux Toolkit setup, including the store, slices (reducers/actions), and selectors.
    *   `hooks/`: Custom React hooks for reusable logic.
    *   `services/`: Application-specific services (e.g., API interactions beyond Supabase client, business logic).
    *   `contexts/`: React Context API implementations for localized state management.
    *   `layouts/`: Components that define the overall structure of pages (e.g., MainLayout, AuthLayout).
    *   `lib/`: Utility functions and helper modules.
    *   `types/`: TypeScript type definitions and interfaces.
    *   `integrations/`: Contains Supabase client initialization and related type definitions.
    *   `assets/` or `styles/`: Global styles, fonts, or other static assets (if not in `public/`).
*   `public/`: Static assets that are served directly by the web server (e.g., `index.html`, favicons).
*   `supabase/`: Configuration and migration files for Supabase local development, including database functions.
*   `vite.config.ts`: Vite configuration file.
*   `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configuration files.
*   `eslint.config.js`: ESLint configuration file.
*   `package.json`: Project metadata, dependencies, and scripts.

## Available Scripts
The following scripts are available from `package.json`:

*   `npm run dev` (or `bun dev`): Starts the development server with Hot Module Replacement (HMR).
*   `npm run build` (or `bun build`): Builds the application for production deployment.
*   `npm run lint`: Lints the codebase using ESLint (e.g., `npx eslint . --report-unused-disable-directives --max-warnings 0`).
*   `npm test` (or `bun test`): Runs unit and integration tests using Vitest.
*   `npm run test:ui`: Runs tests with the Vitest UI for a better debugging experience.
*   `npm run test:watch`: Runs tests in watch mode.
*   `npm run coverage`: Generates a test coverage report.

---

# Welcome to your Lovable project (Existing Content)

## Project info

**URL**: https://lovable.dev/projects/6e5fe202-e981-4841-968e-42bc47030683

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6e5fe202-e981-4841-968e-42bc47030683) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project? (Updated)

This project is built with:

- Vite
- React
- TypeScript
- Redux Toolkit
- Supabase
- Material-UI (MUI)
- Shadcn/ui
- Tailwind CSS
- Vitest (for testing)
- ESLint (for linting)


## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6e5fe202-e981-4841-968e-42bc47030683) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
