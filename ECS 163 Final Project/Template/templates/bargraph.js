const width = 650;
const height = window.innerHeight;

let typeLeft = 0, typeTop = 400;
let typeMargin = {top: 10, right: 30, bottom: 30, left: 60},
    typeWidth = width - typeMargin.left - typeMargin.right,
    typeHeight = height-450 - typeMargin.top - typeMargin.bottom;

const svg = d3.select("svg")

const g3 = svg.append("g")
    .attr("width", typeWidth + typeMargin.left + typeMargin.right)
    .attr("height", typeHeight + typeMargin.top + typeMargin.bottom)
    .attr("transform", `translate(${typeMargin.left}, ${typeTop})`)



const populationTotal = 300e6;
const heartFailureTotal = 6e6;

const populationByAge = populationDistribution.map(population => population * populationTotal);
const heartFailureByAge = heartFailureDistribution.map(heartfail => heartfail * heartFailureTotal);

const barWidth = 50;

const x = 50;
const y = 350;

const colors = ['blue', 'red'];

    for (let i = 0; i < ageGroups.length; i++) {

        const populationHeight = (populationByAge[i] / populationTotal) * 300;
            svg.innerHTML += `<rect x="${x}" y="${y - populationHeight}" width="${barWidth}" height="${populationHeight}" fill="${'blue'}" />`;

        const heartFailureHeight = (heartFailureByAge[i] / populationTotal) * 300;
            svg.innerHTML += `<rect x="${x}" y="${y - populationHeight - heartFailureHeight}" width="${barWidth}" height="${heartFailureHeight}" fill="${'red'}" />`;

    }

// Chart title
g3.append("text")
.attr("x", typeWidth / 2)
.attr("y", -10)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Total US population to Total with heart failure")

// X label
g3.append("text")
.attr("x", typeWidth / 2)
.attr("y", typeHeight + 50)
.attr("font-size", "15px")
.attr("text-anchor", "middle")
.text("Number of Individuals")

