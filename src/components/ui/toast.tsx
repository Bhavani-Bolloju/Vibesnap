import { toast, Slide, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "light",
  transition: Slide
};
export const toastSuccess = function (msg: string) {
  return toast.success(msg, options);
};

export const toastError = function (msg: string) {
  return toast.error(msg, options);
};
