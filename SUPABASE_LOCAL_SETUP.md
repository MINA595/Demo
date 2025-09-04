# Supabase Local Development Setup

## Overview
This project is configured to work with both local and remote Supabase instances.

## Getting Started with Local Supabase

### Prerequisites
- Docker Desktop must be installed and running
- Node.js and npm installed

### Commands
Use these npm scripts to manage your local Supabase:

```bash
# Start local Supabase (first time will download Docker images)
npm run supabase:start

# Check status of local services
npm run supabase:status

# Stop local Supabase
npm run supabase:stop

# Reset local database (clears all data)
npm run supabase:reset
```

### Configuration

#### Current Setup
- **Remote Supabase**: Configured in `app.json` (default)
- **Local Supabase**: Available at `http://localhost:54321`

#### Switching to Local Development
To use local Supabase, set the environment variable:
```bash
export USE_LOCAL_SUPABASE=true
```

#### Services and Ports
When running locally, Supabase provides these services:
- **API Gateway**: http://localhost:54321
- **Database**: localhost:54322
- **Studio (Dashboard)**: http://localhost:54323
- **Inbucket (Email testing)**: http://localhost:54324

### Database Management

#### Migrations
- Database migrations are stored in `supabase/migrations/`
- Run migrations: `npx supabase db push`
- Create new migration: `npx supabase db diff --file <migration_name>`

#### Seed Data
- Add seed data in `supabase/seed.sql`
- Apply seeds: `npx supabase db reset` (includes seeds)

### Development Workflow

1. **Start local Supabase**:
   ```bash
   npm run supabase:start
   ```

2. **Update your environment** (optional):
   ```bash
   export USE_LOCAL_SUPABASE=true
   ```

3. **Start your Expo app**:
   ```bash
   npm start
   ```

4. **Access Supabase Studio**:
   Open http://localhost:54323 to manage your local database

### Files Created
- `supabase/` - Local Supabase configuration and migrations
- `.env.local` - Local environment variables
- `src/lib/supabase-config.ts` - Enhanced Supabase client with environment switching

### Troubleshooting
- Ensure Docker Desktop is running
- If ports are in use, check `supabase/config.toml` to change ports
- Reset everything: `npx supabase stop` then `npm run supabase:start`
