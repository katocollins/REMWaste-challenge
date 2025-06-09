# ♻️ Skip Selection Page Redesign – React + TailwindCSS

This project is a complete redesign of the **"Choose Your Skip Size"** page from [WeWantWaste.co.uk](https://wewantwaste.co.uk). The goal was to improve the UI/UX, code quality, responsiveness, and maintainability while preserving the original functionality.

---

## 🔗 Live Demo

👉 [View Live on Vercel](https://your-vercel-link.vercel.app)  
👉 [Figma Design](https://your-figma-design-link.com)

---

## 📸 Overview

The redesigned page is a responsive, clean, and modern React app using TailwindCSS. It allows users to:

- View skip options from a dynamic API
- Select a skip (highlighted and persisted in footer)
- See a floating summary footer with a "Proceed to Pay" button
- Browse skips using pagination (only 2 rows per page)
- Enjoy a refined experience across devices

---

## 💡 Improvements & Features

### 🔧 Functional Enhancements
- ✅ **Pagination**: Only 2 rows shown at a time, others paginated
- ✅ **Semantic Search Bar**: Quickly filter skips using keywords
- ✅ **Skip Selection Logic**: Highlights selected card and updates floating footer
- ✅ **Floating Footer**: Shows selected skip details, price, and "Proceed to Pay" CTA

### 🎨 UI/UX Improvements
- ✅ **Custom Figma Redesign**: Built a fresh layout from scratch ([see design](https://your-figma-design-link.com))
- ✅ **Responsiveness**: Fully mobile- and desktop-friendly
- ✅ **Animations & Transitions**: Subtle hover and selection transitions
- ✅ **Hover Effects**: On skip cards for better interactivity
- ✅ **Progress Stepper**: Clean top progress indicator (Address → Waste Type → Skip Size)

### 🧱 Code Quality
- ✅ **Component-Based Structure**: Reusable components like `SkipCard`, `Footer`, `Header`
- ✅ **Hooks**: Custom hook for pagination logic
- ✅ **Clean and Maintainable**: All code in functional components, no unnecessary complexity

---

## 🛠️ Tech Stack

- ⚛️ React (with Vite)
- 🎨 TailwindCSS v3
- 🔗 Fetching from: `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`

---

## 🚀 Getting Started (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/katocollins/REMWaste-challenge.git
cd REMWaste-challenge

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
