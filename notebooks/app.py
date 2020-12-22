import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, json


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///covid_dbase.sqlite")
#engine = create_engine("sqlite:///covid_table.sql")
#engine = create_engine("sqlite:///ks.db")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Covid = Base.classes.joined_df_final_v1

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/County<br/>"
        f"/api/v1.0/Covid_Cases"
    )


@app.route("/api/v1.0/County")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all county names"""
    # Query all passengers
    results = session.query(Covid.County).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/Covid_Cases")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Covid.County, Covid.Month_Year, Covid.Month_c, Covid.Covid_Cases, Covid.Unemployed, Covid.Unemployment_Rate).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_counties
    all_counties = []
    for County, Month_Year, Month_c, Covid_Cases, Unemployed,Unemployment_Rate in results:
        county_dict = {}
        county_dict["County"] = County
        county_dict["Month_Year"] = Month_Year
        county_dict["Month_c"] = Month_c
        county_dict["Covid_Cases"] = Covid_Cases
        county_dict["Unemployed"] = Unemployed
        county_dict["Unemployment_Rate"] = Unemployment_Rate
        all_counties.append(county_dict)
    response = app.response_class(
        response=json.dumps(all_counties),
        mimetype='application/json'
    )

    return response
    #return jsonify(all_counties)

@app.after_request # blueprint can also be app~~
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    app.run(debug=True)
