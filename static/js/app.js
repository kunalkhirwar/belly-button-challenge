
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch data from the URL
d3.json(url)
  .then(response => {
    console.log(response); // To check if the response is as expected

    // Call the init function after obtaining the response
    init(response);
  });

function BarChart(sample) {
    // Sort sample values in descending order
    // var sortedData = sample.sample_values.sort((a, b) => b - a);
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
  var level = washingFrequency * 20;

  // Trig to calc meter point
  var degrees = 180 - level,
    radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [
    {
      x: [0],
      y: [0],
      marker: { size: 12, color: '850000' },
      showlegend: false

    },
    {
      values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: [
          'rgba(0, 105, 11, .5)',
          'rgba(10, 120, 22, .5)',
          'rgba(14, 127, 0, .5)',
          'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)',
          'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)',
          'rgba(232, 226, 202, .5)',
          'rgba(240, 230, 215, .5)',
          'rgba(255, 255, 255, 0)'
        ]
      },
      hole: 0.5,
      type: 'pie',
      showlegend: false
    }
  ];

  var layout = {
    shapes: [
      {
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }
    ],
    title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };

  Plotly.newPlot('gauge', data, layout);
}

// Define the optionChanged function
function optionChanged(selectedValue) {
//   // This function will be called when the dropdown selection changes
//   // console.log('Selected value:', selectedValue);
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
  console.log(response)
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
  BarChart(response.samples[0]);
  BubbleChart(response.samples[0]);
  displayMetadata(response.metadata[0]); // Display metadata for the first sample
  updateGauge(response.metadata[0].wfreq);
}