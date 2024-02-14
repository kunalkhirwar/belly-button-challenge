// Define the optionChanged function
function optionChanged(selectedValue) {
  // This function will be called when the dropdown selection changes
  // console.log('Selected value:', selectedValue);
}


const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch data from the URL
d3.json(url)
  .then(response => {
    console.log(response); // Check if the response is as expected

    // Call the init function after obtaining the response
    init(response);
  });

function BarChart(sample) {
    // Sort sample values in descending order
    var sortedData = sample.sample_values.slice().sort((a, b) => b - a);
    var top10Values = sortedData.slice(0, 10).reverse();

    // Select corresponding OTU IDs and labels
    var top10IDs = [];
    var top10Labels = [];
    for (let i = 0; i < top10Values.length; i++) {
        // Find the index of the sorted value in the original array
        let index = sample.sample_values.indexOf(top10Values[i]);
        top10IDs.push(`OTU ${sample.otu_ids[index]}`);
        top10Labels.push(sample.otu_labels[index]);
    }

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

function displayMetadata(metadata) {
  var metadataPanel = d3.select("#sample-metadata");
  metadataPanel.html(""); // Clear previous content

  if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
          metadataPanel.append("p").text(`${key}: ${value}`);
      });
  }
}

function dropDownchange(response) {
  var selectedId = d3.select('#selDataset').property('value');
  console.log("Selected ID:", selectedId);

  // Find individual data by ID
  var individualData = response.samples.find(data => data.id === selectedId);
  console.log("Individual Data:", individualData);
  
  // Update bar chart and bubble chart with individual data
  BarChart(individualData);
  BubbleChart(individualData);

  // Find metadata by ID
  var selectedMetadata = response.metadata.find(data => data.id === selectedId);
  console.log("Selected Metadata:", selectedMetadata);

  // Display metadata for the selected ID
  displayMetadata(selectedMetadata);
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
  BarChart(response.samples[0]);
  BubbleChart(response.samples[0]);
  displayMetadata(response.metadata[0]); // Display metadata for the first sample
}