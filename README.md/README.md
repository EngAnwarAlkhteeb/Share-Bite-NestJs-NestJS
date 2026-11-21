# ShareBite — NestJS Monorepo

ShareBite rebuilt as a Turborepo monorepo: a location-based surplus-food distribution platform that connects food providers (individuals, restaurants, stores) with people who need it, to reduce food waste in Indonesia.

This is the NestJS version. The original full-stack app is in [Share-Bite](https://github.com/EngAnwarAlkhteeb/Share-Bite), and its standalone Express backend is in [ShareBite-Backend](https://github.com/EngAnwarAlkhteeb/ShareBite-Backend).

## Stack
- **Monorepo:** Turborepo (npm workspaces, `turbo run dev / build / lint`)
- **Backend:** NestJS (TypeScript)
- **Frontend:** Next.js (`frontend-nextjs/`)
- **Admin:** Admin panel (`Admin/`)

## Structure
```
├── backend/           # NestJS API
├── frontend-nextjs/   # Next.js app
├── Admin/             # Admin panel
├── turbo.json         # Turborepo tasks
└── package.json       # npm@10.8.1 workspaces
```

## Run it
```bash
npm install
npm run dev     # turbo run dev — all apps
npm run build   # turbo run build
```

## Notes
- `node_modules/` is committed in this repo by mistake — it should be gitignored and removed in a cleanup pass. Do not copy it when cloning.
- Never commit real secrets — use a local `.env` file.
