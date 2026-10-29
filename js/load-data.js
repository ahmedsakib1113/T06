// Convert numeric CSV fields explicitly, then render only valid energy values.
d3.csv('data/Ex6_TVdata.csv', d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech.trim(),
    energyConsumption: d.energyConsumption.trim() === '' ? NaN : +d.energyConsumption,
    star: +d.star
})).then(rows => {
    const data = rows.filter(d => Number.isFinite(d.energyConsumption) && d.energyConsumption >= 0);
    if (!data.length) throw new Error('No valid energy consumption records found.');
    console.info(`Loaded ${data.length} valid TV records.`, data);
    drawHistogram(data);
    populateFilters(data);
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error('Error loading TV data:', error);
    d3.select('#status').text('Unable to load the TV data. Open this folder with VS Code Live Server or follow README.txt.');
});
