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
Created endpoints n local server
Created visualizations

Updates from Sumita Trivedi on 12/22/2020

clean_data_v1.ipynb - cleans and joins data from 2 sources and creates "joined_df_final_v1.csv"
create_sqlite_table.ipynb - Creates covid_dbase.sqlite from "notebooks\\data_csv\\joined_df_final_v1.csv"
Notebooks/app.py  - Creates endpoints in http://127.0.0.1:5000/api/v1.0/Covid_Cases from "sqlite:///covid_dbase.sqlite" 
Updated Bar_Bubble_UserDriven_Charts\static\jsapp.js to read data from "http://127.0.0.1:5000/api/v1.0/Covid_Cases" and run the interactive Bar and Bubble chart for each county.

Note:
load_data_into_database.ipynb - loads data in postgres database. But I used sqlite database to create endponts and run visualization

