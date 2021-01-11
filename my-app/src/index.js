import React from 'react';
import ReactDOM from 'react-dom';

import MyGoogleMap from './MyGoogleMap.js';
import Header from './Header.js';
import './index.css';

class App extends React.Component {
	render() {
    	return (
      	<body>
        	<div className="Header">
				<Header />
        	</div>

        	<div className="Google-Map">
          		<MyGoogleMap />
        	</div>
      	</body>
    	);
  	}
}


ReactDOM.render(<App />, document.getElementById('root'));