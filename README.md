**Background**

In this project, I built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.


**Instructions**

Completed the following steps:

1. Used the D3 library to read in 'json' from the URL (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs (operational taxonomic units) found in that individual.
    - Used '*sample_values*' as the values for the bar chart.
    - Used '*otu_ids' as the labels for the bar chart.
    - Used '*otu_labels*' as the hovertext for the chart.
  
3. Created a bubble chart that displays each sample.
    - Used '*otu_ids*' for the x values.   
    - Used '*sample_values*' for the y values.  
    - Used '*sample_values*' for the marker size. 
    - Used '*otu_ids*' for the marker colors. 
    - Used '*otu_labels*' for the text values.
  
4. Displayed the metadata, i.e., an individual's demographic information.

5. Displayed each key-value pair from the metadata JSON object on the page.

6. The code updates all the plots when a new sample is selected.
