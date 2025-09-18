# Recipe Finder

Recipe Finder is a modern web app that helps you decide what to cook with the ingredients already in your kitchen. Add pantry items, filter by diets, and browse curated recipes with printable steps, favorites, and share actions. The UI ships with matching light and dark themes plus a playful footer shout-out to Codedex and GitHub Copilot.

## Demo Preview

![Recipe Finder preview](public/vite.svg)

## Features

- Ingredient-driven recipe search with autocomplete suggestions
- Dietary filters, favorites, and must-have ingredient highlighting
- Theme toggle with polished light/dark palettes
- Printable, email, and share actions for each recipe
- Animated footer rotating credits to Codedex and GitHub Copilot

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (includes npm)

### Clone the Repository

```bash
# clone the project
git clone https://github.com/Mansheu/recipe-finder.git
cd recipe-finder

# install dependencies
npm install
```

### Run the App Locally

```bash
# start the dev server
npm run dev
```

Open the link shown in your terminal (defaults to http://localhost:5173/) to explore the app.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is ready to build the site and publish it to GitHub Pages on every push to `main`. Before deploying, set the `base` option in `vite.config.js` to your repo slug (for example `/recipe-finder/`).

## Project Structure

```
project-root/
|-- public/                # Static assets served as-is
|-- src/
|   |-- App.jsx            # Main React component and layout
|   |-- recipes.js         # Recipe data source
|   |-- ingredients.js     # Autocomplete ingredient list
|   `-- assets/            # UI assets (logos, icons)
|-- package.json
|-- vite.config.js
`-- README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## License

Open-sourced for learning and portfolio use. Please keep a mention of Mansheu when sharing your remix.
