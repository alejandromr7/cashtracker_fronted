'use client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastNotification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      draggable={true}
    />
  );
};
