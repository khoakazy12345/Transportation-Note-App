import React from 'react';
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
            .then(latLng => this.props.onClick(latLng.lat, latLng.lng))
            .catch(error => console.error('Error', error));
        this.setState({ address: address });
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
                    <div>
                        <input {...getInputProps({placeholder: 'Search Places...', className: 'location-search-input'})}/>
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, {className, style,})}>
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