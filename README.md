<<<<<<< HEAD
# Sponsorship Management System

A full-stack system to manage students, sponsors, and guardians with role-based access, reports, and dashboards.

## Tech Stack
- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: React (Vite), React Router, Axios, Chakra UI, Recharts
- Auth: JWT, bcrypt, RBAC (Admin, Sponsor, Guardian)
- Files: Multer uploads
- Reports: Excel (exceljs) on backend, PDF (jsPDF) on frontend
- Containerization: Docker, docker-compose

## Quick Start

### Requirements
- Node.js >= 18
- Docker & Docker Compose

### Environment
Create `.env` files from examples:

- `backend/.env` (copy from `.env.example`)
- `frontend/.env` (copy from `.env.example`)

### Run with Docker

```bash
docker compose up --build
```
- Backend: http://localhost:4000
- Frontend: http://localhost:5173
- Postgres: localhost:5432

### Run locally (without Docker)

1. Backend
```bash
cd backend
npm install
npm run dev
```

2. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Backend

### Scripts
- `npm run dev` - start with nodemon
- `npm start` - start production
- `npm run migrate` - run Sequelize migrations
- `npm run seed` - run seeders

### API Base
`/api/v1`

### Auth
- `POST /api/v1/auth/register` (admin only to create users)
- `POST /api/v1/auth/login`

### Resources
- Users: `/api/v1/users`
- Students: `/api/v1/students`
- Guardians: `/api/v1/guardians`
- Sponsors: `/api/v1/sponsors`
- Education Records: `/api/v1/education-records`
- Reports: `/api/v1/reports/excel` (Excel export)

### File Uploads
- `POST /api/v1/students/:id/upload` - upload files for student (Multer)

## Frontend

- Login page
- Admin Dashboard (overview counts + charts)
- Sponsor Dashboard (their students + contributions)
- Management pages for Users, Students, Guardians, Sponsors
- Reports page (export Excel via backend, PDF via jsPDF client)

## Database

Entities:
- Users (roles: ADMIN, SPONSOR, GUARDIAN)
- Students
- Guardians
- Sponsors
- SponsorStudent (link table many-to-many)
- EducationRecords

Run migrations and seeders after DB is up:
```bash
cd backend
npm run migrate
npm run seed
```

## Security
- JWT access tokens (http-only storage is recommended in production via cookie)
- Passwords hashed with bcrypt
- RBAC middleware to restrict routes

## Notes
- This is a production-ready scaffold with clean structure and modular code.
- Extend controllers/validation as your needs evolve.
=======
# SCHOLARSHIP
system that connects parents, students, and scholarship offers
>>>>>>> a0fd6d4b34baefde59b85dbfc4f0b70c65f3c983
