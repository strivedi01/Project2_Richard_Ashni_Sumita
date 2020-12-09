import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///my_db.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()
# Save reference to the table
Covid = Base.classes.covid_unemployment_data


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
        f"/api/v1.0/County_Month<br/>"
        f"/api/v1.0/Unemployed<br/>"
        f"/api/v1.0/Covid_Cases<br/>"
    )


@app.route("/api/v1.0/county")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all county names"""
    # Query all passengers
    results = session.query(Covid.id).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/cases")
def counties():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of counties including the Covid_Cases, Unemployed, UnemploymentRate"""
    # Query all counties
    results = session.query(Covid.Covid_Cases, Covid.Unemployed, Covid.UnemploymentRate).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_counties = []
    for Cases, Unemployed, UnemploymentRate in results:
        county_dict = {}
        county_dict["Covid_Cases"] = Cases
        county_dict["Unemployed"] = Unemployed
        county_dict["UnemploymentRate"] = UnemploymentRate
        all_counties.append(county_dict)

    return jsonify(all_counties)


if __name__ == '__main__':
    app.run(debug=True)
