import React, {Component} from 'react';

class Navbar extends React.Component{
    render() {
        return (
            <div className="nav">
                <li className="myList">Contacts</li>
                <li className="myList">About us</li>
            </div>
        );
    }
}

export default Navbar;