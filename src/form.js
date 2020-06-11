import React from 'react';
import styles from './myStyle.module.css';
const CityName = ({getWeather}) =>{
    function myFunc(e){
        if(e.keyCode===13)
        getWeather(e)
    }
    return(
        <span className={styles.searchDiv}>
               <button className={styles.search}>&#128269;</button>
                <input type="text" name="city" onKeyUp={myFunc} className={styles.input} placeholder="City Name"/>
        </span>
    )
};
export default CityName;