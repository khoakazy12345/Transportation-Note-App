import React from "react";
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps";
import MapDirectionsRenderer from './MapDirection.js';
import LocationSearchInput from './SearchBar.js';
import DestinationList from './DestinationList.js';
import SimpleDialogDemo from './AlertBox.js';
import './Map.css'
const { compose, withProps } = require("recompose");


const MyMapComponent = compose(
	withProps({
		googleMapURL: "https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap)(props => (
		<div>
			<GoogleMap defaultZoom={5} center={{ lat: props.latitude, lng: props.longitude }}>
				{props.markerplace.map((item) => (
					<Marker position={{ lat: item.latitude, lng: item.longitude }} draggable={true} />
				))}

				{props.searchplace.map((item) => (
					<Marker position={{ lat: item.latitude, lng: item.longitude }} />
				))}

				{props.enoughPlace
					? console.log("Yes")
					: console.log("No")}

				{props.markerplace.length >= 2 && props.showMeThePath && (
					<MapDirectionsRenderer onError={props.onError} places={props.markerplace} travelMode={google.maps.TravelMode.DRIVING} />
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
			showMeThePath: false,
			noRouteError: false,
			notEnoughDestinationError: false
		}
		this.handleSearchBarClick1 = this.handleSearchBarClick1.bind(this);
		this.handleSearchBarClick2 = this.handleSearchBarClick2.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleRemovePlace = this.handleRemovePlace.bind(this);
		this.handleShowMeThePath = this.handleShowMeThePath.bind(this);
		this.handleNoRouteErrorOpen = this.handleNoRouteErrorOpen.bind(this);
		this.handleNoRouteErrorClose = this.handleNoRouteErrorClose.bind(this);
	}

	handleSearchBarClick1 = (lat, lng) => {
		const searchPlace = { latitude: lat, longitude: lng };
		const newSearchList = [];
		newSearchList.push(searchPlace);
		this.setState({
			latitude: lat,
			longitude: lng,
			searchList: newSearchList
		});
	}

	handleSearchBarClick2 = (address, destinationName, placeID) => {
		this.setState({
			address: address,
			destinationName: destinationName,
			placeID: placeID
		})
	}

	handleButtonClick = () => {
		const marker = { latitude: this.state.latitude, longitude: this.state.longitude };
		const destination = { address: this.state.address, destinationName: this.state.destinationName, placeID: this.state.placeID };

		const newMarkerList = this.state.markerList;
		const newDestinationList = this.state.destinationList;
		const newPlaceIDList = this.state.placeIDList;

		// Avoid adding the same destination twice
		if (this.state.placeIDList.includes(this.state.placeID) == false) {
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

	handleOptimalButtonClick = () => {
		fetch('http://localhost:5000/api/showpath', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ destination: this.state.destinationList })
		})
			.then(response => response.json())
			.then(json => {
				const optimalList = json.optimalList;
				// Do something to update Direction Rerender
				console.log(optimalList)
			})
			.catch(error => {
				console.log("Error!")
			});
	}

	handleRemovePlace = (placeIDToRemove) => {
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

	handleShowMeThePath = () => {
		if (this.state.destinationList.length > 1) {
			const newShowMeThePath = this.state.showMeThePath;
			this.setState({
				showMeThePath: !newShowMeThePath,
			})
		}	else	{
			this.setState({
				notEnoughDestinationError: true
			})
		}
	}

	handleNotEnoughDestinationErrorClose = ()	=>	{
		this.setState({
			notEnoughDestinationError: false
		})
	}

	handleNoRouteErrorOpen = ()	=>	{
		this.setState({	
			showMeThePath: false,
			noRouteError: true
		})
	}

	handleNoRouteErrorClose = ()	=>	{
		this.setState({	
			noRouteError: false
		})
	}

	render() {

		return (
			<div className="MyMapComponent">
				<div>
					{this.state.noRouteError && <SimpleDialogDemo onClose={this.handleNoRouteErrorClose} 
					title={"No Possible Route Error"} body={"Looks like there is no driving route through all you destinations. Consider dropping some of them."}/>}
				</div>

				<div>
					{this.state.notEnoughDestinationError && <SimpleDialogDemo onClose={this.handleNotEnoughDestinationErrorClose} 
					title={"Not Enough Destination Error"} body={"You do not have two or more destination. Consider add more before moving on."}/>}
				</div>

				<div className="LocationSearchInput">
					<LocationSearchInput onClick1={this.handleSearchBarClick1} onClick2={this.handleSearchBarClick2} />
				</div>

				<div className="MyMap">
					<MyMapComponent latitude={this.state.latitude} longitude={this.state.longitude} searchplace={this.state.searchList}
						markerplace={this.state.markerList} showMeThePath={this.state.showMeThePath} enoughPlace={this.state.enoughPlace}
						onError={this.handleNoRouteErrorOpen}
					/>
				</div>

				<div>
					<button onClick={this.handleButtonClick} className="AddButton">Add Destination</button>
				</div>

				<div>
					<button onClick={this.handleShowMeThePath} className="ShowPathButton">{this.state.showMeThePath ? "Hide Path" : "Show Path"}</button>
				</div>

				<div>
					<button onClick={this.handleOptimalButtonClick} className="ShowPathButton">Show Optimal Path</button>
				</div>

				<div>
					<DestinationList className="DestinationList" desList={this.state.destinationList} removeFunc={this.handleRemovePlace} />
				</div>
			</div>
		)
	}
}

export default ReactGoogleMaps;