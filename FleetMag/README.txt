EAL 737 FLEET MAGAZINE — GOOGLE DRIVE PUBLISHING

Files:
- index.html — public magazine archive
- admin.html — publisher dashboard
- editions.json — edition manifest

ONE-TIME SETUP
1. Upload/replace index.html, admin.html and editions.json in your GitHub Pages repository.
2. Open admin.html on your GitHub Pages site.
3. Enter your GitHub owner, repository and fine-grained token with Contents: Read and write.
4. The public Google Drive folder is prefilled.
5. Create a Google Drive API key and restrict it to the Drive API and your GitHub Pages domain.
6. Make each magazine PDF: Anyone with the link → Viewer.

MONTHLY PUBLISHING
1. Put the new PDF into the public Drive folder.
2. Open Publisher dashboard.
3. Enter the Google Drive API key and click Load PDF files from Drive.
4. Click Use this PDF.
5. Month/year/issue/volume are inferred from the filename where possible.
6. Click Generate first-page cover. The dashboard downloads the public PDF in the browser, renders page 1, and prepares a JPG cover.
7. Click Publish edition to GitHub.

WHAT GETS STORED
- The PDF stays in Google Drive.
- The first-page JPG cover is uploaded to magazines/covers/ in GitHub.
- editions.json stores the Drive preview URL plus the GitHub cover path.
- The public archive uses the real first page as the magazine mockup cover.
- For Drive-hosted PDFs, Read edition opens Google's PDF viewer in a new tab to avoid browser CORS issues.

SECURITY
- Never put a GitHub token in editions.json or source code.
- Restrict the Google API key by API and HTTP referrer/domain.
- Do not make private Drive files public just for this site.
