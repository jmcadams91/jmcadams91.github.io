Server API notes

This folder contains the server-side Mongoose models used by the API.

Dependencies required (install in the environment that runs the server):

- mongoose
- mongoose-unique-validator

Install them with npm in your server project root (where your server's package.json lives), for example:

```powershell
npm install mongoose mongoose-unique-validator
```

Running the seed script:

1. Ensure MongoDB is running on the host configured in `DB_HOST` (default: 127.0.0.1).
2. From the project root where `app_api` is reachable, run:

```powershell
node app_api/models/seed.js
```

This seed script will remove (delete) the `Booking`, `Trip`, and `users` collections used by the seeder and then insert sample trips, users, and bookings.

If you prefer a non-destructive seed, edit `app_api/models/seed.js` to remove the `deleteMany` calls.
