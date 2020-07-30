d3.csv("data/constructors.csv", function(data) {
  
    my_dict = {};
    for(var i = 0; i < data.length; ++i) {
        if(!my_dict[data[i].nation])
            my_dict[data[i].nation] = 0;
        my_dict[data[i].nation] = my_dict[data[i].nation] + parseInt(data[i].titles);
    }

    var titles = [];
    var constructors = [];
    var nations = [];
    var race_wins = [];
    var races_started = [];
    var pole_positions = [];
    var first_entry = [];
    for (i=0; i < data.length; i++) {
      titles.push(data[i].titles)
      constructors.push(data[i].constructor)
      nations.push(data[i].nation)
      race_wins.push(data[i].race_wins)
      races_started.push(data[i].races_started)
      pole_positions.push(data[i].pole_positions)
      first_entry.push(data[i].first_entry)
}
    
      // set the dimensions and margins of the graph
      var width = 700
      height = 700
      margin = 50
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
    
    // append the svg object to the div called 'my_dataviz'
    var svg2 = d3.select("#svg2")
      // .append("svg")
      //   .attr("width", width)
      //   .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + (width / 2 + radius / 2) + "," + height / 2 + ")");
        
    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(my_dict)
      .range(["red", "blue", "teal", "orange", "green"]);
    
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
      .padRadius(100)
      .cornerRadius(4)
    
    var tooltip2 = d3.select("#tooltip2");
  
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg2
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 1)
        .on("mouseover", function(d){tooltip2.style("opacity", 1)
                                           .style("left", (d3.event.pageX)+"px")
                                           .style("top", (d3.event.pageY)+"px")
                                           .html("Country: " + d.data.key);})
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

  svg2.append("circle").attr("cx",375).attr("cy",30).attr("r", 10).style("fill", "red")
  svg2.append("circle").attr("cx",375).attr("cy",60).attr("r", 10).style("fill", "blue")
  svg2.append("circle").attr("cx",375).attr("cy",90).attr("r", 10).style("fill", "teal")
  svg2.append("circle").attr("cx",375).attr("cy",120).attr("r", 10).style("fill", "orange")
  svg2.append("circle").attr("cx",375).attr("cy",150).attr("r", 10).style("fill", "green")
  svg2.append("text").attr("x", 400).attr("y", 30).text("Italy").style("font-size", "15px").attr("alignment-baseline","middle")
  svg2.append("text").attr("x", 400).attr("y", 60).text("United Kingdom").style("font-size", "15px").attr("alignment-baseline","middle")
  svg2.append("text").attr("x", 400).attr("y", 90).text("Germany").style("font-size", "15px").attr("alignment-baseline","middle")
  svg2.append("text").attr("x", 400).attr("y", 120).text("Austria").style("font-size", "15px").attr("alignment-baseline","middle")
  svg2.append("text").attr("x", 400).attr("y", 150).text("France").style("font-size", "15px").attr("alignment-baseline","middle")
  });