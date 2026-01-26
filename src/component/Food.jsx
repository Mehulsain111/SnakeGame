const Food = ({ dot }) => {
  return (
    <div
      className="food-dot"
      style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
    />
  );
};

export default Food;
