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

var nations = ["Italy", "United Kingdom", "Germany", "Austria", "France", "Argentina", "Australia", "Brazil", "Finland", "Spain", "USA", "South Africa", "Canada"]
var colors = ["red", "blue", "green", "orange", "teal", "grey", "darkgreen", "pink", "violet", "slateblue", "purple", "yellow", "brown"];
var drivers = [];
for (i=0;i<data.length;i++){
    drivers.push(data[i].driver)
}

var colorScale = d3.scaleOrdinal().domain(nations).range(colors);
var y3 = d3.scaleBand()
  .domain(drivers)
  .range([0,height3])
  .padding(0.1);

svg3.append("g")
.data(data)
.attr("transform", "translate(125,0)")
.call(d3.axisLeft(y3));

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
    
function isMatch(val1){
  var return_val = 0;
  if(val1 === "United Kingdom"){
    return_val = 1;
  }
  return return_val;
};
    
for(i=0; i < data.length; i++){
svg3.append("line")
    .style("stroke", "black")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", isMatch(data[i].nation))
    .attr("x1", x3(data[i].titles))
    .attr("y1", y3(data[i].driver) + (y3.bandwidth() / 2))
    .attr("x2", 700)
    .attr("y2", 200);
}
    
svg3.append("text")
    .attr("x",805)
    .attr("y",200)
    .style("text-anchor", "middle")
    .style("font-size","11px")
    .text("Ten of the thirty-three drivers to")
    
svg3.append("text")
    .attr("x",805)
    .attr("y", 220)
    .style("text-anchor", "middle")
    .style("font-size","11px")
    .text("win a championship have been British")

var tooltip3 = d3.select("#tooltip3");

// append the bar rectangles to the svg element
svg3.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("transform", "translate(" + 125 + "," + 0 + ")")
    .attr("height", y3.bandwidth())
    .attr("width", function(d){ return x3(d.titles) - 125;})
    .attr("y",(d, i) => y3(d.driver))
    .attr("x", (d) => function(d){ return x3(d.titles)})
    .style("fill", function(d,i) {return colorScale(d.nation)})
    .on("mouseover", function(d,i){tooltip3.style("opacity", 1)
          .style("left", (d3.event.pageX)+"px")
          .style("top", (d3.event.pageY)+"px")
          .html("Country: " + d.nation +
          "<br>" + "Race Wins: " + d.race_wins +
          "<br>" + "Race Starts: " + d.race_starts + 
          "<br>" + "Pole Positions: " + d.pole_positions +
          "<br>" + "Status: " + d.status);})
    .on("mouseleave", function() {tooltip3.style("opacity", 0)} )
    
// color legend
var clicked = ""
var legend = svg3.selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
  legend.append("path")
    .style("fill", function(d) { return colorScale(d); })
    	.attr("d", function(d, i) { return d3.symbol().type(d3.symbolSquare).size(300)(); })
	    .attr("transform", function(d, i) { 
    		return "translate(" + (width -10) + "," + 300 + ")";
  		})
  		.on("click",function(d){
   svg3.selectAll("rect").style("opacity",1)
   
   if (clicked !== d){
     svg3.selectAll("rect")
       .filter(function(e, i){
       return e.nation != d;
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
      .attr("y", 300)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});