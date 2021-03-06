

function buildCharts(sample) {
  // d3.json("samples.json").then((data) => {
    d3.json("http://127.0.0.1:5000/api/v1.0/Covid_Cases").then((data) => {
    console.log(data);
    //  console.log([data]);
    var month_list=[];
    var covidCases =[];
    var unemp =[];
    var samples = data;
    var resultArray = samples.filter(sampleObj => sampleObj.County == sample);
    var result = resultArray[0];
    for (var i = 0; i < resultArray.length; i++) {
    
    month_list.push(resultArray[i].Month_c);
    covidCases.push(resultArray[i].Covid_Cases);
    unemp.push(resultArray[i].Unemployment_Rate);
    }
    console.log(resultArray);
    console.log(month_list);
    console.log(covidCases);
    console.log(unemp);
    
    // Build a Bubble Chart
    var bubbleLayout = {
      title: "Unemployment Rate Per County",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "Month" },
      margin: { t: 30}
    };
    var bubbleData = [
      {
        x: month_list,
        y: unemp,
        
        mode: "markers",
        marker: {
          size: unemp,
          color: unemp,
          colorscale: "Reds"
        }
      }
    ];
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
    var barData = [
      {
        y: month_list,
        x: covidCases,
        type: "bar",
        orientation: "h",
      }
    ];
    var barLayout = {
      title: "Number of Covid Cases",
      margin: { t: 30, l: 150 }
    };
    Plotly.newPlot("bar", barData, barLayout);
  });
}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    console.log(data.County);
    var sampleNames = [];
    
    for (var i = 0; i < data.length; i++) {
      sampleNames.push(data[i].County);

    }
    
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    
   });
 }
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  
}
// Initialize the dashboard
init();