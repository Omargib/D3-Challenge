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
    var currenty = "healthcare"

    var xScale = d3.scaleLinear()
        .domain([d3.min(data, d => parseFloat(d[currentx])), d3.max(data, d => parseFloat(d[currentx]))])
        .range([0, width])
    var yScale = d3.scaleLinear()
        .domain([d3.min(data, d => parseFloat(d[currenty])), d3.max(data, d => parseFloat(d[currenty]))])
        .range([height, 0])
    
    // Add Axis
    var xaxis = d3.axisBottom(xScale)
    var yaxis = d3.axisLeft(yScale)
    svg.append('g')
        .call(xaxis)
        .attr('transform', 'translate(0, ' + (height - margins.bottom) + ')')
    var temp = "1"
    svg.append('g')
    .call(yaxis)
    .attr('transform', 'translate(' + margins.left + ', 0)')
        
    
    // Create Circles
    var circlesGroup = svg.selectAll("circle")
    .data(data)
    .enter()

    circlesGroup.append("circle")
        .attr("cx", d => { return xScale(d.poverty); })
        .attr("cy", d => { return yScale(d.healthcare); })
        .attr("r", "8")
        .attr('class', d => {return "stateCircle" + d.abbr}) 
        .attr("fill", "blue")
        .attr("opacity", ".5");

    // Add circle labels
    circlesGroup.append("text")
            .attr("dy", "0.35em")
            .attr("xScale", d => { return xScale(d.poverty); })
            .attr("yScale", d => { return yScale(d.healthcare); })
            .text(d => { return d.abbr; })
            .attr('class', 'stateText')
            .attr("font-size", "10px");
    // Initialize tooltip
    var toolTip = d3.tip()
     .attr("class", "d3-tip")
     .html(function(d) {
       return  (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}<br>`);
        });
    
    svg.call(toolTip)
    
    // Create listeners
    circlesGroup.on("mouseover", function(data){
        toolTip.show(data, this);
    })
    circlesGroup.on("mouseout", function(data) {
        toolTip.hide(data, this);
    })

}
