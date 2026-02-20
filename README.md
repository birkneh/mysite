# Birkneh T. Tadesse Website (GitHub Pages + Blog)

This repository is configured as a **Jekyll** site for GitHub Pages.

## Structure
- `index.html`: Homepage (profile + advocacy positioning + latest writing)
- `writing.html`: Blog index page
- `_posts/`: Blog posts in Markdown
- `_layouts/`: Reusable page templates
- `assets/css/site.css`: Main styling
- `Tadesse_CV_4FEB26.pdf`: Downloadable CV

## Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Open your repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: your default branch (usually `main`)
   - Folder: `/ (root)`
5. Save.
6. GitHub will publish the site at:
   - `https://<your-username>.github.io/<repo-name>/`

## Add a new blog post
1. Create a new file in `_posts/` using this format:
   - `YYYY-MM-DD-your-title.md`
2. Add front matter at the top:

```md
---
layout: post
title: "Your post title"
---
Your content goes here.
```

3. Commit and push. GitHub Pages rebuilds automatically.

## Local preview (optional)
If you want to preview exactly how GitHub Pages will render the site:

1. Install Ruby and Bundler.
2. Install Jekyll: `gem install jekyll bundler`.
3. From this repository, run: `jekyll serve`.
4. Open `http://127.0.0.1:4000`.

## Optional: user site URL
If your repo is named `<your-username>.github.io`, your site URL becomes:
- `https://<your-username>.github.io/`
