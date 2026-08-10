# Learn Arabic — Gate A28 (Self-contained PWA)

A static GitHub Pages Progressive Web App for Arabic alphabet practice.

## Features

- Learn, Flashcards and Quiz modes
- English / Amharic explanations
- Individual Arabic letter pronunciation through the device Arabic speech voice
- Offline app shell using a service worker
- Add to Home Screen setup instructions
- Arabic voice installation instructions for iPhone
- No Google Fonts, remote audio, CDN, API, or other runtime web dependency

## GitHub Pages

1. Create a new GitHub repository, for example `learn-arabic`.
2. Upload `index.html`, `manifest.json`, `sw.js`, `README.md`, and the `icons` folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Open the GitHub Pages URL in Safari.

## iPhone offline setup

1. Open the GitHub Pages URL in Safari while online.
2. Let the app load completely.
3. Tap **Add to Home Screen** inside the app and follow the instructions.
4. Install an Arabic speech voice at:
   **Settings → Accessibility → Spoken Content → Voices → Arabic**.
5. Download the Arabic voice.
6. Return to the app and test **Play Arabic alphabet — OFFLINE**.
7. Turn on Airplane Mode and reopen the Home Screen app.

The website files themselves are cached by the service worker. Pronunciation uses the device's local Arabic speech engine; the voice must be downloaded to the device once.
