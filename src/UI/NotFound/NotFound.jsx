import { TbFileSadFilled } from "react-icons/tb";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-900 to-green-500 text-white px-4">
            <div className="text-center">


                <h1 className="text-7xl md:text-9xl font-extrabold mb-4">
                    404
                </h1>


                <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-200 mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>


                <button
                    onClick={() => window.location.href = "/"}
                    className="px-6 py-3 bg-white text-green-700 font-bold rounded-full shadow-lg 
          hover:bg-gray-200 transition duration-300"
                >
                    Go Home
                </button>


                <div className="mt-10">
                    <div className="w-40 h-40 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-8xl"><TbFileSadFilled /></span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NotFound;