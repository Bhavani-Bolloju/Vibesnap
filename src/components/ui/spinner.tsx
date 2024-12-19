const Spinner = function () {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-[20px] h-[20px] after:after-element before:before-element after:animate-ripple before:animate-ripple after:delay-1000"></div>
    </div>
  );
};

export default Spinner;

