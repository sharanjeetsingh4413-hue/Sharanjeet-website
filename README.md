
# Portfolio Website — Deployment Guide

This repository contains a static portfolio website. Below are simple options to deploy the site and obtain a public link you can share with clients.

Choose one of the deployment methods below.

---

## Option A — GitHub Pages (recommended for simple, free hosting)

1. Create a new GitHub repository (public or private) and push this folder to the `main` branch.

  ```bash
  cd path/to/portfolio-website
  git init
  git add .
  git commit -m "Initial site"
  git branch -M main
  git remote add origin https://github.com/<your-username>/<repo-name>.git
  git push -u origin main
  ```

2. The repository already includes a GitHub Actions workflow `.github/workflows/deploy-gh-pages.yml` that will build and publish the repository root to the `gh-pages` branch whenever you push to `main`.

3. After the action completes, go to the repository `Settings → Pages` and set the source to the `gh-pages` branch (if not set automatically). The site URL will be:

  - `https://<your-username>.github.io/<repo-name>/` (or `https://<org>.github.io/<repo-name>/`)

4. Share that URL with clients.

Notes:
- The Action uses the repository's content as-is and publishes the root directory. If you prefer to serve from `docs/`, change `publish_dir` in the workflow.

---

## Option B — Vercel (one-command, automatic previews)

1. Install Vercel CLI and login, or connect your GitHub account via vercel.com.

  ```bash
  npm i -g vercel
  vercel login
  vercel
  ```

2. Vercel will provide a preview URL immediately and a production URL after you confirm deployment. It also supports automatic deployments from GitHub for each push.

---

## Option C — Netlify (drag-and-drop or Git-based)

1. Drag the project folder (or the built output) into Netlify's Deploy UI, or connect your GitHub repository to Netlify.
2. Netlify will provide a public URL which you can customize.

---

## Getting a Client-Friendly Link

- For GitHub Pages, the URL is `https://<username>.github.io/<repo>/`.
- For Vercel and Netlify, both platforms generate short, shareable URLs and support custom domains.

If you want, I can:

- Create the repository and push the project for you (you'll need to grant repository access or provide a remote URL), or
- Walk you through the exact commands to push and enable GitHub Pages, or
- Deploy to Vercel using the CLI if you provide access to your Vercel account.

Tell me which deployment option you prefer and whether you want me to perform the push (I will need a remote URL or access). If you'd rather do it yourself, I can guide you step-by-step while you run the commands.

# Sharanjeet-website
Professional Website Development &amp; Digital Solutions
