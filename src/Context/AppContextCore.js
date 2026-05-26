import { createContext } from "react";

export const AppContext = createContext();

// Helper functions for dynamic calculations
export const getDaysSinceContact = (friend) => {
    if (!friend.last_contact_date) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastContact = new Date(friend.last_contact_date);
    lastContact.setHours(0, 0, 0, 0);
    const diffTime = today - lastContact;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
};

export const getDaysUntilDue = (friend) => {
    if (!friend.next_due_date) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextDue = new Date(friend.next_due_date);
    nextDue.setHours(0, 0, 0, 0);
    const diffTime = nextDue - today;
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const getFriendStatus = (friend) => {
    const daysUntilDue = getDaysUntilDue(friend);
    if (daysUntilDue < 0) {
        return "Overdue";
    } else if (daysUntilDue <= 2) {
        return "Almost Due";
    } else {
        return "On-track";
    }
};
