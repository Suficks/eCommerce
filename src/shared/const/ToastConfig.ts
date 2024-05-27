import { Bounce, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};
