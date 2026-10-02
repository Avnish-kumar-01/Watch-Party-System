# 🎬 WatchParty — Real-Time YouTube Watch Party Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://watch-party-system-5.onrender.com/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Upstash%20Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![Clerk](https://img.shields.io/badge/Clerk%20Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

> Watch YouTube videos together in real time with synchronized playback, custom rooms, live chat, interactive emoji reactions, and role-based permissions.

🌐 **Live URL:** [https://watch-party-system-5.onrender.com/](https://watch-party-system-5.onrender.com/)

---

## 🌟 Key Features

- **⚡ Real-Time YouTube Playback Synchronization**: Sub-300ms drift correction with periodic automatic sync broadcasts every 7 seconds.
- **🛡️ Role-Based Access Control**:
  - **Host**: Full control over video selection, playback (play, pause, seek), role assignment, and participant management.
  - **Moderator**: Can control playback and approve/reject video change requests.
  - **Participant**: Can watch in sync, chat, send emoji reactions, and submit video change requests to the host.
- **💬 Real-Time Chat & Floating Reactions**: Instant messaging and animated floating reactions visible to all viewers in the room.
- **🔑 Room Codes & Shareable Links**: Instant room creation with 6-character room codes and one-click copyable invite links.
- **🔐 Clerk Authentication**: Secure user authentication with user profiles, avatars, and session tokens.
- **📦 Scalable Backend Architecture**:
  - Redis adapter for horizontal WebSocket scaling across multiple server instances.
  - Upstash Redis for fast state caching and rate limiting.
  - MongoDB Atlas for persistent room metadata, members, and user history.
- **🎨 Modern Glassmorphic UI**: Designed with Tailwind CSS v4, dark mode, responsive layouts, and fluid micro-interactions.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), Lucide Icons, Glassmorphic CSS |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Real-Time Communication** | [Socket.IO](https://socket.io/) (Client & Server) |
| **Authentication** | [Clerk](https://clerk.com/) (`@clerk/nextjs`, `@clerk/backend`) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) |
| **Caching & Rate Limiting** | [Upstash Redis](https://upstash.com/) (`@upstash/redis`, `@upstash/ratelimit`) |
| **WebSocket Clustering** | `@socket.io/redis-adapter` & `redis` |
| **Runtime & Server** | Node.js 20+ with custom HTTP Server (`server.ts`) |
| **Containerization & Hosting** | [Docker](https://www.docker.com/) (Multi-stage build) on [Render](https://render.com/) |

---

## 📂 Project Structure

```text
watch-party-system/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Clerk Sign-in & Sign-up pages
│   ├── api/                  # REST API routes (/rooms, /health)
│   ├── dashboard/            # User room history dashboard
│   ├── room/[roomId]/        # Active watch party room page
│   ├── layout.tsx            # Root layout with ClerkProvider
│   └── page.tsx              # Landing page (Create / Join room)
├── components/               # React components
│   ├── room/                 # Player, Controls, Chat, Reactions, Participants
│   └── ui/                   # Reusable UI primitives
├── hooks/                    # Custom hooks (useSocket, useRoom, usePlayerSync)
├── lib/                      # Database (db.ts), Redis (redis.ts), YouTube parser
├── models/                   # Mongoose models (Room.ts, User.ts)
├── server/                   # Socket.IO handlers & Room Manager
│   ├── handlers/             # Chat, Playback, Request, Role, Room handlers
│   ├── socketAuth.ts         # Socket connection Clerk token verification
│   └── socketServer.ts       # Socket.IO instance and Redis adapter setup
├── store/                    # Zustand room state management
├── Dockerfile                # Multi-stage production container build
├── server.ts                 # Custom Node HTTP + Socket.IO server
└── package.json
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v20 or higher
- **npm** (or yarn / pnpm)
- **MongoDB Atlas** account (or local MongoDB database)
- **Clerk** account ([clerk.com](https://clerk.com))
- **Upstash Redis** account ([upstash.com](https://upstash.com))

### 2. Clone the Repository
```bash
git clone https://github.com/avnishchauhan/Watch-Party-System.git
cd Watch-Party-System/watch-party-system
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create your local `.env` file by copying `.env.example`:
```bash
cp .env.example .env
```

Add your credentials to `.env`:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# MongoDB Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/watchparty?retryWrites=true&w=majority

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://<your-redis>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>
REDIS_URL=rediss://default:<password>@<host>:6379

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3000
```

### 5. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Run (Local)

To test the production build locally:

```bash
# 1. Build Next.js and compile server TypeScript files
npm run build

# 2. Start the production server
npm start
```

The production server will listen on `http://localhost:3000` (or `PORT`).

---

## 🐳 Docker Setup

You can build and run the Docker container locally:

```bash
# Build the Docker image with build arguments
docker build \
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_publishable_key" \
  --build-arg NEXT_PUBLIC_APP_URL="http://localhost:10000" \
  -t watch-party .

# Run the container
docker run -p 10000:10000 --env-file .env watch-party
```

---

## 🌐 Deploying to Production (Render)

This application is deployed as a **Docker Web Service** on Render because it requires persistent WebSockets and a dedicated Node.js runtime (`server.ts`).

### Deployment Steps:
1. **Create Web Service on Render**:
   - Connect your GitHub repository.
   - Choose **Docker** as the Environment / Runtime.
   - Set the Root Directory to `watch-party-system` (if deploying from a monorepo) or root.

2. **Configure Environment Variables on Render**:
   In your Render Web Service **Environment** tab, add:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/`
   - `MONGODB_URI`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `REDIS_URL`
   - `NEXT_PUBLIC_APP_URL` = `https://watch-party-system-5.onrender.com/`
   - `PORT` = `10000`

3. **Configure Clerk Dashboard**:
   - Go to [dashboard.clerk.com](https://dashboard.clerk.com) > your application > **Configure > Domains**.
   - Add `https://watch-party-system-5.onrender.com/` to your allowed domains so Clerk allows login sessions from the deployed site.

4. **Configure MongoDB Atlas**:
   - In MongoDB Atlas, navigate to **Network Access** > **IP Access List**.
   - Add `0.0.0.0/0` (**Allow Access from Anywhere**) so Render's cloud servers can connect.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to suggest an improvement:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
