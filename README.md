# StakeZone

StakeZone is a React 18 + TypeScript WAP group project that recreates the feel of a Stake-style sports betting platform using virtual coins. It uses Supabase Authentication for signup/login and JSON Server for the mock sports, bets, leaderboard, and transaction data.

## Tech Stack

- React 18 + Vite
- TypeScript
- React Router v6 (`createBrowserRouter`)
- React Context API + `useReducer`
- Tailwind CSS
- Supabase Auth
- JSON Server
- Axios
- Framer Motion
- Lucide React
- date-fns

## Features

- Protected dashboard flow with login and registration
- Multi-sport dashboard for cricket, football, and tennis
- Match detail pages with market sections, commentary, and events
- Bet slip with stake editing, total payout calculation, and mock bet placement
- Wallet page with daily bonus countdown and transaction history
- Leaderboard podium and rankings table
- Profile page with stats and recent activity
- Search, filters, loading states, empty states, and toast feedback

## Setup

```bash
cp .env.example .env
npm install
npm run dev
```

The dev script runs:

- Vite frontend on `http://localhost:5173`
- JSON Server mock data API on `http://localhost:3001`

Add your real `VITE_SUPABASE_ANON_KEY` to `.env` before trying to register or log in.

To run only the mock JSON Server:

```bash
npm run server
```

To create the production bundle:

```bash
npm run build
```

## Folder Structure

```text
public/
src/
  components/
  contexts/
  hooks/
  lib/
  pages/
  types/
db.json
```

## Team

- Add team member names and GitHub profile links here

## Notes

- This is a simulation project. No real money is involved.
- `db.json` acts as the mock backend for sports, bets, leaderboard, and transactions.
- Supabase stores authentication and user profile metadata in the cloud.
# betting-app
