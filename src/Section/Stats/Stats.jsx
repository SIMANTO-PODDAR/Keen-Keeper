import { useApp } from "../../Context/AppContext";
import PieChartWithPaddingAngle from "./PieChartWithPaddingAngle/PieChartWithPaddingAngle";
import { FiActivity, FiUsers, FiMessageSquare, FiVideo, FiPhone } from "react-icons/fi";

const Stats = () => {
    const { timeline, friends } = useApp();

    const callCount = timeline.filter(t => t.sm === "Call").length;
    const textCount = timeline.filter(t => t.sm === "Text").length;
    const videoCount = timeline.filter(t => t.sm === "Video").length;
    const totalCount = timeline.length;

    // Calculate percentages
    const callPercent = totalCount > 0 ? Math.round((callCount / totalCount) * 100) : 0;
    const textPercent = totalCount > 0 ? Math.round((textCount / totalCount) * 100) : 0;
    const videoPercent = totalCount > 0 ? Math.round((videoCount / totalCount) * 100) : 0;

    // Calculate top contacted friends
    const contactedCounts = {};
    timeline.forEach(item => {
        contactedCounts[item.name] = (contactedCounts[item.name] || 0) + 1;
    });

    const topContacted = Object.entries(contactedCounts)
        .map(([name, count]) => {
            const friendObj = friends.find(f => f.name === name);
            return {
                name,
                count,
                picture: friendObj?.picture || "https://i.ibb.co.com/S4LSdzZh/d9f497c1c12284df2c1dcb7e42ec96b3ad9e90a3.webp"
            };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Get dominant mode of interaction
    const getDominantMode = () => {
        if (totalCount === 0) return "No interactions logged yet.";
        const max = Math.max(callCount, textCount, videoCount);
        if (max === callCount) return "Voice Calls. You prefer speaking on the phone to stay caught up.";
        if (max === textCount) return "Text Messaging. You prefer quick written messages for updates.";
        return "Video Chattering. You prefer face-to-face virtual catchups.";
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-100 pb-4">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    Friendship Analytics
                </h1>
                <p className="text-slate-400 text-xs mt-1">
                    Visualize your connection habits and view insights about your relationships.
                </p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Panel: Chart & Breakdown */}
                <div className="md:col-span-2 space-y-6">
                    
                    {/* Main Chart Card */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-3 bg-emerald-500 rounded-full"></span>
                            By Interaction Type
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                            {/* The Pie Chart */}
                            <div className="sm:col-span-2">
                                <PieChartWithPaddingAngle />
                            </div>

                            {/* Percentage progress columns */}
                            <div className="sm:col-span-1 space-y-4 text-xs font-semibold text-slate-600">
                                {/* Calls */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1.5"><FiPhone className="text-emerald-500" /> Calls</span>
                                        <span className="font-bold text-slate-800">{callCount} ({callPercent}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${callPercent}%` }}></div>
                                    </div>
                                </div>

                                {/* Texts */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1.5"><FiMessageSquare className="text-indigo-500" /> Texts</span>
                                        <span className="font-bold text-slate-800">{textCount} ({textPercent}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${textPercent}%` }}></div>
                                    </div>
                                </div>

                                {/* Videos */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1.5"><FiVideo className="text-cyan-500" /> Videos</span>
                                        <span className="font-bold text-slate-800">{videoCount} ({videoPercent}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${videoPercent}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Habits Insight Card */}
                    {totalCount > 0 && (
                        <div className="bg-gradient-to-br from-emerald-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            
                            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                                Communication Habit Insight
                            </h3>
                            <h4 className="text-lg font-bold">
                                Your preferred way to connect is:
                            </h4>
                            <p className="text-slate-200 text-xs leading-relaxed mt-1">
                                {getDominantMode()} Keeping a balanced interaction helps deepen bonds across different formats.
                            </p>
                        </div>
                    )}

                </div>

                {/* Right Panel: Top Connections */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1.5 h-3 bg-indigo-500 rounded-full"></span>
                            Top Connections
                        </h2>
                        
                        <p className="text-xs text-slate-400 leading-relaxed">
                            These are the friends you've logged the highest number of interactions with recently.
                        </p>

                        {topContacted.length > 0 ? (
                            <div className="space-y-3.5 pt-2">
                                {topContacted.map((item, index) => {
                                    const maxCount = topContacted[0]?.count || 1;
                                    const relativeBarWidth = Math.round((item.count / maxCount) * 100);

                                    return (
                                        <div key={index} className="flex items-center gap-3">
                                            <img 
                                                src={item.picture} 
                                                alt={item.name} 
                                                className="w-9 h-9 rounded-full object-cover shrink-0"
                                            />
                                            <div className="flex-1 min-w-0 space-y-1">
                                                <div className="flex justify-between items-center text-xs">
                                                    <span className="font-bold text-slate-700 truncate">{item.name}</span>
                                                    <span className="font-semibold text-slate-400">{item.count} check-ins</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                                    <div 
                                                        className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full" 
                                                        style={{ width: `${relativeBarWidth}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                                <p className="text-xs text-slate-400">Log a few check-ins to view top connections.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Stats;