import { useApp } from "../../../Context/AppContext";
import { getFriendStatus } from "../../../Context/AppContextCore";
import { FiUsers, FiCheckCircle, FiAlertCircle, FiActivity } from "react-icons/fi";

const SummaryCards = () => {
    const { friends, timeline, loading } = useApp();

    const activeFriends = friends.filter(f => !f.isArchived);

    // Calculate dynamic values
    const totalFriendsCount = activeFriends.length;
    
    const onTrackCount = activeFriends.filter(
        f => getFriendStatus(f) === "On-track"
    ).length;
    
    const needAttentionCount = activeFriends.filter(
        f => getFriendStatus(f) === "Almost Due" || getFriendStatus(f) === "Overdue"
    ).length;

    // Calculate interactions in current calendar month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const monthlyInteractionsCount = timeline.filter(item => {
        if (!item.timestamp) return false;
        const logDate = new Date(item.timestamp);
        return logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear;
    }).length;

    const cardsData = [
        {
            title: "Total Friends",
            value: loading ? "..." : totalFriendsCount,
            icon: <FiUsers className="text-emerald-400" />,
            colorClass: "from-emerald-950/40 to-slate-900/40 border-emerald-900/50"
        },
        {
            title: "On Track",
            value: loading ? "..." : onTrackCount,
            icon: <FiCheckCircle className="text-teal-400" />,
            colorClass: "from-teal-950/40 to-slate-900/40 border-teal-900/50"
        },
        {
            title: "Need Attention",
            value: loading ? "..." : needAttentionCount,
            icon: <FiAlertCircle className="text-amber-400" />,
            colorClass: "from-amber-950/40 to-slate-900/40 border-amber-900/50"
        },
        {
            title: "Interactions (Month)",
            value: loading ? "..." : monthlyInteractionsCount,
            icon: <FiActivity className="text-indigo-400" />,
            colorClass: "from-indigo-950/40 to-slate-900/40 border-indigo-900/50"
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {cardsData.map((card, index) => (
                <div 
                    key={index} 
                    className={`flex flex-col p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${card.colorClass} border backdrop-blur-md text-left shadow-lg hover:translate-y-[-2px] transition-all duration-300`}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs sm:text-sm text-slate-400 font-medium">
                            {card.title}
                        </span>
                        <div className="p-1.5 sm:p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-base sm:text-lg">
                            {card.icon}
                        </div>
                    </div>
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {card.value}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default SummaryCards;