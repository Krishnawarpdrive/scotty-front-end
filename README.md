# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6e5fe202-e981-4841-968e-42bc47030683

## How can I edit this code?

There are several ways of editing your application.

## Project Purpose

[TODO: Describe the main goal of this application. What problem does it solve? Who are the target users? e.g., "This application serves as a comprehensive platform for managing X, Y, and Z, aimed at streamlining workflows for enterprise teams."]

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

## Environment Setup

To run this project locally, you'll need to set up your environment variables. Copy the `.env.example` file to a new file named `.env` in the project root and fill in the required values.

```bash
cp .env.example .env
```

Key environment variables include:
- `VITE_SUPABASE_URL`: The URL for your Supabase project.
- `VITE_SUPABASE_ANON_KEY`: The anonymous key for your Supabase project.
- `VITE_APP_TITLE`: (Optional) A title for your application.
- `VITE_API_BASE_URL`: (Optional) If you have a separate backend API.

Ensure that your Supabase instance is properly configured with the necessary tables and authentication settings.

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

## What technologies are used for this project?

This project is built with:

- **Core:**
  - Vite (Build Tool & Dev Server)
  - TypeScript (Language)
  - React (UI Library)
  - React Router (Routing)
  - Redux Toolkit (State Management)
- **UI Components & Styling:**
  - Shadcn/UI (Component Library)
  - Material-UI (MUI) (Component Library)
  - Tailwind CSS (CSS Framework)
- **Backend & Database:**
  - Supabase (Backend-as-a-Service: Auth, Database, Storage)
- **Linting & Formatting:**
  - ESLint
  - (Prettier - if configured, otherwise can be omitted or added later)
- **Testing:** (Setup initiated)
  - Vitest (Test Runner)
  - React Testing Library (Component Testing)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6e5fe202-e981-4841-968e-42bc47030683) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
