const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Fetch data from the URL
d3.json(url)
  .then(response => {
    console.log(response.samples); // Check if the response is as expected

    // Call the init function after obtaining the response
    init(response);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function BarChart(sample) {
    // Sort sample values in descending order
    var sortedData = sample.sample_values.sort((a, b) => b - a);
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

function dropDownchange(response) {
  var selectedId = d3.select('#selDataset').property('value');
  var individualData = response.samples.find(data => data.id === selectedId);
  BarChart(individualData);
}

function init(response) {
  var dropdown = d3.select('#selDataset');

  response.samples.forEach(data => {
    dropdown.append('option').text(data.id).property('value', data.id);
  });

  // Attach a change event listener to the dropdown
  dropdown.on('change', function() {
    dropDownchange(response);
  });

  // Display initial data
  BarChart(response.samples[0]);
}