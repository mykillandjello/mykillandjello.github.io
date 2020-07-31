d3.csv("data/constructors.csv", function(data) {
  
    my_dict = {};
    for(var i = 0; i < data.length; ++i) {
        if(!my_dict[data[i].nation])
            my_dict[data[i].nation] = 0;
        my_dict[data[i].nation] = my_dict[data[i].nation] + parseInt(data[i].titles);
    }
    
    // set the dimensions and margins of the graph
    var width = 800
    height = 600
    margin = 50
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
    
    // append the svg object to the div called 'my_dataviz'
    var svg2 = d3.select("#svg2")
      .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + height / 2 + ")");
        
    var nations = ["Italy", "United Kingdom", "Germany", "Austria", "France"]
    var colors = ["red", "blue", "green", "orange", "teal", "grey", "darkgreen", "pink", "violet", "slateblue", "purple", "yellow", "brown"];


    var colorScale = d3.scaleOrdinal().domain(nations).range(colors);

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) { return d.value; })
    var data_ready = pie(d3.entries(my_dict))
    // Now I know that group A goes from 0 degrees to x degrees and so on.
    
    // shape helper to build arcs:
    var arcGenerator = d3.arc()
      .innerRadius(radius - 150)
      .outerRadius(radius)
      .padAngle(.02)
      .padRadius(200)
      .cornerRadius(5)
    
    var tooltip2 = d3.select("#tooltip2");
    
    function highlightSelect(value){
        var ret_val = "black";
        if(value === "United Kingdom"){
            ret_val = "gold";
        }
        return ret_val;
    }
    
    function strokeSelect(value){
        var ret_val = "2px";
        if(value === "United Kingdom"){
            ret_val = "6px";
        }
        return ret_val;
    }
    
    var teamCounts = {"Italy": 0, "United Kingdom": 0, "Germany": 0, "Austria": 0, "France": 0};
    for(i=0;i<data.length;i++){
        teamCounts[data[i].nation] = parseInt(teamCounts[data[i].nation]) + 1;
    }
  
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg2
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(colorScale(d.data.key)) })
        .attr("stroke", function(d) {return highlightSelect(d.data.key)})
        .style("stroke-width", function(d) {return strokeSelect(d.data.key)})
        .style("opacity", 0.7)
        .on("mouseover", function(d){tooltip2.style("opacity", 1)
                                           .style("left", (d3.event.pageX)+"px")
                                           .style("top", (d3.event.pageY)+"px")
                                           .html("Country: " + d.data.key +
                                           "<br>" + "# of Championships: " + d.data.value + 
                                                "<br>" + "# of Constructors: " + teamCounts[d.data.key]);})
        .on("mouseleave", function() {tooltip2.style("opacity", 0)})

    // Now add the annotation. Use the centroid method to get the best coordinates
    var total = 0;
    for (i=0; i < data_ready.length; i++){
      total = total + data_ready[i].value
    }

    svg2.selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return Math.round(100 * parseInt(d.data.value)  / total) + "%"})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";})
      .style("text-anchor", "middle")
      .style("font-size", 17)

// color legend
var clicked = ""
var legend = svg2.selectAll(".legend")
    .data(colorScale.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
    
  legend.append("path")
    .style("fill", function(d) { return colorScale(d); })
    	.attr("d", function(d, i) { return d3.symbol().type(d3.symbolSquare).size(300)(); })
	    .attr("transform", function(d, i) { 
    		return "translate(" + (width -360) + "," + -100 + ")";
  		})
   
  legend.append("text")
      .attr("x", width - 374)
      .attr("y", -100)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
  });