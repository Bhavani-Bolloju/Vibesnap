import { logout } from "@/firebase/auth/auth-service";
import { toastSuccess } from "@/components/ui/toast";

const FeedsPage = function () {
  const logoutHandler = function () {
    logout();
    toastSuccess("You have successfully logged out. See you again soon!");
  };

  return (
    <div>
      <h2>welcome to the feeds page</h2>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default FeedsPage;
