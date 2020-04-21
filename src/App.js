
import React, {useState, useEffect} from "react";
import Weather from "./Components/Weather";
import Form from "./Components/Form";
import Title from "./Components/Title";
import "./App.css";


const Api_Key = "27289e1da449c7d3cfb8b0db0cfab0d2";


function App() {


  // const [query, setQuery] = useState('');
  // const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');



  // function fetchData(e) {
  //   e.preventDefault();
  // useEffect(() => console.log('mounted'), []);
  useEffect(() => {

    const city = 'Vancouver';
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`)
    .then(response => response.json()) // first of all you use the same argument for both requests. both the response and parsed data uses the same name and it's a bad practice. try to avoid that by calling the json one something like data or more meaningful name
    .then(response => {
      


    let sunrise = response.sys.sunrise, 
            sunset = response.sys.sunset, //the data is the parsed json in the fetch function and the sys.sunset, sys.sunrise are the properties inside that specific json
            timezone = response.timezone,
            temp = response.main.temp; //This is a way to declare multiple variables without typing var/let/const for every variable.
          sunrise = sunrise * 1000 + timezone * 1000; // sunrise and sunset return the  milliseconds of the date and time that passed since 1/1/1970 so we need to parse it to a date/time format.
          sunset = sunset * 1000 + timezone * 1000;
          let sunriseDT = new Date(sunrise); //this is parsing the milliseconds into a date/time format and storing it in a variable.
          let sunsetDT = new Date(sunset);
          // Sunrise time
          let srhr = sunriseDT.getUTCHours(), //since the openweatherapi return the date in utc time we need to use the utc method of getting hours and minutes
           srmn = ("00" + sunriseDT.getUTCMinutes()).slice(-2);
          // Sunset time
          let snhr = sunsetDT.getUTCHours(), //same thing for the sunset
           snmn = ("00" + sunsetDT.getUTCMinutes()).slice(-2);
           
           //   var formattedTime = hours + ':' + minutes.substr(-2); // + ':' + seconds.substr(-2);

          let main = response.weather[0].main;
          let city = response.name;
          let country = response.sys.country;
          let tempMin = response.main.temp_max;
          let tempMax = response.main.temp_min;
          let humidity = response.main.humidity;
          let wind = response.wind.speed;
          let description = response.weather[0].description;
          let icon = response.weather[0].icon;

      setWeather({ 
        response,
        temperature: temp,
        city: city,
        country: country,
        tempMin: tempMin,
        tempMax: tempMax,
        main: main,
        icon: icon,
        humidity: humidity,
        description: description,
        wind: wind,
        // setTimezone: response.timezone,
        sunset: snhr + ":" + snmn,
        sunrise: srhr + ":"+ srmn, 
      })
    })
  }
  , []);

  const getWeather = async (e) => {

    const query = e.target.elements.city.value;
    
    e.preventDefault();
    try {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${Api_Key}`);
      const response = await api_call.json();
      console.log(response);

  
      let sunrise = response.sys.sunrise, 
            sunset = response.sys.sunset, //the data is the parsed json in the fetch function and the sys.sunset, sys.sunrise are the properties inside that specific json
            timezone = response.timezone,
            temp = response.main.temp; //This is a way to declare multiple variables without typing var/let/const for every variable.
          sunrise = sunrise * 1000 + timezone * 1000; // sunrise and sunset return the  milliseconds of the date and time that passed since 1/1/1970 so we need to parse it to a date/time format.
          sunset = sunset * 1000 + timezone * 1000;
          let sunriseDT = new Date(sunrise); //this is parsing the milliseconds into a date/time format and storing it in a variable.
          let sunsetDT = new Date(sunset);
          // Sunrise time
          let srhr = sunriseDT.getUTCHours(), //since the openweatherapi return the date in utc time we need to use the utc method of getting hours and minutes
            srmn = ("00" + sunriseDT.getUTCMinutes()).slice(-2);
          // Sunset time
          let snhr = sunsetDT.getUTCHours(), //same thing for the sunset
            snmn = ("00" + sunsetDT.getUTCMinutes()).slice(-2);
          
          let main = response.weather[0].main;
          let city = response.name;
          let country = response.sys.country;
          let tempMin = response.main.temp_max;
          let tempMax = response.main.temp_min;
          let humidity = response.main.humidity;
          let wind = response.wind.speed;
          let description = response.weather[0].description;
          let icon = response.weather[0].icon;
          


      city ? setWeather({
        response,
        temperature: temp,
        city: city,
        country: country,
        tempMin: tempMin,
        tempMax: tempMax,
        main: main,
        icon: icon,
        humidity: humidity,
        description: description,
        wind: wind,
        // setTimezone: response.timezone,
        sunset: snhr + ":" + snmn,
        sunrise: srhr + ":"+ srmn,      
        error: ""
      }) : setError({
        error:
        alert("City not informed"
        )
      })
    } catch(error) {
        alert('City not found');
        console.log('Invalid City' + error);
      
    }
    
  }



  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`

  }

  

  return (

      <div>
         <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Title
                  main={weather.main}
                  icon={weather.icon}
                  // main={weather.weather[0].main}
                  // icon={weather.weather[0].icon}
                  temperature={weather.temperature}
                  timezone={weather.timezone}
                  sunrise={weather.sunrise}
                  sunset={weather.sunset}
                  />
                </div>
                <div className="col-xs-7 form-container">
                <Form loadWeather={getWeather} />
                  <Weather 
                    date={dateBuilder(new Date())}
                    tempMin={weather.tempMin}
                    tempMax={weather.tempMax}
                    city={weather.city}
                    country={weather.country}
                    humidity={weather.humidity}
                    description={weather.description}
                    wind={weather.wind}
                    // city={weather.name}
                    // country={weather.sys.country}
                    // humidity={weather.main.humidity}
                    // description={weather.weather[0].description}
                    // wind={weather.wind.speed}
                    error={error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}


export default App;




// export function parseTime (timestamp, timezone) {
//   // let local = new Date();
//   //console.log(local.getTimezoneOffset()*60);
//   //console.log('>>> Timezone: ' + timezone);

//   //var adjTimestamp = (timestamp * 1000) - timezone - (local.getTimezoneOffset()/60);
//   var adjTimestamp = timestamp * 1000 + (timezone * 1000);
//   //console.log('Adjusted time: ' + adjTimestamp);

//   var date = new Date(adjTimestamp);
//   // Hours part from the timestamp
//   var hours = date.getUTCHours();
//   // Minutes part from the timestamp
//   var minutes = "0" + date.getUTCMinutes();
//   // Seconds part from the timestamp
//   // var seconds = "0" + date.getUTCSeconds();

//   // Will display time in HH:MM:SS format
//   var formattedTime = hours + ':' + minutes.substr(-2); // + ':' + seconds.substr(-2);
  
//   if(isNaN(timestamp) || isNaN(timezone)){
//     return `Is not a number: timestamp [${timestamp}] timezone [${timezone}]`;
//   }
//   return formattedTime;
// }




















  
  // getZoneSunrise = () => {

  //   const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`);
  //   const response = await api_call.json();
  //   let sunrise = response.sys.sunrise,
  //         timezone = response.timezone;
  //         sunrise = sunrise * 1000 + (timezone * 1000);
  //         sunriseDT = new Date(sunrise);
  //   let srhr = sunriseDT.getUTCHours(),
  //   srmn = sunriseDT.getUTCMinutes()
    
  //   return `${srhr} ${srmn}`

  // }

  // getZoneSunset = () => {

  //   const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`);
  //   const response = await api_call.json();
  //   let sunset = response.sys.sunset,
  //         timezone = response.timezone;
  //         sunset = sunset * 1000 + (timezone * 1000);
  //         sunsetDT = new Date(sunset)
  //   let snhr = sunsetDT.getUTCHours()
  //   , snmn = sunsetDT.getUTCMinutes()

    
  //   return `${snhr} ${snmn}`

  // }


















// import React from "react";
// import "./styles.css";

// // import Weather from "./Weather";
// // import { Provider } from "./Context"; // Import Provider from Context.js



// // function App() {
// //   return (
// //     //We need to wrap everything inside the Provider Component.
// //     <Provider>
// //       <Weather />
// //     </Provider>
// //   );
// // }



// const api = {
//   key: "27289e1da449c7d3cfb8b0db0cfab0d2",
//   base: "https://api.openweathermap.org/data/2.5/"
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       query: '',
//       weather: []
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.search = this.search.bind(this)
//   }

  


// componentDidMount() {
// //   fetch("https://api.imgflip.com/get_memes")
// //   .then(response => response.json())
// //   .then(response => {
// //   const { memes } = response.data
// //   console.log(memes[0])
// //   this.setState({ memeImgs: memes })
// //   })
// }

//   // const [query, setQuery] = useState('');
//   // const [weather, setWeather] = useState({});

//   search = evt => {

//     // const query = this.state;
  
//     if (evt.key === "Enter") {
//       fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//         .then(res => res.json())
//         .then(result => {
//           this.setState({ weather: result});
//           // this.setState({ query: ''});
//           // this.setWeather(result);
//           // this.setQuery('');
//           console.log(result);
//         });
//     }
//   }

//   dateBuilder = (d) => {
//     let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`
//   }

//   handleChange(event) {
//     const { query, value } = event.target
//     this.setState({ [query]: value})
// }

//   // handleSubmit(event) {
//   //     event.preventDefault();  
//   //     // const randNum = Math.floor(Math.random() * this.state.memeImgs.length);
//   //     // const randMemeImg = this.state.memeImgs[randNum].url;
//   //     this.setState({ randomImg: randMemeImg });
//   // } 

//   render() {
//     return (
//       <>
//       {/* // <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}> */}
//       <div>
      
//           <div className="search-box">
//             <input 
//               type="text"
//               className="search-bar"
//               placeholder="Search..."
//               // onChange={e => this.setQuery(e.target.value)}
//               value={this.state.query}
//               onChange={this.handleChange}
//               onKeyPress={this.search}
//             />
//           </div>
//           {(typeof this.state.weather.main != "undefined") ? (
//           <div>
//             <div className="location-box">
//               <div className="location">{this.state.weather.name}, {this.state.weather.sys.country}</div>
//               <div className="date">{this.dateBuilder(new Date())}</div>
//             </div>
//             <div className="weather-box">
//               <div className="temp">
//                 {Math.round(this.state.weather.main.temp)}°c
//               </div>
//               <div className="weather">{this.state.weather.weather[0].main}</div>
//             </div>
//           </div>
//           ) : ('')}
      
//       </div>
//       </>
//     );

//   }


// }
// export default App;