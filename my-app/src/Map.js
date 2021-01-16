import React from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker} from "react-google-maps";
import MapDirectionsRenderer from './MapDirection.js';
import LocationSearchInput from './SearchBar.js';
import DestinationList from './DestinationList.js';
import './Map.css'
const { compose, withProps } = require("recompose");


const MyMapComponent = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3C-R7oog-Ni87FFRrE-BYQMaKhX9vLAE&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap)(props => (
		<div>
		<GoogleMap defaultZoom={5} center={{ lat: props.latitude, lng: props.longitude }}>
			{props.markerplace.map((item) => (
      			<Marker position={{lat: item.latitude, lng: item.longitude}} draggable = {true}/>
    		))}

    		{props.searchplace.map((item)	=>	(
				<Marker position={{lat: item.latitude, lng: item.longitude}} />
			))}
			
    		{props.markerplace.length >= 2 && props.showMeThePath && (
      			<MapDirectionsRenderer places={props.markerplace} travelMode={google.maps.TravelMode.DRIVING}/>
    		)}

		</GoogleMap>
		</div>
	));


class ReactGoogleMaps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			latitude: 10.8231,
			longitude: 106.6297,
			destinationName: "Ho Chi Minh City",
			address: "Ho Chi Minh City, Vietnam",
			placeID: "ChIJ0T2NLikpdTERKxE8d61aX_E",
			placeIDList: [],
			destinationList: [],
			markerList: [],
			searchList: [],
			showMeThePathText: "Show Path",
			showMeThePath: false
		}
		this.handleSearchBarClick1 = this.handleSearchBarClick1.bind(this);
		this.handleSearchBarClick2 = this.handleSearchBarClick2.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleRemovePlace = this.handleRemovePlace.bind(this);
		this.handleShowMeThePath = this.handleShowMeThePath.bind(this);
	}

	handleSearchBarClick1 = (lat, lng) =>	{
		const searchPlace = {latitude: lat, longitude: lng};
		const newSearchList = [];
		newSearchList.push(searchPlace);
		this.setState({
			latitude: lat,
			longitude: lng,
			searchList: newSearchList
		});
	}

	handleSearchBarClick2 = (address, destinationName, placeID)	=>	{
		this.setState({
			address: address,
			destinationName: destinationName, 
			placeID: placeID
		})
	}

	handleButtonClick = ()	=>	{
		const marker = {latitude: this.state.latitude, longitude: this.state.longitude};
		const destination = {address: this.state.address, destinationName: this.state.destinationName, placeID: this.state.placeID};

		const newMarkerList = this.state.markerList;
		const newDestinationList = this.state.destinationList;
		const newPlaceIDList = this.state.placeIDList;

		// Avoid adding the same destination twice
		if (this.state.placeIDList.includes(this.state.placeID) == false)	{
			newDestinationList.push(destination);
			newPlaceIDList.push(this.state.placeID);
			newMarkerList.push(marker);
		}

		this.setState({
			markerList: newMarkerList,
			destinationList: newDestinationList,
			placeIDList: newPlaceIDList,
			searchList: []
		})
	}

	handleRemovePlace = (placeIDToRemove)	=> {
		const newMarkerList = this.state.markerList;
		const newDestinationList = this.state.destinationList;
		const newPlaceIDList = this.state.placeIDList;

		const index = newPlaceIDList.indexOf(placeIDToRemove);

		newMarkerList.splice(index, 1);
		newDestinationList.splice(index, 1);
		newPlaceIDList.splice(index, 1);

		this.setState({
			markerList: newMarkerList,
			destinationList: newDestinationList,
			placeIDList: newPlaceIDList,
			searchList: []
		})
	}

	handleShowMeThePath = () =>	{
		const newShowMeThePath = this.state.showMeThePath;
		this.setState({
			showMeThePath: !newShowMeThePath
		})
	}  

	render() {
		return (
			<div className="MyMapComponent">
				<div className="LocationSearchInput">
					<LocationSearchInput onClick1={this.handleSearchBarClick1} onClick2={this.handleSearchBarClick2}/>
				</div>

				<div className="MyMap">
					<MyMapComponent latitude={this.state.latitude} longitude={this.state.longitude} searchplace={this.state.searchList} 
					markerplace={this.state.markerList} showMeThePath={this.state.showMeThePath}/>
				</div>

				<div>
					<button onClick={this.handleButtonClick} className="AddButton">Add Destination</button>
				</div>
				
				<div>
					<button onClick={this.handleShowMeThePath} className="ShowPathButton">{this.state.showMeThePath ? "Hide Path" : "Show Path"}</button>
				</div>
				
				<div>
					<DestinationList className="DestinationList" desList={this.state.destinationList} removeFunc={this.handleRemovePlace}/>
				</div>
			</div>
		)
	}
}

export default ReactGoogleMaps;