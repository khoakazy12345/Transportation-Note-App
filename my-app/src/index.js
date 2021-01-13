import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Map from './Map.js';
import Footer from './Footer.js';
import './index.css';

class App extends React.Component {
	render() {
    	return (
      	<body>
        	<div className="Header">
				<Header />
        	</div>

			<div className="Google-Map">
				<Map/>
			</div>

			<div className="Footer">
				<Footer/>
			</div>
      	</body>
    	);
  	}
}


ReactDOM.render(<App />, document.getElementById('root'));