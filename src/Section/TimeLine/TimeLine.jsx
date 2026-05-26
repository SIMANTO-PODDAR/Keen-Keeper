import { useState } from "react";
import { useSearchParams } from "react-router";
import { useApp } from "../../Context/AppContext";
import { FiPhoneCall, FiTrash2, FiSearch, FiInbox, FiAlertCircle } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { MdOutlineTextsms, MdClearAll } from "react-icons/md";
import { toast } from "react-toastify";

const TimeLine = () => {
    const { timeline, deleteTimelineItem, clearTimeline } = useApp();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [filterType, setFilterType] = useState("All"); // "All", "Call", "Text", "Video"
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const searchQuery = searchParams.get("search") || "";

    const handleSearchChange = (value) => {
        if (value.trim()) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    const handleClearAll = () => {
        clearTimeline();
        setShowClearConfirm(false);
        toast.info("Cleared all interaction logs");
    };

    const handleDeleteItem = (id, name, type) => {
        deleteTimelineItem(id);
        toast.info(`Deleted ${type} log with ${name}`);
    };

    // Filter timeline entries
    const filteredTimeline = timeline.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "All" || item.sm === filterType;
        return matchesSearch && matchesType;
    });

    const callsCount = timeline.filter((t) => t.sm === "Call").length;
    const textsCount = timeline.filter((t) => t.sm === "Text").length;
    const videosCount = timeline.filter((t) => t.sm === "Video").length;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                        Interaction Timeline
                    </h1>
                    <p className="text-slate-400 text-xs mt-1">
                        Review the historical log of voice calls, text messages, and video conferences.
                    </p>
                </div>

                {timeline.length > 0 && (
                    <div className="shrink-0">
                        {showClearConfirm ? (
                            <div className="flex items-center gap-2 bg-red-50 border border-red-100 p-2 rounded-2xl">
                                <span className="text-[10px] font-bold text-red-800">Clear all records?</span>
                                <button 
                                    onClick={() => setShowClearConfirm(false)}
                                    className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded-full hover:bg-slate-50 cursor-pointer"
                                >
                                    No
                                </button>
                                <button 
                                    onClick={handleClearAll}
                                    className="px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full hover:bg-red-600 cursor-pointer"
                                >
                                    Yes
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => setShowClearConfirm(true)}
                                className="btn btn-sm btn-ghost hover:bg-red-50 hover:text-red-600 text-red-500 rounded-full flex items-center gap-1.5 font-bold cursor-pointer"
                            >
                                <MdClearAll /> Clear Logs
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Filter and Search Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Search query */}
                <div className="md:col-span-1 relative flex items-center">
                    <FiSearch className="absolute left-3 text-slate-400" />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search by friend's name..."
                        className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs"
                    />
                </div>

                {/* Filter buttons */}
                <div className="md:col-span-2 flex flex-wrap gap-2 text-xs items-center">
                    <button
                        onClick={() => setFilterType("All")}
                        className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                            filterType === "All"
                                ? "bg-slate-800 text-white shadow-sm"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                        All ({timeline.length})
                    </button>
                    <button
                        onClick={() => setFilterType("Call")}
                        className={`px-4 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-1.5 ${
                            filterType === "Call"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                        <FiPhoneCall /> Calls ({callsCount})
                    </button>
                    <button
                        onClick={() => setFilterType("Text")}
                        className={`px-4 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-1.5 ${
                            filterType === "Text"
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                        <MdOutlineTextsms /> Texts ({textsCount})
                    </button>
                    <button
                        onClick={() => setFilterType("Video")}
                        className={`px-4 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-1.5 ${
                            filterType === "Video"
                                ? "bg-teal-600 text-white shadow-sm"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                        <LuVideo /> Videos ({videosCount})
                    </button>
                </div>
            </div>

            {/* Timeline List */}
            {filteredTimeline.length > 0 ? (
                <div className="relative border-l-2 border-slate-100 pl-6 ml-4 space-y-6 pt-2">
                    {filteredTimeline.map((item) => (
                        <div 
                            key={item.id} 
                            className="relative flex items-start gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-xs group hover:border-emerald-500/30 transition-all duration-200"
                        >
                            {/* Point on timeline line */}
                            <div className="absolute -left-10 top-6 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-50"></div>
                            
                            {/* Icon */}
                            <div className={`p-2.5 rounded-xl text-xl shrink-0 ${
                                item.sm === "Call" 
                                    ? "bg-emerald-50 text-emerald-600" 
                                    : item.sm === "Text" 
                                    ? "bg-indigo-50 text-indigo-600" 
                                    : "bg-teal-50 text-teal-600"
                            }`}>
                                {item.sm === "Call" && <FiPhoneCall />}
                                {item.sm === "Text" && <MdOutlineTextsms />}
                                {item.sm === "Video" && <LuVideo />}
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-slate-800">
                                    {item.sm} with <span className="text-emerald-600 font-extrabold">{item.name}</span>
                                </h3>
                                <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                            </div>

                            {/* Delete Log Button */}
                            <button 
                                onClick={() => handleDeleteItem(item.id, item.name, item.sm)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
                                title="Delete this entry"
                            >
                                <FiTrash2 className="text-sm" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                    <div className="w-16 h-16 mx-auto bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl">
                        <FiInbox />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-700 text-lg">No Log Entries</h3>
                        <p className="text-sm text-slate-400 max-w-xs mx-auto">
                            No check-in interaction records were found matching the selected search query and type filters.
                        </p>
                    </div>
                    {(searchQuery || filterType !== "All") && (
                        <button
                            onClick={() => {
                                setFilterType("All");
                                setSearchParams({});
                            }}
                            className="btn btn-sm btn-ghost text-emerald-600 hover:bg-emerald-50 rounded-full"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TimeLine;