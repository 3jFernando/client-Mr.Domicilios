import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastMessage(props) {
  return (
    <div className="form-group" style={{position: 'absolute'}}>
      <ToastContainer />
    </div>
  );
}