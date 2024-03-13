document.addEventListener("DOMContentLoaded", function() {
    // Define dimensions for the graph
    let scatterMargin = { top: 50, right: 20, bottom: 40, left: 80 },
        scatterWidth = 700 - scatterMargin.left - scatterMargin.right,
        scatterHeight = 250 - scatterMargin.top - scatterMargin.bottom;

    // Select the SVG element, assuming it has 'width' and 'height' attributes
    const svg = d3.select("#scatterplot")
        .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
        .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom);

    const g1 = svg.append("g")
        .attr("transform", `translate(${scatterMargin.left}, ${scatterMargin.top})`);

    // Titles and labels
    g1.append("text")
        .attr("x", scatterWidth + 50)
        .attr("y", -scatterMargin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "white")
        .text("Scatterplot for Age and Numerical Health Conditions");

    // Axis labels
    g1.append("text")
        .attr("x", scatterWidth / 2)
        .attr("y", scatterHeight + 50)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .text("Age");

    g1.append("text")
        .attr("x", -(scatterHeight / 2))
        .attr("y", -40)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill", "white")
        .text("Trestbps");

    // Load your data
    d3.csv("/static/heart.csv").then(rawData => {
        // Process data
        rawData.forEach(function(d) {
            d.age = +d.age;
            d.trestbps = +d.trestbps;
        });

        // Scales
        const x1 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y1 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.trestbps)])
            .range([scatterHeight, 0]);

        // X and Y axes
        const xAxisCall = d3.axisBottom(x1).ticks(7);
        g1.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall = d3.axisLeft(y1).ticks(13);
        g1.append("g").call(yAxisCall)
            .selectAll("text")
            .style("fill", "white");

        // Plot points
        g1.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x1(d.age))
            .attr("cy", d => y1(d.trestbps))
            .attr("r", 3)
            .style("fill", "#527ef6");
    }); 
});
