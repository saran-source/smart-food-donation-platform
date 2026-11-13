# Architecture Notes

## System overview

The current application is a React + TypeScript single-page application. React Router maps each workflow to a page, while an authentication context supplies the signed-in user to protected routes.

### Main layers

1. **Presentation:** React pages and reusable components.
2. **Route protection:** `ProtectedRoute` gates authenticated pages and checks allowed roles.
3. **Authentication:** Firebase Authentication, exposed to the UI through `AuthContext`.
4. **Persistence and authorization:** Cloud Firestore, with access constraints in `firestore.rules`.
5. **Location discovery:** Google Maps integration for nearby donation discovery.

## Role model

The application routes reference these roles:

- `DONOR`: create and manage donations.
- `NGO`: discover and claim available donations and coordinate pickups.
- `VOLUNTEER`: participate in pickup workflows.
- `RECIPIENT`: discover donations and create food requests.
- `ADMIN`: access administrative workflows.

The role stored in a user document must not be treated as trustworthy merely because it came from a client. The current Firestore rules prevent public self-registration as ADMIN; administrative provisioning should happen through a trusted administrative process.

## Firestore collections represented in the rules

- `users`
- `donations`
- `requests`
- `pickups`
- `notifications`

The rules enforce authenticated access and ownership/role checks for these collections. These rules should be exercised with emulator tests for both permitted and denied operations before production deployment.

## Important engineering boundaries

- Client-side route protection improves UX but does not replace Firestore authorization.
- Expiry validation should be enforced in trusted logic and reflected in query eligibility; a hidden or disabled UI control is not sufficient.
- Donation claiming should use a Firestore transaction or equivalent atomic operation to prevent two organizations claiming the same donation.
- Pickup assignment and status transitions should be validated against an explicit state machine.
- Google Maps browser keys should be restricted by allowed referrers and API scope.
