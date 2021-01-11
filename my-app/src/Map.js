import React from "react";
import { compose, withProps } from "recompose";
import {withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer} from "react-google-maps";
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");


const MyMapComponent = compose(
  withProps({
    googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyD3C-R7oog-Ni87FFRrE-BYQMaKhX9vLAE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{height: "100%"}} ></div>,
    containerElement: <div style={{ height: "80vh" }} />,
	mapElement: <div style={{ height: "100%" }} />}), withScriptjs, withGoogleMap)	(() => (
    
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true}/>
		<MarkerWithLabel
			draggable={true}
      		position={{ lat: -34.397, lng: 150.644 }}
      		labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}>
			  <div>
			  	Hello There!
			  </div>
		</MarkerWithLabel>
    </GoogleMap>
));

const ReactGoogleMaps = () => [<MyMapComponent key="map" />];

export default ReactGoogleMaps;