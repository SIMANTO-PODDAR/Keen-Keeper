import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";

const Root = () => {
    return (
        <>
            <div>
                <Navbar />
                <div className="max-w-300 mx-auto">
                    <Outlet />
                </div>

            </div>
            <ToastContainer />
        </>
    );
};

export default Root;