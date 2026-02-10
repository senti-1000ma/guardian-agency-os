# Guardian Agency OS - API Documentation

## Overview
This document outlines the API structure and Database Schema for the Guardian Agency OS.
The system uses **Supabase** for Backend-as-a-Service (Auth, DB, Storage) and **Next.js API Routes** for AI processing logic.

---

## 1. Database Schema (Supabase / PostgreSQL)

### Users Table (`users`)
Managed by Supabase Auth, but extended in `public.profiles`.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key (matches `auth.users`) |
| `email` | text | User email |
| `full_name` | text | Display name |
| `company_name` | text | Agency name |
| `plan_tier` | text | 'free', 'pro', 'enterprise' |
| `created_at` | timestamp | Account creation date |

### Clients Table (`clients`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `user_id` | uuid | Foreign Key -> `users.id` |
| `name` | text | Client Company Name |
| `contact_person`| text | Main point of contact |
| `email` | text | Contact email |
| `phone` | text | Contact phone |
| `status` | text | 'Active', 'Inactive', 'Lead' |
| `created_at` | timestamp | |

### Projects Table (`projects`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `user_id` | uuid | Foreign Key -> `users.id` |
| `client_id` | uuid | Foreign Key -> `clients.id` |
| `title` | text | Project Title |
| `status` | text | 'Planning', 'Active', 'In Review', 'Completed' |
| `budget` | numeric | Total project value |
| `start_date` | date | |
| `due_date` | date | |
| `progress` | integer | 0-100 |

### Invoices Table (`invoices`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `project_id` | uuid | Foreign Key -> `projects.id` |
| `client_id` | uuid | Foreign Key -> `clients.id` |
| `amount` | numeric | Invoice amount |
| `status` | text | 'Draft', 'Pending', 'Paid', 'Overdue' |
| `due_date` | date | Payment due date |
| `issued_date` | date | |

### Calendar Events (`events`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary Key |
| `user_id` | uuid | Foreign Key -> `users.id` |
| `title` | text | Event title |
| `type` | text | 'meeting', 'deadline', 'finance' |
| `start_time` | timestamp | |
| `end_time` | timestamp | |

---

## 2. API Endpoints (Next.js App Router)

### AI Services
These endpoints handle logic that requires server-side processing (e.g., calling OpenAI/Claude).

#### `POST /api/ai/scan-contract`
**Description**: Analyzes a PDF/Text contract for risks.
- **Input**: `FormData` (file)
- **Output**:
```json
{
  "summary": "String",
  "risk_score": 85,
  "red_flags": [
    { "clause": "...", "risk_level": "High", "explanation": "..." }
  ]
}
```

#### `POST /api/ai/refine-message`
**Description**: Rewrites a draft message in professional tones.
- **Input**:
```json
{
  "draft": "I need the money now.",
  "recipient_type": "Client",
  "intent": "Request Payment"
}
```
- **Output**:
```json
{
  "options": [
    { "tone": "Professional", "content": "..." },
    { "tone": "Firm", "content": "..." },
    { "tone": "Soft", "content": "..." }
  ]
}
```

---

## 3. Data Access Strategy
- **Frontend**: Uses `@supabase/supabase-js` client for direct DB operations (CRUD).
- **Security**: Controlled via **Row Level Security (RLS)** policies in Postgres.
  - Policy: `Users can only SELECT/INSERT/UPDATE/DELETE rows where user_id matches auth.uid()`

---

## 4. Next Steps for Backend Team
1. Initialize Supabase Project.
2. Run SQL scripts to create tables defined above.
3. Enable RLS and write policies.
4. Implement `/api/ai/*` endpoints using Vercel AI SDK or OpenAI API.
