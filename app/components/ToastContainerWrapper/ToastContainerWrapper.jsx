"use client"

// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function ToastContainerWrapper() {
    return (
        // <ToastContainer position={toast.POSITION.BOTTOM_CENTER} theme="dark" />
        <ToastContainer
            // position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            draggable
            pauseOnHover
        // theme="light"
        />
    );
}
