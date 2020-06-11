import React from'react';
import Daycard from './DayCard';
import UnitToggle from './unitToggle';
import CityName from './form';
import styles from './myStyle.module.css';

require('dotenv').config();
var moment=require('moment');
let city="delhi";
let weatherNowObj={
    imgUrl:null,
    temp:null,
    desc:null,
    max:null,
    min:null,
    humidity:null,
    pressure:null,
    sunrise:null,
    sunset:null,
    celsiusMax:null,
    fahrenheitMax:null,
    celsiusMin:null,
    fahrenheitMin:null,
    newDate:null,
    newDateSunset:null,
    celsius:null,
    fahrenheit:null
};
class WeekContainer extends React.Component{
    state={
        fullData:[],
        dailyData:[],
        weatherNow:undefined,
        unitType: "celsius"
    }
       whenMounted=()=>{
    const forecastUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&APPID=${process.env.REACT_APP_KEY}`;
    fetch(forecastUrl)
    .then(res => { //if user enters wrong city name and 404 occurs then below code will display alert and reload tha page
        if(res.ok){ 
            return res.json()
        }else{
            alert("City name not found")}
            city="delhi";
            window.location.reload(false);
        })
    .then(data => {  
        const dailyData=data.list.filter(reading => reading.dt_txt.includes("15:00:00"));
        this.setState({
            fullData: data,
            dailyData: dailyData
        },() => {console.log(this.state)
            document.querySelector("h1").textContent=this.state.fullData.city.name+","+this.state.fullData.city.country;
        })
        //IMPORTANT: SETSTATE IS ASYNCHRONOUS CAN'T TELL WHEN WILL IT EXECUTE SO USE CALLBACK SETSTATE
    })

    const weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&APPID=${process.env.REACT_APP_KEY}`;
    fetch(weatherUrl)
    .then(response=> response.json())
    .then(Data => this.setState({weatherNow: Data},()=>{
        weatherNowObj.imgUrl=`owf owf-${this.state.weatherNow.weather[0].id} owf-5x`;
        weatherNowObj.temp=Math.round(this.state.weatherNow.main.temp);
        weatherNowObj.celsius=Math.round(weatherNowObj.temp);
        weatherNowObj.fahrenheit=Math.round((weatherNowObj.celsius*9/5)+32);
        weatherNowObj.desc=this.state.weatherNow.weather[0].main;
        weatherNowObj.max=this.state.weatherNow.main.temp_max;
        weatherNowObj.min=this.state.weatherNow.main.temp_min;
        weatherNowObj.pressure=this.state.weatherNow.main.pressure;
        weatherNowObj.humidity=this.state.weatherNow.main.humidity;
        weatherNowObj.sunrise=this.state.weatherNow.sys.sunrise;
        weatherNowObj.sunset=this.state.weatherNow.sys.sunset;
        weatherNowObj.celsiusMax =Math.round(weatherNowObj.max);
        weatherNowObj.fahrenheitMax=Math.round((weatherNowObj.celsiusMax*9/5)+32);
        weatherNowObj.celsiusMin =Math.round(weatherNowObj.min);
        weatherNowObj.fahrenheitMin=Math.round((weatherNowObj.celsiusMin*9/5)+32);
        weatherNowObj.newDate=new Date();
        weatherNowObj.newDate.setTime(weatherNowObj.sunrise*1000)
        weatherNowObj.newDateSunset=new Date();
        weatherNowObj.newDateSunset.setTime(weatherNowObj.sunset*1000)
    }))
    };
    componentDidMount=()=>{
        this.whenMounted();
    };

    updateDegreeUnit=event=>{
        this.setState({unitType: event.target.value})
    };

    formatDayCard = () => {
        return this.state.dailyData.map((reading,index) => <Daycard reading={reading} key={index} unitType={this.state.unitType}/>)
    };
    getWeather=e=>{
        city=e.target.value;
        if(e.target.value.length!==0){
        e.preventDefault();
        this.whenMounted();
        e.target.value=""
        }else{
            e.preventDefault()
            alert("Please enter City name")
        }
    };
    render(){
        return(
            <div>
                <CityName getWeather={this.getWeather}/>
                <div style={{marginLeft:"15px",width:"100%"}}>
                        <h1 style={{color:"white",marginBottom:"10px",fontSize:"-webkit-xxx-large"}}></h1>
                        <h3 style={{color:"white",marginTop:"0"}}>{moment().format('dddd Do MMMM')}</h3>
                    </div>
                    <div className={styles.mainWeather}>
                    <div className={styles.mainWeatherLeft}>
                        <div>
                        <i style={{marginTop:"60px",marginRight:"30px"}} className={weatherNowObj.imgUrl}></i>                                     
                        </div>
                        <div>
                            <span style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                            <h2 style={{fontSize:"70px",marginBottom:"3px"}}>{this.state.unitType==="celsius"?weatherNowObj.celsius:weatherNowObj.fahrenheit}°</h2>
                            <UnitToggle unitType={this.state.unitType} updateDegreeUnit={this.updateDegreeUnit}/>
                            </span>
                            <h3>{weatherNowObj.desc}</h3>
                        </div>
                    </div>
                    <div className={styles.mainWeatherRight}>
                        <div className={styles.mainRightChild}>
                            <h4>{weatherNowObj.humidity}</h4>
                            <h4>Humidity</h4>
                        </div>
                        <div className={styles.mainRightChild}>
                            <h4>{this.state.unitType=="celsius"?weatherNowObj.celsiusMax:weatherNowObj.fahrenheitMax}°</h4>
                            <h4>Max</h4>
                        </div>        
                        <div className={styles.mainRightChild}>
                                <h4>{moment(weatherNowObj.newDate).format('HH:mm')}</h4>
                                <h4>Sunrise</h4>
                        </div>
                        <div className={styles.mainRightChild}>
                            <h4>{weatherNowObj.pressure}</h4>
                            <h4>Pressure</h4>
                        </div>
                        <div className={styles.mainRightChild}>
                                <h4>{this.state.unitType=="celsius"?weatherNowObj.celsiusMin:weatherNowObj.fahrenheitMin}°</h4>
                                <h4>Min</h4>
                        </div>
                        <div className={styles.mainRightChild}>
                                <h4>{moment(weatherNowObj.newDateSunset).format('HH:mm')}</h4>
                                <h4>Sunset</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 style={{color:"white",textAlign:"start",marginLeft:"10px",fontSize:"40px"}}>5 Day Forecast</h2>
                </div>
                <br/>
        <div className={styles.mycard}> 
            {this.formatDayCard()}
        </div>
        </div>
      );
    }
}
export default WeekContainer;