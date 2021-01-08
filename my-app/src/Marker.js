// // Marker.js
import React, { Component } from 'react';
import './Marker.css';

class Marker extends Component  {
    constructor(props)  {
        super(props);
    }
    render()    {
        return  (
            <div className = "marker" alt = {this.props.text} onClick = {this.props.onClick} />
        )
    }
}

Marker.defaultProps = {
    onClick: null,
};

export default Marker;