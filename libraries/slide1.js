var countryColors = {
    "Italy": "red",
    "Germany": "teal",
    "United Kingdom": "blue",
    "France": "green",
    "Austria": "orange",
    "South Africa": "pink",
    "Australia": "purple",
    "Brazil": "greenyellow",
    "Argentina": "coral",
    "Canada": "firebrick",
    "Spain": "sandybrown",
    "Finland": "silver",
    "USA": "cornflowerblue"
  };

var margin = {top: 50, right: 200, bottom: 200, left: 150};
var width = 1000 - margin.top - margin.bottom;
var height = 1000 - margin.left - margin.right;

// append the svg object to the body of the page
var svg1 = d3.select("#slide1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/constructors.csv", function(data) {

var titles = [];
var constructors = [];
var nations = [];
for (i=0; i < data.length; i++) {
  titles.push(data[i].titles)
  constructors.push(data[i].constructor)
  nations.push(data[i].nation)
}

var x1 = d3.scaleBand()
  .domain(d3.range(constructors.length))
  .range([200,width + 200])
  .padding(0.1)

svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1).tickFormat(i => constructors[i]));

svg1.append("text")             
  .attr("transform",
        "translate(" + (width/2 + 200) + " ," + (height + 40) + ")")
  .style("text-anchor", "middle")
  .text("Constructor Name");

// And apply this function to data to get the bins

// Y axis: scale and draw:
var y1 = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 16]);

svg1.append("g")
    .attr("transform", "translate(200,0)")
    .call(d3.axisLeft(y1));

svg1.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 150)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Championship Wins"); 

var tooltip1 = d3.select("#tooltip1");

// append the bar rectangles to the svg element
svg1.selectAll("rect")
  .data(titles)
  .enter()
  .append("rect")
    .attr("width", x1.bandwidth())
    .attr("height", function(d){ return height - y1(d);})
    .attr("x",(d, i) => x1(i))
    .attr("y", function(d) {return y1(d)})
    .style("fill", function(d,i) {return countryColors[nations[i]]})
  .on("mouseover", function(d,i){tooltip1.style("opacity", 1)
                                         .style("left", (d3.event.pageX)+"px")
                                         .style("top", (d3.event.pageY)+"px")
                                         .html("Country: " + nations[i]);})
  .on("mouseleave", function() {tooltip1.style("opacity", 0)} )

// color legend
svg1.append("circle").attr("cx",800).attr("cy",30).attr("r", 10).style("fill", "red")
svg1.append("circle").attr("cx",800).attr("cy",60).attr("r", 10).style("fill", "blue")
svg1.append("circle").attr("cx",800).attr("cy",90).attr("r", 10).style("fill", "teal")
svg1.append("circle").attr("cx",800).attr("cy",120).attr("r", 10).style("fill", "orange")
svg1.append("circle").attr("cx",800).attr("cy",150).attr("r", 10).style("fill", "green")
svg1.append("text").attr("x", 820).attr("y", 30).text("Italy").style("font-size", "15px").attr("alignment-baseline","middle")
svg1.append("text").attr("x", 820).attr("y", 60).text("United Kingdom").style("font-size", "15px").attr("alignment-baseline","middle")
svg1.append("text").attr("x", 820).attr("y", 90).text("Germany").style("font-size", "15px").attr("alignment-baseline","middle")
svg1.append("text").attr("x", 820).attr("y", 120).text("Austria").style("font-size", "15px").attr("alignment-baseline","middle")
svg1.append("text").attr("x", 820).attr("y", 150).text("France").style("font-size", "15px").attr("alignment-baseline","middle")

});