# Security Specification - Ethereal Union

## 1. Data Invariants
- An RSVP must have a `name`, `email`, `attendance`, `createdAt`, and `uid`.
- `uid` must match the authenticated user's ID.
- `createdAt` must be set to `request.time`.
- Users can only read their own RSVPs, unless they are an admin.
- Only admins can list all RSVPs.
- Once an RSVP is submitted, the `uid` and `email` are immutable.

## 2. The Dirty Dozen Payloads
1. **Identity Spoofing**: Submitting an RSVP with a `uid` that doesn't match `request.auth.uid`.
2. **Ghost Fields**: Adding an `isAdmin: true` field to the RSVP.
3. **Identity Integrity Bypass**: Updating someone else's RSVP.
4. **Denial of Wallet**: Sending a name string that is 10MB in size.
5. **ID Poisoning**: Using a document ID that is a 1.5KB junk string.
6. **Immutable Field Write**: Attempting to change the `uid` during an update.
7. **Timestamp Fraud**: Setting `createdAt` to a date in the past from the client.
8. **PII Leak**: An unauthenticated user attempting to `get` an RSVP by ID.
9. **Query Scraping**: An authenticated user attempting to `list` all RSVPs without being an admin.
10. **State Shortcut**: Setting `attendance` to an invalid enum value like "maybe".
11. **Resource Exhaustion**: Sending a payload with 1000 fields.
12. **Orphaned Record**: (Not applicable here as it's a top-level collection, but if it were sub-collection, it would be bypass parent check).

## 3. Test Runner (Draft)
A `firestore.rules.test.ts` will be created to verify these.
