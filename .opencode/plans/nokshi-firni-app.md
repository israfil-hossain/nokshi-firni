# Nokshi - Premium Firni Selling Application Plan

## Overview
Transform the existing Next.js link-shortener (Linkify) into a single-page premium firni selling website with animated design, Bangla text, and WhatsApp integration.

---

## Application Requirements

### Products & Pricing

| Size | Price | Min Order | Free Delivery Threshold |
|------|-------|-----------|------------------------|
| 150gm Cup | ৳30/cup | 20 cups | 60 cups |
| 500gm Box | ৳100/box | 5 boxes | 20 boxes |
| 1kg Box | ৳200/box | 3 boxes | 10 boxes |

**Standard Delivery Charge:** ৳80 (free if thresholds met)

### Key Features
1. **Single Page App** - Hero → Products → Order Summary → Pre-Order Form → Footer
2. **Quantity Selector** - +/- buttons with min/max validation
3. **Live Order Calculation** - Real-time price + delivery charge
4. **WhatsApp Widget** - Bottom-right floating button with ping animation
5. **Pre-Order Form** - Event booking form (submits via mailto: link)
6. **Bangla Text** - Mixed Bangla + English for technical terms
7. **Animated Premium Design** - Framer Motion animations throughout

### User-Specific Configuration
- **Logo Location:** `~/Downloads/ChatGPT Image Aug 24, 2026, 03_57_10 PM.png`
- **WhatsApp Number:** `+8801723560254`
- **Form Submission:** `mailto:` link (opens email client)
- **Color Theme:** Traditional Gold/Cream (Premium Bangladeshi feel)
- **Email Subject for Pre-Orders:** `নকশি - ইভেন্ট প্রি-অর্ডার`

---

## Implementation Plan

### Phase 1: Project Cleanup (15 mins)

**Actions:**
1. Remove old marketing pages: `src/app/(marketing)/` and all sub-routes
2. Remove auth pages: `src/app/auth/`
3. Remove dashboard pages: `src/app/(main)/`
4. Remove unused components: auth, blog, dashboard, navigation
5. Remove Clerk, Prisma dependencies from package.json
6. Keep only essential UI components

**Files to Remove:**
- `src/app/(marketing)/` (entire folder)
- `src/app/auth/` (entire folder)
- `src/app/(main)/` (entire folder)
- `src/components/auth/` (entire folder)
- `src/components/blog/` (entire folder)
- `src/components/dashboard/` (entire folder)
- `src/components/navigation/` (entire folder)
- `src/components/pricing-cards.tsx`
- `src/components/providers/providers.tsx` (simplify)
- `src/middleware.ts` (remove auth middleware)
- `src/actions/` (entire folder)
- `prisma/` (entire folder)

**Files to Keep:**
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/sonner.tsx`
- `src/components/global/animation-container.tsx`
- `src/components/global/max-width-wrapper.tsx`
- `src/components/global/icons.tsx`
- `src/utils/functions/cn.ts`
- `src/utils/constants/fonts.ts`

---

### Phase 2: Core Components (45 mins)

#### 1. Root Layout (`src/app/layout.tsx`)
- Remove Clerk provider wrapping
- Add Bangla font (Noto Sans Bengali or SolaimanLipi)
- Keep Sonner toaster
- Update metadata for Nokshi

#### 2. Global Styles (`src/styles/globals.css`)
- Update theme colors (cream/gold/green for traditional feel)
- Add Bangla font family
- Keep dark theme or switch to light theme

#### 3. Single Page (`src/app/page.tsx`)
- Import all sections
- Smooth scroll behavior
- Single page layout

#### 4. Navbar (`src/components/navbar.tsx`)
- Sticky top navbar
- Nokshi logo (left)
- WhatsApp CTA button (right)
- Smooth scroll links

#### 5. Hero Section (`src/components/hero-section.tsx`)
- Display user's logo from `public/nokshi-logo.png`
- Animated tagline in Bangla: "ঐতিহ্যবাহী ফিরনি, আপনার দোরগোড়ায়"
- CTA button: "এখনই অর্ডার করুন"
- Framer Motion entrance animations

#### 6. Product Card (`src/components/product-card.tsx`)
- Reusable component for each firni size
- Props: size, price, minOrder, freeDeliveryThreshold, image
- Quantity selector with +/- buttons
- Min order validation with error message
- Animation on quantity change

#### 7. Products Section (`src/components/products-section.tsx`)
- Grid of 3 ProductCards (150gm, 500gm, 1kg)
- Section title: "আমাদের ফিরনি"
- Staggered entrance animations

#### 8. Order Summary (`src/components/order-summary.tsx`)
- Live total calculation
- Delivery charge logic
- Free delivery badge when threshold met
- Grand total display
- "WhatsApp এ অর্ডার করুন" button

#### 9. Pre-Order Form (`src/components/preorder-form.tsx`)
- Event name, date, quantity, notes fields
- Submit via mailto: link (opens user's email client with pre-filled subject/body)
- WhatsApp direct chat button as alternative
- Bangla labels and placeholders
- Email subject: "নকশি - ইভেন্ট প্রি-অর্ডার"
- Form validates required fields before opening mailto:

#### 10. WhatsApp Widget (`src/components/whatsapp-widget.tsx`)
- Floating button bottom-right
- Ping animation (pulsing green circle)
- Opens WhatsApp chat with pre-filled message to +8801723560254
- Tooltip: "WhatsApp এ যোগাযোগ করুন"
- Always visible (fixed position)
- Green WhatsApp brand color (#25D366)

#### 11. Footer (`src/components/footer.tsx`)
- Contact info (WhatsApp, email)
- Social links
- Copyright notice
- Simple design

---

### Phase 3: Business Logic (20 mins)

#### Order Calculation (`src/lib/calculations.ts`)

```typescript
interface Product {
  id: '150gm' | '500gm' | '1kg';
  name: string;
  price: number;
  minOrder: number;
  freeDeliveryThreshold: number;
}

const PRODUCTS: Product[] = [
  { id: '150gm', name: '১৫০ গ্রাম ফিরনি', price: 30, minOrder: 20, freeDeliveryThreshold: 60 },
  { id: '500gm', name: '৫০০ গ্রাম ফিরনি', price: 100, minOrder: 5, freeDeliveryThreshold: 20 },
  { id: '1kg', name: '১ কেজি ফিরনি', price: 200, minOrder: 3, freeDeliveryThreshold: 10 },
];

interface Order {
  '150gm': number;
  '500gm': number;
  '1kg': number;
}

function calculateSubtotal(order: Order): number { ... }
function calculateDelivery(order: Order): number { ... }
function calculateTotal(order: Order): { subtotal: number; delivery: number; total: number } { ... }
function isFreeDelivery(order: Order): boolean { ... }
function getMinOrderWarning(order: Order): string | null { ... }
```

#### WhatsApp Integration (`src/lib/whatsapp.ts`)

```typescript
const WHATSAPP_NUMBER = '8801723560254';

function generateOrderMessage(order: Order): string {
  // Format order details in Bangla
  // Include product quantities, prices, delivery, total
}

function getWhatsAppLink(order: Order): string {
  const message = generateOrderMessage(order);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Also for pre-orders
function getPreOrderWhatsAppLink(eventDetails: EventOrder): string {
  const message = generatePreOrderMessage(eventDetails);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

---

### Phase 4: Styling & Animations (30 mins)

#### Theme Colors (Traditional Gold/Cream)
- Primary: Gold (#D4AF37) - for CTAs, highlights
- Secondary: Cream (#FFF8E7) - for backgrounds
- Accent: Forest Green (#2D5016) - for borders, secondary elements
- Text Dark: (#1A1A1A) - for headings
- Text Light: (#666666) - for body text
- Background: Light cream (#FFFBF0)
- WhatsApp Green: (#25D366)

#### Animations (Framer Motion)

1. **Hero Section**
   - Logo fade-in + scale
   - Tagline slide-up with delay
   - CTA button pulse

2. **Products Section**
   - Section title fade-in
   - Product cards stagger entrance (0.1s delay each)
   - Quantity buttons scale on press

3. **Order Summary**
   - Slide-in from right
   - Total number animation
   - Free delivery badge pop-in

4. **WhatsApp Widget**
   - Ping animation (CSS keyframes)
   - Float in from bottom-right
   - Hover scale effect

5. **Pre-Order Form**
   - Form fields stagger entrance
   - Submit button glow effect

---

### Phase 5: Final Polish (15 mins)

1. **SEO Metadata**
   - Title: "নকশি - ঐতিহ্যবাহী ফিরনি"
   - Description: "ঐতিহ্যবাহী বাংলাদেশি ফিরনি, আপনার দোরগোড়ায় ডেলিভারি"
   - Open Graph image

2. **Mobile Responsiveness**
   - Test all sections on mobile
   - Quantity selector usability
   - WhatsApp widget positioning

3. **Performance**
   - Optimize logo image
   - Lazy load sections
   - Remove unused CSS

4. **Copy to Project**
   - Copy logo: `~/Downloads/ChatGPT Image Aug 24, 2026, 03_57_10 PM.png` → `public/nokshi-logo.png`

---

## File Structure (New)

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts + providers
│   ├── page.tsx                # Single page app (all sections)
│   └── globals.css             # Theme + custom styles
│
├── components/
│   ├── navbar.tsx              # Sticky navigation with logo + WhatsApp CTA
│   ├── hero-section.tsx        # Logo + tagline + CTA
│   ├── product-card.tsx        # Product with quantity selector
│   ├── products-section.tsx    # Products grid (3 cards)
│   ├── order-summary.tsx       # Live order calculation + WhatsApp button
│   ├── preorder-form.tsx       # Event booking form
│   ├── whatsapp-widget.tsx     # Floating WhatsApp button with ping
│   └── footer.tsx              # Contact info + copyright
│
├── lib/
│   ├── calculations.ts         # Order math logic
│   └── whatsapp.ts             # WhatsApp message generator
│
├── utils/
│   └── functions/
│       └── cn.ts               # clsx + tailwind-merge (keep)
│
public/
├── nokshi-logo.png             # User's logo (copied from Downloads)
└── favicon.ico                 # Update if needed
```

---

## UI Components to Keep

| Component | Purpose |
|-----------|---------|
| `button.tsx` | CTA buttons, quantity +/- |
| `card.tsx` | Product cards, order summary |
| `input.tsx` | Form fields |
| `textarea.tsx` | Pre-order notes |
| `label.tsx` | Form labels |
| `badge.tsx` | "Free Delivery" badge |
| `separator.tsx` | Visual dividers |
| `dialog.tsx` | Order confirmation modal |
| `sonner.tsx` | Toast notifications |
| `animation-container.tsx` | Framer Motion wrapper |
| `max-width-wrapper.tsx` | Page layout container |

---

## WhatsApp Widget Specification

### Design
- **Position:** Fixed bottom-right (right-6, bottom-6)
- **Size:** 60px circle
- **Color:** WhatsApp Green (#25D366)
- **Icon:** WhatsApp SVG icon (white)
- **Ping Animation:** Pulsing green circle behind button (CSS keyframes)
- **Z-index:** 50 (above all content)

### Ping Animation CSS
```css
@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  75%, 100% { transform: scale(2); opacity: 0; }
}

.whatsapp-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}
```

### Behavior
- On click: Opens WhatsApp with pre-filled message to +8801723560254
- Message includes: Greeting, order details (if any), contact info
- Tooltip on hover: "WhatsApp এ যোগাযোগ করুন"
- Always visible (fixed position, scroll-proof)

---

## Pre-Order Form mailto: Configuration

### Form Fields
- ইভেন্টের নাম (Event Name) - text input
- তারিখ (Date) - date input
- পরিমাণ (Quantity) - number input
- বিশেষ অনুরোধ (Special Notes) - textarea

### mailto: Link Generation
```typescript
function generateMailtoLink(formData: PreOrderForm): string {
  const subject = encodeURIComponent('নকশি - ইভেন্ট প্রি-অর্ডার');
  const body = encodeURIComponent(`
ইভেন্টের নাম: ${formData.eventName}
তারিখ: ${formData.date}
পরিমাণ: ${formData.quantity}
বিশেষ অনুরোধ: ${formData.notes}

-- 
নকশি ফিরনি
  `);
  return `mailto:?subject=${subject}&body=${body}`;
}
```

### Alternative: WhatsApp Pre-Order
- Button: "WhatsApp এ প্রি-অর্ডার করুন"
- Opens WhatsApp with pre-filled event order message

```bash
pnpm remove @clerk/nextjs @clerk/clerk-react
pnpm remove @prisma/client prisma
pnpm remove next-themes
pnpm remove @tanstack/react-query
pnpm remove react-hook-form @hookform/resolvers zod
pnpm remove stripe @stripe/stripe-js
```

## Dependencies to Keep

```json
{
  "next": "^14.2.13",
  "react": "^18",
  "react-dom": "^18",
  "tailwindcss": "^3.4.1",
  "framer-motion": "^11.2.10",
  "lucide-react": "^0.383.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0",
  "sonner": "^1.4.41"
}
```

---

## Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| Phase 1 | 15 mins | Project cleanup, remove old files |
| Phase 2 | 45 mins | Build all components |
| Phase 3 | 20 mins | Business logic (calculations, WhatsApp) |
| Phase 4 | 30 mins | Styling, animations, theme |
| Phase 5 | 15 mins | Final polish, testing |
| **Total** | **~2 hours** | Complete application |

---

## Verification Steps

1. Copy logo from `~/Downloads/ChatGPT Image Aug 24, 2026, 03_57_10 PM.png` to `public/nokshi-logo.png`
2. Run `pnpm dev` and verify app loads
3. Check hero section displays logo correctly
4. Check all sections render correctly
5. Test quantity selectors (min/max validation)
6. Verify order calculation is correct
7. Test WhatsApp link generation (should open WhatsApp with +8801723560254)
8. Verify WhatsApp widget appears with ping animation
9. Test pre-order form opens mailto: link
10. Check mobile responsiveness
11. Verify animations work smoothly
12. Run `pnpm lint` for code quality
