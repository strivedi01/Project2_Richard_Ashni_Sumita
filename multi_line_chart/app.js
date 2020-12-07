// Chart Params
var svgWidth = 1000;
var svgHeight = 600;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("joined_df_final.csv").then(function(covidData) {
  console.log(covidData);
  console.log([covidData]);

  // Create a function to parse date and time
  // var parseTime = d3.timeParse("%d-%b-%Y");

  // Format the data
  covidData.forEach(function(data) {
    // data.date = parseTime(data.date);
    data.Covid_Cases = +data.Covid_Cases;
    data.Umemployed = +data.Umemployed;
  });

  // Create scaling functions
  // var xTimeScale = d3.scaleTime()
  //   .domain(d3.extent(covidData, d => d.date))
  //   .range([0, width]);

  var labels = covidData.map(d => d.County_Month);
  // scale x to chart
 var xScale = d3.scaleBand()
      .domain(labels)
      .range([0, width]);

  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(covidData, d => d.Covid_Cases)])
    .range([height, 0]);

  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(covidData, d => d.Unemployed)])
    .range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xScale)
  // .tickformat {count=7,  "rotate": 45};
    // .tickFormat(d3.timeFormat("%d-%b-%Y"));
  var leftAxis = d3.axisLeft(yLinearScale1);
  var rightAxis = d3.axisRight(yLinearScale2);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("blue", true)
    // .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3.line()
    .x(d => xScale(d.County_Month)) 
    .y(d => yLinearScale1(d.Covid_Cases));

  var line2 = d3.line()
    .x(d => xScale(d.County_Month))
    .y(d => yLinearScale2(d.Unemployed));

  // Append a path for line1
  chartGroup.append("path")
    .data([covidData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([covidData])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("Covid-Cases text", true)
    .text("Covid Cases");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .classed("Umemployed text", true)
    .text("Unemployed");
}).catch(function(error) {
  console.log(error);
});
