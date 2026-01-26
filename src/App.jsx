import React, { Component } from "react";
import "./App.css";
import Snake from "./component/Snake";
import Food from "./component/Food";
import Menu from "./component/Menu";

const getRandomFood = () => {
  let x = Math.floor(Math.random() * 98);
  let y = Math.floor(Math.random() * 98);
  return [x - (x % 2), y - (y % 2)];
};

class App extends Component {
  state = {
    food: getRandomFood(),
    direction: "RIGHT",
    speed: 200,
    route: "menu",
    snakeDots: [
      [0, 0],
      [2, 0],
    ],
  };

  componentDidMount() {
    document.onkeydown = this.onKeyDown;
  }

  startGame = () => {
    this.setState({ route: "game" });
    this.interval = setInterval(this.moveSnake, this.state.speed);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onKeyDown = (e) => {
    e = e.keyCode;
    if (e === 38 && this.state.direction !== "DOWN") {
      this.setState({ direction: "UP" });
    }
    if (e === 40 && this.state.direction !== "UP") {
      this.setState({ direction: "DOWN" });
    }
    if (e === 37 && this.state.direction !== "RIGHT") {
      this.setState({ direction: "LEFT" });
    }
    if (e === 39 && this.state.direction !== "LEFT") {
      this.setState({ direction: "RIGHT" });
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots });

    this.checkIfEat();
    this.checkIfOutOfBorders();
  };

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomFood(),
        snakeDots: [[...head], ...this.state.snakeDots],
      });
    }
  };

  checkIfOutOfBorders = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  };

  gameOver = () => {
    alert("Game Over 💀");
    this.setState({
      snakeDots: [
        [0, 0],
        [2, 0],
      ],
      direction: "RIGHT",
      food: getRandomFood(),
      route: "menu",
    });
    clearInterval(this.interval);
  };

  render() {
    return (
      <div className="game-area">
        {this.state.route === "menu" ? (
          <Menu startGame={this.startGame} />
        ) : (
          <>
            <Snake snakeDots={this.state.snakeDots} />
            <Food dot={this.state.food} />
          </>
        )}
      </div>
    );
  }
}

export default App;
