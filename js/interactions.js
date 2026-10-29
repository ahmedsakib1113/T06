// Technology and size filters combine; each group has one active button.
const populateFilters = data => {
    const makeButtons = (selector, options, setSelection) => {
        d3.select(selector).selectAll('button').data(options).join('button')
            .attr('type', 'button').attr('class', 'filter')
            .classed('active', d => d.isActive)
            .attr('aria-pressed', d => String(d.isActive)).text(d => d.label)
            .on('click', (event, selected) => {
                options.forEach(option => { option.isActive = option.id === selected.id; });
                setSelection(selected.id);
                d3.select(selector).selectAll('button')
                    .classed('active', d => d.isActive)
                    .attr('aria-pressed', d => String(d.isActive));
                updateHistogram(selectedTechnology, data);
            });
    };
    makeButtons('#filters_screen', filters_screen, id => { selectedTechnology = id; });
    makeButtons('#filters_size', filters_size, id => { selectedSize = id; });
};

const updateHistogram = (filterId, data, animate = true) => {
    const updatedData = data.filter(d =>
        (filterId === 'all' || d.screenTech === filterId) &&
        (selectedSize === 'all' || d.screenSize === selectedSize));
    const updatedBins = binGenerator(updatedData);
    const bars = innerChart.select('.bars').selectAll('rect')
        .data(updatedBins, d => d.x0).join('rect')
        .attr('x', d => xScale(d.x0))
        .attr('width', d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
        .attr('fill', barColor).attr('stroke', bodyBackgroundColor).attr('stroke-width', 1);
    bars.selectAll('title').data(d => [d]).join('title')
        .text(d => `${d.x0}–<${d.x1} kWh/year: ${d.length} TV records`);
    bars.interrupt();
    const duration = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 450 : 0;
    const target = duration ? bars.transition().duration(duration).ease(d3.easeCubicInOut) : bars;
    target.attr('y', d => yScale(d.length)).attr('height', d => innerHeight - yScale(d.length));
    d3.select('#status').text(`${filterId === 'all' ? 'All technologies' : filterId} · ${selectedSize === 'all' ? 'All sizes' : selectedSize + ' inches'}: ${d3.format(',')(updatedData.length)} TV records${updatedData.length ? '' : ' — No matching TVs'}`);
};

// T06-2: create a hidden SVG tooltip above the scatterplot points.
const createTooltip = () => {
    const tooltip = innerChartS.append('g').attr('class', 'tooltip')
        .attr('pointer-events', 'none').attr('aria-hidden', 'true').style('opacity', 0);
    tooltip.append('rect').attr('width', tooltipWidth).attr('height', tooltipHeight)
        .attr('rx', 6).attr('fill', barColor).attr('opacity', 0.95);
    tooltip.append('text').attr('x', tooltipWidth / 2).attr('y', tooltipHeight / 2)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .style('fill', 'white').style('font-size', '14px');
};

const handleMouseEvents = () => {
    const tooltip = innerChartS.select('.tooltip');
    innerChartS.selectAll('.tv-point')
        .on('mouseenter', (event, d) => {
            const cx = +event.target.getAttribute('cx');
            const cy = +event.target.getAttribute('cy');
            const x = Math.max(0, Math.min(scatterInnerWidth - tooltipWidth, cx - tooltipWidth / 2));
            const y = cy > tooltipHeight + 12 ? cy - tooltipHeight - 12 : cy + 12;
            tooltip.select('text').text(`${d.screenSize} inches`);
            tooltip.interrupt().attr('transform', `translate(${x},${y})`)
                .attr('aria-hidden', 'false').raise();
            const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 150;
            if (duration) tooltip.transition().duration(duration).style('opacity', 1);
            else tooltip.style('opacity', 1);
            d3.select(event.target).attr('r', 6).attr('opacity', 1);
        })
        .on('mouseleave', event => {
            tooltip.interrupt().style('opacity', 0).attr('aria-hidden', 'true');
            d3.select(event.target).attr('r', 4).attr('opacity', 0.5);
        });
};
