const Snake = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((dot, i) => (
        <div
          key={i}
          className="snake-dot"
          style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}
        />
      ))}
    </>
  );
};

export default Snake;
