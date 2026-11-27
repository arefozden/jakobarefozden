# KUT – Læringsportal

En statisk læringsportal for **Konseptutvikling og programmering (VG1)**. Bygget med HTML, CSS og JavaScript. Ingen rammeverk, server eller database er nødvendig.

## Publiser på GitHub Pages

1. Opprett et nytt GitHub-repository, for eksempel `kut-laeringsportal`.
2. Last opp **innholdet i denne mappen** til roten av repositoryet (`index.html`, `assets/`, `data/`, `eksempler/`). Ikke last opp den opprinnelige `.git`-mappen.
3. Gå til **Settings → Pages → Build and deployment**. Velg **Deploy from a branch**, `main` og `/ (root)`, og lagre.
4. Åpne Pages-adressen GitHub viser, typisk `https://BRUKERNAVN.github.io/kut-laeringsportal/`.

## Legg til nye eksempler

1. Opprett en mappe, for eksempel `eksempler/JavaScript/objekter/`, og legg inn `index.html`, `script.js` og `style.css`.
2. Åpne `data/innhold.json` og legg til ett objekt i `items`-listen:

```json
{
  "section": "JavaScript",
  "title": "Objekter",
  "url": "eksempler/JavaScript/objekter/index.html",
  "kind": "eksempel",
  "description": "Lær å bruke objekter i JavaScript.",
  "order": 100
}
```

3. Commit og push. GitHub Pages publiserer oppdateringen automatisk.

For en ny hovedkategori, legg til et objekt i `sections` i `data/innhold.json`, og eventuelt et symbol i `icons` i `assets/app.js`.

## Struktur

- `index.html` – portalens forside
- `assets/style.css` – farger, responsivt design og komponenter
- `assets/app.js` – søk, filtrering, temaer og kort
- `data/innhold.json` – innholdsregister (endre her når nye temaer legges til)
- `eksempler/` – originale undervisningsfiler fra ZIP-arkivet
- `build.py` – engangsverktøy brukt til å opprette første innholdsregister; trenger ikke kjøres ved publisering

## Merknader

De originale eksempelprosjektene er beholdt, inkludert minikurset Testing og feilsøking og feil/riktig-versjonene. Enkelte eldre eksempler er selvstendige øvelser, ikke ferdige leksjoner. De kan åpnes direkte via biblioteket. Nettstedet bør åpnes via GitHub Pages eller lokal HTTP-server; direkte `file://`-åpning av forsiden kan blokkere innlasting av JSON.
