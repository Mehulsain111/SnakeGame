import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Buttons } from "./component/Button";
import { Snake } from "./component/Snake";
import { Menu } from "./component/Menu";
import { Food } from "./component/Food";

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

const getInitialState = {
  food: getRandomFood(),
  direction: "RIGHT",
  speed: 300,
  route: "menu",
  snakeDots: [
    [0, 0],
    [0, 2],
  ],
};

class App extends React.Component {
  constructor() {
    super();
    this.state = getInitialState;
  }

  componentDidMount() {
    this.interval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default App;
