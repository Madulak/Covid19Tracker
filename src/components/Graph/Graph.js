import React, { useState, useEffect, Fragment } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import classes from './Graph.module.css';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = 'cases') => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <Fragment><h3>World Wide Stats Graph</h3>
    <div className={classes.Graph}>
      {data?.length > 0 && (
        <Line 
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div></Fragment>
  );
}

export default LineGraph;


// import React, { Fragment, useState, useEffect } from 'react';
// import classes from './Graph.module.css';

// import Spinner from '../UI/Spinner/Spinner';
// import Axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { numeral } from 'numeral';


// const Graph = (props) => {

//     const [country, setCountry] = useState('');
//     const [data, setData] = useState({});
//     const [graphData, setGraphData] = useState();

//     let urlCountry = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`;
//     let urlWorld = `https://disease.sh/v3/covid-19/historical/all?lastdays=130`;

//     useEffect(() => {
//         Axios.get(urlWorld)
//             .then(response => {
//                 console.log(response.data.cases);
//                 setGraphData(response.data.cases)
//                 let chartData = buildChartData(graphData)
//                 setData(chartData);
//                 console.log(data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     },[])

//     const buildChartData = data => {
//         const chartData = [];
//         let lastDataPoint;
//         for (let date in data) {
//             let newDataPoint = {
//                 x: date,
//                 y: data[date]
//             }
//             chartData.push(newDataPoint);
//         }
//         return chartData;

//     }

    
// const options = {
//     legend: {
//         display: false,
//     },
//     elements: {
//         point: {
//             radius: 0
//         },
//     },
//     maintainAspectRatio: false,
//     tooltips: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//             label: function (tooltipItem, data) {
//                 return numeral(tooltipItem.value).format('+0,0');
//             }
//         }
//     },
//     scales: {
//         xAxes: [
//             {
//                 type: 'time',
//                 time: {
//                     format: 'dd/mm/yy',
//                     tooltipFormat: '11'
//                 },
                
//             }
//         ],
//         yAxes: [
//             {
//                 gridLines: {
//                     display: false,
//                 },
//                 // ticks: {
//                 //     callback: function(value, index, values) {
//                 //         return numeral(value).format('0a');
//                 //     }
//                 // }
//             }
//         ]
//     }
// }

//     return (
//         <div className={classes.Graph}>
//             <div className={classes.Countries}>
                
                
//                 <h3>Countries By Case</h3>
//                 <div className={classes.GraphStyle}>
//                 {props.loading === false ? <Fragment>{props.tableData ? <Fragment>{props.tableData.map(ig => (
                    
//                         <tr key={ig.country}>
//                             <td>{ig.country}</td>
//                             <td><strong>{ig.cases}</strong></td>
//                         </tr>
                    
//                 ))}</Fragment> : ''}</Fragment> : <Spinner />}
//                 </div>
               
//             </div>

//             <div className={classes.GraphStats}>
//                  <h3>Here will fit a Graph</h3>
//                  {data ? <Fragment><Line 
//                     options={options}
//                     data={{
//                         datasets: [
//                             {
//                                 label: '# Cases',
//                                 backgroundColor: 'rgba(204,16,52,0.5)',
//                                 borderColor: '#CC1034',
//                                 data: data
//                             }
//                         ]
//                     }}
//                  /></Fragment>: ''}

//             </div>
//         </div>
//     );
// }

// export default Graph;