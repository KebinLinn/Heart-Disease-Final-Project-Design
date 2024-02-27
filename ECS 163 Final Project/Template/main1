document.body.style.backgroundColor = "#1e1e21";



var svg = d3.select("svg");
var heartsData = d3.range(30);
var heartSize = 100; 
var heartPadding = 30; 

var heartsPerRow = 10; 
var numRows = 3;

var svgWidth = heartsPerRow * (heartSize + heartPadding);
var svgHeight = numRows * (heartSize + heartPadding);
var margin = { top: 20, right: 20, bottom: 20, left: 20 };

svg.attr("width", svgWidth + margin.left + margin.right)
   .attr("height", svgHeight + margin.top + margin.bottom);

var heartPath = "M10,30 A20,20 0 0,1 50,30 A20,20 0 0,1 90,30 Q90,60 50,90 Q10,60 10,30 Z";

svg.selectAll(".heart")
  .data(heartsData)
  .enter()
  .append("path")
    .attr("class", "heart")
    .attr("d", heartPath)
    .attr("transform", function(d, i) {
        var x = (i % heartsPerRow) * (heartSize + heartPadding) + margin.left;
        var y = Math.floor(i / heartsPerRow) * (heartSize + heartPadding) + margin.top;
        return "translate(" + x + "," + y + ")"; 
    })
    .style("fill", "red");
