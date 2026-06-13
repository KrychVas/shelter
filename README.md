# Cozy House - Shelter for Pets

A responsive and pixel-perfect web application for a pet shelter, developed as part of the Rolling Scopes School frontend course.

## 🔗 Project Links
* **Deploy (Live Page):** [Click here to view the website](https://krychvas.github.io/shelter/shelter/pages/main/index.html)
* **Repository:** [GitHub Repository](https://github.com/KrychVas/shelter)

---

## 🛠️ Tech Stack & Features
* **HTML5** (Semantic layout, BEM methodology)
* **CSS3** (Custom properties, Grid Layout, Flexbox)
* **JavaScript** (Navigation and dynamic self-assessment output)

---

## 📋 Detailed Project Evaluation Checklist (Stage 1: Core Layout)

### 🏠 Main Page — 70 / 70 Points

#### 1. Markup Validation (+10)
- [x] **W3C Valid Markup (+5):** Document fully validated via https://validator.w3.org/ with no errors.
- [x] **Page Structure & Icons (+5):** Header logo is purely text-based, the page contains exactly one `<h1>`, and the favicon is successfully added.

#### 2. Layout Matching Design (+35)
- [x] `<header>` block matches Figma design (+5)
- [x] `Not only` (Hero) block matches Figma design (+5)
- [x] `About` block matches Figma design (+5)
- [x] `Our Friends` slider section matches Figma design (+5)
- [x] `Help` icons block matches Figma design (+5)
- [x] `In addition` (Donation) block matches Figma design (+5)
- [x] `<footer>` block matches Figma design (+5)

#### 3. CSS Requirements (+15)
- [x] **Help Section Grid (+5):** The Help block is styled using flexbox or grid layout models.
- [x] **Layout Centering (+5):** When resizing the viewport (>1280px), the content wrapper stays strictly centered and doesn't stretch or shift.
- [x] **Background Widths (+5):** Background colors correctly expand to the full width of the screen.

#### 4. Interactivity (+10)
- [x] **Navigation Elements (+5):** "About the shelter" link is active/non-interactive. Other items are fully interactive, anchor links have smooth scrolling behavior.
- [x] **Cards & UI States (+5):** Every pet card in the slider is interactive on hover. All buttons and links have `cursor: pointer` and clear visual active/hover states with smooth transitions without shifting adjacent elements.

---

### 🐾 Pets Page — 40 / 40 Points

#### 1. Markup Validation (+10)
- [x] **W3C Valid Markup (+5):** Document fully validated via https://validator.w3.org/ with no errors.
- [x] **Page Structure & Icons (+5):** Header logo is built from text elements, contains exactly one `<h1>`, and favicon is present.

#### 2. Layout Matching Design (+15)
- [x] `<header>` block matches Figma design (+5)
- [x] `Our Friends` catalog grid matches Figma design (+5)
- [x] `<footer>` block matches Figma design (+5)

#### 3. CSS Requirements (+5)
- [x] **Centering & Backgrounds (+5):** Content stays centered for viewports >1280px, and background colors stretch to full screen width.

#### 4. Interactivity (+10)
- [x] **Navigation & Pagination (+5):** "Our pets" navigation link is active and non-clickable. Pagination controls display correct disabled states (`<<` and `<` are locked on Page 1) and links have working anchor behavior.
- [x] **Cards & Hover Effects (+5):** Pet cards are interactive on hover across the entire area. Buttons and controls have appropriate `:hover` effects, smooth transitions, and `cursor: pointer`.

---

## 🚀 How to Run the Project Locally
1. Clone the repository: `git clone https://github.com/KrychVas/shelter.git`
2. Open `shelter/shelter/pages/main/index.html` in your browser.