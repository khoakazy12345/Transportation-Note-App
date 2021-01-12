import React from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker, DirectionsRenderer } from "react-google-maps";
import './Map.css'
import LocationSearchInput from './SearchBar.js';
const lodash = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");

const targetplaces = [];
const searchplaces = [];
let defaultLat = 14.0583;
let defaultLng = 108.2772;

function handleClick() {
	var lastLocation = searchplaces[searchplaces.length - 1].geometry.location;;
	if (targetplaces.length == 0 ||
		(targetplaces[targetplaces.length - 1].latitude != lastLocation.lat() && targetplaces[targetplaces.length - 1].longitude != lastLocation.lng())) {
		targetplaces.push({ latitude: lastLocation.lat(), longitude: lastLocation.lng() });
	}
}

function handleInputClick() {
	if (searchplaces.length > 0) {
		var lastLocation = searchplaces[searchplaces.length - 1].geometry.location;
		defaultLat = lastLocation.lat();
		defaultLng = lastLocation.lng();
	}
	console.log(searchplaces);
}

class MapDirectionsRenderer extends React.Component {
	constructor(props) {
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
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3C-R7oog-Ni87FFRrE-BYQMaKhX9vLAE&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),

	// lifecycle({
	// 	componentWillMount() {
	//   		const refs = {};

	//   		this.setState({
	//     		bounds: null,
	//     		center: {lat: defaultLat, lng: defaultLng},
	//     		markers: [],
	//     		onMapMounted: ref => {
	// 				refs.map = ref;
	// 			},

	//     		onBoundsChanged: () => {
	//       			this.setState({
	//        				bounds: refs.map.getBounds(),
	//         			center: refs.map.getCenter()
	//       			});
	// 			},

	//     		onSearchBoxMounted: ref => {
	//       			refs.searchBox = ref;
	// 			},

	//     		onPlacesChanged: () => {
	//       			const places = refs.searchBox.getPlaces();
	// 				const bounds = new google.maps.LatLngBounds();
	// 				console.log(this.props)
	// 				handleInputClick()
	//       			places.forEach(place => {
	//         			searchplaces.push(place);
	//         			if (place.geometry.viewport) {
	//           				bounds.union(place.geometry.viewport);
	//         			} else {
	//           			bounds.extend(place.geometry.location);
	//         			}
	// 				  });

	//       		const nextMarkers = places.map(place => ({
	//         		position: place.geometry.location
	// 			  }));

	// 			// Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
	//       		const nextCenter = lodash.get(nextMarkers, "0.position", this.state.center);

	//       	this.setState({
	//         	center: nextCenter,
	//         	markers: nextMarkers
	// 		});
	// 		console.log(this.state);
	//     }
	//   	});
	// 	}
	// }),
	withScriptjs,
	withGoogleMap)(props => (
		<GoogleMap defaultZoom={5} center={{ lat: props.latitude, lng: props.longitude }}>
			{/* <SearchBox
      			ref={props.onSearchBoxMounted}
      			bounds={props.bounds}
      			controlPosition={google.maps.ControlPosition.TOP_LEFT}
      			onPlacesChanged={props.onPlacesChanged}>
      			<input
        			type="text"
        			placeholder="Search Places..."
					className="Input_Box"
					onClick={handleInputClick}
      			/>
    		</SearchBox>

			{props.markers.map((marker, index) => (
      			<Marker key={index} position={marker.position} />
    		))}

    		{targetplaces.map((item, index) => (
      			<Marker key={index} position={{ lat: item.latitude, lng: item.longitude }}/>
    		))}

    		{targetplaces.length >= 3 && (
      			<MapDirectionsRenderer places={targetplaces} travelMode={google.maps.TravelMode.DRIVING} />
    		)}

    		<button onClick={() => handleClick()}>Add Button</button>
			<div></div> */}
		</GoogleMap>
	));

class ReactGoogleMaps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 10.8231,
			longitude: 106.6297,
			MarkerList: [],
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (lat, lng) =>	{
		this.setState({
			latitude: lat,
			longitude: lng
		})
	}

	render() {
		return (
			<div>
				<LocationSearchInput onClick={this.handleClick}/>
				<MyMapComponent latitude={this.state.latitude} longitude={this.state.longitude} />
				<button onClick={this.handleClick}>Add</button>
			</div>
		)
	}
}

export default ReactGoogleMaps;