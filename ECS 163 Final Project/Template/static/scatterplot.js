document.addEventListener("DOMContentLoaded", function () {
    // Define dimensions for the graph
    let scatterMargin = { top: 50, right: 20, bottom: 150, left: 80 },
        scatterWidth = 700 - scatterMargin.left - scatterMargin.right - 400,
        scatterHeight = 250 - scatterMargin.top - scatterMargin.bottom + 120;

    // Select the SVG element, assuming it has 'width' and 'height' attributes
    const svg = d3.select("#scatterplot")
        .attr("width", scatterWidth * 5 + scatterMargin.left * 6 + scatterMargin.right * 4)
        .attr("height", scatterHeight * 2 + scatterMargin.top * 3 + scatterMargin.bottom);

    // Load your data
    d3.csv("/static/heart.csv").then(rawData => {
        // Process data
        rawData.forEach(function (d, i) {
            d.age = +d.age;
            d.trestbps = +d.trestbps;
            d.chol = +d.chol;
            d.oldpeak = +d.oldpeak;
            d.target = +d.target; // Add target conversion
            d.thalach = +d.thalach
            d.id = i; // Add unique ID to each entry
        });

        // First graph: Age vs Trestbps
        const g1 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left+300}, ${scatterMargin.top})`);

        // Titles and labels for g1
        g1.append("text")
            .attr("x", scatterWidth / 2 + 700)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "28px")
            .style("fill", "white")
            .text("Scatterplot (Six categories)")

        // Axis labels for g1
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

        // Scales for g1
        const x1 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y1 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.trestbps)])
            .range([scatterHeight, 0]);

        // X and Y axes for g1
        const xAxisCall1 = d3.axisBottom(x1).ticks(7);
        g1.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall1)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall1 = d3.axisLeft(y1).ticks(13);
        g1.append("g").call(yAxisCall1)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g1
        g1.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x1(d.age))
            .attr("cy", d => y1(d.trestbps))
            .attr("r", 3)
            .style("fill", "#527ef6");

        // Second graph: Age vs Cholesterol
        const g2 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 2 + scatterWidth+300}, ${scatterMargin.top})`);

        // Titles and labels for g2
        g2.append("text")
            .attr("x", scatterWidth / 2 )
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g2
        g2.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Age");

        g2.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Cholesterol");

        // Scales for g2
        const x2 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y2 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.chol)])
            .range([scatterHeight, 0]);

        // X and Y axes for g2
        const xAxisCall2 = d3.axisBottom(x2).ticks(7);
        g2.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall2)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall2 = d3.axisLeft(y2).ticks(13);
        g2.append("g").call(yAxisCall2)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g2
        g2.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x2(d.age))
            .attr("cy", d => y2(d.chol))
            .attr("r", 3)
            .style("fill", "#527ef6");


        // Third graph: Age vs Thalach
        const g3 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 3 + scatterWidth * 2+300}, ${scatterMargin.top})`);

        // Titles and labels for g3
        g3.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g3
        g3.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Age");

        g3.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Thalach");

        // Scales for g3
        const x3 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y3 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.thalach)])
            .range([scatterHeight, 0]);

        // X and Y axes for g3
        const xAxisCall3 = d3.axisBottom(x3).ticks(7);
        g3.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall3)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall3 = d3.axisLeft(y3).ticks(13);
        g3.append("g").call(yAxisCall3)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g3
        g3.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x3(d.age))
            .attr("cy", d => y3(d.thalach))
            .attr("r", 3)
            .style("fill", "#527ef6");

        // Fourth graph: Age vs Oldpeak
        const g4 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 4 + scatterWidth * 3+300}, ${scatterMargin.top})`);

        // Titles and labels for g4
        g4.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g4
        g4.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Age");

        g4.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Oldpeak");

        // Scales for g4
        const x4 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y4 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.oldpeak)])
            .range([scatterHeight, 0]);

        // X and Y axes for g4
        const xAxisCall4 = d3.axisBottom(x4).ticks(7);
        g4.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall4)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall4 = d3.axisLeft(y4).ticks(13);
        g4.append("g").call(yAxisCall4)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g4
        g4.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x4(d.age))
            .attr("cy", d => y4(d.oldpeak))
            .attr("r", 3)
            .style("fill", "#527ef6");


        // Fifth graph: Age vs Target
        const g5 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 5 + scatterWidth * 4+300}, ${scatterMargin.top})`);

        // Titles and labels for g5
        g5.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g5
        g5.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Age");

        g5.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Target");

        // Scales for g5
        const x5 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y5 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([scatterHeight, 0]);

        // X and Y axes for g5
        const xAxisCall5 = d3.axisBottom(x5).ticks(7);
        g5.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall5)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall5 = d3.axisLeft(y5).ticks(2).tickFormat(d => d === 0 ? "No" : "Yes");
        g5.append("g").call(yAxisCall5)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g5
        g5.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x5(d.age))
            .attr("cy", d => y5(d.target))
            .attr("r", 3)
            .style("fill", "#527ef6");



        // Sixth graph: Age vs Age (just for demonstration)
        const g6 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 6 + scatterWidth * 5+300}, ${scatterMargin.top})`);

        // Titles and labels for g6
        g6.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g6
        g6.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Age");

        g6.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Age");

        // Scales for g6
        const x6 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([0, scatterWidth]);

        const y6 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([scatterHeight, 0]);

        // X and Y axes for g6
        const xAxisCall6 = d3.axisBottom(x6).ticks(7);
        g6.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall6)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall6 = d3.axisLeft(y6).ticks(7);
        g6.append("g").call(yAxisCall6)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g6
        g6.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x6(d.age))
            .attr("cy", d => y6(d.age))
            .attr("r", 3)
            .style("fill", "#527ef6");




        // Seventh graph: Target vs Trestbps
        const g7 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left+300}, ${scatterMargin.top * 2 + scatterHeight})`);

        // Titles and labels for g7
        g7.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g7
        g7.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Target");

        g7.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Trestbps");

        // Scales for g7
        const x7 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([0, scatterWidth]);

        const y7 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.trestbps)])
            .range([scatterHeight, 0]);

        // X and Y axes for g7
        const xAxisCall7 = d3.axisBottom(x7).ticks(2);
        g7.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall7)
            .selectAll("text")
            .style("fill", "white");

        const yAxisCall7 = d3.axisLeft(y7).ticks(13);
        g7.append("g").call(yAxisCall7)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g7
        g7.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x7(d.target))
            .attr("cy", d => y7(d.trestbps))
            .attr("r", 3)
            .style("fill", "#527ef6");


        // Eighth graph: Target vs Cholesterol
        const g8 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 2 + scatterWidth+300}, ${scatterMargin.top * 2 + scatterHeight})`);

        // Titles and labels for g8
        g8.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g8
        g8.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Target");

        g8.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Cholesterol");

        // Scales for g8
        const x8 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([0, scatterWidth]);

        const y8 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.chol)])
            .range([scatterHeight, 0]);

        // X and Y axes for g8
        const xAxisCall8 = d3.axisBottom(x8).ticks(2);
        g8.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall8)
            .selectAll("text")
            .style("fill", "white");

        const yAxisCall8 = d3.axisLeft(y8).ticks(13);
        g8.append("g").call(yAxisCall8)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g8
        g8.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x8(d.target))
            .attr("cy", d => y8(d.chol))
            .attr("r", 3)
            .style("fill", "#527ef6");






        // Ninth graph: Target vs Thalach
        const g9 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 3 + scatterWidth * 2+300}, ${scatterMargin.top * 2 + scatterHeight})`);

        // Titles and labels for g9
        g9.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g9
        g9.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Target");

        g9.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Thalach");

        // Scales for g9
        const x9 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([0, scatterWidth]);

        const y9 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.thalach)])
            .range([scatterHeight, 0]);

        // X and Y axes for g9
        const xAxisCall9 = d3.axisBottom(x9).ticks(2);
        g9.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall9)
            .selectAll("text")
            .style("fill", "white");

        const yAxisCall9 = d3.axisLeft(y9).ticks(13);
        g9.append("g").call(yAxisCall9)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g9
        g9.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x9(d.target))
            .attr("cy", d => y9(d.thalach))
            .attr("r", 3)
            .style("fill", "#527ef6");


        // Tenth graph: Target vs Oldpeak
        const g10 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 4 + scatterWidth * 3+300}, ${scatterMargin.top * 2 + scatterHeight})`);

        // Titles and labels for g10
        g10.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g10
        g10.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Target");

        g10.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Oldpeak");

        // Scales for g10
        const x10 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([0, scatterWidth]);

        const y10 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.oldpeak)])
            .range([scatterHeight, 0]);

        // X and Y axes for g10
        const xAxisCall10 = d3.axisBottom(x10).ticks(2);
        g10.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall10)
            .selectAll("text")
            .style("fill", "white");

        const yAxisCall10 = d3.axisLeft(y10).ticks(13);
        g10.append("g").call(yAxisCall10)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g10
        g10.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x10(d.target))
            .attr("cy", d => y10(d.oldpeak))
            .attr("r", 3)
            .style("fill", "#527ef6");




        // Eleventh graph: Target vs Target (for demonstration)
        const g11 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 5 + scatterWidth * 4+300}, ${scatterMargin.top * 2 + scatterHeight})`);

        // Titles and labels for g11
        g11.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g11
        g11.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Target");

        g11.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Target");

        // Scales for g11
        const x11 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([0, scatterWidth]);

        const y11 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([scatterHeight, 0]);

        // X and Y axes for g11
        const xAxisCall11 = d3.axisBottom(x11).ticks(2);
        g11.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall11)
            .selectAll("text")
            .style("fill", "white");

        const yAxisCall11 = d3.axisLeft(y11).ticks(2);
        g11.append("g").call(yAxisCall11)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g11
        g11.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x11(d.target))
            .attr("cy", d => y11(d.target))
            .attr("r", 3)
            .style("fill", "#527ef6");






        // Twelfth graph: Target vs Age
        const g12 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left * 6 + scatterWidth * 5+300}, ${scatterMargin.top * 2 + scatterHeight})`);
        // Titles and labels for g12
        g12.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g12
        g12.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Target");

        g12.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Age");

        // Scales for g12
        const x12 = d3.scaleLinear()
            .domain([0, 1]) // Assuming target is binary (0 or 1)
            .range([0, scatterWidth]);

        const y12 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.age)])
            .range([scatterHeight, 0]);

        // X and Y axes for g12
        const xAxisCall12 = d3.axisBottom(x12).ticks(2).tickFormat(d => d === 0 ? "No" : "Yes");
        g12.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall12)
            .selectAll("text")
            .style("fill", "white");

        const yAxisCall12 = d3.axisLeft(y12).ticks(7);
        g12.append("g").call(yAxisCall12)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g12
        g12.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x12(d.target))
            .attr("cy", d => y12(d.age))
            .attr("r", 3)
            .style("fill", "#527ef6");





        // Thirteenth graph: Oldpeak vs Trestbps
        const g13 = svg.append("g")
            .attr("transform", `translate(${scatterMargin.left+300}, ${scatterMargin.top * 3 + scatterHeight * 2})`);

        // Titles and labels for g13
        g13.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", -scatterMargin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("fill", "white")

        // Axis labels for g13
        g13.append("text")
            .attr("x", scatterWidth / 2)
            .attr("y", scatterHeight + 50)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .style("fill", "white")
            .text("Oldpeak");

        g13.append("text")
            .attr("x", -(scatterHeight / 2))
            .attr("y", -40)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .style("fill", "white")
            .text("Trestbps");

        // Scales for g13
        const x13 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.oldpeak)])
            .range([0, scatterWidth]);

        const y13 = d3.scaleLinear()
            .domain([0, d3.max(rawData, d => d.trestbps)])
            .range([scatterHeight, 0]);

        // X and Y axes for g13
        const xAxisCall13 = d3.axisBottom(x13).ticks(7);
        g13.append("g")
            .attr("transform", `translate(0, ${scatterHeight})`)
            .call(xAxisCall13)
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")
            .style("fill", "white");

        const yAxisCall13 = d3.axisLeft(y13).ticks(13);
        g13.append("g").call(yAxisCall13)
            .selectAll("text")
            .style("fill", "white");

        // Plot points for g13
        g13.selectAll("circle").data(rawData)
            .enter().append("circle")
            .attr("cx", d => x13(d.oldpeak))
            .attr("cy", d => y13(d.trestbps))
            .attr("r", 3)
            .style("fill", "#527ef6");


// Fourteenth graph: Oldpeak vs Cholesterol
const g14 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 2 + scatterWidth+300}, ${scatterMargin.top * 3 + scatterHeight * 2})`);

// Titles and labels for g14
g14.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g14
g14.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Oldpeak");

g14.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Cholesterol");

// Scales for g14
const x14 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([0, scatterWidth]);

const y14 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([scatterHeight, 0]);

// X and Y axes for g14
const xAxisCall14 = d3.axisBottom(x14).ticks(7);
g14.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall14)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall14 = d3.axisLeft(y14).ticks(13);
g14.append("g").call(yAxisCall14)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g14
g14.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x14(d.oldpeak))
    .attr("cy", d => y14(d.chol))
    .attr("r", 3)
    .style("fill", "#527ef6");


    // Fifteenth graph: Oldpeak vs Thalach
const g15 = svg.append("g")
.attr("transform", `translate(${scatterMargin.left * 3 + scatterWidth * 2+300}, ${scatterMargin.top * 3 + scatterHeight * 2})`);

// Titles and labels for g15
g15.append("text")
.attr("x", scatterWidth / 2)
.attr("y", -scatterMargin.top / 2)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("fill", "white")

// Axis labels for g15
g15.append("text")
.attr("x", scatterWidth / 2)
.attr("y", scatterHeight + 50)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.style("fill", "white")
.text("Oldpeak");

g15.append("text")
.attr("x", -(scatterHeight / 2))
.attr("y", -40)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.style("fill", "white")
.text("Thalach");

// Scales for g15
const x15 = d3.scaleLinear()
.domain([0, d3.max(rawData, d => d.oldpeak)])
.range([0, scatterWidth]);

const y15 = d3.scaleLinear()
.domain([0, d3.max(rawData, d => d.thalach)])
.range([scatterHeight, 0]);

// X and Y axes for g15
const xAxisCall15 = d3.axisBottom(x15).ticks(7);
g15.append("g")
.attr("transform", `translate(0, ${scatterHeight})`)
.call(xAxisCall15)
.selectAll("text")
.attr("y", "10")
.attr("x", "-5")
.attr("text-anchor", "end")
.attr("transform", "rotate(-40)")
.style("fill", "white");

const yAxisCall15 = d3.axisLeft(y15).ticks(13);
g15.append("g").call(yAxisCall15)
.selectAll("text")
.style("fill", "white");

// Plot points for g15
g15.selectAll("circle").data(rawData)
.enter().append("circle")
.attr("cx", d => x15(d.oldpeak))
.attr("cy", d => y15(d.thalach))
.attr("r", 3)
.style("fill", "#527ef6");



// Sixteenth graph: Oldpeak vs Oldpeak
const g16 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 4 + scatterWidth * 3+300}, ${scatterMargin.top * 3 + scatterHeight * 2})`);

// Titles and labels for g16
g16.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g16
g16.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Oldpeak");

g16.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Oldpeak");

// Scales for g16
const x16 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([0, scatterWidth]);

const y16 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([scatterHeight, 0]);

// X and Y axes for g16
const xAxisCall16 = d3.axisBottom(x16).ticks(7);
g16.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall16)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall16 = d3.axisLeft(y16).ticks(7);
g16.append("g").call(yAxisCall16)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g16
g16.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x16(d.oldpeak))
    .attr("cy", d => y16(d.oldpeak))
    .attr("r", 3)
    .style("fill", "#527ef6");




    // Seventeenth graph: Oldpeak vs Target
const g17 = svg.append("g")
.attr("transform", `translate(${scatterMargin.left * 5 + scatterWidth * 4+300}, ${scatterMargin.top * 3 + scatterHeight * 2})`);

// Titles and labels for g17
g17.append("text")
.attr("x", scatterWidth / 2)
.attr("y", -scatterMargin.top / 2)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("fill", "white")

// Axis labels for g17
g17.append("text")
.attr("x", scatterWidth / 2)
.attr("y", scatterHeight + 50)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.style("fill", "white")
.text("Oldpeak");

g17.append("text")
.attr("x", -(scatterHeight / 2))
.attr("y", -40)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.style("fill", "white")
.text("Target");

// Scales for g17
const x17 = d3.scaleLinear()
.domain([0, d3.max(rawData, d => d.oldpeak)])
.range([0, scatterWidth]);

const y17 = d3.scaleLinear()
.domain([0, 1]) // Assuming target is binary (0 or 1)
.range([scatterHeight, 0]);

// X and Y axes for g17
const xAxisCall17 = d3.axisBottom(x17).ticks(7);
g17.append("g")
.attr("transform", `translate(0, ${scatterHeight})`)
.call(xAxisCall17)
.selectAll("text")
.attr("y", "10")
.attr("x", "-5")
.attr("text-anchor", "end")
.attr("transform", "rotate(-40)")
.style("fill", "white");

const yAxisCall17 = d3.axisLeft(y17).ticks(2).tickFormat(d => d === 0 ? "No" : "Yes");
g17.append("g").call(yAxisCall17)
.selectAll("text")
.style("fill", "white");

// Plot points for g17
g17.selectAll("circle").data(rawData)
.enter().append("circle")
.attr("cx", d => x17(d.oldpeak))
.attr("cy", d => y17(d.target))
.attr("r", 3)
.style("fill", "#527ef6");





// Eighteenth graph: Oldpeak vs Age
const g18 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 6 + scatterWidth * 5+300}, ${scatterMargin.top * 3 + scatterHeight * 2})`);

// Titles and labels for g18
g18.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g18
g18.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Oldpeak");

g18.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Age");

// Scales for g18
const x18 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([0, scatterWidth]);

const y18 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.age)])
    .range([scatterHeight, 0]);

// X and Y axes for g18
const xAxisCall18 = d3.axisBottom(x18).ticks(7);
g18.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall18)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall18 = d3.axisLeft(y18).ticks(7);
g18.append("g").call(yAxisCall18)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g18
g18.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x18(d.oldpeak))
    .attr("cy", d => y18(d.age))
    .attr("r", 3)
    .style("fill", "#527ef6");



// Nineteenth graph: Thalach vs Trestbps
const g19 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left+300}, ${scatterMargin.top * 4 + scatterHeight * 3})`);

// Titles and labels for g19
g19.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g19
g19.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Thalach");

g19.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Trestbps");

// Scales for g19
const x19 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([0, scatterWidth]);

const y19 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([scatterHeight, 0]);

// X and Y axes for g19
const xAxisCall19 = d3.axisBottom(x19).ticks(7);
g19.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall19)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall19 = d3.axisLeft(y19).ticks(7);
g19.append("g").call(yAxisCall19)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g19
g19.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x19(d.thalach))
    .attr("cy", d => y19(d.trestbps))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Twentieth graph: Thalach vs Cholesterol
const g20 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 2 + scatterWidth+300}, ${scatterMargin.top * 4 + scatterHeight * 3})`);

// Titles and labels for g20
g20.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g20
g20.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Thalach");

g20.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Cholesterol");

// Scales for g20
const x20 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([0, scatterWidth]);

const y20 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([scatterHeight, 0]);

// X and Y axes for g20
const xAxisCall20 = d3.axisBottom(x20).ticks(7);
g20.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall20)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall20 = d3.axisLeft(y20).ticks(7);
g20.append("g").call(yAxisCall20)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g20
g20.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x20(d.thalach))
    .attr("cy", d => y20(d.chol))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Twenty-first graph: Thalach vs Thalach
const g21 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 3 + scatterWidth * 2+300}, ${scatterMargin.top * 4 + scatterHeight * 3})`);

// Titles and labels for g21
g21.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g21
g21.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Thalach");

g21.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Thalach");

// Scales for g21
const x21 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([0, scatterWidth]);

const y21 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([scatterHeight, 0]);

// X and Y axes for g21
const xAxisCall21 = d3.axisBottom(x21).ticks(7);
g21.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall21)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall21 = d3.axisLeft(y21).ticks(7);
g21.append("g").call(yAxisCall21)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g21
g21.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x21(d.thalach))
    .attr("cy", d => y21(d.thalach))
    .attr("r", 3)
    .style("fill", "#527ef6");









// Twenty-second graph: Thalach vs Oldpeak
const g22 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 4 + scatterWidth * 3+300}, ${scatterMargin.top * 4 + scatterHeight * 3})`);

// Titles and labels for g22
g22.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g22
g22.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Thalach");

g22.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Oldpeak");

// Scales for g22
const x22 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([0, scatterWidth]);

const y22 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([scatterHeight, 0]);

// X and Y axes for g22
const xAxisCall22 = d3.axisBottom(x22).ticks(7);
g22.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall22)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall22 = d3.axisLeft(y22).ticks(7);
g22.append("g").call(yAxisCall22)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g22
g22.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x22(d.thalach))
    .attr("cy", d => y22(d.oldpeak))
    .attr("r", 3)
    .style("fill", "#527ef6");




// Twenty-third graph: Thalach vs Target
const g23 = svg.append("g")
.attr("transform", `translate(${scatterMargin.left * 5 + scatterWidth * 4+300}, ${scatterMargin.top * 4 + scatterHeight * 3})`);

// Titles and labels for g23
g23.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g23
g23.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Thalach");

g23.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Target");

// Scales for g23
const x23 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([0, scatterWidth]);

const y23 = d3.scaleLinear()
    .domain([0, 1]) // Assuming Target is binary (0 or 1)
    .range([scatterHeight, 0]);

// X and Y axes for g23
const xAxisCall23 = d3.axisBottom(x23).ticks(7);
g23.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall23)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall23 = d3.axisLeft(y23).ticks(2).tickFormat(d => d == 0 ? "No Disease" : "Disease");
g23.append("g").call(yAxisCall23)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g23
g23.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x23(d.thalach))
    .attr("cy", d => y23(d.target))
    .attr("r", 3)
    .style("fill", "#527ef6");










// Twenty-fourth graph: Thalach vs Age
const g24 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 6 + scatterWidth * 5+300}, ${scatterMargin.top * 4 + scatterHeight * 3})`);

// Titles and labels for g24
g24.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g24
g24.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Thalach");

g24.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Age");

// Scales for g24
const x24 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([0, scatterWidth]);

const y24 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.age)])
    .range([scatterHeight, 0]);

// X and Y axes for g24
const xAxisCall24 = d3.axisBottom(x24).ticks(7);
g24.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall24)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall24 = d3.axisLeft(y24).ticks(7);
g24.append("g").call(yAxisCall24)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g24
g24.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x24(d.thalach))
    .attr("cy", d => y24(d.age))
    .attr("r", 3)
    .style("fill", "#527ef6");




// Twenty-fifth graph: Cholesterol vs Trestbps
const g25 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left+300}, ${scatterMargin.top * 5 + scatterHeight * 4})`);

// Titles and labels for g25
g25.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g25
g25.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Cholesterol");

g25.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Trestbps");

// Scales for g25
const x25 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([0, scatterWidth]);

const y25 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([scatterHeight, 0]);

// X and Y axes for g25
const xAxisCall25 = d3.axisBottom(x25).ticks(7);
g25.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall25)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall25 = d3.axisLeft(y25).ticks(13);
g25.append("g").call(yAxisCall25)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g25
g25.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x25(d.chol))
    .attr("cy", d => y25(d.trestbps))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Twenty-sixth graph: Cholesterol vs Cholesterol
const g26 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 2 + scatterWidth+300}, ${scatterMargin.top * 5 + scatterHeight * 4})`);

// Titles and labels for g26
g26.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g26
g26.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Cholesterol");

g26.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Cholesterol");

// Scales for g26
const x26 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([0, scatterWidth]);

const y26 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([scatterHeight, 0]);

// X and Y axes for g26
const xAxisCall26 = d3.axisBottom(x26).ticks(7);
g26.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall26)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall26 = d3.axisLeft(y26).ticks(13);
g26.append("g").call(yAxisCall26)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g26
g26.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x26(d.chol))
    .attr("cy", d => y26(d.chol))
    .attr("r", 3)
    .style("fill", "#527ef6");




// Twenty-seventh graph: Cholesterol vs Thalach
const g27 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 3 + scatterWidth * 2+300}, ${scatterMargin.top * 5 + scatterHeight * 4})`);

// Titles and labels for g27
g27.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g27
g27.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Cholesterol");

g27.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Thalach");

// Scales for g27
const x27 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([0, scatterWidth]);

const y27 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([scatterHeight, 0]);

// X and Y axes for g27
const xAxisCall27 = d3.axisBottom(x27).ticks(7);
g27.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall27)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall27 = d3.axisLeft(y27).ticks(13);
g27.append("g").call(yAxisCall27)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g27
g27.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x27(d.chol))
    .attr("cy", d => y27(d.thalach))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Twenty-eighth graph: Cholesterol vs Oldpeak
const g28 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 4 + scatterWidth * 3+300}, ${scatterMargin.top * 5 + scatterHeight * 4})`);

// Titles and labels for g28
g28.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g28
g28.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Cholesterol");

g28.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Oldpeak");

// Scales for g28
const x28 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([0, scatterWidth]);

const y28 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([scatterHeight, 0]);

// X and Y axes for g28
const xAxisCall28 = d3.axisBottom(x28).ticks(7);
g28.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall28)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall28 = d3.axisLeft(y28).ticks(7);
g28.append("g").call(yAxisCall28)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g28
g28.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x28(d.chol))
    .attr("cy", d => y28(d.oldpeak))
    .attr("r", 3)
    .style("fill", "#527ef6");




// Twenty-ninth graph: Cholesterol vs Target
const g29 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 5 + scatterWidth * 4+300}, ${scatterMargin.top * 5 + scatterHeight * 4})`);

// Titles and labels for g29
g29.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g29
g29.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Cholesterol");

g29.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Target");

// Scales for g29
const x29 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([0, scatterWidth]);

const y29 = d3.scalePoint()
    .domain([0, 1]) // Target is binary (0 or 1)
    .range([scatterHeight, 0]);

// X and Y axes for g29
const xAxisCall29 = d3.axisBottom(x29).ticks(7);
g29.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall29)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall29 = d3.axisLeft(y29).ticks(2).tickFormat(d => d === 0 ? "No Disease" : "Disease");
g29.append("g").call(yAxisCall29)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g29
g29.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x29(d.chol))
    .attr("cy", d => y29(d.target))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Thirtieth graph: Cholesterol vs Age
const g30 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 6 + scatterWidth * 5+300}, ${scatterMargin.top * 5 + scatterHeight * 4})`);

// Titles and labels for g30
g30.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g30
g30.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Cholesterol");

g30.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Age");

// Scales for g30
const x30 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([0, scatterWidth]);

const y30 = d3.scaleLinear()
    .domain([d3.min(rawData, d => d.age), d3.max(rawData, d => d.age)])
    .range([scatterHeight, 0]);

// X and Y axes for g30
const xAxisCall30 = d3.axisBottom(x30).ticks(7);
g30.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall30)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall30 = d3.axisLeft(y30).ticks(7);
g30.append("g").call(yAxisCall30)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g30
g30.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x30(d.chol))
    .attr("cy", d => y30(d.age))
    .attr("r", 3)
    .style("fill", "#527ef6");




// Thirty-first graph: Trestbps vs Trestbps
const g31 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left+300}, ${scatterMargin.top * 6 + scatterHeight * 5})`);

// Titles and labels for g31
g31.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g31
g31.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Trestbps");

g31.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Trestbps");

// Scales for g31
const x31 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([0, scatterWidth]);

const y31 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([scatterHeight, 0]);

// X and Y axes for g31
const xAxisCall31 = d3.axisBottom(x31).ticks(7);
g31.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall31)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall31 = d3.axisLeft(y31).ticks(7);
g31.append("g").call(yAxisCall31)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g31
g31.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x31(d.trestbps))
    .attr("cy", d => y31(d.trestbps))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Thirty-second graph: Trestbps vs Cholesterol
const g32 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 2 + scatterWidth+300}, ${scatterMargin.top * 6 + scatterHeight * 5})`);

// Titles and labels for g32
g32.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g32
g32.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Trestbps");

g32.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Cholesterol");

// Scales for g32
const x32 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([0, scatterWidth]);

const y32 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.chol)])
    .range([scatterHeight, 0]);

// X and Y axes for g32
const xAxisCall32 = d3.axisBottom(x32).ticks(7);
g32.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall32)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall32 = d3.axisLeft(y32).ticks(7);
g32.append("g").call(yAxisCall32)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g32
g32.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x32(d.trestbps))
    .attr("cy", d => y32(d.chol))
    .attr("r", 3)
    .style("fill", "#527ef6");







// Thirty-third graph: Trestbps vs Thalach
const g33 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 3 + scatterWidth * 2+300}, ${scatterMargin.top * 6 + scatterHeight * 5})`);

// Titles and labels for g33
g33.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g33
g33.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Trestbps");

g33.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Thalach");

// Scales for g33
const x33 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([0, scatterWidth]);

const y33 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.thalach)])
    .range([scatterHeight, 0]);

// X and Y axes for g33
const xAxisCall33 = d3.axisBottom(x33).ticks(7);
g33.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall33)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall33 = d3.axisLeft(y33).ticks(7);
g33.append("g").call(yAxisCall33)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g33
g33.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x33(d.trestbps))
    .attr("cy", d => y33(d.thalach))
    .attr("r", 3)
    .style("fill", "#527ef6");







// Thirty-fourth graph: Trestbps vs Oldpeak
const g34 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 4 + scatterWidth * 3+300}, ${scatterMargin.top * 6 + scatterHeight * 5})`);

// Titles and labels for g34
g34.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g34
g34.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Trestbps");

g34.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Oldpeak");

// Scales for g34
const x34 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([0, scatterWidth]);

const y34 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.oldpeak)])
    .range([scatterHeight, 0]);

// X and Y axes for g34
const xAxisCall34 = d3.axisBottom(x34).ticks(7);
g34.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall34)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall34 = d3.axisLeft(y34).ticks(7);
g34.append("g").call(yAxisCall34)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g34
g34.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x34(d.trestbps))
    .attr("cy", d => y34(d.oldpeak))
    .attr("r", 3)
    .style("fill", "#527ef6");





    

// Thirty-fifth graph: Trestbps vs Target
const g35 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 5 + scatterWidth * 4+300}, ${scatterMargin.top * 6 + scatterHeight * 5})`);

// Titles and labels for g35
g35.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g35
g35.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Trestbps");

g35.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Target");

// Scales for g35
const x35 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([0, scatterWidth]);

const y35 = d3.scalePoint()
    .domain([0, 1]) // Target is binary (0 or 1)
    .range([scatterHeight, 0]);

// X and Y axes for g35
const xAxisCall35 = d3.axisBottom(x35).ticks(7);
g35.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall35)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall35 = d3.axisLeft(y35).ticks(2).tickFormat(d => d === 0 ? "No Disease" : "Disease");
g35.append("g").call(yAxisCall35)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g35
g35.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x35(d.trestbps))
    .attr("cy", d => y35(d.target))
    .attr("r", 3)
    .style("fill", "#527ef6");






// Thirty-sixth graph: Trestbps vs Age
const g36 = svg.append("g")
    .attr("transform", `translate(${scatterMargin.left * 6 + scatterWidth * 5+300}, ${scatterMargin.top * 6 + scatterHeight * 5})`);

// Titles and labels for g36
g36.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", -scatterMargin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")

// Axis labels for g36
g36.append("text")
    .attr("x", scatterWidth / 2)
    .attr("y", scatterHeight + 50)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .style("fill", "white")
    .text("Trestbps");

g36.append("text")
    .attr("x", -(scatterHeight / 2))
    .attr("y", -40)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text("Age");

// Scales for g36
const x36 = d3.scaleLinear()
    .domain([0, d3.max(rawData, d => d.trestbps)])
    .range([0, scatterWidth]);

const y36 = d3.scaleLinear()
    .domain([d3.min(rawData, d => d.age), d3.max(rawData, d => d.age)])
    .range([scatterHeight, 0]);

// X and Y axes for g36
const xAxisCall36 = d3.axisBottom(x36).ticks(7);
g36.append("g")
    .attr("transform", `translate(0, ${scatterHeight})`)
    .call(xAxisCall36)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .style("fill", "white");

const yAxisCall36 = d3.axisLeft(y36).ticks(7);
g36.append("g").call(yAxisCall36)
    .selectAll("text")
    .style("fill", "white");

// Plot points for g36
g36.selectAll("circle").data(rawData)
    .enter().append("circle")
    .attr("cx", d => x36(d.trestbps))
    .attr("cy", d => y36(d.age))
    .attr("r", 3)
    .style("fill", "#527ef6");


// Add this after setting up your scales and axes
var brush = d3.brush()
.extent([[0, 0], [scatterWidth, scatterHeight]])
.on("brush", brushed);
g1.append("g")
.attr("class", "brush")
.call(brush);
function brushed() {
    var selection = d3.brushSelection(this);
    let selectedIds = []; // Use an array to hold the selected ids
    // Select and style circles based on the brush selection in g1
    g1.selectAll("circle")
      .style("fill", function (d) {
        var cx = x1(d.age), // Assuming these are the correct scales for your data
            cy = y1(d.trestbps);
        var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
        if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
        return isSelected ? "red" : "#527ef6";
      });
      var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
      graphsArray.forEach(function(graph) {
        graph.selectAll("circle")
          .style("fill", function(d) {
            var isHighlighted = selectedIds.includes(d.id);
            return isHighlighted ? "red" : "#527ef6";
          });
      });
    }
    

    var brush2 = d3.brush()
    .extent([[0, 0], [scatterWidth, scatterHeight]])
    .on("brush", brushed2);
  
  g2.append("g")
    .attr("class", "brush")
    .call(brush2);
  
  function brushed2() {
    var selection = d3.brushSelection(this);
    let selectedIds = []; // Use an array to hold the selected ids
    // Select and style circles based on the brush selection in g2
    g2.selectAll("circle")
      .style("fill", function (d) {
        var cx = x2(d.age), // Assuming these are the correct scales for your data
            cy = y2(d.chol);
        var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
        if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
        return isSelected ? "red" : "#527ef6";
      });
    // Apply highlighting to other graphs based on selected IDs
    var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36]; // Exclude g2 since it's already selected
    graphsArray.forEach(function(graph) {
      graph.selectAll("circle")
        .style("fill", function(d) {
          var isHighlighted = selectedIds.includes(d.id);
          return isHighlighted ? "red" : "#527ef6";
        });
    });
}

var brush3 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed3);

g3.append("g")
  .attr("class", "brush")
  .call(brush3);

function brushed3() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g3
  g3.selectAll("circle")
    .style("fill", function (d) {
      var cx = x3(d.age), // Assuming these are the correct scales for your data
          cy = y3(d.thalach);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36]; // Exclude g3 since it's already selected
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}


var brush4 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed4);

g4.append("g")
  .attr("class", "brush")
  .call(brush4);

function brushed4() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g4
  g4.selectAll("circle")
    .style("fill", function (d) {
      var cx = x4(d.age), // Assuming these are the correct scales for your data
          cy = y4(d.oldpeak);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}

var brush5 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed5);

g5.append("g")
  .attr("class", "brush")
  .call(brush5);

function brushed5() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g5
  g5.selectAll("circle")
    .style("fill", function (d) {
      var cx = x5(d.age), // Assuming these are the correct scales for your data
          cy = y5(d.target);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}


var brush6 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed6);

g6.append("g")
  .attr("class", "brush")
  .call(brush6);

function brushed6() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g6
  g6.selectAll("circle")
    .style("fill", function (d) {
      var cx = x6(d.age), // Assuming these are the correct scales for your data
          cy = y6(d.age);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush7 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed7);

g7.append("g")
  .attr("class", "brush")
  .call(brush7);

function brushed7() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g7
  g7.selectAll("circle")
    .style("fill", function (d) {
      var cx = x7(d.trestbps), // Assuming these are the correct scales for your data
          cy = y7(d.target);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush8 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed8);

g8.append("g")
  .attr("class", "brush")
  .call(brush8);

function brushed8() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g8
  g8.selectAll("circle")
    .style("fill", function (d) {
      var cx = x8(d.tresbps), // Assuming these are the correct scales for your data
          cy = y8(d.chol);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush13 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed13);

g13.append("g")
  .attr("class", "brush")
  .call(brush13);

function brushed13() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g13
  g13.selectAll("circle")
    .style("fill", function (d) {
      var cx = x13(d.oldpeak), // Assuming these are the correct scales for your data
          cy = y13(d.trestbps);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}






var brush14 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed14);

g14.append("g")
  .attr("class", "brush")
  .call(brush14);

function brushed14() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g14
  g14.selectAll("circle")
    .style("fill", function (d) {
      var cx = x14(d.oldpeak), // Assuming these are the correct scales for your data
          cy = y14(d.chol);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}



var brush15 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed15);

g15.append("g")
  .attr("class", "brush")
  .call(brush15);

function brushed15() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g15
  g15.selectAll("circle")
    .style("fill", function (d) {
      var cx = x15(d.oldpeak), // Assuming these are the correct scales for your data
          cy = y15(d.thalach);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush16 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed16);

g16.append("g")
  .attr("class", "brush")
  .call(brush16);

function brushed16() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g16
  g16.selectAll("circle")
    .style("fill", function (d) {
      var cx = x16(d.oldpeak), // Assuming these are the correct scales for your data
          cy = y16(d.oldpeak);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}






var brush17 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed17);

g17.append("g")
  .attr("class", "brush")
  .call(brush17);

function brushed17() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g17
  g17.selectAll("circle")
    .style("fill", function (d) {
      var cx = x17(d.oldpeak), // Assuming these are the correct scales for your data
          cy = y17(d.target);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}







var brush18 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed18);

g18.append("g")
  .attr("class", "brush")
  .call(brush18);

function brushed18() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g18
  g18.selectAll("circle")
    .style("fill", function (d) {
      var cx = x18(d.oldpeak), // Assuming these are the correct scales for your data
          cy = y18(d.age);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush19 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed19);

g19.append("g")
  .attr("class", "brush")
  .call(brush19);

function brushed19() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g19
  g19.selectAll("circle")
    .style("fill", function (d) {
      var cx = x19(d.thalach), // Assuming these are the correct scales for your data
          cy = y19(d.trestbps);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush20 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed20);

g20.append("g")
  .attr("class", "brush")
  .call(brush20);

function brushed20() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g20
  g20.selectAll("circle")
    .style("fill", function (d) {
      var cx = x20(d.thalach), // Assuming these are the correct scales for your data
          cy = y20(d.chol);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}



var brush21 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed21);

g21.append("g")
  .attr("class", "brush")
  .call(brush21);

function brushed21() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g21
  g21.selectAll("circle")
    .style("fill", function (d) {
      var cx = x21(d.trestbps), // Assuming these are the correct scales for your data
          cy = y21(d.thalach);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}







var brush22 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed22);

g22.append("g")
  .attr("class", "brush")
  .call(brush22);

function brushed22() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g22
  g22.selectAll("circle")
    .style("fill", function (d) {
      var cx = x22(d.thalach), // Assuming these are the correct scales for your data
          cy = y22(d.oldpeak);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush23 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed23);

g23.append("g")
  .attr("class", "brush")
  .call(brush23);

function brushed23() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g23
  g23.selectAll("circle")
    .style("fill", function (d) {
      var cx = x23(d.thalach), // Assuming these are the correct scales for your data
          cy = y23(d.target);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush24 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed24);

g24.append("g")
  .attr("class", "brush")
  .call(brush24);

function brushed24() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g24
  g24.selectAll("circle")
    .style("fill", function (d) {
      var cx = x24(d.thalach), // Assuming these are the correct scales for your data
          cy = y24(d.age);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}






var brush25 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed25);

g25.append("g")
  .attr("class", "brush")
  .call(brush25);

function brushed25() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g25
  g25.selectAll("circle")
    .style("fill", function (d) {
      var cx = x25(d.chol), // Assuming these are the correct scales for your data
          cy = y25(d.trestbps);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}




var brush26 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed26);

g26.append("g")
  .attr("class", "brush")
  .call(brush26);

function brushed26() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g26
  g26.selectAll("circle")
    .style("fill", function (d) {
      var cx = x26(d.chol), // Assuming these are the correct scales for your data
          cy = y26(d.chol);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}





var brush27 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed27);

g27.append("g")
  .attr("class", "brush")
  .call(brush27);

function brushed27() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g27
  g27.selectAll("circle")
    .style("fill", function (d) {
      var cx = x27(d.chol), // Assuming these are the correct scales for your data
          cy = y27(d.thalach);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}


var brush28 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed28);

g28.append("g")
  .attr("class", "brush")
  .call(brush28);

function brushed28() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g28
  g28.selectAll("circle")
    .style("fill", function (d) {
      var cx = x28(d.chol), // Assuming these are the correct scales for your data
          cy = y28(d.oldpeak);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}


var brush29 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed29);

g29.append("g")
  .attr("class", "brush")
  .call(brush29);

function brushed29() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g29
  g29.selectAll("circle")
    .style("fill", function (d) {
      var cx = x29(d.chol), // Assuming these are the correct scales for your data
          cy = y29(d.target);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}





var brush30 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed30);

g30.append("g")
  .attr("class", "brush")
  .call(brush30);

function brushed30() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g30
  g30.selectAll("circle")
    .style("fill", function (d) {
      var cx = x30(d.chol), // Assuming these are the correct scales for your data
          cy = y30(d.age);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}



var brush31 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed31);

g31.append("g")
  .attr("class", "brush")
  .call(brush31);

function brushed31() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g31
  g31.selectAll("circle")
    .style("fill", function (d) {
      var cx = x31(d.trestbps), // Assuming these are the correct scales for your data
          cy = y31(d.trestbps);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}



var brush32 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed32);

g32.append("g")
  .attr("class", "brush")
  .call(brush32);

function brushed32() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g32
  g32.selectAll("circle")
    .style("fill", function (d) {
      var cx = x32(d.trestbps), // Assuming these are the correct scales for your data
          cy = y32(d.chol);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}


var brush33 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed33);

g33.append("g")
  .attr("class", "brush")
  .call(brush33);

function brushed33() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g33
  g33.selectAll("circle")
    .style("fill", function (d) {
      var cx = x33(d.trestbps), // Assuming these are the correct scales for your data
          cy = y33(d.thalach);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}


var brush34 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed34);

g34.append("g")
  .attr("class", "brush")
  .call(brush34);

function brushed34() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g34
  g34.selectAll("circle")
    .style("fill", function (d) {
      var cx = x34(d.trestbps), // Assuming these are the correct scales for your data
          cy = y34(d.oldpeak);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}

var brush35 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed35);

g35.append("g")
  .attr("class", "brush")
  .call(brush35);

function brushed35() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g35
  g35.selectAll("circle")
    .style("fill", function (d) {
      var cx = x35(d.trestbps), // Assuming these are the correct scales for your data
          cy = y35(d.target);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}

var brush36 = d3.brush()
  .extent([[0, 0], [scatterWidth, scatterHeight]])
  .on("brush", brushed36);

g36.append("g")
  .attr("class", "brush")
  .call(brush36);

function brushed36() {
  var selection = d3.brushSelection(this);
  let selectedIds = []; // Use an array to hold the selected ids
  // Select and style circles based on the brush selection in g36
  g36.selectAll("circle")
    .style("fill", function (d) {
      var cx = x36(d.trestbps), // Assuming these are the correct scales for your data
          cy = y36(d.age);
      var isSelected = (selection[0][0] <= cx && cx <= selection[1][0] && selection[0][1] <= cy && cy <= selection[1][1]);
      if (isSelected) selectedIds.push(d.id); // Add id to the array if selected
      return isSelected ? "red" : "#527ef6";
    });
  // Apply highlighting to other graphs based on selected IDs
  var graphsArray = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20, g21, g22, g23, g24, g25, g26, g27, g28, g29, g30, g31, g32, g33, g34, g35, g36];
  graphsArray.forEach(function(graph) {
    graph.selectAll("circle")
      .style("fill", function(d) {
        var isHighlighted = selectedIds.includes(d.id);
        return isHighlighted ? "red" : "#527ef6";
      });
  });
}











    });
});
