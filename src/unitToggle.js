import React from 'react';
import styles from './myStyle.module.css';
function UnitToggle({unitType,updateDegreeUnit}){
    return(
        <React.Fragment>
        <div>
            <button className={styles.celsius} type="radio" name="degree-type" id="celsius" value="celsius" onClick={updateDegreeUnit}>C</button>
            <i style={{fontSize:"20px"}}>|</i>
            <button className={styles.fahrenheit} type="radio" name="degree-type" id="fahrenheit" value="fahrenheit" onClick={updateDegreeUnit}>F</button>
            
        </div>
        </React.Fragment>
    );
}
export default UnitToggle;