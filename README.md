# Ruby Pictures

Official website for **Ruby Pictures** — an Ethiopian film production company dedicated to capturing stories that matter, led by cinematographer and director Fitsum Beza.

## About

Ruby Pictures creates music videos, short films, and visual content rooted in Ethiopian culture and global storytelling. This site is the public face of that work: a portfolio, a point of contact, and a window into the vision behind the lens.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — dev server and build tool
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [Express](https://expressjs.com/) — backend server
- [MongoDB](https://www.mongodb.com/) — content management

## Getting Started

Requires [Node.js](https://nodejs.org/) (v18+) and npm.

```sh
# Clone the repo
git clone https://github.com/fitsumbeza1/website.git
cd website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site runs at `http://localhost:8080`.

To also run the backend server alongside the frontend:

```sh
npm run start
```

## Project Structure

```
src/
  pages/       # Route-level page components
  components/  # Shared UI components
  contexts/    # React context (CMS, auth, theme)
  hooks/       # Custom hooks
  data/        # Static data
server/        # Express backend
public/        # Static assets
```

## Contact

For bookings and inquiries: [rubypictures.ethiopia@gmail.com](mailto:rubypictures.ethiopia@gmail.com)

Instagram: [@fitsum_beza](https://instagram.com/fitsum_beza)
