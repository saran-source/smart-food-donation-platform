# Smart Food Donation Platform

A role-based food donation application designed to connect donors, NGOs, volunteers and recipients, helping coordinate surplus-food donations and nearby distribution.

## Technology

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Authentication & data:** Firebase Authentication, Cloud Firestore
- **Maps:** Google Maps Platform
- **Hosting:** Firebase Hosting
- **Validation:** Zod

> The repository is an active development project. The feature list below describes the application routes and data/security structure currently present in the codebase; deployment, end-to-end behaviour and production readiness should be verified before describing them as complete.

## Application areas

The React application currently defines protected routes for:

| Area | Route | Intended role |
|---|---|---|
| Sign in | `/login` | Public |
| Registration | `/register` | Public |
| General dashboard | `/dashboard` | Authenticated |
| Donor dashboard | `/donor` | DONOR |
| Create donation | `/donations/new` | DONOR |
| NGO dashboard | `/ngo` | NGO |
| Nearby donations | `/nearby` | NGO, RECIPIENT |
| Volunteer dashboard | `/volunteer` | VOLUNTEER |
| Recipient dashboard | `/recipient` | RECIPIENT |
| Food request | `/requests/new` | RECIPIENT |
| Admin dashboard | `/admin` | ADMIN |

Role checks are applied through a protected-route layer. Firestore rules restrict user-profile access and donation, request, pickup and notification operations by authenticated user and role.

## Getting started

1. Install Node.js and npm.
2. Install the client dependencies:

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Configure the Firebase project and Google Maps key using the environment variables referenced by the client configuration. Never commit real credentials.
4. Deploy Firestore rules only after reviewing them against the intended role workflows.

The root package provides convenience scripts such as `npm run dev:client` and `npm run build:client`.

## Security notes

- Public registration must not allow users to assign themselves the ADMIN role.
- Keep Firebase client configuration and Maps keys in environment configuration; apply appropriate API restrictions to browser keys.
- Test Firestore rules with the Firebase Emulator Suite before deployment.
- Validate donation expiry and status transitions in trusted application logic; client-side checks alone are not a security boundary.
- Do not commit service-account keys, tokens, private user data or production donation records.

## Development status

This repository contains the React application route structure, authentication context, role-protected pages and Firestore security rules. Review [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the current design and [docs/ROADMAP.md](docs/ROADMAP.md) for the next engineering milestones.

## License

No license has been selected yet. Until one is added, all rights are reserved.
