#importnecessarylibraries
	#from models import create_classes
	
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base
from flask import (
	Flask,
	render_template,
	jsonify,
	request,
	redirect)
	

	#################################################
	# Flask Setup
	#################################################
app = Flask(__name__)
	

#################################################
	# Database Setup
#################################################
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', '') or "postgresql://postgres:abc123abc@localhost:5432/covid_data"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False	

db = SQLAlchemy(app)	

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])	

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Save reference to the table
covidj = Base.classes.covid_data
	

#################################################
# Endpoints Setup
#################################################
# create route that renders index.html template
@app.route("/")
def home():
	return render_template("index.html")
	

# create endpoint that shares data in json format
@app.route("/api/covidj")
def covidj():
	# Query data from Covid table in db
	results = db.session.query(covidj.id, covidj.County_Month, covidj.countyFIPS, covidj.County,
	                            covidj.Covid_Cases, covidj.year, covidj.month, covidj.Month_c, covidj.County_FIPS, 
                                covidj.Month_Year,  covidj.Employed, covidj.Unemployed, covidj.Unemployment_Rate).all()
	    
	# put data into dictionary format that can be jsonified
	covid_data = []
	for result in results:
	    covid_data.append({
	        "id":result[1],
	        "County_Month":result[2],
	        "countyFIPS":result[3],
	        "County":result[4],                
	        "Covid_Cases":result[6],
	        "year":result[7],
	        "month":result[8],
	        "Month_c":result[9],
            "County_FIPS":result[10],
            "Month_Year":result[16],
            "Employed":result[18],
            "Unemployed":result[19],
            "Unemploment_Rate":result[20]})
	    
	    # display jsonified data on the dom
	return jsonify(covid_data)
	    
	

if __name__ == "__main__":
	app.run()

