let typeLeft = 0, typeTop = 400;
let typeMargin = {top: 10, right: 30, bottom: 30, left: 60},
    typeWidth = width - typeMargin.left - typeMargin.right,
    typeHeight = height-450 - typeMargin.top - typeMargin.bottom;



    const g3 = svg.append("g")
    .attr("width", typeWidth + typeMargin.left + typeMargin.right)
    .attr("height", typeHeight + typeMargin.top + typeMargin.bottom)
    .attr("transform", `translate(${typeMargin.left}, ${typeTop})`)

// Chart title
g3.append("text")
.attr("x", typeWidth / 2)
.attr("y", -10)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("Total Battle Statistics of Each Pokemon Type")

// X label
g3.append("text")
.attr("x", typeWidth / 2)
.attr("y", typeHeight + 50)
.attr("font-size", "15px")
.attr("text-anchor", "middle")
.text("Type")


// Y label
g3.append("text")
.attr("x", -(typeHeight / 2))
.attr("y", -40)
.attr("font-size", "15px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text("Total Battle Stats")

// X ticks
const x2 = d3.scaleBand()
.domain(r.map(d => d.Type_1))
.range([0, typeWidth])
.paddingInner(0.3)
.paddingOuter(0.2)