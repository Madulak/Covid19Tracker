import React from 'react';
import classes from './Map.module.css';

import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

const Maps = (props) => {

    return (
        <div className={classes.Map}>
            <div className={classes.MapContainer}>
                <LeafletMap style={{height: '100%', borderRadius: '10px', }} center={props.mapCenter} zoom={props.mapZoom}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {props.countries.map(ig => (
                        <Circle key={ig.country} center={{lat: ig.countryInfo.lat, lng: ig.countryInfo.long}} 
                            fillOpacity={0.4}
                            color={'red'}
                            fillColor={'pink'}
                            radius={Math.sqrt(ig.cases)* 800}
                        >
                            <Popup >
                                <img style={{width: '100%'}} src={ig.countryInfo.flag} alt={ig.country} />
                                <h4>{ig.country}</h4>
                                <h4>Cases: {numeral(ig.cases).format(0,0)}</h4>
                                <h4>Recovered: {numeral(ig.recovered).format(0,0)}</h4>
                                <h4>Death: {numeral(ig.deaths).format(0,0)}</h4>
                            </Popup>
                        </Circle>
                    ))}
                </LeafletMap>
            </div>
            
        </div>
    )
}

export default Maps;