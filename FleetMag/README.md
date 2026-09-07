# EAL 737 Fleet Magazine — GitHub Flipbook v2

A modern, minimalist, airline-themed monthly magazine library designed for GitHub Pages.

## Features
- Responsive flipbook viewer using PDF.js + StPageFlip.
- Monthly editions library powered by `editions.json`.
- Local PDF preview.
- **Publisher dashboard (`admin.html`)** that can upload a monthly PDF and update `editions.json` through the GitHub Contents API.
- Token is held only in the browser tab and is not stored in the repository.
- GitHub Pages deployment workflow included.

## Deploy
1. Create a new GitHub repository.
2. Upload all files from this folder to the repository's default branch.
3. In GitHub: **Settings → Pages → Source: GitHub Actions**.
4. Wait for the workflow to deploy.
5. Open the Pages URL.

## Monthly publishing
Open `/admin.html` on the published site.

Enter:
- GitHub owner
- Repository name
- Fine-grained GitHub personal access token
- Month/year
- Volume/issue
- Title/subtitle
- Optional cover image path
- PDF

The dashboard uploads the PDF to `magazines/` and updates `editions.json`.

### GitHub token permissions
Create a **fine-grained personal access token** restricted to this repository with:
- Repository access: only this repository
- Contents: Read and write

Do not commit the token or put it in HTML/JavaScript.

### Important
GitHub's Contents API has practical file-size limitations. The included publisher is intentionally limited to PDFs under 20 MB. For larger magazines, use Git LFS or external object storage and store the public PDF URL in `editions.json`.

## Existing issue
The March 2026 EAL 737 Fleet Magazine is included in:
`magazines/eal-737-fleet-magazine-march-2026.pdf`
