# Birkneh T. Tadesse Website

This is now a **fully static GitHub Pages site** (no Jekyll build required).

## Structure
- `index.html`: Home/profile page
- `assets/css/site.css`: Main styling
- `assets/images/profile.jpg`: Profile image
- `writing/index.html`: Blog listing page
- `writing/*.html`: Individual blog posts
- `Tadesse_CV_4FEB26.pdf`: Downloadable CV
- `.nojekyll`: Forces GitHub Pages to serve static files directly

## Deploy
1. Push to GitHub.
2. In repo `Settings` -> `Pages`:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
3. Wait 1-2 minutes.

Live URL:
- `https://birkneh.github.io/NEWsite/`

## Add a new blog post
1. Copy one existing file in `writing/` and rename it, for example:
   - `writing/my-new-post.html`
2. Update the title, date, and content in that file.
3. Add a new card link inside `writing/index.html`.
4. Add the same link to the "Latest Writing" section in `index.html`.
5. Commit and push.
