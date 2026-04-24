# Design System: Microcement Web (MASTER)

## 1. Product & Architecture
- **Product Type:** Premium Service / Luxury Interior Design
- **Pattern:** Hero-Centric Design
- **Conversion Focus:** Single primary CTA ("Get a Quote" / "Book Consultation"). Hero takes up 80-100% of the viewport above the fold. 

## 2. Visual Style (Inspired by Iglucraft)
- **Style Name:** Brutalist Elegance / Natural Minimalism
- **Core Principle:** "Silence is the sound time makes." Focus on high-end textures (microcement), massive imagery, and extreme whitespace.
- **Key Characteristics:**
  - Asymmetrical grids and staggered image placements.
  - Transparent headers that transition to solid on scroll.
  - Subtle blur (glassmorphism) behind sticky elements, but preserving a raw, unpolished feel.
  - Generous padding and margins (`py-24`, `py-32`) to let the design breathe.

## 3. Colors
Semantic color tokens emphasizing natural stones, warm greys, and refined contrast:
- **Background:** `#FAF5F2` (Warm Off-White) - Softer than pure white, feels premium.
- **Foreground / Text:** `#0F172A` (Charcoal) - Deep contrast without the harshness of pure black.
- **Primary Accent:** `#78716C` (Stone Grey) - The color of refined microcement.
- **Secondary:** `#A8A29E` (Muted Sand)
- **Surface:** `#FFFFFF` (Pure White for cards/overlays)
- **Interactive Links:** Underlines and subtle opacity shifts rather than bulky solid buttons.

## 4. Typography
- **Heading Font:** `Cormorant Garamond` or `Playfair Display` (Elegant, high-contrast serif for a timeless, magazine-like feel).
- **Body Font:** `Montserrat` or `Inter` (Clean, geometric sans-serif for optimal readability and modern contrast).
- **Hierarchy:** Extreme scale difference. Huge hero typography (e.g., `text-6xl` to `text-8xl` on desktop) paired with clean, small reading text (`text-base`).
- **Styling:** Uppercase with wide tracking for subheadings (`tracking-widest`).

## 5. Interactions & Animation
- **Buttons:** Text links with animated underlines or very understated solid rectangles. No harsh hover colors; instead, use subtle brightness or scale shifts (0.98x - 1.02x).
- **Scroll Reveals:** Text and images fade and slide up gently (`translate-y-8`, `opacity-0` -> `opacity-100`) as they enter the viewport.
- **Duration:** 400-600ms for layout transitions. 150-300ms for micro-interactions (hovers). Easing curves should be slow and deliberate (ease-out).

## 6. Pre-Delivery Checklist (UI/UX Pro Max Rules)
- [ ] Accessibility: Contrast ratios >= 4.5:1.
- [ ] No emojis as icons. Use Lucide or Radix icons.
- [ ] `cursor-pointer` applied to all clickable elements.
- [ ] Smooth transitions on all hover states.
- [ ] Accessible focus states for keyboard navigation.
- [ ] Touch targets >= 44x44px for mobile.
