import React from 'react';
import './SearchBar.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleClick = () =>  {
        console.log("hello");
    }

    handleChange = address => {
        this.setState({ address: address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.props.onClick1(latLng.lat, latLng.lng))
            .catch(error => console.error('Error', error));

        geocodeByAddress(address)
            .then(results => this.props.onClick2(address, results[0].formatted_address, results[0].place_id))
        this.setState({ address: address });
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                className="DropDownInput1"
            >
                {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
                    <div className="AllInput">
                        <input {...getInputProps({placeholder: 'Search Places...', className: 'SearchBar'})}/>
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = "DropDownChoice"
                                const style = suggestion.active
                                    ? { backgroundColor: '#757171', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, {className, style})}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                        {}
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;