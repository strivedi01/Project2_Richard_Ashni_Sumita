# Project2_Richard_Ashni_Sumita
Our goal of this project is to compare the dataset of COVID-19 cases per county to the unemployment rate per county, in New Jersey and across the country.

We created visualizations for the users giving them the option to select a particular county and/or month to analyze the changing data. Visualizations will be interactive for the user and they will vary based on the story we are trying to express. 

 Data Sources:
 Covid Data
https://usafacts.org/visualizations/coronavirus-covid-19-spread-map/
Download dataset from KNOWN CASES

Unemployment Data
https://www.bls.gov/lau/
Downloaded and joined data.
Loaded the data into PostgreSQL
Created 
Created endpoints n local server
Created visualizations

Notebooks/app.py  - Creates endpoints in http://127.0.0.1:5000/api/v1.0/Covid_Cases from "sqlite:///covid_dbase.sqlite" 

Updated Bar_Bubble_UserDriven_Charts\static\jsapp.js to read data from "http://127.0.0.1:5000/api/v1.0/Covid_Cases" and run the interactive BAr and Bubble chart for each county.



