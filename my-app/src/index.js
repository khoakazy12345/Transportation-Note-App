import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Navbar from './Navbar.js';
import Map from './Map.js';
import './index.css';

class App extends React.Component {
	render() {
    	return (
      	<body>
		  	<div className="NavBar">
			  <Navbar />
			</div>

        	<div className="Header">
				<Header />
        	</div>

			<div className="Google-Map">
				<Map/>
			</div>
      	</body>
    	);
  	}
}


ReactDOM.render(<App />, document.getElementById('root'));