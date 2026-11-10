# ETHIO SCOUT — Ethiopian Football Scouting Platform

A GitHub Pages scouting and analytics workspace built from the supplied Ethiopian league dataset.

## Included
- Season selector, league table and season overview charts
- Searchable player directory with club, position and nationality filters
- Two-player comparison radar and metric panels
- Team results analysis using goals for/against per match, points per match and goal difference
- Season-by-season auto-generated scouting snapshots
- Extracted match centre
- Approximate club-city map
- Local scout observation workspace with CSV export

## Deploy on GitHub from iPhone
1. Create a public repository named `ethiopian-football-scouting-platform` (or use your existing repository).
2. Upload `index.html`, `data.json`, and `README.md` to the repository root. Upload the files themselves, not this ZIP.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then Save.
6. Wait for GitHub Pages to publish the site.

## Important data integrity notes
The supplied source includes 2,835 player-season squad records, 88 standings rows, 108 extracted match rows, nine season metric rows, 52 club labels and five season labels.

The source does **not** contain event-level technical/tactical data or physical tracking. No passing accuracy, key passes, xG, progressive carries, duels, pressing actions, possession zones, sprint distance, top speed, GPS or workload data is fabricated here. Team analysis is based only on league outcomes. Player radar values are normalized profile descriptors (rating index, height, age and market value), not performance grades.

Club map pins are approximate city-level locations inferred from club names, not verified stadium coordinates. Match extraction and season snapshots may be incomplete or captured at different dates. Verify player identity, club and season against primary sources before decisions.

The scout workspace stores notes in browser local storage on the device and exports CSV; it does not send observations to a server.
