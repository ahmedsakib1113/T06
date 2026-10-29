# T06: Interactive TV Energy Visualizations

COS30045 Data Visualisation — Sakib Ahmed

Live site: https://ahmedsakib1113.github.io/T06/

## Exercises

- **T06-1:** Energy-consumption histogram with 200 kWh/year bins, screen-technology filters, screen-size filters, and animated updates.
- **T06-2:** Energy consumption versus star rating scatterplot, technology colors and legend, and screen-size hover tooltips.

Both exercises appear on the same page. Histogram filters control the histogram; the scatterplot displays the full dataset.

## Run

Open `index.html` with VS Code Live Server, or run `python -m http.server 8000` from this folder and open http://localhost:8000.

## Data and dependencies

- Supplied `data/Ex6_TVdata.csv`: 3,703 TV records, downloaded January 2025 for the tutorial.
- D3 v7 is bundled in `js/vendor/d3.v7.min.js`; its license notice is preserved.

## Verification

Automated checks covered histogram bin totals, all 24 technology/size filter combinations, scatterplot point count and positions, technology colors, and tooltip content/show/hide.

## AI assistance

Implementation completed with AI assistance. Review the code and follow the unit's requirements for disclosure before submission.
