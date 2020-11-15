import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Body extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      destination: [],
      count: 0,
      text: "qeq",
    }
  }
  
  handleClick()  {
    const destination = this.state.destination.slice();
    destination.push(this.newText.value);
    const count = this.state.count;
    this.setState ({
      destination: destination,
      count: count + 1,
    })
    console.log(destination[destination.length-1]);
  }

  printOut()  {
    let str = "";
    for (let i = 0; i < this.state.destination.length; i++) {
      str += this.state.destination[i] + "\n";
    }
    return str;
  }
  
  render() {
    return (     
      <body>
        <header id = "header">
          <h1>Welcome to the Tranportation Map Notes</h1>
          <h2>This webpage is created as a Hackathon Project by team CrawFish</h2>
        </header>
        <div>
          <p>Introduction: The webpage provides you the comfort to pick the best routes on your journey to the customers</p>
        </div>
        <div>
          <input id = "input" type = "text" placeholder = "Input your desired destination" ref={(ip) => {this.newText = ip}}></input>
          <button onClick = {() => this.handleClick()}>Add</button>
        </div>
        <ul>
        {this.state.destination.map((item) => (
          <li>{item}</li>
        ))}
        </ul>
      </body>
    );
  }
}

  ReactDOM.render(
    <Body />,
    document.getElementById('root')
  );
