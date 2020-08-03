import React, { Fragment } from 'react';
import classes from './Casebycountry.module.css';

import Spinner from '../UI/Spinner/Spinner';


const Graph = (props) => {

    return (
        <div className={classes.Graph}>
            <div className={classes.Countries}>
                
                
                <h3>Countries By Case</h3>
                <div className={classes.GraphStyle}>
                {props.loading === false ? <Fragment>{props.tableData ? <Fragment>{props.tableData.map(ig => (
                    
                        <tr key={ig.country}>
                            <td>{ig.country}</td>
                            <td><strong>{ig.cases}</strong></td>
                        </tr>
                    
                ))}</Fragment> : ''}</Fragment> : <Spinner />}
                </div>
               
            </div>

            
        </div>
    );
}

export default Graph;