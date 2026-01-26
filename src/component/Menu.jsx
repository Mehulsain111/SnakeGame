const Menu = ({ startGame }) => {
  return (
    <div className="menu">
      <h1>🐍 Snake Game</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Menu;
