import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Error ({ message }) {

  const error = new Promise(resolve => toast.error(message, {
    position: 'bottom-right',
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: 'error',
    onOpen: resolve(true),
    onClose: resolve(false)
  }));

  if (!error) return;

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
