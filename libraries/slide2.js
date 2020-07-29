d3.csv("data/constructors.csv", function(data) {
  
    my_dict = {};
    for(var i = 0; i < data.length; ++i) {
        if(!my_dict[data[i].nation])
            my_dict[data[i].nation] = 0;
        my_dict[data[i].nation] = my_dict[data[i].nation] + data[i].titles;
        console.log(data[i].nation)
        console.log(data[i].titles)
    }
    
      // set the dimensions and margins of the graph
    var width = 1000
        height = 1000
        margin = 200
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
    
    // append the svg object to the div called 'my_dataviz'
    var svg2 = d3.select("#slide2")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + 350 + ")");
    
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
        .on("mouseover", function(d,i){tooltip2.style("opacity", 1)
                                           .style("left", (d3.event.pageX)+"px")
                                           .style("top", (d3.event.pageY)+"px")
                                           .html(d.data.key);})
        .on("mouseleave", function() {tooltip2.style("opacity", 0)} )
    
    // Now add the annotation. Use the centroid method to get the best coordinates
    svg2
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return d.data.key})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 17)
    });