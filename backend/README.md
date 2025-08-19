# Backend API

A Node.js Express backend with Firebase Authentication and PostgreSQL database.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. **Database setup:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations (after setting DATABASE_URL)
   npx prisma migrate dev --name init
   ```

4. **Firebase setup:**
   - Create a Firebase project
   - Generate a service account key
   - Add Firebase config to `.env`

## Development

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/users/me` - Get user profile (requires auth)
- `PATCH /api/users/me` - Update user profile (requires auth)

## Authentication

Send Firebase ID token in Authorization header:
```
Authorization: Bearer <firebase-id-token>
```
