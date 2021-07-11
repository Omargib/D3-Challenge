// @TODO: YOUR CODE HERE!
var width = parseInt(d3.select("#scatter").style("width"))
var height = width * .75

var margins = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20
 }

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart")

d3.csv("assets/data/data.csv").then(data => buildchart(data))

function buildchart(data){
    var currentx = "poverty"
    var currenty = "obesity"
    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => parseFloat(d[currentx])), d3.max(data, d => parseFloat(d[currentx]))])
        .range([0, width])
    var yScale = d3.scaleLinear()
        .domain([d3.min(data, d => parseFloat(d[currenty])), d3.max(data, d => parseFloat(d[currenty]))])
        .range([0, height])
    var xaxis = d3.axisBottom(xScale)
    var yaxis = d3.axisLeft(yScale)
    svg.append('g')
        .call(xaxis)
        .attr('transform', 'translate(0, ' + (height - margins.bottom) + ')')
    var temp = "1"
    svg.append('g')
    .call(yaxis)
    .attr('transform', 'translate(' + margins.left + ', 0)')
 
}
