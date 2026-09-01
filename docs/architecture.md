# Architecture

## High-level architecture

The platform uses a React + TypeScript frontend, a Node.js + Express API layer, and Firebase services for authentication, Firestore data, file storage, serverless functions, and hosting. Google Maps Platform provides location and mapping capabilities.

```text
React Client
    |
    +--> Firebase Authentication
    |
    +--> Node.js / Express API
              |
              +--> Firestore
              +--> Firebase Storage
              +--> Google Maps Platform
              +--> Firebase Cloud Functions
```

## Core roles

- Donor — creates and manages food donations.
- NGO — discovers and claims suitable donations.
- Volunteer — handles pickup and delivery workflows.
- Recipient — requests and receives food.
- Admin — manages users, donations, and platform analytics.
