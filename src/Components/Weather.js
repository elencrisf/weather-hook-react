

import React from "react";

class Weather extends React.Component{

    render(){

        return(

            <div className="weather-info">
                {this.props.country && this.props.city && 
                <h2 className="weather-city">            
                    <span className="weather__city">{this.props.city}, {this.props.country}</span>                    
                </h2>
                }
    
                <p className="date"> {this.props.date}</p>
 
                <p className="weather__key">Temperature Min: 
                    <span className="weather__value"> {Math.round(this.props.tempMin)}°C</span>
                </p>

                <p className="weather__key">Temperature Max: 
                    <span className="weather__value"> {Math.round(this.props.tempMax)}°C</span>
                </p>
  
                <p className="weather__key">Humidity: 
                    <span className="weather__value"> {this.props.humidity} %</span>
                </p>

                <p className="weather__key">Conditions:  
                    <span className="weather__value"> {this.props.description}</span>
                </p>

                <p className="weather__key">Wind:  
                    <span className="weather__value"> {Math.round(this.props.wind * 3.6)} Km/h speed</span>
                </p>

                <p className="weather__error"> {this.props.error}</p>

            </div>
        )
    }
}

export default Weather;

                



            

