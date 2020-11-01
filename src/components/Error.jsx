import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Error (props) {

  const message = props.message || 'SOMETHING WRONG HAPPENED';

  const f = () => toast.error(message, {
    position: 'bottom-right',
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'bigFont'
  });

  return (
    <div>
      {f()}
      <ToastContainer />
    </div>
  );
}
