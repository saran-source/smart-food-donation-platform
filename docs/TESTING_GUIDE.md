# Testing and Release Guide

## Local checks
From the repository root:

```powershell
npm install
npm run build:client
npm run lint:client
```

Run the backend scripts if the server package is configured:

```powershell
npm run build:server
npm run lint:server
```

## Firebase Emulator checks
Before deploying Firestore rules, configure the Firebase Emulator Suite and test both allowed and denied operations for each role.

Minimum matrix:
- Anonymous user cannot read private profiles or write protected collections.
- A user can create only their own normal-role profile.
- A user cannot assign or change their role to ADMIN.
- Donor can create a donation only with their own donorId.
- NGO can claim only an AVAILABLE donation and cannot claim it twice.
- Recipient cannot update another user's request.
- Volunteer can update only pickups assigned to that volunteer.
- Users can read only their own notifications.
- Expired donations cannot be newly claimed.

## End-to-end workflow
1. Register donor, NGO, volunteer and recipient test accounts.
2. Create a donation with a future expiry.
3. Confirm it appears in nearby discovery.
4. Attempt two concurrent NGO claims; exactly one should succeed.
5. Assign a volunteer and progress the pickup through permitted states.
6. Verify completion and notifications.
7. Advance a test clock or use an expired fixture and verify expired food is unavailable.

## Release gates
- TypeScript build and lint pass.
- Firestore emulator rules tests pass.
- No credentials or private user data in Git.
- Google Maps browser key restricted by referrer and API.
- Critical workflow tested from donation creation through pickup completion.
- Deployment configuration and rollback procedure reviewed.
