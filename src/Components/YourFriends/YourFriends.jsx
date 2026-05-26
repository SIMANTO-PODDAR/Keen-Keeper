import { useState } from "react";
import { Link } from "react-router";
import { useApp } from "../../Context/AppContext";
import { getFriendStatus, getDaysSinceContact, getDaysUntilDue } from "../../Context/AppContextCore";
import { FiSearch, FiInbox, FiTag, FiFilter, FiUserMinus } from "react-icons/fi";

const YourFriends = () => {
    const { friends } = useApp();
    const [activeTab, setActiveTab] = useState("active"); // "active" or "archived"
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All"); // "All", "On-track", "Almost Due", "Overdue"
    const [selectedTag, setSelectedTag] = useState("All");

    // Separate active and archived
    const tabFriends = friends.filter((f) => 
        activeTab === "active" ? !f.isArchived : f.isArchived
    );

    // Calculate unique tags for the dropdown/filter list
    const uniqueTags = ["All", ...Array.from(
        new Set(tabFriends.flatMap((f) => f.tags || []))
    )];

    // Apply search and filters
    const filteredFriends = tabFriends.filter((friend) => {
        const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
        const friendStatus = getFriendStatus(friend);
        const matchesStatus = statusFilter === "All" || friendStatus === statusFilter;
        const matchesTag = selectedTag === "All" || friend.tags?.includes(selectedTag);

        return matchesSearch && matchesStatus && matchesTag;
    });

    return (
        <div className="space-y-6">
            {/* Header and Controls */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-4">
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-full w-fit">
                    <button
                        onClick={() => {
                            setActiveTab("active");
                            setStatusFilter("All");
                            setSelectedTag("All");
                        }}
                        className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                            activeTab === "active"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        Active Connections ({friends.filter(f => !f.isArchived).length})
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("archived");
                            setStatusFilter("All");
                            setSelectedTag("All");
                        }}
                        className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                            activeTab === "archived"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        Archived Shelf ({friends.filter(f => f.isArchived).length})
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative flex items-center w-full md:w-60">
                        <FiSearch className="absolute left-3 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search friends..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs"
                        />
                    </div>

                    {/* Tag Filter */}
                    <div className="relative flex items-center">
                        <FiTag className="absolute left-3 text-slate-400 pointer-events-none text-xs" />
                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="pl-8 pr-6 py-1.5 text-xs bg-white border border-slate-200 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-xs appearance-none cursor-pointer"
                        >
                            <option value="All">All Tags</option>
                            {uniqueTags.filter(t => t !== "All").map((tag, idx) => (
                                <option key={idx} value={tag}>
                                    #{tag}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Status Filter Chips */}
            <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1 mr-2">
                    <FiFilter /> Filter Status:
                </span>
                {["All", "On-track", "Almost Due", "Overdue"].map((statusOption) => (
                    <button
                        key={statusOption}
                        onClick={() => setStatusFilter(statusOption)}
                        className={`px-3 py-1 rounded-full font-bold transition-all duration-300 ${
                            statusFilter === statusOption
                                ? statusOption === "All"
                                    ? "bg-slate-800 text-white"
                                    : statusOption === "On-track"
                                    ? "bg-emerald-600 text-white"
                                    : statusOption === "Almost Due"
                                    ? "bg-amber-500 text-white"
                                    : "bg-red-500 text-white"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                        {statusOption}
                    </button>
                ))}
            </div>

            {/* Friends Grid */}
            {filteredFriends.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
                    {filteredFriends.map((friend) => (
                        <FriendCard key={friend.id} friend={friend} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl space-y-3">
                    <div className="w-16 h-16 mx-auto bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-2xl">
                        <FiInbox />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-700 text-lg">No Friends Found</h3>
                        <p className="text-sm text-slate-400 max-w-xs mx-auto">
                            We couldn't find any friends matching your current search parameters or active filters.
                        </p>
                    </div>
                    {(searchQuery || statusFilter !== "All" || selectedTag !== "All") && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("All");
                                setSelectedTag("All");
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

export default YourFriends;

const FriendCard = ({ friend }) => {
    const status = getFriendStatus(friend);
    const daysSince = getDaysSinceContact(friend);
    const daysUntilDue = getDaysUntilDue(friend);

    // Dynamic ring color styling based on status
    const ringColors = {
        "On-track": "border-emerald-500 status-ring-on-track",
        "Almost Due": "border-amber-400 status-ring-almost-due",
        "Overdue": "border-red-500 status-ring-overdue",
    };

    const badgeColors = {
        "On-track": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "Almost Due": "bg-amber-50 text-amber-700 border-amber-200",
        "Overdue": "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <Link 
            to={`/friend/${friend.id}`} 
            className="group flex flex-col justify-between p-5 bg-white border border-slate-100 rounded-3xl shadow-xs hover-card"
        >
            <div className="flex flex-col items-center text-center space-y-3">
                {/* Image */}
                <div className="relative">
                    <div className={`p-0.5 rounded-full border-2 ${ringColors[status] || "border-slate-200"} transition-all duration-300`}>
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="rounded-full h-20 w-20 object-cover"
                        />
                    </div>
                    {friend.isArchived && (
                        <span className="absolute bottom-0 right-0 p-1 bg-slate-600 text-white rounded-full text-[10px] border border-white">
                            Archived
                        </span>
                    )}
                </div>

                {/* Name */}
                <div>
                    <h2 className="font-bold text-slate-800 text-base group-hover:text-emerald-600 transition-colors duration-200">
                        {friend.name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {daysSince === 0 ? "Contacted today" : `Contacted ${daysSince}d ago`}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-1 pt-1">
                    {friend.tags?.slice(0, 3).map((tag, ind) => (
                        <span 
                            key={ind} 
                            className="px-2 py-0.5 bg-slate-50 text-slate-500 border border-slate-100 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                {/* Status Badge */}
                <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${badgeColors[status]}`}>
                    {status}
                </span>

                {/* Due status details */}
                <span className="text-[10px] font-semibold text-slate-500">
                    {daysUntilDue < 0 
                        ? `Overdue by ${Math.abs(daysUntilDue)}d` 
                        : daysUntilDue === 0 
                        ? "Due today"
                        : daysUntilDue === 1
                        ? "Due tomorrow"
                        : `Due in ${daysUntilDue}d`}
                </span>
            </div>
        </Link>
    );
};