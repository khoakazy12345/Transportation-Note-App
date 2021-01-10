// MyGoogleMaps.js
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import AutoComplete from './Autocomplete.js';
import Marker from './Marker.js';
import "./MyGoogleMap.css";

class MyGoogleMap extends Component {
    constructor(props)  {
        super(props);
        this.state = {
            mapApiLoaded: false,
            mapInstance: null,
            mapApi: null,
            geoCoder: null,
            places: [],
            center: [],
            targetplaces: [],
            count: 1,
            zoom: 9,
            address: '',
            draggable: true,
            lat: null,
            lng: null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    

    componentWillMount() {
        this.setCurrentLocation();
    }

    onMarkerInteraction = (childKey, childProps, mouse) => {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }

    onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        this.setState({ draggable: true});
        this.generateAddress();
    }

    onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });

    }

    onClick = (value) => {
        this.setState({
            lat: value.lat,
            lng: value.lng
        });
    }

    apiHasLoaded = (map, maps) => {
        this.setState({
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        this.generateAddress();
    };

    addPlace = (place) => {
        if (!place.geometry) {
            this.state.places.length = 0;
        }
        else {
            this.setState({
                places: [place],
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
            this.generateAddress()
        }
        
    };

    generateAddress() {
        const {mapApi} = this.state;
        const geocoder = new mapApi.Geocoder;
        geocoder.geocode({ 'location': { lat: this.state.lat, lng: this.state.lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.setState({ address: results[0].formatted_address });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }

    // Get Current Location Coordinates
    setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    center: [position.coords.latitude, position.coords.longitude],
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }

    handleClick() {
        let targetplaces = this.state.targetplaces.slice();
        let count = this.state.count;
        if (this.state.places.length == 0){
            alert("Please enter a specific location");
        }
        else {
            targetplaces.push([this.state.places[0], count]);
            this.setState({
                targetplaces: targetplaces,
                count: count + 1,
            })
            this.state.places.length = 0;
        }
    }

    remove(order) {
        const targetplaces = this.state.targetplaces.slice();
        for (let i = 0; i < targetplaces.length; i++) {
            if (targetplaces[i][1] === order) {
                targetplaces.splice(i, 1);
                break;
            }
        }
        const count = this.state.count;
        this.setState({
            targetplaces: targetplaces,
            count: count - 1,
        })
    }
    
    render() {
        const {mapApiLoaded, mapInstance, mapApi} = this.state;


        return (
            <div className = "Wrapper">
                {mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={this.addPlace} />
                        <button onClick={() => this.handleClick()}>Add</button>
                    </div>
                )}
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                    draggable={this.state.draggable}
                    onChange={this.onChange}
                    onChildMouseDown={this.onMarkerInteraction}
                    onChildMouseUp={this.onMarkerInteractionMouseUp}
                    onChildMouseMove={this.onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={this._onClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyD3C-R7oog-Ni87FFRrE-BYQMaKhX9vLAE',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
                >

                    <Marker
                        text={this.state.address}
                        lat={this.state.lat}
                        lng={this.state.lng}
                    />

                    <Marker
                        text={this.state.address}
                        lat={92.9634}
                        lng={85.6681}
                    />

                </GoogleMapReact>
                <h3>Added places</h3>
                <ul>
                    {this.state.targetplaces.map((item) => (
                        <div class="destination_list">
                            {item[0].geometry.location.address}
                            {item[0].geometry === undefined ? function() { alert('click'); }: <li>Latitude: {item[0].geometry.location.lat()} Longtitude: {item[0].geometry.location.lng()}</li>}
                            <button name={item[0]} onClick={() => this.remove(item[1])}>Remove this item</button>
                        </div>
                    ))}
                </ul>

            </div>
        );
    }
}

export default MyGoogleMap;