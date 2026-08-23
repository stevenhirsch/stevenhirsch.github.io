# stevenhirsch.ca

Minimal static portfolio site for Steven Hirsch: bio, publications, writing, and consulting
contact. Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

## Structure

- `index.html`, `publications.html`, `writing.html`, `consulting.html`: the site's four pages.
- `assets/css/style.css`: shared stylesheet.
- `assets/js/publications.js`: renders `data/publications.json` on the Publications page.
- `data/publications.json`: the publications list. Kept fresh automatically (see below).
- `data/publications_ignore.json`: ORCID put-codes to skip during auto-sync (e.g. works
  incorrectly auto-matched to this ORCID iD by Crossref).
- `scripts/sync_orcid_publications.py`: pulls new works from the ORCID public API and adds
  any not already present in `data/publications.json`.
- `.github/workflows/update-publications.yml`: runs the sync script weekly and opens a pull
  request when new publications are found, so nothing goes live without a quick review.

## Local preview

```sh
python3 -m http.server
```

Then open http://localhost:8000.

## Custom domain (stevenhirsch.ca)

The `CNAME` file in the repo root and the GitHub Pages "custom domain" setting handle the
GitHub side. At your DNS provider:

- Root `A` records for `stevenhirsch.ca` → `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`
- `CNAME` record for `www` → `stevenhirsch.github.io`

Once DNS propagates, enable "Enforce HTTPS" in the repo's Pages settings.
