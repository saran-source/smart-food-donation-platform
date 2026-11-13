# Engineering Roadmap

This roadmap separates existing repository structure from work that still needs implementation and verification. Items are not considered complete until tested.

## P0 — Security and correctness

- [ ] Add Firebase Emulator Suite tests for every Firestore collection and role.
- [ ] Verify that users cannot change their own role or elevate privileges.
- [ ] Enforce donation expiry in trusted logic and exclude expired donations from discovery.
- [ ] Make donation claiming atomic and test concurrent claim attempts.
- [ ] Validate every donation and pickup status transition.
- [ ] Add input validation and safe error handling to all forms.

## P1 — End-to-end donation workflow

- [ ] Donor creates a donation with quantity, food type, location and expiry.
- [ ] NGO discovers eligible nearby donations.
- [ ] NGO claims a donation exactly once.
- [ ] NGO assigns a volunteer and pickup details.
- [ ] Volunteer confirms pickup and delivery milestones.
- [ ] Recipient/NGO confirms completion.
- [ ] Expired, cancelled and completed donations become unavailable for claiming.

## P2 — Location and usability

- [ ] Verify Google Maps key configuration and referrer restrictions.
- [ ] Add distance-aware nearby donation queries or a documented geospatial strategy.
- [ ] Provide loading, empty, error and permission-denied states on all dashboards.
- [ ] Add accessible form labels and responsive layout checks.

## P3 — Quality and deployment

- [ ] Add unit tests for validation, status transitions and services.
- [ ] Add end-to-end tests for donor-to-pickup workflows.
- [ ] Add CI checks for TypeScript build, lint and tests.
- [ ] Document Firebase project setup, environment variables and deployment.
- [ ] Add a deployment checklist and verify the production hosting configuration.

## Definition of done

A feature is complete only when its happy path, invalid input, unauthorized access, concurrency and failure cases have been tested. Do not publish performance or impact metrics without a reproducible measurement method.
