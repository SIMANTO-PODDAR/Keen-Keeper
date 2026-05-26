/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContextCore";

export { AppContext } from "./AppContextCore";

export const AppProvider = ({ children }) => {
    // Lazy State Initialization
    const [friends, setFriends] = useState(() => {
        const stored = localStorage.getItem("keen_keeper_friends");
        return stored ? JSON.parse(stored) : [];
    });

    const [timeline, setTimeline] = useState(() => {
        const stored = localStorage.getItem("keen_keeper_timeline");
        return stored ? JSON.parse(stored) : [];
    });

    const [loading, setLoading] = useState(() => {
        const stored = localStorage.getItem("keen_keeper_friends");
        return !stored; // true if nothing in cache, needing fetch
    });

    useEffect(() => {
        const storedFriends = localStorage.getItem("keen_keeper_friends");
        if (!storedFriends) {
            fetch("/data.json")
                .then((res) => res.json())
                .then((data) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const initialized = data.map((f) => {
                        const lastContact = new Date(today.getTime() - f.days_since_contact * 24 * 60 * 60 * 1000);
                        lastContact.setHours(0, 0, 0, 0);
                        
                        const nextDue = new Date(lastContact.getTime() + f.goal * 24 * 60 * 60 * 1000);
                        nextDue.setHours(0, 0, 0, 0);

                        return {
                            ...f,
                            last_contact_date: lastContact.toISOString().split("T")[0],
                            next_due_date: nextDue.toISOString().split("T")[0],
                            isArchived: false,
                        };
                    });

                    setFriends(initialized);
                    localStorage.setItem("keen_keeper_friends", JSON.stringify(initialized));
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error loading initial data:", err);
                    setLoading(false);
                });
        }
    }, []);

    // Save Helpers
    const saveFriends = (newFriends) => {
        setFriends(newFriends);
        localStorage.setItem("keen_keeper_friends", JSON.stringify(newFriends));
    };

    const saveTimeline = (newTimeline) => {
        setTimeline(newTimeline);
        localStorage.setItem("keen_keeper_timeline", JSON.stringify(newTimeline));
    };

    // Add Friend
    const addFriend = (friendData) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const goalDays = parseInt(friendData.goal) || 7;
        const nextDue = new Date(today.getTime() + goalDays * 24 * 60 * 60 * 1000);
        nextDue.setHours(0, 0, 0, 0);

        const newFriend = {
            id: Date.now(),
            name: friendData.name,
            picture: friendData.picture || "https://i.ibb.co.com/S4LSdzZh/d9f497c1c12284df2c1dcb7e42ec96b3ad9e90a3.webp",
            email: friendData.email || "no-email@example.com",
            goal: goalDays,
            bio: friendData.bio || "No biography provided.",
            tags: friendData.tags || [],
            last_contact_date: today.toISOString().split("T")[0],
            next_due_date: nextDue.toISOString().split("T")[0],
            isArchived: false,
        };

        const updated = [...friends, newFriend];
        saveFriends(updated);
        return newFriend;
    };

    // Delete Friend
    const deleteFriend = (id) => {
        const updated = friends.filter((f) => f.id !== id);
        saveFriends(updated);
        const updatedTimeline = timeline.filter((t) => t.friendId !== id);
        saveTimeline(updatedTimeline);
    };

    // Archive Friend
    const archiveFriend = (id) => {
        const updated = friends.map((f) =>
            f.id === id ? { ...f, isArchived: !f.isArchived } : f
        );
        saveFriends(updated);
    };

    // Snooze 2 Weeks
    const snoozeFriend = (id) => {
        const updated = friends.map((f) => {
            if (f.id === id) {
                const currentDue = new Date(f.next_due_date);
                currentDue.setHours(0, 0, 0, 0);
                const newDue = new Date(currentDue.getTime() + 14 * 24 * 60 * 60 * 1000);
                newDue.setHours(0, 0, 0, 0);
                return {
                    ...f,
                    next_due_date: newDue.toISOString().split("T")[0],
                };
            }
            return f;
        });
        saveFriends(updated);
    };

    // Edit Goal
    const editGoal = (id, newGoal) => {
        const updated = friends.map((f) => {
            if (f.id === id) {
                const lastContact = new Date(f.last_contact_date);
                lastContact.setHours(0, 0, 0, 0);
                const newDue = new Date(lastContact.getTime() + newGoal * 24 * 60 * 60 * 1000);
                newDue.setHours(0, 0, 0, 0);
                return {
                    ...f,
                    goal: newGoal,
                    next_due_date: newDue.toISOString().split("T")[0],
                };
            }
            return f;
        });
        saveFriends(updated);
    };

    // Log Interaction (Call, Text, Video)
    const logInteraction = (friendId, type) => {
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        let friendName = "";
        const updatedFriends = friends.map((f) => {
            if (f.id === friendId) {
                friendName = f.name;
                const newDue = new Date(today.getTime() + f.goal * 24 * 60 * 60 * 1000);
                newDue.setHours(0, 0, 0, 0);
                return {
                    ...f,
                    last_contact_date: todayStr,
                    next_due_date: newDue.toISOString().split("T")[0],
                };
            }
            return f;
        });

        saveFriends(updatedFriends);

        // Format nice interaction time
        const hours = today.getHours();
        const minutes = today.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        const displayHour = hours % 12 || 12;
        const day = today.getDate();
        const year = today.getFullYear();
        const monthName = today.toLocaleString("en-US", { month: "long" });
        const timeStr = `${displayHour}:${minutes} ${ampm} ${day} ${monthName} ${year}`;

        const newLog = {
            id: Date.now(),
            friendId,
            name: friendName,
            sm: type, // "Call", "Text", "Video"
            date: timeStr,
            timestamp: today.toISOString(),
        };

        const updatedTimeline = [newLog, ...timeline];
        saveTimeline(updatedTimeline);
    };

    const deleteTimelineItem = (id) => {
        const updated = timeline.filter((item) => item.id !== id);
        saveTimeline(updated);
    };

    const clearTimeline = () => {
        saveTimeline([]);
    };

    return (
        <AppContext.Provider
            value={{
                friends,
                timeline,
                loading,
                addFriend,
                deleteFriend,
                archiveFriend,
                snoozeFriend,
                editGoal,
                logInteraction,
                deleteTimelineItem,
                clearTimeline,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
