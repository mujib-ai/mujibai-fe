# MujibAI Frontend

MujibAI is a multilingual AI voice-agent platform for managing calls, tickets,
knowledge sources, outbound campaigns, analytics, API keys, and tenant settings.
This repository contains the public website and authenticated dashboard built
with Next.js.

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4 and shadcn/ui
- TanStack Query, Zustand, and Axios
- next-intl for Arabic and English localization
- React Hook Form and Zod
- Vitest for unit tests
- ESLint and Prettier

## Requirements

- Node.js 20 or later
- pnpm
- A running MujibAI backend API

## Getting started

Install dependencies:

```bash
pnpm install
```

Create a `.env.local` file and configure the required values:

```env
NEXT_PUBLIC_API_URL=https://api.mujibai.net
NEXT_PUBLIC_APP_URL=http://localhost:3000
AUTH_STATE_SECRET=replace-with-a-long-random-secret

# Optional integrations
TENANT_2FA_VERIFY_PATH=/tenants/login/2fa
NEXT_PUBLIC_LANDING_AGENT_WS_URL=wss://api.mujibai.net
NEXT_PUBLIC_NOTIFICATIONS_WS_URL=wss://api.mujibai.net
```

Start the Turbopack development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Authentication

Login and two-factor verification are handled by server-side Next.js route
handlers. Access and refresh tokens are stored in HTTP-only cookies rather than
browser storage. A signed authentication-state cookie allows the application
proxy to distinguish unauthenticated, pending-2FA, and authenticated sessions.

Protected backend requests should use the `/api/backend/*` proxy. It attaches
the access token on the server and clears session cookies when the backend
returns `401 Unauthorized`.

`AUTH_STATE_SECRET` is required to sign authentication state. Use a long,
random value, keep it server-only, and configure the same value on every app
instance. `NEXTAUTH_SECRET` is supported as a fallback. Do not prefix either
secret with `NEXT_PUBLIC_`.

## Available scripts

```bash
pnpm dev          # Start the development server with Turbopack
pnpm build        # Create a production build
pnpm start        # Start the production server
pnpm test         # Run the Vitest suite once
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix supported lint issues
pnpm type-check   # Check TypeScript types
pnpm format       # Format the repository
pnpm format:check # Verify formatting
pnpm check-all    # Run type, lint, and formatting checks
pnpm analyze      # Build with bundle analysis enabled
```

## Project structure

```text
src/
├── app/       # App Router pages, layouts, and server route handlers
├── features/  # Domain modules, hooks, services, types, and tests
├── i18n/      # Locale configuration and Arabic/English messages
└── shared/    # Reusable components, hooks, utilities, and types
```

Feature tests live alongside their domains in `__tests__` directories. The
Vitest configuration is defined in `vitest.config.mts`.

## Production

Create and run an optimized build:

```bash
pnpm build
pnpm start
```

Configure all environment variables in the deployment platform before building
the application. Public variables are embedded into the client bundle; secrets
must remain server-only.
