# SQUAWK — a flipbook magazine site for pilots

A static, no-backend site: a library page of issues, a page-flip reader, and an
in-browser tool that turns a PDF into a new issue. No server, no database —
every issue lives in this repo as images, and GitHub Pages serves the whole
thing for free.

Rename it in one place: `js/config.js`.

## 1. Put it on GitHub

```bash
cd squawk
git init
git add .
git commit -m "Initial site"
gh repo create squawk --public --source=. --push
# or: create an empty repo on github.com, then
#   git remote add origin https://github.com/<you>/squawk.git
#   git branch -M main
#   git push -u origin main
```

## 2. Turn on GitHub Pages

Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch:
`main`, folder `/ (root)` → Save. Your site goes live at
`https://<you>.github.io/squawk/` within a minute or two.

## 3. Publishing a new issue each month

1. Open the live site (or run it locally, see below) and go to **+ publish
   an issue**.
2. Fill in the issue title, number, month, and year. The slug (folder name)
   fills in automatically.
3. Drag in that month's magazine PDF. It renders every page to an image
   right there in your browser — nothing leaves your machine.
4. Download the `.zip` it produces, and unzip it into
   `magazines/<slug>/` in your local copy of the repo.
5. Copy the JSON snippet the page shows you and paste it as a new entry in
   `data/issues.json` (it's a plain array — add a comma between entries).
6. Commit and push:
   ```bash
   git add magazines data/issues.json
   git commit -m "Add issue: <title>"
   git push
   ```
7. GitHub Pages rebuilds automatically. The new issue appears on the
   library page.

That's the whole monthly loop — no CMS, no login, just a folder of images
and one JSON file.

## Running it locally

Because the pages load `data/issues.json` with `fetch()`, opening
`index.html` directly (`file://…`) won't work — browsers block that for
local files. Serve the folder instead:

```bash
cd squawk
python3 -m http.server 8000
# then open http://localhost:8000
```

## Removing the demo issue

`magazines/demo/` and its entry in `data/issues.json` are placeholders so
the site isn't empty on first load. Delete the `demo` object from
`data/issues.json` and the `magazines/demo/` folder once you've published
a real issue.

## How it works

- **`index.html` / `js/library.js`** — reads `data/issues.json` and
  renders the issue grid.
- **`reader.html` / `js/reader.js`** — the flipbook. Two-page spread on
  wide screens, single page on narrow ones, with a CSS 3D page-turn
  animation. Arrow keys work too.
- **`publish.html` / `js/publish.js`** — uses [pdf.js](https://mozilla.github.io/pdf.js/)
  to rasterize each PDF page to a JPEG in-browser, and
  [JSZip](https://stuk.github.io/jszip/) to package them for download.
- **`data/issues.json`** — the whole "database": one object per issue.

No build step, no npm install, no server code — just files GitHub Pages
can serve as-is.
