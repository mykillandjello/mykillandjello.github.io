var margin3 = {top: 50, right: 250, bottom: 200, left: 200};
var width3 = 1000 - margin.top - margin.bottom;
var height3 = 1000 - margin.left - margin.right;

// append the svg object to the body of the page
var svg3 = d3.select("#slide3")
  .append("svg")
    .attr("width", width3 + margin3.left + margin3.right)
    .attr("height", height3 + margin3.top + margin3.bottom)
  .append('g')
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

d3.csv("data/drivers.csv", function(data) {

var titles = [];
var drivers = [];
var nations = [];
for (i=0; i < data.length; i++) {
  titles.push(data[i].titles)
  drivers.push(data[i].driver)
  nations.push(data[i].nation)
}

var y3 = d3.scaleBand()
  .domain(d3.range(drivers.length))
  .range([0,height3])
  .padding(0.1)

svg3.append("g")
    .attr("transform", "translate(" + 200 + "," + 0 + ")")
    .call(d3.axisLeft(y3).tickFormat(i => drivers[i]));

// Y axis: scale and draw:
var x3 = d3.scaleLinear()
    .range([0, width3])
    .domain([0, 7]);

svg3.append("g")
    .attr("transform", "translate(" + 200 + "," + height3 + ")")
    .call(d3.axisBottom(x3).ticks(7));

svg3.append("text")             
  .attr("transform",
        "translate(" + (width3 / 2 + 200) + " ," + (height3 + 40) + ")")
  .style("text-anchor", "middle")
  .text("Championship Wins");


svg3.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 85)
    .attr("x",0 - (height3 / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Driver Name");

var tooltip3 = d3.select("#tooltip3");

// append the bar rectangles to the svg element
svg3.selectAll("rect")
  .data(titles)
  .enter()
  .append("rect")
  .attr("transform", "translate(" + 200 + "," + 0 + ")")
    .attr("height", y3.bandwidth())
    .attr("width", function(d){ return x3(d);})
    .attr("y",(d, i) => y3(i))
    .attr("x", (d) => function(d){ return x3(d)})
    .style("fill", function(d,i) {return countryColors[nations[i]]})
    .on("mouseover", function(d,i){tooltip3.style("opacity", 1)
                                         .style("left", (d3.event.pageX)+"px")
                                         .style("top", (d3.event.pageY)+"px")
                                         .html(nations[i]);})
      .on("mouseleave", function() {tooltip3.style("opacity", 0)} )
});