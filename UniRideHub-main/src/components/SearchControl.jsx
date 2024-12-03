// SearchControl.js
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { createControlComponent } from '@react-leaflet/core';
import './css/SearchControl.css'

const karachiBounds = L.latLngBounds(
    [24.7704, 66.8241], // Southwest corner
    [25.3007, 67.5000] // Northeast corner
   );
   
const createSearchControl = (props) => {
 const controlInstance = new GeoSearchControl({
 provider: new OpenStreetMapProvider(),
//  style: 'bar',
 autoComplete: true,
 autoCompleteDelay: 250,
bounds: karachiBounds,
 ...props,
 });

 return controlInstance;
};

const SearchControl = createControlComponent(createSearchControl);

export default SearchControl;
