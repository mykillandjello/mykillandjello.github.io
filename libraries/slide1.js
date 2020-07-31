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

//console.log(data[0]);

var nations = ["Italy", "United Kingdom", "Germany", "Austria", "France"]
var colors = ["red", "blue", "green", "orange", "teal", "grey", "darkgreen", "pink", "violet", "slateblue", "purple", "yellow", "brown"];

    
var colorScale = d3.scaleOrdinal().domain(nations).range(colors);
    
var x1 = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([50,width+50])
  .padding(0.1)

svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1).tickFormat(function(d,i)  {return data[i].constructor}));

svg1.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + (height + 40) + ")")
  .style("text-anchor", "middle")
  .text("Constructor Name");

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

svg1.append("g")
    .attr("transform", "translate(50,0)")
    .call(d3.axisLeft(y1));
    
for(i=0; i < data.length; i++){
svg1.append("line")
    .style("stroke", "black")
    .style("stroke-dasharray", ("3, 3"))
    .style("stroke-width", isMatch(data[i].nation))
    .attr("x1", x1(i) + (x1.bandwidth() / 2))
    .attr("y1", y1(data[i].titles))
    .attr("x2", 400)
    .attr("y2", 200);
}


svg1.append("text")
    .attr("x",400)
    .attr("y",170)
    .style("text-anchor", "middle")
    .style("font-size","11px")
    .text("Ten of the fifteen teams to win")
    
svg1.append("text")
    .attr("x",400)
    .attr("y", 190)
    .style("text-anchor", "middle")
    .style("font-size","11px")
    .text("a championship have been British")

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
  .data(data)
  .enter()
  .append("rect")
    .attr("width", x1.bandwidth())
    .attr("height", function(d){ return height - y1(d.titles);})
    .attr("x", function(d, i) {return x1(i)})
    .attr("y", function(d) {return y1(d.titles)})
    .style("fill", function(d,i) {return colorScale(d.nation)})
  .on("mouseover", function(d,i){tooltip1.style("opacity", 1)
                                         .style("left", (d3.event.pageX)+"px")
                                         .style("top", (d3.event.pageY)+"px")
                                         .html("Country: " + d.nation +
                                         "<br>" + "Race Wins: " + d.race_wins +
                                         "<br>" + "Race Starts: " + d.race_starts + 
                                         "<br>" + "Pole Positions: " + d.pole_positions +
                                         "<br>" + "First Entry: " + d.first_entry);})
  .on("mouseleave", function() {tooltip1.style("opacity", 0)} );

// color legend
var clicked = ""
var legend = svg1.selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
  legend.append("path")
    .style("fill", function(d) { return colorScale(d); })
    	.attr("d", function(d, i) { return d3.symbol().type(d3.symbolSquare).size(300)(); })
	    .attr("transform", function(d, i) { 
    		return "translate(" + (width -10) + "," + 10 + ")";
  		})
  		.on("click",function(d){
   d3.selectAll("rect").style("opacity",1)
   
   if (clicked !== d){
     d3.selectAll("rect")
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
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
});