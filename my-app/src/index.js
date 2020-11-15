import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Body extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      destination: [],
      count: 1,
      text: "qeq",
    }
  }
  
  handleClick()  {
    let destination = this.state.destination.slice();
    let val = this.newText.value;
    let count = this.state.count;
    destination.push([val, count]);
    console.log(destination[destination.length-1][1]);
    this.setState ({
      destination: destination,
      count: count + 1,
    })
    document.getElementById("input").value = "";
  }

  remove(order)  {
    let destination = this.state.destination.slice();
    for (let i = 0; i < destination.length; i++)  {
      if (destination[i][1] === order) {
        destination.splice(i,1);
        break;
      }
    }
    const count = this.state.count;
    this.setState ({
      destination: destination,
      count: count - 1,
    })
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
        <form>
          <input id = "input" type = "text" placeholder = "Input your desired destination" ref={(ip) => {this.newText = ip}}></input>
        </form>
        <div>
        <button onClick = {() => this.handleClick()}>Add</button>
        <ul>
          {this.state.destination.map((item) => (
            <div class = "destination_list">
              <li>{item[0]}</li>
              <button name = {item[0]} onClick = {() => this.remove(item[1])}>Remove this item</button>
            </div>
          ))}
        </ul>
        </div>
      </body>
    );
  }
}

  ReactDOM.render(
    <Body />,
    document.getElementById('root')
  );
