export const Buttons = ({ onUp, onDown, onLeft, onRight }) => {
  return (
    <div className="container p-5">
      <div className="buttons">
        <input
          type="button"
          value="up"
          onClick={onLeft}
          className="btn border text-danger pb-0 align-items-center"
        />
        <div className=" buttonss">
          <input
            type="button"
            value="left"
            onClick={onUp}
            className="btn border text-danger  pb-0 align-items-center"
          />
          <input
            type="button"
            value="Right"
            onClick={onDown}
            className="btn border text-danger pb-0 align-items-center"
          />
        </div>
        <input
          type="button"
          value="down"
          onClick={onRight}
          className="btn border text-danger pb-0 align-items-center"
        />
      </div>
    </div>
  );
};
