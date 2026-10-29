// T06-2: energy consumption (y) versus star rating (x).
const drawScatterplot = data => {
    const scatterData = data.filter(d => Number.isFinite(d.star) && Number.isFinite(d.screenSize));
    xScaleS.domain([0, d3.max(scatterData, d => d.star) || 1]).nice();
    yScaleS.domain([0, d3.max(scatterData, d => d.energyConsumption) || 1]).nice();
    const svg = d3.select('#scatterplot').append('svg')
        .attr('viewBox', `0 0 ${width} ${scatterHeight}`)
        .attr('role', 'img').attr('aria-labelledby', 'scatter-title scatter-description');
    svg.append('title').attr('id', 'scatter-title').text('TV energy consumption by star rating');
    svg.append('desc').attr('id', 'scatter-description')
        .text('Each point represents a TV record. The horizontal axis shows star rating, the vertical axis shows annual energy consumption. Color shows LED, LCD, or OLED. Hover to reveal screen size.');
    innerChartS = svg.append('g')
        .attr('transform', `translate(${scatterMargin.left},${scatterMargin.top})`);
    innerChartS.append('g').attr('class', 'scatter-points').selectAll('circle')
        .data(scatterData).join('circle').attr('class', 'tv-point')
        .attr('cx', d => xScaleS(d.star)).attr('cy', d => yScaleS(d.energyConsumption))
        .attr('r', 4).attr('fill', d => colorScale(d.screenTech))
        .attr('opacity', 0.5).attr('stroke', 'none');
    innerChartS.append('g').attr('class', 'axis')
        .attr('transform', `translate(0,${scatterInnerHeight})`)
        .call(d3.axisBottom(xScaleS).ticks(10));
    innerChartS.append('g').attr('class', 'axis')
        .call(d3.axisLeft(yScaleS).ticks(7).tickFormat(d3.format(',d')));
    svg.append('text').attr('class', 'axis-label').attr('text-anchor', 'middle')
        .attr('x', scatterMargin.left + scatterInnerWidth / 2).attr('y', scatterHeight - 15)
        .text('Star rating');
    svg.append('text').attr('class', 'axis-label').attr('text-anchor', 'middle')
        .attr('transform', `translate(18,${scatterMargin.top + scatterInnerHeight / 2}) rotate(-90)`)
        .text('Annual energy consumption (kWh/year)');
    const legend = svg.append('g').attr('class', 'scatter-legend')
        .attr('transform', `translate(${scatterMargin.left},15)`);
    const items = legend.selectAll('g').data(colorScale.domain()).join('g')
        .attr('transform', (d, i) => `translate(${i * 95},0)`);
    items.append('circle').attr('r', 5).attr('fill', d => colorScale(d));
    items.append('text').attr('x', 11).attr('y', 4).text(d => d);
};
