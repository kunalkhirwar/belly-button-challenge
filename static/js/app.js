
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch data from the URL
d3.json(url)
  .then(response => {
    console.log(response); // To check if the response is as expected

    // Call the init function after obtaining the response
    init(response);
  });

function BarChart(sample) {
    // slice top 10 sample values
    var top10Values =  sample.sample_values.slice(0, 10).reverse();
    
    // Select corresponding OTU IDs and labels
    var top10IDs = sample.otu_ids.slice(0,10).reverse();
    top10IDs = top10IDs.map(id => `OTU` + id);
    var top10Labels = sample.otu_labels.slice(0,10).reverse();

    var trace = {
        x: top10Values,
        y: top10IDs,
        text: top10Labels,
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace];

    Plotly.newPlot('bar', data);
}

function BubbleChart(sample) {
    var trace = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Earth'
        }
    };

    var data = [trace];

    var layout = {
        xaxis: { title: 'OTU ID' },
        showlegend: false,
        height: 600,
        width: 1000
    };

    Plotly.newPlot('bubble', data, layout);
}

function updateGauge(washingFrequency) {
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washingFrequency,
      title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
}

// Define the optionChanged function
function optionChanged(selectedValue) {
// This function will be called when the dropdown selection changes
// console.log('Selected value:', selectedValue);
}

function displayMetadata(metadata) {
  var metadataPanel = d3.select("#sample-metadata");
  metadataPanel.html(""); // Clear previous content

  if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
          metadataPanel.append("p").text(`${key}: ${value}`);
          // console.log(`${key}: ${value}`)
      });
  }
}

function dropDownchange(response) {
  var selectedId = d3.select('#selDataset').property('value');
  // console.log("Selected ID:", selectedId);

  // Find individual data by ID
  var individualData = response.samples.find(data => data.id === selectedId);
  // console.log("Individual Data:", individualData);
  
  // Update bar chart and bubble chart with individual data
  BarChart(individualData);
  BubbleChart(individualData);

  // Find metadata by ID
  // console.log(response)
  var selectedMetadata = response.metadata.filter(data => parseInt(data.id) === parseInt(selectedId));
  // console.log("Selected Metadata:", selectedMetadata[0]);

  // Display metadata for the selected ID
  displayMetadata(selectedMetadata[0]);

  // Display washing frequency for the selected ID
  updateGauge(selectedMetadata[0].wfreq);
}

function init(response) {
  var dropdown = d3.select('#selDataset');

  // Populate the dropdown menu with options
  response.samples.forEach(data => {
    dropdown.append('option').text(data.id).property('value', data.id);
  });

  // Attach a change event listener to the dropdown
  dropdown.on('change', function() {
    // Call the dropDownchange function when the selection changes
    dropDownchange(response);
  });

  // Display initial data based on the first sample
  BarChart(response.samples[0]);              // Display barchart of Top 10 OTUs for the first sample 
  BubbleChart(response.samples[0]);           // Display bubble for the first sample
  displayMetadata(response.metadata[0]);      // Display metadata for the first sample
  updateGauge(response.metadata[0].wfreq);    // Display washing frequency for the first sample
}