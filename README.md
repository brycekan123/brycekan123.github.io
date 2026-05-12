# brycekan123.github.io

Personal academic portfolio website for Bryce Kan. Built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme.

---

## Run Locally

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
# Start the dev server (first time pulls the Docker image)
docker compose up

# Site runs at http://localhost:8080
# Rebuild after changing dependencies
docker compose up --build

# Stop
docker compose down
```

Hard-refresh (`Cmd+Shift+R`) in the browser after rebuilds to clear cache.

---

## Key Files to Edit

| File                              | What it controls                                    |
| --------------------------------- | --------------------------------------------------- |
| `_pages/about.md`                 | Homepage bio, experience, education                 |
| `_bibliography/papers.bib`        | Publications (BibTeX)                               |
| `_news/`                          | News/announcements                                  |
| `_data/socials.yml`               | Social links (email, GitHub, LinkedIn, Strava)      |
| `_data/cv.yml`                    | CV page content                                     |
| `_pages/contact.md`               | Contact page (map, form, photo)                     |
| `_sass/_layout.scss`              | Custom CSS overrides                                |
| `assets/img/`                     | Images (profile photo, publication previews, logos) |
| `assets/img/publication_preview/` | Publication thumbnail images                        |
| `assets/pdf/resume.pdf`           | CV/resume PDF                                       |
| `_config.yml`                     | Site-wide settings (name, URL, scholar config)      |

---

## What Was Customized

- Personalized bio, experience, and education on the about page
- USC and UW logos added to education section
- Publications added via BibTeX with preview images (ramem.png, jobrec.png, neuron.png)
- News announcements: USC enrollment, USC ML Center RA, Job Rec arXiv, Honeywell internship, Dec 2026 graduation
- Contact page with USC campus photo, Google Maps embed, and Formspree contact form
- Social icons: email, GitHub, LinkedIn, Strava
- Nav order: about, cv, publications, contact (blog/projects/repositories hidden)
- Profile photo enlarged to 36% width
- Section headers enlarged via `_sass/_layout.scss`
- `.claude/` added to `.gitignore`

---

## Deploy

Pushing to `main` triggers the GitHub Actions deploy workflow, which builds the site and pushes to the `gh-pages` branch. GitHub Pages serves from `gh-pages`.

```bash
git add -A
git commit -m "your message"
git push origin main
```
