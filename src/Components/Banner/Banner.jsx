import { FaPlus } from "react-icons/fa";
import SummaryCards from "./SummaryCards/SummaryCards";

const Banner = ({ onAddFriendClick }) => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0e271f] to-slate-950 text-white p-8 sm:p-12 mb-10 shadow-2xl border border-emerald-950">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-45 h-45 bg-indigo-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-4">
                <span className="px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 rounded-full uppercase">
                    Relationship Tracker
                </span>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                    Nurture the Connections <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        That Matter Most
                    </span>
                </h1>
                <p className="text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed">
                    Your personal dashboard for meaningful friendships. Browse, log interactions, keep track of goals, and never let important relationships fade away.
                </p>

                <button 
                    onClick={onAddFriendClick}
                    className="btn bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-bold border-0 rounded-full px-6 py-2 mt-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-102 transition-all duration-300"
                >
                    <FaPlus className="mr-2" /> Add a Friend
                </button>
            </div>

            <div className="mt-12">
                <SummaryCards />
            </div>
        </div>
    );
};

export default Banner;