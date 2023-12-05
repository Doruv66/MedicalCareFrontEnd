import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import style from './MapComponent.module.css';
import gif from '../../assets/map.gif';
import 'leaflet/dist/leaflet.css'

const MapComponent = () => {
  return (
    <div className={style.map_container}>
        <h1>Find Us Here</h1>
      <div className={style.map_wrapper}>
        <div className={style.map}>
          <MapContainer
            center={[51.41753388277643, 5.477695184472583]}
            zoom={12}
            style={{ height: '450px', width: '650px' }}
          >
            <TileLayer
              url="https://api.maptiler.com/maps/nl-cartiqo-dark/256/{z}/{x}/{y}.png?key=KImueNQkJ0uQeorxlQNS"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[51.41753388277643, 5.477695184472583]}>
              <Popup>St Anna Ziekenhuis</Popup>
            </Marker>
          </MapContainer>
        </div>
        <img src={gif} alt="map gif" />
      </div>
    </div>
  );
};

export default MapComponent;