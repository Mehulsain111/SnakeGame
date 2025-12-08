export const Menu = ({ onRouteChange }) => {
  return (
    <div className="menu">
      <input
        onClick={onRouteChange}
        className="rounded border border-danger start  "
        type="button"
        value="Start game "
      />
    </div>
  );
};
