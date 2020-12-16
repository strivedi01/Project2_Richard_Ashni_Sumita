import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///covid_dbase.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Covid = Base.classes.County

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
    results = session.query(Covid.County, Covid.Month_Year, Passenger.Covid_Cases).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_counties
    all_counties = []
    for County, Month_Year, Covid_Cases in results:
        county_dict = {}
        county_dict["County"] = County
        county_dict["Month_Year"] = Month_Year
        county_dict["Covid_Cases"] = Covid_Cases
        all_counties.append(county_dict)

    return jsonify(all_counties)


if __name__ == '__main__':
    app.run(debug=True)
