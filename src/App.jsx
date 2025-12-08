import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Buttons } from "./component /Button";
import { Snake } from "./component /Snake";
import { Menu } from "./component /Menu";
import { Food } from "./component /Food";

function App() {
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
      setInterval(this.moveSnake, this.state.speed);
      document.onkeydown = this.onKeyDown;
    }

    componentDidUpdate() {
      this.onSnakeOutOfBounds();
      this.onSnakeCollapsed();
      this.onSnakeEats(); // Ensure this is being called every time the snake moves
    }

    onKeyDown = (e) => {
      e.preventDefault();
      e = e || window.event;
      switch (e.keyCode) {
        case 37:
          this.setState({ direction: "LEFT" });
          break;
        case 38:
          this.setState({ direction: "UP" });
          break;
        case 39:
          this.setState({ direction: "RIGHT" });
          break;
        case 40:
          this.setState({ direction: "DOWN" });
          break;
      }
    };

    moveSnake = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];
      if (this.state.route === "game") {
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
        this.setState({
          snakeDots: dots,
        });
      }
    };

    onSnakeOutOfBounds() {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      if (this.state.route === "game") {
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
          this.gameOver();
        }
      }
    }

    onSnakeCollapsed() {
      let snake = [...this.state.snakeDots];
      let head = snake[snake.length - 1];
      snake.pop();
      snake.forEach((dot) => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
          this.gameOver();
        }
      });
    }

    onSnakeEats() {
      let head = this.state.snakeDots[this.state.snakeDots.length - 1];
      let food = this.state.food;
      // Check if the snake's head is at the food position
      if (head[0] === food[0] && head[1] === food[1]) {
        this.setState((prevState) => ({
          food: getRandomFood(),
          snakeDots: [...prevState.snakeDots, []], // Increase snake length
          speed: prevState.speed > 10 ? prevState.speed - 20 : prevState.speed, // Increase speed
        }));
      }
    }

    increaseSnake() {
      let newSnake = [...this.state.snakeDots];
      newSnake.unshift([]);
      this.setState({
        snakeDots: newSnake,
      });
    }

    gameOver() {
      alert(`GAME OVER, your score is ${this.state.snakeDots.length - 2}`);
      this.setState(getInitialState);
    }

    onRouteChange = () => {
      this.setState({
        route: "game",
      });
    };
    onDown = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];

      head = [head[0], head[1] + 2];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "DOWN",
        snakeDots: dots,
      });
    };

    onUp = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];

      head = [head[0], head[1] - 2];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "UP",
        snakeDots: dots,
      });
    };

    onRight = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];

      head = [head[0] + 2, head[1]];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "RIGHT",
        snakeDots: dots,
      });
    };

    onLeft = () => {
      let dots = [...this.state.snakeDots];
      let head = dots[dots.length - 1];

      head = [head[0] - 2, head[1]];
      dots.push(head);
      dots.shift();
      this.setState({
        direction: "LEFT",
        snakeDots: dots,
      });
    };
    render() {
      const { route, snakeDots, food } = this.state;
      return (
        <div className="container text-center">
          <div className=" justify-content-center">
            <i className="fa-solid fa-staff-snake text-danger"></i>
            <h1>Snake Game</h1>
            <div>
              {route === "menu" ? (
                <div>
                  <Menu onRouteChange={this.onRouteChange} />
                </div>
              ) : (
                <div>
                  <div className="game-area">
                    <Snake snakeDots={snakeDots} />
                    <Food dot={food} />
                  </div>
                  <Buttons
                    onUp={this.onUp}
                    onDown={this.onDown}
                    onRight={this.onRight}
                    onLeft={this.onLeft}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  return <App />;
}

export default App;
