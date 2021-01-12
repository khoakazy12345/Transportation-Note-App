import React from "react";
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
import {withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer} from "react-google-maps";
const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");

const targetplaces = [];
const searchplaces = [];

function handleClick() {
  	var lastLocation = searchplaces[searchplaces.length - 1].geometry.location;
  	targetplaces.push({
    	latitude: lastLocation.lat(),
    	longitude: lastLocation.lng()
  	});
}

class MapDirectionsRenderer extends React.Component {
	constructor(props)  {
		super(props);
		this.state = {
			directions: null,
    		error: null
		}
	}

  	componentWillMount() {
    	const { places, travelMode } = this.props;

    	const waypoints = places.map(p => ({
      		location: { lat: p.latitude, lng: p.longitude },
      		stopover: true
		}));
		
    	const origin = waypoints.shift().location;
    	const destination = waypoints.pop().location;
		const directionsService = new google.maps.DirectionsService();
		
		directionsService.route({
        	origin: origin,
        	destination: destination,
       	 	travelMode: travelMode,
        	waypoints: waypoints
      	},
      	(result, status) => {
        	if (status === google.maps.DirectionsStatus.OK) {
          		this.setState({
            		directions: result
          		});
        	} else {
					this.setState({ error: result })
			}
      	});
	}

  	render() {
    	if (this.state.error) {
      		return <h1>{this.state.error}</h1>;
    	}
    	return (
      		this.state.directions && (
        	<DirectionsRenderer directions={this.state.directions} />
      	));
  	}	
}

const MyMapComponent = compose(
  	withProps({
    	googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyD3C-R7oog-Ni87FFRrE-BYQMaKhX9vLAE&v=3.exp&libraries=geometry,drawing,places",
    	loadingElement: <div style={{ height: `100%` }} />,
    	containerElement: <div style={{ height: `400px` }} />,
    	mapElement: <div style={{ height: `100%` }} />
  	}),
  	lifecycle({
    	componentWillMount() {
      		const refs = {};

      		this.setState({
        		bounds: null,
        		center: {lat: 41.9, lng: -87.624},
        		markers: [],
        		onMapMounted: ref => {
					  refs.map = ref;
				},

        		onBoundsChanged: () => {
          			this.setState({
           				bounds: refs.map.getBounds(),
            			center: refs.map.getCenter()
          			});
				},
				
        		onSearchBoxMounted: ref => {
          			refs.searchBox = ref;
				},
				
        		onPlacesChanged: () => {
          			const places = refs.searchBox.getPlaces();
          			const bounds = new google.maps.LatLngBounds();

          			places.forEach(place => {
            			searchplaces.push(place);
            			if (place.geometry.viewport) {
              				bounds.union(place.geometry.viewport);
            			} else {
              			bounds.extend(place.geometry.location);
            			}
					  });
					  
          		const nextMarkers = places.map(place => ({
            		position: place.geometry.location
				  }));
				  
          		const nextCenter = _.get(nextMarkers, "0.position",this.state.center);

          	this.setState({
            	center: nextCenter,
            	markers: nextMarkers
          	});
        }
      	});
    	}
  	}),
  	withScriptjs,
  	withGoogleMap)	(props => (
  		<GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
    		<SearchBox
      			ref={props.onSearchBoxMounted}
      			bounds={props.bounds}
      			controlPosition={google.maps.ControlPosition.TOP_LEFT}
      			onPlacesChanged={props.onPlacesChanged}>
      			<input
        			type="text"
        			placeholder="Customized your placeholder"
        			style={{
          				boxSizing: `border-box`,
          				border: `1px solid transparent`,
          				width: `240px`,
          				height: `32px`,
          				marginTop: `27px`,
          				padding: `0 12px`,
          				borderRadius: `3px`,
          				boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          				fontSize: `14px`,
          				outline: `none`,
          				textOverflow: `ellipses`
        			}}
      			/>
    		</SearchBox>

    		{props.markers.map((marker, index) => (
      			<Marker key={index} position={marker.position} />
    		))}

    		{targetplaces.map((item, index) => (
      			<Marker key={index} position={{ lat: item.latitude, lng: item.longitude }}/>
    		))}

    		{targetplaces.length >= 100 && (
      			<MapDirectionsRenderer places={targetplaces} travelMode={google.maps.TravelMode.DRIVING} />
    		)}

    		<button onClick={() => handleClick()}>Add Button</button>
  		</GoogleMap>
));

const ReactGoogleMaps = () => [<MyMapComponent key="map" />];

export default ReactGoogleMaps;