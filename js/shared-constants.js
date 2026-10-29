// Shared dimensions, scales, bins, and button state (T06-1 Steps 5–7).
const margin = { top: 30, right: 30, bottom: 55, left: 65 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const barColor = '#606464';
const bodyBackgroundColor = '#fffaf0';
const xScale = d3.scaleLinear().range([0, innerWidth]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);
const binWidth = 200;
const binGenerator = d3.bin().value(d => d.energyConsumption);
const filters_screen = [
    { id: 'all', label: 'All', isActive: true },
    { id: 'LED', label: 'LED', isActive: false },
    { id: 'LCD', label: 'LCD', isActive: false },
    { id: 'OLED', label: 'OLED', isActive: false }
];
let innerChart;

const filters_size = [
    { id: 'all', label: 'All Sizes', isActive: true },
    ...[24, 32, 55, 65, 98].map(size => ({ id: size, label: `${size}"`, isActive: false }))
];
let selectedTechnology = 'all';
let selectedSize = 'all';

// Separate scatterplot scales and chart group prevent histogram conflicts.
const scatterMargin = { top: 40, right: 30, bottom: 60, left: 75 };
const scatterHeight = 450;
const scatterInnerWidth = width - scatterMargin.left - scatterMargin.right;
const scatterInnerHeight = scatterHeight - scatterMargin.top - scatterMargin.bottom;
const xScaleS = d3.scaleLinear().range([0, scatterInnerWidth]);
const yScaleS = d3.scaleLinear().range([scatterInnerHeight, 0]);
const colorScale = d3.scaleOrdinal().domain(['LED', 'LCD', 'OLED'])
    .range(['#0072b2', '#d55e00', '#009e73']);
const tooltipWidth = 118;
const tooltipHeight = 34;
let innerChartS;
