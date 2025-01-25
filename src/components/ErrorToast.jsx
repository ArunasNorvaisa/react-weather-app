import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToast({ message }) {
  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: 'bottom-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'error'
      });
    }
  }, [message]);

  return <ToastContainer />;
}
