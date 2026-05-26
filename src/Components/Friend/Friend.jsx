import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useApp } from "../../Context/AppContext";
import { getFriendStatus, getDaysSinceContact } from "../../Context/AppContextCore";
import { FiPhoneCall, FiArchive, FiTrash2, FiArrowLeft, FiEdit3, FiSave, FiX, FiCheck } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { MdOutlineTextsms } from "react-icons/md";
import { RiNotificationSnoozeLine } from "react-icons/ri";
import { toast } from "react-toastify";
import NotFound from "../../UI/NotFound/NotFound";

const Friend = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { 
        friends, 
        timeline, 
        snoozeFriend, 
        archiveFriend, 
        deleteFriend, 
        editGoal, 
        logInteraction 
    } = useApp();

    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [newGoalValue, setNewGoalValue] = useState(14);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Find the friend
    const friend = friends.find(f => f.id.toString() === id);

    if (!friend) {
        return <NotFound />;
    }

    const status = getFriendStatus(friend);
    const daysSince = getDaysSinceContact(friend);

    // Filter timeline events for this friend only
    const friendTimeline = timeline.filter(event => event.friendId === friend.id);

    // Status colors
    const badgeColors = {
        "On-track": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "Almost Due": "bg-amber-50 text-amber-700 border-amber-200",
        "Overdue": "bg-red-50 text-red-700 border-red-200",
    };

    const ringColors = {
        "On-track": "border-emerald-500 status-ring-on-track",
        "Almost Due": "border-amber-400 status-ring-almost-due",
        "Overdue": "border-red-500 status-ring-overdue",
    };

    const handleSnooze = () => {
        snoozeFriend(friend.id);
        toast.info(`Snoozed ${friend.name} for 2 weeks`);
    };

    const handleArchive = () => {
        archiveFriend(friend.id);
        const action = friend.isArchived ? "Unarchived" : "Archived";
        toast.success(`${action} ${friend.name}`);
    };

    const handleDelete = () => {
        deleteFriend(friend.id);
        toast.success(`Deleted ${friend.name}`);
        navigate("/");
    };

    const handleCheckIn = (type) => {
        logInteraction(friend.id, type);
        toast.success(`Logged ${type} with ${friend.name}`);
    };

    const startEditGoal = () => {
        setNewGoalValue(friend.goal);
        setIsEditingGoal(true);
    };

    const saveGoalEdit = () => {
        editGoal(friend.id, parseInt(newGoalValue) || 7);
        setIsEditingGoal(false);
        toast.success(`Updated connection goal to ${newGoalValue} days`);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Back Button */}
            <div>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors text-sm font-semibold group cursor-pointer"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Friends List
                </button>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Side: Profile Card & Actions */}
                <div className="md:col-span-1 space-y-6">
                    {/* Profile details */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col items-center text-center space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 to-indigo-500"></div>
                        
                        {/* Avatar */}
                        <div className={`p-0.5 rounded-full border-2 ${ringColors[status] || "border-slate-200"} transition-all duration-300`}>
                            <img 
                                src={friend.picture} 
                                alt={friend.name}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        </div>

                        {/* Name & Email */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">{friend.name}</h2>
                            <p className="text-xs text-slate-400 mt-0.5">{friend.email}</p>
                        </div>

                        {/* Status Badge */}
                        <span className={`px-3 py-0.5 border rounded-full text-xs font-bold ${badgeColors[status]}`}>
                            {status}
                        </span>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                            {friend.tags?.map((tag, idx) => (
                                <span 
                                    key={idx} 
                                    className="px-2.5 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Bio */}
                        <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-50 w-full text-center">
                            {friend.bio}
                        </p>
                    </div>

                    {/* Management Actions */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs space-y-2.5">
                        <button 
                            onClick={handleSnooze}
                            className="btn btn-ghost hover:bg-amber-50 hover:text-amber-700 w-full justify-start rounded-2xl flex items-center gap-3 text-slate-600 text-sm font-bold cursor-pointer"
                        >
                            <RiNotificationSnoozeLine className="text-lg text-amber-500" />
                            Snooze 2 weeks
                        </button>
                        
                        <button 
                            onClick={handleArchive}
                            className="btn btn-ghost hover:bg-slate-100 w-full justify-start rounded-2xl flex items-center gap-3 text-slate-600 text-sm font-bold cursor-pointer"
                        >
                            <FiArchive className="text-lg text-indigo-500" />
                            {friend.isArchived ? "Move out of Archive" : "Archive Friend"}
                        </button>

                        <div className="border-t border-slate-50 my-2 pt-2">
                            {showDeleteConfirm ? (
                                <div className="p-3 bg-red-50 rounded-2xl border border-red-100 space-y-3">
                                    <p className="text-xs font-bold text-red-800 text-center">
                                        Are you absolutely sure you want to delete this friend?
                                    </p>
                                    <div className="flex gap-2 justify-center">
                                        <button 
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="btn btn-xs btn-outline border-slate-300 text-slate-600 rounded-full cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleDelete}
                                            className="btn btn-xs bg-red-600 hover:bg-red-700 text-white border-0 rounded-full cursor-pointer"
                                        >
                                            Confirm Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="btn btn-ghost hover:bg-red-50 hover:text-red-600 w-full justify-start rounded-2xl flex items-center gap-3 text-red-500 text-sm font-bold cursor-pointer"
                                >
                                    <FiTrash2 className="text-lg" />
                                    Delete Friend
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Stats, Goal Config & Check-in & History */}
                <div className="md:col-span-2 space-y-6">
                    
                    {/* Key Statistics Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-center">
                            <span className="text-xs text-slate-400 font-semibold mb-1">Last Contact</span>
                            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
                                {daysSince === 0 ? "Today" : `${daysSince}d ago`}
                            </span>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-center">
                            <span className="text-xs text-slate-400 font-semibold mb-1">Target Interval</span>
                            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
                                {friend.goal}d
                            </span>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs flex flex-col justify-center">
                            <span className="text-xs text-slate-400 font-semibold mb-1">Next Contact Due</span>
                            <span className="text-base sm:text-lg font-bold text-slate-800 tracking-tight truncate">
                                {new Date(friend.next_due_date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Relationship Goal Config */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-indigo-500 rounded-full"></span>
                                Connection Frequency Goal
                            </h3>
                            {!isEditingGoal ? (
                                <button 
                                    onClick={startEditGoal}
                                    className="btn btn-xs btn-ghost text-emerald-600 hover:bg-emerald-50 rounded-full flex items-center gap-1.5 font-bold cursor-pointer"
                                >
                                    <FiEdit3 /> Edit
                                </button>
                            ) : (
                                <div className="flex gap-1.5">
                                    <button 
                                        onClick={() => setIsEditingGoal(false)}
                                        className="btn btn-xs btn-ghost text-slate-500 rounded-full cursor-pointer"
                                    >
                                        <FiX />
                                    </button>
                                    <button 
                                        onClick={saveGoalEdit}
                                        className="btn btn-xs bg-emerald-500 hover:bg-emerald-600 text-white border-0 rounded-full flex items-center gap-1 cursor-pointer"
                                    >
                                        <FiSave /> Save
                                    </button>
                                </div>
                            )}
                        </div>

                        {!isEditingGoal ? (
                            <p className="text-sm text-slate-600">
                                Goal: Connect every <span className="font-bold text-slate-800">{friend.goal} days</span>.
                            </p>
                        ) : (
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Connect more frequently</span>
                                    <span className="font-bold text-emerald-600">{newGoalValue} Days</span>
                                    <span>Connect less frequently</span>
                                </div>
                                <input 
                                    type="range"
                                    min="3"
                                    max="90"
                                    value={newGoalValue}
                                    onChange={(e) => setNewGoalValue(e.target.value)}
                                    className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                                />
                            </div>
                        )}
                    </div>

                    {/* Quick Check-In */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-3 bg-emerald-500 rounded-full"></span>
                            Quick Check-In Log
                        </h3>
                        <p className="text-xs text-slate-400">
                            Select an interaction format to log a fresh contact event. This will automatically reset the days count and calculate your next target due date.
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4">
                            <button 
                                onClick={() => handleCheckIn("Call")}
                                className="group flex flex-col items-center justify-center p-4 border border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/50 hover:shadow-xs transition-all duration-300 cursor-pointer"
                            >
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl text-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                    <FiPhoneCall />
                                </div>
                                <span className="text-xs font-bold text-slate-600 mt-2">Voice Call</span>
                            </button>

                            <button 
                                onClick={() => handleCheckIn("Text")}
                                className="group flex flex-col items-center justify-center p-4 border border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 hover:shadow-xs transition-all duration-300 cursor-pointer"
                            >
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl text-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                    <MdOutlineTextsms />
                                </div>
                                <span className="text-xs font-bold text-slate-600 mt-2">Text SMS</span>
                            </button>

                            <button 
                                onClick={() => handleCheckIn("Video")}
                                className="group flex flex-col items-center justify-center p-4 border border-slate-100 rounded-2xl hover:border-teal-500 hover:bg-teal-50/50 hover:shadow-xs transition-all duration-300 cursor-pointer"
                            >
                                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl text-xl group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                    <LuVideo />
                                </div>
                                <span className="text-xs font-bold text-slate-600 mt-2">Video Chat</span>
                            </button>
                        </div>
                    </div>

                    {/* Recent Interactions (Max 3) */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-indigo-500 rounded-full"></span>
                                Recent Interactions
                            </h3>
                            {friendTimeline.length > 0 && (
                                <Link 
                                    to={`/timeLine?search=${encodeURIComponent(friend.name)}`}
                                    className="btn btn-xs btn-ghost text-slate-500 hover:text-emerald-600 rounded-full flex items-center gap-1.5 font-bold cursor-pointer"
                                >
                                    Full History
                                </Link>
                            )}
                        </div>

                        {friendTimeline.length > 0 ? (
                            <div className="space-y-3">
                                {friendTimeline.slice(0, 3).map((item) => (
                                    <div 
                                        key={item.id}
                                        className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                                    >
                                        <div className={`p-2 rounded-xl text-lg font-bold ${
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
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-800">
                                                {item.sm} with {friend.name}
                                            </h4>
                                            <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                                <p className="text-xs text-slate-400">No interaction events logged yet.</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Friend;