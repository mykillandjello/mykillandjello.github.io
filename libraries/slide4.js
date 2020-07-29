d3.csv("data/drivers.csv", function(data) {
  
    my_dict = {};
    for(var i = 0; i < data.length; ++i) {
        if(!my_dict[data[i].nation])
            my_dict[data[i].nation] = 0;
        ++my_dict[data[i].nation];
    }
    
      // set the dimensions and margins of the graph
      var width = 600
      height = 600
      margin = 100
    
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin
    
    // append the svg object to the div called 'my_dataviz'
    var svg4 = d3.select("#svg4")
      // .append("svg")
      //   .attr("width", width)
      //   .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + (width / 2 + radius / 2) + "," + height / 2 + ")");
    
    // Create dummy data
    // var data = {a: 9, b: 20, c:30, d:8, e:12}
    
    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(my_dict)
      .range(["red","blue","teal","orange","green","pink","purple","greenyellow","coral","firebrick","sandybrown","silver","cornflowerblue"]);
  
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) { return d.value; })
    var data_ready = pie(d3.entries(my_dict))
    // Now I know that group A goes from 0 degrees to x degrees and so on.
    
    // shape helper to build arcs:
    var arcGenerator = d3.arc()
      .innerRadius(radius - 150)
      .outerRadius(radius)
    
    var tooltip4 = d3.select("#tooltip4");
  
    svg4.selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on("mouseover", function(d,i){tooltip4.style("opacity", 1)
                                           .style("left", (d3.event.pageX)+"px")
                                           .style("top", (d3.event.pageY)+"px")
                                           .html(d.data.key);})
        .on("mouseleave", function() {tooltip4.style("opacity", 0)} )
      
    // Now add the annotation. Use the centroid method to get the best coordinates
    svg4
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('text')
      .text(function(d){ return d.data.key})
      .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
      .style("text-anchor", "middle")
      .style("font-size", 17)
    });