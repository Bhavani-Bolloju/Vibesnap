import Spinner from "./spinner";

const Loading = function () {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loading;

