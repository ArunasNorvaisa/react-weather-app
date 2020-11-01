import React from 'react';
import { EventEmitter } from 'events';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Error ({ message }) {
  const emitter = new EventEmitter();
  emitter.once('error', () => toast.error(message, {
    position: 'bottom-right',
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: 'error'
  }));

  emitter.emit('error');

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
