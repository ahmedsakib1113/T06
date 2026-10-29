const drawHistogram = data => {
    // Fix the bins and axis domains using the full dataset.
    const upperBound = (Math.floor(d3.max(data, d => d.energyConsumption) / binWidth) + 1) * binWidth;
    binGenerator.domain([0, upperBound]).thresholds(d3.range(binWidth, upperBound, binWidth));
    const bins = binGenerator(data);
    xScale.domain([0, upperBound]);
    yScale.domain([0, d3.max(bins, d => d.length) || 1]).nice();

    const svg = d3.select('#histogram').append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('role', 'img').attr('aria-labelledby', 'chart-title chart-description');
    svg.append('title').attr('id', 'chart-title').text('Distribution of TV annual energy consumption');
    svg.append('desc').attr('id', 'chart-description')
        .text('Histogram with annual energy consumption in kilowatt-hours on the horizontal axis and number of TV records on the vertical axis. Use the technology buttons to filter.');
    innerChart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);
    innerChart.append('g').attr('class', 'bars');
    innerChart.append('g').attr('class', 'axis')
        .attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale).tickValues(d3.range(0, upperBound + 1, binWidth)));
    innerChart.append('g').attr('class', 'axis').call(d3.axisLeft(yScale).ticks(10).tickFormat(d3.format(',d')));
    svg.append('text').attr('class', 'axis-label').attr('text-anchor', 'end')
        .attr('x', width - margin.right).attr('y', height - 15)
        .text('Labeled Energy Consumption (kWh/year)');
    svg.append('text').attr('class', 'axis-label').attr('text-anchor', 'start')
        .attr('x', margin.left - 40).attr('y', 13)
        .text('Frequency');
    updateHistogram('all', data, false);
};
