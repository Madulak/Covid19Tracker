import React, { Fragment, useState, useEffect } from 'react';
import classes from './Covid19.module.css';

import Spinner from '../UI/Spinner/Spinner';

import numeral from 'numeral';

const Covid19 = (props) => {

    const [country, setCountry] = useState('WorldWide');

    const onChangeHandler = (event) => {
        setCountry(event.target.value);
         
    }

    useEffect(() => {
        props.dropdown(country);
    },[country])

    

    console.log(country)

    return (
        <div className={classes.Covid19}>
            <div className={classes.Heading}>
                <h1>Covid 19 Tracker</h1>
                <select value={country} onChange={onChangeHandler} className={classes.Dropdown}>
                    <option value="WorldWide">WorldWide</option>
                    {props.countries.map(ig => (
                        <option key={ig.country} value={ig.country}>{ig.country}</option>
                    ))}
                </select>
            </div>

            <div className={classes.Stats}>
                <div className={classes.Cases}>
                    {props.loading ===false ? <Fragment><h3>Corona Virus Cases</h3>
                    <h4>Today Cases: {numeral(props.dataPoint.todayCases).format('0,0')}</h4>
                    <h4>Total Cases: {numeral(props.dataPoint.cases).format('0,0')}</h4></Fragment>: <Spinner />}
                </div>

                <div className={classes.Recovered}>
                    {props.loading ===false ? <Fragment><h3>Recovered</h3>
                    <h4>Today Recovered: {numeral(props.dataPoint.todayRecovered).format('0,0')}</h4>
                    <h4>Total Recovered: {numeral(props.dataPoint.recovered).format('0,0')}</h4></Fragment>: <Spinner />}
                </div>

                <div className={classes.Deaths}>
                    {props.loading ===false ? <Fragment><h3>Deaths</h3>
                    <h4>Today Deaths: {numeral(props.dataPoint.todayDeaths).format('0,0')}</h4>
                    <h4>Total Deaths: {numeral(props.dataPoint.deaths).format('0,0')}</h4></Fragment>: <Spinner />}
                </div>
            </div>
            
        </div>
    );
}

export default Covid19;