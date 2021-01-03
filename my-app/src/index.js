import React from 'react';
import ReactDOM from 'react-dom';

import MyGoogleMap from './MyGoogleMap.js';
import './index.css';

function App() {

return (
  <body>
    <header id = "header">
      <h1>Welcome to the Tranportation Map Notes</h1>
      <h2>This webpage is created as a Hackathon Project by team CrawFish</h2>
    </header>

    <div>
      <p>Introduction: The webpage provides you the comfort to pick the best routes on your journey to the customers</p>
    </div>

    <div className="main-wrapper">
      <MyGoogleMap />
    </div>
  </body>
    
  );
}


ReactDOM.render(<App/>, document.getElementById('root'));