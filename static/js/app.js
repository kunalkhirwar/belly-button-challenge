const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(response => {
    console.log(response.samples);

    // Extract otu_ids, sample_values, and otu_labels
    const otu_ids = response.samples.map(item => item.otu_ids);
    const sample_values = response.samples.map(item => item.sample_values);
    const otu_labels = response.samples.map(item => item.otu_labels);

    // Flatten the arrays
    const flattened_otu_ids = [].concat.apply([], otu_ids);
    const flattened_sample_values = [].concat.apply([], sample_values);
    const flattened_otu_labels = [].concat.apply([], otu_labels);
    console.log(flattened_otu_ids)
    // Create an array of objects to preserve the relationship between otu_id, sample_value, and otu_label
    // const dataObjects = flattened_otu_ids.map((id, index) => ({
    //     otu_id: id,
    //     sample_value: flattened_sample_values[index],
    //     otu_label: flattened_otu_labels[index]
    // }));

    // Sort the dataObjects array in descending order by sample_value
    // dataObjects.sort((a, b) => b.sample_value - a.sample_value);
    // console.log(dataObjects)

    // Select only the top 10 OTUs
    // const top10DataObjects = dataObjects.slice(0, 10);
    // console.log(top10DataObjects)

    // Extract sorted otu_ids, sample_values, and otu_labels for the top 10 OTUs
    // const top10_otu_ids = top10DataObjects.map(item => item.otu_id);
    // const top10_sample_values = top10DataObjects.map(item => item.sample_value);
    // const top10_otu_labels = top10DataObjects.map(item => item.otu_label);
    // console.log(top10_otu_ids)

    // Create trace
    // const trace1 = {
    //     x: top10_sample_values,
    //     y: top10_otu_ids.map(id => `OTU ${id}`),
    //     text: top10_otu_labels,
    //     type: 'bar',
    //     orientation: 'h'
    // };

    // // Plot the bar chart
    // Plotly.newPlot("bar", [trace1]);
});
