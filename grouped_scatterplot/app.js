// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("joined_df_final.csv"), function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([4, 8])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 14])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Color scale: give me a county name, I return a color
  var color = d3.scaleOrdinal()
    .domain(["Atlantic County", "Bergen County", "Burlington County", "Camden County", "Cape May County", "Cumberland County", "Essex County", "Gloucester County", "Hudson County", "Hunterdon County", "Mercer County", "Middlesex County", "Monmouth County", "Morris County", "Ocean County", "Passaic County", "Salem County", "Somerset County", "Sussex County", "Union County", "Warren County" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff", ""])


  // Highlight the specie that is hovered
  var highlight = function(d){

    selected_county = d.County_Name

    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "lightgrey")
      .attr("r", 3)

    d3.selectAll("." + selected_county)
      .transition()
      .duration(200)
      .style("fill", color(selected_county))
      .attr("r", 7)
  }

  // Highlight the county that is hovered
  var doNotHighlight = function(){
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "lightgrey")
      .attr("r", 5 )
  }

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function (d) { return "dot " + d.County_Name} )
      .attr("cx", function (d) { return x(d.Covid_Cases); } )
      .attr("cy", function (d) { return y(d.Unemployment_Rate); } )
      .attr("r", 5)
      .style("fill", function (d) { return color(d.County_Name) } )
    .on("mouseover", highlight)
    .on("mouseleave", doNotHighlight )

})

</script>