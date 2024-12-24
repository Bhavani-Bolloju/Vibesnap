import { Link } from "react-router";

const NotFound = function () {
  return (
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 font-karla text-center">
      <span className="font-semibold text-lg">Ops!! Page not found</span>
      <br />
      <span className="font-kumbh-sans text-link hover:underline">
        <Link to="/feeds">To go feeds page</Link>
      </span>
    </div>
  );
};

export default NotFound;

