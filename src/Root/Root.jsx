import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <>
            <div>
                <Navbar />
                <Outlet />

            </div>
            <ToastContainer />
        </>
    );
};

export default Root;