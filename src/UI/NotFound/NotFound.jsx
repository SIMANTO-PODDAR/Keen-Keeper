import { TbFileSadFilled } from "react-icons/tb";
import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-[#0e271f] to-slate-950 text-white px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center space-y-6 relative z-10 max-w-md">
                <div className="w-24 h-24 mx-auto bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md">
                    <span className="text-5xl text-emerald-400"><TbFileSadFilled /></span>
                </div>

                <div className="space-y-2">
                    <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        404
                    </h1>
                    <h2 className="text-xl font-bold text-slate-200">
                        Page Not Found
                    </h2>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                        Oops! The shelf you are looking for doesn't exist, or the friend has moved to a new route.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-block px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-extrabold rounded-full shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/30 transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;