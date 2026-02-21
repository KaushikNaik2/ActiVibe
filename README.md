# ActiVibe 🌍

> **Where Action Meets Community — Verified, Geolocated, Rewarded.**

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

![ActiVibe Banner](https://via.placeholder.com/1200x600/5B4FCF/ffffff?text=ActiVibe+v2.0)

[![Hackathon Submission](https://img.shields.io/badge/Hackathon-12--Hour_Submission-5B4FCF.svg)](#)
[![Domain](https://img.shields.io/badge/Domain-Smart_Living_%_%26_Consumer_Tech-10B981.svg)](#)

## 📖 Overview

**ActiVibe** is a full-stack volunteer engagement platform that bridges the gap between NGOs and volunteers. It solves the problem of "performative activism" by using **GPS geofencing** to verify attendance, ensuring every hour logged is authentic. 

Designed with a **"TikTok energy × LinkedIn credibility"** aesthetic, ActiVibe provides a premium, youth-forward experience for volunteers while remaining accessible for non-technical NGO administrators.

### 🎥 Demo Video
> **[Frontend Demo Video — Coming Soon to YouTube! 🚀](https://youtube.com/)** > *(We are currently recording our frontend walkthrough and will link the YouTube video here shortly!)*

### 🚀 Core Solution
* **For Volunteers:** A verified professional resume built on GPS-confirmed hours, skill-matched drive recommendations, and privacy-focused real-time chat.
* **For NGOs:** AI-powered event creation, comprehensive drive analytics, and a tiered endorsement system to recognize top talent.

---

## ✨ Key Features (v2.0)

### 📍 The "Authenticity Engine" (Geofencing)
* **GPS-Verified Attendance:** Volunteers can only check in and post content when physically inside the drive zone (drawn by the NGO).
* **Live Map & Celebration:** Real-time location tracking triggers a confetti celebration upon zone entry, unlocking the camera and post composer.
* **Anti-Scam Location Guard:** Events cannot be published if the location is >500km from the NGO's registered city.

### 🤖 AI-Powered Operations
* **Gemini Role Generator:** NGOs can generate detailed event roles and requirements from a single-sentence description.
* **Skill Inference:** The system infers skills based on participation history.
* **Impact CV Generator:** Auto-generates shareable Instagram/PDF resumes with AI-written impact summaries.

### 🏆 Trust & Recognition
* **Manual Endorsements:** Badges are not participation trophies. They are limited-quota gifts from NGOs (e.g., "Team Leadership") that act as professional references.
* **Verified Profile:** Distinguishes between "Self-Declared" skills and "Badge-Verified" skills.
* **Tiered Organization Recognition:** NGOs earn status tiers (Emerging, Active, Trusted, Champion) based on verified impact.

### 💬 Real-Time Communication
* **Private In-App Chat:** Volunteers and NGOs can coordinate via Socket.io without exchanging phone numbers.
* **Emergency Response Mode:** A dedicated mode for real-time disaster response, allowing instant location sharing and coordination.

---

## 🛠 Tech Stack

**Frontend:**
* **Framework:** Expo SDK 51 (React Native)
* **Styling:** NativeWind 4.x (Tailwind CSS)
* **Typography:** Inter Typeface
* **Maps:** `react-native-maps` (Google Maps SDK)
* **Animations:** `react-native-reanimated`

**Backend & Data:**
* **Database:** Supabase (PostgreSQL)
* **Location Engine:** PostGIS (spatial queries and geofencing)
* **Real-time:** Socket.io (Chat) & Supabase Realtime
* **AI:** Google Gemini API

**State Management:**
* **Global State:** Zustand
* **Server State:** TanStack Query v5

---

## ⚡ Getting Started

### Prerequisites
* Node.js & npm/yarn
* Expo CLI
* Supabase Account
* Google Maps API Key
* Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/activibe.git](https://github.com/yourusername/activibe.git)
    cd activibe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```env
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
    EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
    ```

4.  **Run the App:**
    ```bash
    npx expo start
    ```

### 👨‍💻 Developer Mode (Simulation)
To test geofencing without leaving your desk, enable **DEV Mode**:
1.  Navigate to the **Map Tab** (Volunteer View).
2.  Look for the amber banner: `DEV MODE — GPS Simulation Active`.
3.  Tap **"Simulate Entry"** to trigger the check-in celebration and unlock the camera.
4.  Tap **"Simulate Post"** to generate a seeded post in the feed.

---

## 📂 Project Structure

```bash
/app
  /(tabs)          # Volunteer App (Feed, Map, Chat, Profile)
  /(ngo)           # NGO Portal (Dashboard, Events, Chat, Profile)
  /auth            # Login, Signup (Volunteer/NGO), Skills Onboarding
  /search          # Global search for People/NGOs/Events
  /emergency       # Emergency Response Mode screens
/components        # Reusable UI (PostCard, BadgeCard, KPICard)
/stores            # Zustand stores (auth, activeEvent, chat, theme)
/assets            # Fonts, Icons, Images
---

## 🛠 Tech Stack

**Frontend:**
* **Framework:** Expo SDK 51 (React Native)
* **Styling:** NativeWind 4.x (Tailwind CSS)
* **Typography:** Inter Typeface
* **Maps:** `react-native-maps` (Google Maps SDK)
* **Animations:** `react-native-reanimated`

**Backend & Data:**
* **Database:** Supabase (PostgreSQL)
* **Location Engine:** PostGIS (spatial queries and geofencing)
* **Real-time:** Socket.io (Chat) & Supabase Realtime
* **AI:** Google Gemini API

**State Management:**
* **Global State:** Zustand
* **Server State:** TanStack Query v5

---

## ⚡ Getting Started

### Prerequisites
* Node.js & npm/yarn
* Expo CLI
* Supabase Account
* Google Maps API Key
* Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/activibe.git](https://github.com/yourusername/activibe.git)
    cd activibe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```env
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    EX

---

## 🛠 Tech Stack

**Frontend:**
* **Framework:** Expo SDK 51 (React Native)
* **Styling:** NativeWind 4.x (Tailwind CSS)
* **Typography:** Inter Typeface
* **Maps:** `react-native-maps` (Google Maps SDK)
* **Animations:** `react-native-reanimated`

**Backend & Data:**
* **Database:** Supabase (PostgreSQL)
* **Location Engine:** PostGIS (spatial queries and geofencing)
* **Real-time:** Socket.io (Chat) & Supabase Realtime
* **AI:** Google Gemini API

**State Management:**
* **Global State:** Zustand
* **Server State:** TanStack Query v5

---

## ⚡ Getting Started

### Prerequisites
* Node.js & npm/yarn
* Expo CLI
* Supabase Account
* Google Maps API Key
* Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/activibe.git](https://github.com/yourusername/activibe.git)
    cd activibe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```env
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
    EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
    ```

4.  **Run the App:**
    ```bash
    npx expo start
    ```

### 👨‍💻 Developer Mode (Simulation)
To test geofencing without leaving your desk, enable **DEV Mode**:
1.  Navigate to the **Map Tab** (Volunteer View).
2.  Look for the amber banner: `DEV MODE — GPS Simulation Active`.
3.  Tap **"Simulate Entry"** to trigger the check-in celebration and unlock the camera.
4.  Tap **"Simulate Post"** to generate a seeded post in the feed.

---

## 📂 Project Structure

```bash
/app
  /(tabs)          # Volunteer App (Feed, Map, Chat, Profile)
  /(ngo)           # NGO Portal (Dashboard, Events, Chat, Profile)
  /auth            # Login, Signup (Volunteer/NGO), Skills Onboarding
  /search          # Global search for People/NGOs/Events
  /emergency       # Emergency Response Mode screens
/components        # Reusable UI (PostCard, BadgeCard, KPICard)
/stores            # Zustand stores (auth, activeEvent, chat, theme)
/assets            # Fonts, Icons, Images
# ActiVibe
