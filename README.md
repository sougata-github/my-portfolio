# Welcome to Portfolio

## Preview of Live Site

## Use it as a Template

This portfolio is built with **Next.js 15** — feel free to use it as a starting point.

### 1. Clone the Repository

```bash
git clone https://github.com/sougata-github/my-portfolio
cd my-portfolio
```

### 2. Install Dependencies

Using pnpm

```bash
pnpm install
```

Using npm

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root and add:

```bash
OPEN_ROUTER_API_KEY=your_openrouter_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

You can get your API keys from:

- [Google AI Studio](https://aistudio.google.com/app/api-keys)
- [OpenRouter](https://openrouter.ai/sign-in?redirect_url=https%3A%2F%2Fopenrouter.ai%2Fsettings%2Fkeys)

### 4. Configure Velite for Production

The project uses `velite` for content generation.
Make sure your package.json has the following scripts:

```json
"scripts": {
  "build:content": "velite --clean",
  "build:next": "next build",
  "dev": "next dev --turbopack",
  "build": "pnpm run build:content && pnpm run build:next",
  "start": "next start"
}
```

For npm, replace `pnpm` run with `npm` run in the build script if needed

### 5. Run Locally

Using pnpm

```bash
pnpm run dev
```

Using npm

```
npm run dev
```

### 6. Deploy to Vercel

This project works seamlessly with Vercel.
Just push your code to GitHub and import it into your [Vercel dashboard](https://vercel.com/new)

## Contributing

Found a bug, idea, or improvement?
Feel free to open an issue or submit a pull request — contributions are always welcome.
