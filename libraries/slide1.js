var margin = {top: 50, right: 100, bottom: 100, left: 100};
var width = 1000 - margin.top - margin.bottom;
var height = 800 - margin.left - margin.right;

// append the svg object to the body of the page
var svg1 = d3.select("#svg1")
  // .append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  .append('g')
    .attr("transform", "translate(" + 0 + "," + margin.top + ")");

d3.csv("data/constructors.csv", function(data) {

var titles = [];
var constructors = [];
var nations = [];
var race_wins = [];
var race_starts = [];
var pole_positions = [];
var first_entry = [];
for (i=0; i < data.length; i++) {
  titles.push(data[i].titles)
  constructors.push(data[i].constructor)
  nations.push(data[i].nation)
  race_wins.push(data[i].race_wins)
  race_starts.push(data[i].race_starts)
  pole_positions.push(data[i].pole_positions)
  first_entry.push(data[i].first_entry)
}

var color1 = d3.scaleOrdinal(d3.schemeCategory10);
    
var x1 = d3.scaleBand()
  .domain(d3.range(constructors.length))
  .range([50,width+50])
  .padding(0.1)

svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1).tickFormat(function(d,i)  {return constructors[i]}));

svg1.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + (height + 40) + ")")
  .style("text-anchor", "middle")
  .text("Constructor Name");

// And apply this function to data to get the bins

function isMatch(val1){
  var return_val = 0;
  if(val1 === "United Kingdom"){
    return_val = 1;
  }
  return return_val;
};

// Y axis: scale and draw:
var y1 = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 16]);

svg1.selectAll("rect")
    .data(titles)
    .enter()
    .append("line")
    .style("stroke", "black")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", function(d,i) {return isMatch(nations[i])})
    .attr("x1", function(d, i)  {return x1(i) + (x1.bandwidth() / 2)})
    .attr("y1", function(d) {return y1(d)})
    .attr("x2", 400)
    .attr("y2", 200);

svg1.append("text")
    .attr("x",400)
    .attr("y",170)
    .style("text-anchor", "middle")
    .style("font-size","12px")
    .text("British constructors have won")
    
svg1.append("text")
    .attr("x",400)
    .attr("y", 190)
    .style("text-anchor", "middle")
    .style("font-size","12px")
    .text("33 out of 70 championship titles")

svg1.append("g")
    .attr("transform", "translate(50,0)")
    .call(d3.axisLeft(y1));

svg1.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 10)
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
    .attr("x", function(d, i) {return x1(i)})
    .attr("y", function(d) {return y1(d)})
    .style("fill", function(d,i) {return color1(nations[i])})
  .on("mouseover", function(d,i){tooltip1.style("opacity", 1)
                                         .style("left", (d3.event.pageX)+"px")
                                         .style("top", (d3.event.pageY)+"px")
                                         .html("Country: " + nations[i] +
                                         "<br>" + "Race Wins: " + race_wins[i] +
                                         "<br>" + "Race Starts: " + race_starts[i] + 
                                         "<br>" + "Pole Positions: " + pole_positions[i] +
                                         "<br>" + "First Entry: " + first_entry[i]);})
  .on("mouseleave", function() {tooltip1.style("opacity", 0)} );

// color legend
var clicked = ""
var legend = svg1.selectAll(".legend")
    .data(color1.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
  legend.append("path")
    .style("fill", function(d) { return color1(d); })
    	.attr("d", function(d, i) { return d3.symbol().type(d3.symbolSquare).size(200)(); })
	    .attr("transform", function(d, i) { 
    		return "translate(" + (width -10) + "," + 10 + ")";
  		})
  		.on("click",function(d){
   d3.selectAll("rect").style("opacity",1)
   
   if (clicked !== d){
     d3.selectAll("rect")
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
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
//  svg1.append("circle").attr("cx",650).attr("cy",30).attr("r", 10).style("fill", "red")
//  svg1.append("circle").attr("cx",650).attr("cy",60).attr("r", 10).style("fill", "blue")
//  svg1.append("circle").attr("cx",650).attr("cy",90).attr("r", 10).style("fill", "teal")
//  svg1.append("circle").attr("cx",650).attr("cy",120).attr("r", 10).style("fill", "orange")
//  svg1.append("circle").attr("cx",650).attr("cy",150).attr("r", 10).style("fill", "green")
//  svg1.append("text").attr("x", 670).attr("y", 30).text("Italy").style("font-size", "15px").attr("alignment-baseline","middle")
//  svg1.append("text").attr("x", 670).attr("y", 60).text("United Kingdom").style("font-size", "15px").attr("alignment-baseline","middle")
//  svg1.append("text").attr("x", 670).attr("y", 90).text("Germany").style("font-size", "15px").attr("alignment-baseline","middle")
//  svg1.append("text").attr("x", 670).attr("y", 120).text("Austria").style("font-size", "15px").attr("alignment-baseline","middle")
//  svg1.append("text").attr("x", 670).attr("y", 150).text("France").style("font-size", "15px").attr("alignment-baseline","middle")
    
});