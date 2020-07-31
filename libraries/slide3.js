var margin3 = {top: 50, right: 200, bottom: 200, left: 200};
var width3 = 1000 - margin.top - margin.bottom;
var height3 = 800 - margin.left - margin.right;

// append the svg object to the body of the page
var svg3 = d3.select("#svg3")
  // .append("svg")
  //   .attr("width", width3 + margin3.left + margin3.right)
  //   .attr("height", height3 + margin3.top + margin3.bottom)
  .append('g')
    .attr("transform", "translate(" + 0 + "," + margin3.top + ")");

d3.csv("data/drivers.csv", function(data) {

  var titles = [];
  var drivers = [];
  var nations = [];
  var race_wins = [];
  var race_starts = [];
  var pole_positions = [];
  var status = [];
  for (i=0; i < data.length; i++) {
    titles.push(data[i].titles)
    drivers.push(data[i].driver)
    nations.push(data[i].nation)
    race_wins.push(data[i].race_wins)
    race_starts.push(data[i].race_starts)
    pole_positions.push(data[i].pole_positions)
    status.push(data[i].status)
  }

var y3 = d3.scaleBand()
  .domain(d3.range(drivers.length))
  .range([0,height3])
  .padding(0.1)

var color3 = d3.scaleOrdinal(d3.schemeCategory20);

svg3.append("g")
.attr("transform", "translate(125,0)")
.call(d3.axisLeft(y3).tickFormat(i => drivers[i]));

// Y axis: scale and draw:
var x3 = d3.scaleLinear()
    .range([125, width3 + 125])
    .domain([0, 7]);

svg3.append("g")
    .attr("transform", "translate(" + 0 + "," + height3 + ")")
    .call(d3.axisBottom(x3).ticks(7));

svg3.append("text")             
  .attr("transform",
        "translate(" + (width3 / 2 + 75) + " ," + (height3 + 40) + ")")
  .style("text-anchor", "middle")
  .text("Championship Wins");


svg3.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
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
  .attr("transform", "translate(" + 125 + "," + 0 + ")")
    .attr("height", y3.bandwidth())
    .attr("width", function(d){ return x3(d) - 125;})
    .attr("y",(d, i) => y3(i))
    .attr("x", (d) => function(d){ return x3(d)})
    .style("fill", function(d,i) {return color3(nations[i])})
    .on("mouseover", function(d,i){tooltip3.style("opacity", 1)
          .style("left", (d3.event.pageX)+"px")
          .style("top", (d3.event.pageY)+"px")
          .html("Country: " + nations[i] +
          "<br>" + "Race Wins: " + race_wins[i] +
          "<br>" + "Race Starts: " + race_starts[i] + 
          "<br>" + "Pole Positions: " + pole_positions[i] +
          "<br>" + "Status: " + status[i]);})
    .on("mouseleave", function() {tooltip3.style("opacity", 0)} )
    
// color legend
var clicked = ""
var legend = svg3.selectAll(".legend")
    .data(color3.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
  legend.append("path")
    .style("fill", function(d) { return color3(d); })
    	.attr("d", function(d, i) { return d3.symbol().type(d3.symbolSquare).size(300)(); })
	    .attr("transform", function(d, i) { 
    		return "translate(" + (width -10) + "," + 100 + ")";
  		})
  		.on("click",function(d){
   svg3.selectAll("rect").style("opacity",1)
   
   if (clicked !== d){
     svg3.selectAll("rect")
       .filter(function(e, i){
       return nations[i] !== d;
     })
       .style("opacity",0.1)
     clicked = d
   }
    else{
      clicked = ""
    }
  });
 
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 100)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});