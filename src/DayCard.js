import React from 'react';
import styles from './myStyle.module.css';
var moment = require('moment');
const Daycard=({reading, unitType})=>{

    let newDate = new Date();
    newDate.setTime(reading.dt*1000);
    const imgurl=`owf owf-${reading.weather[0].id} owf-5x`;
    const celsius =Math.round(reading.main.temp)
    const fahrenheit=Math.round((celsius*9/5)+32);
    const moreInfoCall=()=> {
        document.getElementById("moreInfo").style.display="block";
    }
    return(
        <React.Fragment>
        <div id="cardd" className={styles.daycards} onClick={moreInfoCall}>
            <h3>{moment(newDate).format('dddd')}</h3>
            <h5 style={{opacity:"0.5"}}>{moment(newDate).format('MMMM Do')}</h5>
            <i className={imgurl}></i>
            <h2>{unitType === "celsius" ? celsius+"°C" : fahrenheit+"°F"}</h2>
            <h4>{reading.weather[0].description}</h4>
        </div>
        <div className={styles.moreInfo} id="moreInfo">
            <div className={styles.moreInfoChild}>
                <i className={styles.close} onClick={()=> document.getElementById("moreInfo").style.display="none"}>&times;</i>
                <h1>haa bhai aa gye majje</h1>
                <h2></h2>
            </div>
        </div>
        </React.Fragment>
    );
}
export default Daycard;