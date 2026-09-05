# Deploying to GitHub Pages

If your website showed a **blank white page** on GitHub Pages, it was caused by one of two things:
1. GitHub Pages was set to deploy directly from the `main` branch root (`/`), which serves uncompiled `.tsx` source code instead of the compiled `dist/` bundle.
2. Missing relative base path (`base: './'`) causing assets (`.js` and `.css`) to return 404 errors.

Both have now been completely resolved in the codebase! Follow either method below to deploy:

---

## Method 1: Automatic Deployment with GitHub Actions (Recommended)

A workflow file has already been added at `.github/workflows/deploy.yml`.

1. Push your code to GitHub on the `main` (or `master`) branch.
2. On GitHub, go to your repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, change the dropdown to **GitHub Actions**.
4. GitHub Actions will automatically trigger, build the website with Vite, and deploy it to GitHub Pages.
5. Your portfolio is now live at `https://<your-username>.github.io/<repo-name>/`!

---

## Method 2: One-Command Deploy via `npm run deploy`

The `gh-pages` package is configured in `package.json`.

1. In your terminal, run:
   ```bash
   npm run deploy
   ```
   This automatically builds your site into `dist/` and pushes the compiled files to a `gh-pages` branch on GitHub.
2. On GitHub, go to **Settings** → **Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Set the **Branch** to `gh-pages` and folder to `/(root)`.
5. Click **Save**. Within 1–2 minutes, your website will be live.

---

## Key Configuration Applied

- **Vite Base Path**: Set to `base: './'` in `vite.config.ts` so all assets load correctly regardless of repository name or custom domain.
- **`.nojekyll`**: Included in `public/` so GitHub Pages serves all assets and folders without Jekyll filtering.
- **`404.html` SPA Fallback**: Automatically created during build to prevent 404 blank screens when refreshing routes.
- **React Error Boundary**: Catches any unforeseen client exceptions and provides a recovery button instead of failing with a white screen.
