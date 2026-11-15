# Artistry Gallery Frontend

React + TypeScript + Vite frontend for the Artistry Gallery application. The frontend and backend are maintained as separate projects and Git repositories.

## Features

- Google OAuth authentication
- Painting catalog with pagination
- Auction bidding interface
- Shopping cart functionality
- Stripe checkout integration
- Light/dark mode with custom Daisy UI themes (pastel, aqua)
- i18n support (English/Polish)
- Currency conversion using NBP API
- Phone input with country codes and flags
- Admin photo upload with drag and drop sorting
- Legal pages (Terms, Privacy)

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running in Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Local Environment Variables

Create a `.env` file in the project root (gitignored):

```bash
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=995827113545-eljgj7lpk0jannjvieacsgc932r1kh9h.apps.googleusercontent.com
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Production Deployment (Cloudflare Pages)

### Environment Variables

Set these in Cloudflare Pages dashboard:

```bash
VITE_API_URL=https://your-render-app.onrender.com
VITE_GOOGLE_CLIENT_ID=995827113545-eljgj7lpk0jannjvieacsgc932r1kh9h.apps.googleusercontent.com
```

### Google OAuth Configuration

Add your production frontend URL to Google OAuth console:
- Authorized JavaScript origins: `https://your-site.pages.dev`
- Authorized redirect URIs: `https://your-site.pages.dev`

### Deployment Steps

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

## Project Structure

```
src/
  components/      Reusable components (Navbar, GoogleLoginButton, PhotoUpload)
  contexts/        React contexts (Auth, Theme, Currency)
  i18n/            Translation files (en.json, pl.json)
  lib/             Utilities (api, auth, currency)
  pages/           Page components (Home, Paintings, Auctions, Cart, etc.)
  App.tsx          Main app with routing
  main.tsx         Entry point
  index.css        Tailwind CSS directives
```

## Technologies

- React 18
- TypeScript
- Vite
- React Router
- TailwindCSS
- DaisyUI
- React i18next
- Axios
- react-phone-input-2
- @dnd-kit (drag and drop)

## Themes

The application uses two custom Daisy UI themes:

- **Pastel** (light mode) - Soft, pastel colors
- **Aqua** (dark mode) - Deep blue-green tones

Themes automatically switch based on browser preference, with manual toggle available in the navbar.

## Currency Conversion

The frontend fetches exchange rates from the National Bank of Poland (NBP) public API for indicative price display. Rates are cached for 24 hours. All actual transactions are processed in PLN.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run linter
