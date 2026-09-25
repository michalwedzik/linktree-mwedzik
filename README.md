# Linktree

Personal Linktree-style page built with [Astro](https://astro.build/) and hosted on GitHub Pages.

Links are managed in Notion and synchronized manually using GitHub Actions.

## How it works

```text
Notion
  ↓
GitHub Actions
  ↓
Notion API
  ↓
links.json
  ↓
Astro build
  ↓
GitHub Pages
```

## Update links

1. Edit links in the Notion database.
2. Open **GitHub → Actions → Sync Notion and Deploy**.
3. Click **Run workflow**.
4. GitHub Actions fetches the latest links from Notion and deploys the page.

## Local development

```bash
npm install
npm run dev
```

Build locally:

```bash
npm run build
```

## Environment variables

The GitHub Actions workflow requires:

* `NOTION_TOKEN`
* `NOTION_DATABASE_ID`

These should be configured as GitHub repository secrets.
