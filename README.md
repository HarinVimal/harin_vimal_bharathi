# Harin Vimal Bharathi J - Portfolio

Professional portfolio website foundation built with Angular 21, Tailwind CSS, SCSS, and TypeScript.

## Tech Stack

- Angular 21 (standalone components, signals, Angular Router)
- TypeScript (strict mode)
- Tailwind CSS v4
- SCSS
- ESLint + angular-eslint
- Prettier
- Vercel static hosting

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

## Available Scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm start`            | Run the development server                      |
| `npm run build`        | Create a production build                       |
| `npm run watch`        | Build in watch mode (development configuration) |
| `npm run test`         | Run unit tests                                  |
| `npm run lint`         | Lint TypeScript and Angular templates           |
| `npm run format`       | Format source and config files with Prettier    |
| `npm run format:check` | Check formatting without writing changes        |

## Project Structure

```text
harin_vimal_bharathi/
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── certifications/
│   │   └── branding/
│   ├── icons/
│   ├── fonts/
│   └── documents/
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── shared/
│   │   ├── layout/
│   │   ├── features/
│   │   ├── data/
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   ├── styles/
│   ├── styles.scss
│   ├── tailwind.css
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
├── vercel.json
└── README.md
```

## Vercel Deployment

- **Framework preset**: Angular (or Other)
- **Build command**: `npm run build`
- **Output directory**: `dist/harin-vimal-bharathi/browser`
- **SPA fallback**: configured in `vercel.json` to rewrite all routes to `/index.html`

The application uses static Angular output (no SSR, no backend APIs).

## Phase 1 Status

This phase initializes the Angular foundation only. It includes the project structure, tooling, routing, minimal layout, and minimal section skeletons. Portfolio section designs, animations, sample content, and forms are intentionally not implemented yet.
