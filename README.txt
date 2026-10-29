T06-1: Interactive Histogram (Filtering)
Sakib Ahmed | COS30045

Open index.html using VS Code Live Server.
Alternative: run python -m http.server 8000 from this folder, then open
http://localhost:8000 in Chrome. CSV loading requires a local server.

Updated to match the tutorial example:
- Compact orange-and-cream layout with gray bars.
- 200 kWh/year histogram bins and labeled axes.
- All, LED, LCD, and OLED technology filters.
- All Sizes, 24, 32, 55, 65, and 98 inch filters.
- Technology and size filters combine; empty results show a message.
- Animated bar updates, keyboard buttons, reduced-motion support.
- Fixed axes include all supplied records, including values above 1800.
- Supplied CSV unchanged; D3 v7 bundled locally.

Verification: bin totals and all 24 technology/size combinations checked.
Code completed with AI assistance; review it and follow your unit's
requirements for disclosure before submission.

T06-2 completed in this same project:
- Scatterplot below the histogram: star rating (x), energy consumption (y).
- All 3,703 supplied records plotted as semi-transparent circles without strokes.
- LED/LCD/OLED colors and legend.
- SVG tooltip with screen size on mouseenter; hidden on mouseleave.
- Separate scatterplot scales and inner chart group.
- Histogram filters continue to control only the histogram.
- Automated checks passed for point count, positions, technology colors,
  tooltip content/show/hide, and all 24 histogram filter combinations.
- Chrome visual verification was blocked by an open extension UI.
