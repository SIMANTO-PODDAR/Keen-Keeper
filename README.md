# Project Name - KeenKeeper

🔗 **Live Demo:** [https://keen-keeper.vercel.app/](https://keen-keeper.vercel.app/)

---

### Description

A modern and responsive friendship management app designed to help you stay connected with the people who matter most. Track your interactions through an intuitive timeline, manage contact frequency with smart goals, and log calls, texts, or video chats in just one click. With built-in analytics and visual insights, the app gives you a clear overview of your communication habits and relationships.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React.js** | Build the UI |
| **React Router DOM** | Handle page navigation |
| **Tailwind CSS + DaisyUI** | Styling and responsiveness |
| **Recharts** | Chart |
| **React Toastify + React Icons** | Notification & Styling |

---

## ✨ 3 key features

| **1. 📇 Smart Friend Management Dashboard** |
 Easily manage all your friends in a clean, responsive grid layout with real-time status indicators, tags, and last contact tracking — helping you never lose touch. |

| **2. ⚡ One-Click Interaction Logging (Call / Text / Video)** |
 Quickly log interactions with a single click from the Friend Details page. Each action instantly updates the timeline and shows a toast notification for seamless tracking. |

| **3. 📊 Visual Friendship Analytics** |
 Gain insights into your communication habits with an interactive pie chart that breaks down Call, Text, and Video interactions. |

---

# Detailed Description 📄

### 👥 Your Friends Section (Home Page)

- Display all friends from JSON file as cards,
- **Each card show:**

| Field | Details |
|---|---|
| 📸 Picture | Friend's photo |
| 🧑 Name | Friend's full name |
| 📅 Days Since Contact | How many days ago you contacted them |
| 🏷️ Tags | e.g., "college", "work" |
| 🔴 Status | Background color changes based on status|

- Cards shown in a **4-column grid layout on large screens**
- Clicking a card navigate the user to that friend's **Detail Page**

---

### 👤 Friend Details Page —

This page have a **two-column layout**.

|*Left Column — Friend Info Card:*|
|---|

Show the following details:

- Profile picture - Name - Status (with color) - Tags - Bio - Email

| Button |
|---|
|🔘-⏰ Snooze 2 Weeks   🔘-📦 Archive   🔘-🗑️ Delete |

|*Right Column — 3 sections:*|
|---|

**① Stats Cards (show 3 cards):**

- Days Since Contact - Goal (in days) - Next Due Date

**② Relationship Goal Card:**

- Show the current contact goal
- An **Edit** button

**③ Quick Check-In Card:**

- 3 buttons with icons: **Call**, **Text**, **Video**
- When clicked, each button adds a new entry to the **Timeline**

---

### ⚡ Friend Details Page — Button Functionality

When a user clicks **Call**, **Text**, or **Video** in the Quick Check-In Card:

✅ A **new timeline entry** is automatically added with:

- The **current date**
- A **title** like:
  - "Call with Alex Johnson"

✅ A **toast notification** appear when any of these buttons is clicked.

---

### 📜 Timeline Page

This page shows the **history of all interactions** (calls, texts, video calls) logged from the Friend Details page.

**This page have:**

- A **"Timeline"** heading at the top
- Timeline entries
- Each entry show:

| Field | Details |
|---|---|
| 📅 Date | When the interaction happened |
| 🔣 Icon | Different icon for Call / Text / Video |
| 📝 Title | e.g., "Call with Sarah" |

### 🔍 Timeline Filter

- **filter options** on the Timeline page so users can filter entries by: **Call**, **Text**, or **Video**

---

### 📊 Friendship Analytics Page (Stats Page)

- The page have a **"Friendship Analytics"** heading at the top
- A **Pie Chart** (using Recharts) showing the count of **Call / Text / Video** interactions

---

### 📱 Responsive Design

- The entire website work correctly on **mobile, tablet, and desktop** screen sizes

---

### 🛠️ Other Functionality

|  | |
|---|---|
| 1 |  **404 Page** for any unknown/invalid route |
| 2 | Show a **loading animation** while the friends data is being fetched on the Home page |
| 3 | Show a **relevant toast notification** when the user clicks Call, Text, or Video |

---
