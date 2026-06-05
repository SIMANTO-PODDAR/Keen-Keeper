<div align="center">

# KeenKeeper

### *Stay connected. Never lose touch.*

A modern **friendship management app** that helps you track, nurture, and maintain your most important relationships — with smart goals, interaction logging, and visual analytics.


[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-keen--keeper.vercel.app-10b981?style=for-the-badge)](https://keen-keeper.vercel.app/)

<div align="center">
  <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td valign="top" width="60%">
        <img src="https://i.ibb.co.com/Pvn9fxkh/Keen-Keeper-Desktop.jpg" alt="KeenKeeper Desktop View" width="100%" style="border-radius: 8px;" />
      </td>
      <td valign="top" width="35%">
        <img src="https://i.ibb.co.com/F4h0MprP/Keen-Keeper-Mobile.jpg" alt="KeenKeeper Mobile View" width="100%" style="border-radius: 8px;" />
      </td>
    </tr>
  </table>
</div>
<br />

## 📌 Project Overview

**KeenKeeper** is a relationship-tracking web application designed to solve a common problem — forgetting to stay in touch with the people who matter most. Instead of relying on memory, KeenKeeper lets you:

- Set a **contact frequency goal** (e.g., "I want to call Alex every 14 days")
- **Log every interaction** — Call, Text, or Video — with a single click
- **See at a glance** who's overdue for contact, who's on track, and who needs attention
- Analyze your communication habits through **visual charts**

Everything is stored locally in the browser via `localStorage`, so your data persists across sessions without any backend or login required.

---

## ✨ Key Features

### 📇 1. Smart Friend Management Dashboard

A responsive card grid displaying all your friends with real-time status indicators:

| Field | Description |
|---|---|
| 📸 Profile Photo | Visual identity of each friend |
| 🧑 Name | Full name shown prominently |
| 📅 Days Since Contact | Dynamically computed from last contact date |
| 🏷️ Tags | Labels like `college`, `work`, `family` |
| 🔴🟡🟢 Status Ring | Pulsing color indicator: **Overdue / Almost Due / On Track** |

Click any card to navigate to that friend's **Detail Page**.

---

### 👤 2. Friend Detail Page (Two-Column Layout)

**Left Column — Friend Info Card:**

- Profile picture, name, status badge, tags, bio, and email
- Action buttons: ⏰ **Snooze 2 Weeks** · 📦 **Archive** · 🗑️ **Delete**

**Right Column — Three Smart Sections:**

| Section | Content |
|---|---|
| 📊 Stats Cards | Days Since Contact · Contact Goal · Next Due Date |
| 🎯 Relationship Goal | Current goal in days + inline Edit button |
| ⚡ Quick Check-In | One-click **Call**, **Text**, **Video** buttons |

---

### ⚡ 3. One-Click Interaction Logging

Clicking **Call / Text / Video** on the Friend Detail page instantly:

- ✅ Adds a new entry to the **Timeline** (with current timestamp)
- ✅ Updates the friend's `last_contact_date` and recalculates `next_due_date`
- ✅ Fires a **toast notification** confirming the logged interaction

---

### 📜 4. Timeline Page

A chronological history of all logged interactions across all friends.

- Entries show: **Date & Time · Interaction Icon · Title** (e.g., "Call with Sarah")
- **Filter bar** to view only `Call`, `Text`, or `Video` entries
- Clear timeline option available

---

### 📊 5. Friendship Analytics (Stats Page)

- Interactive **Pie Chart** (powered by Recharts) breaking down your interactions by type
- Instantly see if you call, text, or video chat more

---

### ➕ 6. Add New Friends

A modal form lets you add new friends with:

- Name, Email, Profile Picture URL, Bio, Tags, Contact Goal (days)
- New friends are instantly saved to `localStorage` and appear on the dashboard

---

### 📱 7. Fully Responsive

The entire app is designed and tested across:

- 📱 Mobile (single column layout)
- 💻 Tablet (2-column grid)
- 🖥️ Desktop (4-column grid, two-panel detail view)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React.js** | 19 | Component-based UI framework |
| **Vite** | 8 | Lightning-fast dev server & bundler |
| **React Router** | 7 | Client-side page navigation |
| **Tailwind CSS** | 4 | Utility-first styling |
| **DaisyUI** | 5 | Tailwind component library |
| **Recharts** | 3 | Interactive data visualization (Pie Chart) |
| **React Toastify** | 11 | Toast notifications |
| **React Icons** | 5 | Icon library |
| **localStorage** | — | Client-side data persistence |

---

## 🗂️ Project Architecture

```
keen-keeper/
├── public/
│   └── data.json              # Seed data for initial friends list
├── src/
│   ├── assets/                # Static assets (images, etc.)
│   ├── Context/
│   │   ├── AppContext.jsx     # Global state provider (friends, timeline, actions)
│   │   └── AppContextCore.js  # Context object definition
│   ├── Router/
│   │   └── Router.jsx         # React Router configuration
│   ├── Root/
│   │   └── Root.jsx           # App shell (Navbar + Outlet + Footer)
│   ├── Components/
│   │   ├── Navbar/            # Top navigation bar
│   │   ├── Banner/            # Hero/banner section
│   │   ├── YourFriends/       # Friends grid display
│   │   ├── Friend/            # Friend detail page
│   │   └── AddFriendModal/    # Modal for adding new friends
│   ├── Section/
│   │   ├── Home/              # Home page
│   │   ├── TimeLine/          # Interaction history page
│   │   ├── Stats/             # Analytics page
│   │   └── Footer/            # Footer section
│   ├── UI/
│   │   ├── LoadingSpinner/    # Loading animation
│   │   └── NotFound/          # 404 error page
│   ├── index.css              # Global styles, glassmorphism, animations
│   └── main.jsx               # App entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔄 State Management

All app state is managed via a custom **React Context** (`AppContext`) with `localStorage` persistence. The context exposes:

| Action | Description |
|---|---|
| `addFriend(data)` | Add a new friend with auto-computed dates |
| `deleteFriend(id)` | Remove friend and their timeline entries |
| `archiveFriend(id)` | Toggle archive status |
| `snoozeFriend(id)` | Push next due date by 14 days |
| `editGoal(id, days)` | Update contact frequency goal |
| `logInteraction(id, type)` | Log Call/Text/Video + update contact dates |
| `deleteTimelineItem(id)` | Remove a single timeline entry |
| `clearTimeline()` | Wipe all timeline entries |

---

## 🧭 Routing Structure

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Friends dashboard (default) |
| `/friend/:id` | `Friend` | Individual friend detail view |
| `/timeLine` | `TimeLine` | Interaction history |
| `/stats` | `Stats` | Friendship analytics chart |
| `*` | `NotFound` | 404 error page |

---

## 🎨 Design System

- **Primary Color:** `#10b981` (Emerald Green)
- **Background:** `#f8fafc` with subtle radial gradients
- **Typography:** `Outfit` + `Geist` from Google Fonts
- **Glassmorphism panels:** `backdrop-filter: blur(16px)` with translucent backgrounds
- **Status animations:** Pulsing ring animations in 🟢 green / 🟡 yellow / 🔴 red
- **Card interactions:** Smooth `translateY` lift on hover via cubic-bezier easing
- **Custom scrollbar:** Styled with brand green tones

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# Clone the repository
git clone https://github.com/SIMANTO-PODDAR/Keen-Keeper.git
cd Keen-Keeper

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

This project is deployed on **Vercel** with automatic CI/CD from the `main` branch.

🔗 **Live URL:** [https://keen-keeper.vercel.app/](https://keen-keeper.vercel.app/)

---

## 🧩 Other Features

| # | Feature |
|---|---|
| 1 | **404 Page** for any unknown/invalid route |
| 2 | **Loading spinner** shown while fetching initial friend data |
| 3 | **Toast notifications** for every interaction log action |
| 4 | **Lazy state initialization** — reads from `localStorage` before fetching |
| 5 | **Data seeding** — auto-fetches `data.json` on first visit to populate friends |

---

<div align="center">

Made with 💚 using React + Vite

</div>
