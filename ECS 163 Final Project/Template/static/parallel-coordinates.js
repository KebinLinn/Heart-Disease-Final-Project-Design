document.addEventListener("DOMContentLoaded", function() {
let parallelLeft = 0
let parallelTop = 0;
let parallelMargin = { top: 50, right: 700, bottom: 100, left: 400 },
  parallelWidth = 900, // Adjusted width based on your layout needs
  parallelHeight = 500; // Adjusted height for demonstration

document.body.style.backgroundColor = "#1e1e21";

    //plot3 
    d3.csv("/static/heart.csv").then(rawData => {
      console.log("rawData", rawData);
      rawData.forEach(function (d) {
        d.age = +d.age;
        d.sex = +d.sex;
        d.cp = +d.cp;
        d.trestbps = +d.trestbps;
        d.chol = +d.chol;
        d.fbs = +d.fbs;
        d.restecg = +d.restecg;
        d.thalach = +d.thalach;
        d.exang = +d.exang;
        d.oldpeak = +d.oldpeak;
        d.slope = +d.slope;
        d.ca = +d.ca;
        d.thal = +d.thal;
        d.target = d.target === "1"; // Assuming target is "1" for presence of heart disease
      });
      const svg = d3.select("#parallel-coordinates-plot svg")
      .attr("width", parallelWidth + parallelMargin.left + parallelMargin.right)
      .attr("height", parallelHeight + parallelMargin.top + parallelMargin.bottom)
      .append("g")
      .attr("transform", "translate(" + parallelMargin.left + "," + parallelMargin.top + ")");
  


svg.append("text")
    .attr("id", "patientInfoDisplay")
    .attr("x", parallelWidth + parallelMargin.left + 20)
    .attr("y", 150)
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .attr("fill", "purple")
    .text("Patient Details:");

      const dimensions = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'target'];

      const y = {};
      dimensions.forEach(function (key) {
        y[key] = d3.scaleLinear()
          .domain(d3.extent(rawData, function (d) { return +d[key]; }))
          .range([parallelHeight, 0]);
      });

      const x = d3.scalePoint()
        .domain(dimensions)
        .range([0, parallelWidth]);

      const line = d => d3.line()(dimensions.map(function (key) { return [x(key), y[key](d[key])]; }));

      const g1 = svg.append("g")
        .attr("transform", `translate(${parallelMargin.left}, ${parallelMargin.top})`);

      g1.append("text")
        .attr("fill", "#FFFFFF")
        .attr("x", parallelWidth - 400)
        .attr("y", -parallelMargin.top )
        .attr("text-anchor", "middle")
        .style("font-size", "24px")
        .text("Heart Disease Parallel Coordinate Plot (Red = Alive, Blue otherwise");

      g1.append("g").attr("class", "foreground")
        .selectAll("path")
        .data(rawData)
        .enter().append("path")
        .attr("d", line)
        .style("stroke", function (d) { return d.target ? "#527ef6" : "red"; }) // #527ef6 for target = 1, red otherwise
        .style("fill", "none")
        .on("click", function (event, d) {
          d3.select("#patientInfoDisplay").selectAll("*").remove();
          d3.select("#patientInfoDisplay")
            .append("tspan")
            .attr("x", 500)
            .attr("dy", "1.2em")
            .attr("fill", "white")
            .style("font-size", "12px")

          // Add other attributes as tspans
          const attributes = [
            `Age: ${d.age}`,
            `Sex: ${d.sex === 1 ? 'Male' : 'Female'}`,
            `Chest Pain Type: ${d.cp}`,
            `Resting Blood Pressure: ${d.trestbps} mm Hg`,
            `Cholesterol: ${d.chol} mg/dl`,
            `Fasting Blood Sugar > 120 mg/dl: ${d.fbs === 1 ? 'Yes' : 'No'}`,
            `Resting ECG: ${d.restecg}`, // Depending on your data, you might want to convert this to a more descriptive format
            `Max Heart Rate: ${d.thalach}`,
            `Exercise Induced Angina: ${d.exang === 1 ? 'Yes' : 'No'}`,
            `Oldpeak: ${d.oldpeak}`,
            `Slope: ${d.slope}`, // Same here, consider converting numeric values to descriptions
            `Number of Major Vessels: ${d.ca}`,
            `Thalassemia: ${d.thal}`, // Consider providing descriptions for the values
            `Heart Disease: ${d.target === true ? 'Present' : 'Absent'}`
          ];

          attributes.forEach((attr, index) => {
            d3.select("#patientInfoDisplay")
              .append("tspan")
              .attr("x", 1320)
              .attr("dy", "1.2em")
              .attr("fill", "white")
              .text(attr);
          });
        });
      const g = g1.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; });

      g.append("g")
        .attr("class", "axis")
        .each(function (d) { d3.select(this).call(d3.axisLeft(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("y", -9)
        .attr("fill", "white") // set the axis labels to white
        .text(function (d) { return d; });
      g.selectAll(".axis path, .axis line")
        .attr("stroke", "white");
      g.selectAll(".axis text")
        .attr("fill", "white");
    }).catch(function (err) {
      console.error(err);
    });
});