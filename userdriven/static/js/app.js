// function buildMetadata() {
//   d3.json("samples.json").then((data) => {
//     var metadata = data.id;
//     // Filter the data for the object with the desired sample number
//     var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
//     var result = resultArray[0];
//     // Use d3 to select the panel with id of `#sample-metadata`
//     var PANEL = d3.select("#sample-metadata");
    
    // Use `.html("") to clear any existing metadata
//     PANEL.html("");
//     // Use `Object.entries` to add each key and value pair to the panel
//     // Hint: Inside the loop, you will need to use d3 to append new
//     // tags for each key-value in the metadata.
//      Object.entries(result).forEach(([key, value]) => {
//       PANEL.append("h5").text(`${key.toUpperCase()}: ${value}`);
//     });
//     // BONUS: Build the Gauge Chart
//     buildGauge(result.wfreq);
//   });
// }


function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data;
    // var resultArray = samples.filter(sampleObj => sampleObj.id == samples);
    // var result = resultArray[0];
    var result = samples[0];
    var otu_ids = result.id;
    var otu_labels = result.County_Month;
    var sample_values = result.Cases;
    // Build a Bubble Chart
    var bubbleLayout = {
      title: "Covid Cases Rate Per County",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "CountyName" },
      margin: { t: 30}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    var yticks = otu_labels.slice(0, 10).map(County_Month=> `County_Month ${County_Month}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];
    var barLayout = {
      title: "Top 10 Counties",
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
    //console.log(data);
    
    var sampleNames = data.id;
    console.log(sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    // buildMetadata(firstSample);
  });
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  // buildMetadata(newSample);
}
// Initialize the dashboard
init();