import React from "react";

class Title extends React.Component {

    render() {

        return (
            <>
            <div className="title-container">
                <h3 className="title-container__title">Weather </h3>
                <h3 className="title-container__subtitle">{this.props.main}</h3>
            </div>
            <div className="title-container__icon">          
                <img
                src={
                "http://openweathermap.org/img/wn/" + this.props.icon + ".png"
                }
                alt={this.props.icon}
                />
                <h4 className="title-container__temperature">{Math.round(this.props.temperature)}°C</h4>          
            </div>
            <div className="title-container__sun">
                {/* <p className="title-container__sunrise">Sunrise: {this.props.parseZoneTime}00 am</p> */}
                <p className="title-container__sunrise">Sunrise: {this.props.sunrise}:00</p>
                <p className="title-container__sunset">Sunset: {this.props.sunset}:00</p>
            </div>
            </>
        )
    }
}

export default Title;