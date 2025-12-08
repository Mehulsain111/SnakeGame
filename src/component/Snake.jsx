export const Snake = ({ snakeDots }) => {
  //ABeeZee
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[1]}%`,
          top: `${dot[0]}%`,
        };
        return <div className="snake" key={i} style={style}></div>;
      })}
    </div>
  );
};
{
  /* <div>
         <i className="fa-regular fa-square bg-success "></i>
        </div>
        <div>
          <i className="fa-solid fa-circle  text-danger"></i>
        </div> */
}
