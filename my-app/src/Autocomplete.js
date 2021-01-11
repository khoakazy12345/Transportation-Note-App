// Autocomplete.js
import React, { Component } from 'react';
import './Autocomplete.css';


class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
    }

    componentDidMount() {
        const options = {
            // restrict your search to a specific type of result
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };

        this.autoComplete = new this.props.mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', this.props.map);
    }

    componentWillUnmount() {
        this.props.mapApi.event.clearInstanceListeners(this.searchInput);
    }

    clearSearchBox() {
        this.searchInput.value = '';
    }

    onPlaceChanged = () => {
        const place = this.autoComplete.getPlace();
        if (place.geometry.viewport) {
            this.props.map.fitBounds(place.geometry.viewport);
        } else {
            this.props.map.setCenter(place.geometry.location);
            this.props.map.setZoom(17);
        }

        this.props.addplace(place);
        this.searchInput.blur();
    };

    render() {
        return (
            <div className = "Wrapper">
                <form>
                <input
                    className="search-input"
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    type="text"
                    onFocus={this.clearSearchBox}
                    placeholder="Enter a location"
                />
                </form>
            </div>
        );
    }
}

export default AutoComplete;