import { ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Section/Footer/Footer";

const Root = () => {
    return (
        <>
            <div>
                <Navbar />

                <div className="max-w-300 mx-auto">
                    <Outlet />
                </div>

                <Footer />

            </div>
            <ToastContainer />
        </>
    );
};

export default Root;