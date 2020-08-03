import React, { useState, useEffect } from 'react';
import classes from './App.module.css';

import Graph from './components/Graph/Graph';
import Covid19 from './components/Covid19/Covid19';
import Map from './components/Map/Map';
import Countrybycase from './components/Casebycountry/Casebycountry';

import Axios from 'axios';
import "leaflet/dist/leaflet.css";

const App = React.memo(() => {

  const [country, setCountry] = useState('WorldWide');
  const [isWorld, setIsworld] = useState(true);
  const [countries, setCountries] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingGraph, setLoadingGraph] = useState(false);
  

  const [worlddata, setWorlddata] = useState();
  const [countrydata, setCountrydata] = useState('');

  const [mapCenter, setMapCenter] = useState({lat: -27.80746, lng: 10.4796})
  const [mapZoom, setMapZoom] = useState(2.6);

  document.title = "Covid19 Tracker";

  let urlWorld = 'https://disease.sh/v3/covid-19/all';
  let urlCountry = `https://disease.sh/v3/covid-19/countries/${country}?strict=false`;
  let urlCountries = 'https://disease.sh/v3/covid-19/countries?sort=cases';

  useEffect(() => {
    if(country === 'WorldWide') {
      setLoading(true);
      Axios.get(urlWorld)
        .then(response => {
          console.log(response);
          setWorlddata(response.data);
          setMapCenter({lat: -27.80746, lng: 10.4796})
          setMapZoom(2.6);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    } 
    if(country !== '' && country !== 'WorldWide') {
      setLoading(true);
      Axios.get(urlCountry)
        .then(response => {
          console.log(response);
          setWorlddata(response.data);
          setMapCenter({lat: response.data.countryInfo.lat, lng: response.data.countryInfo.long})
          setMapZoom(4);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
    }

  },[country, urlWorld, mapZoom, mapCenter])

  

  useEffect(() => {
    setLoadingGraph(true);
    Axios.get(urlCountries)
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
        setLoadingGraph(false);
      })
      .catch(err => {
        console.log(err);
      });
  },[urlCountries])

  const dropdown = (id) => {
    setCountry(id);
  }

  console.log(country);

  return (
    <div className={classes.App}>
      <div className={classes.First}>
       <Covid19 dropdown={dropdown} loading={loading} countries={countries} dataPoint={worlddata ? worlddata : countrydata} /> 
        <Map  countries={countries} loading={loading} mapZoom={mapZoom} mapCenter={mapCenter} />
      </div>

      <div className={classes.Second}>
          <Countrybycase loading={loadingGraph} tableData={countries}/>
          <Graph   />
      </div>
        
    </div>
  );
})

export default App;
