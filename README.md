# Metalabs — Icon Sheet Builder Pro Website

A responsive product website for Metalabs and its primary Adobe Illustrator extension, Icon Sheet Builder Pro.

## Product represented

Icon Sheet Builder Pro v14.1.8 automates icon-sheet production inside Adobe Illustrator 23+. The website presents its verified capabilities from the supplied extension source:

- Icon Sheet Builder mode
- Folder-based Batch Converter
- Active-artboard Batch Icon Export
- AI, EPS, SVG, PNG and JPG imports
- Grid size, margin, columns, rows and X/Y gap controls
- Optional filenames and system font selection
- Icon grouping
- Illustrator Image Trace with ignore-white support
- Dynamic `.ai` template text detection/replacement
- Custom large icon per sheet
- Smart colors for large icons, grid icons, icon backgrounds and sheet backgrounds
- AI, EPS, EPS10, SVG, PNG and JPG exports
- Process limits, progress reporting, saved preferences and updates
- Machine-linked license activation and trial-credit flow

## Roadmap

Only two products are shown:

1. **Icon Sheet Builder Pro** — current main product
2. **Meta Data Tool — Metalabs Pro** — pending Adobe Stock SEO metadata tool

## Structure

```text
metalabs-website/
├── index.html
├── css/
│   ├── styles.css
│   └── product.css
├── js/
│   └── main.js
├── assets/
│   ├── logo-mark.svg
│   ├── icon-sheet-dashboard.png
│   └── icon-sheet-activation.png
└── README.md
```

## Run locally

Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
```

## Before publishing

- Replace `hello@metalabs.example` with the real business email.
- Connect the CTA to the real purchase/download/license flow.
- Add real Privacy, Terms and Licenses pages.
- Confirm product pricing and supported operating systems.

The site has no external framework or runtime dependency.