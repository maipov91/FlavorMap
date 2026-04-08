// pageTransitions.ts
// Dùng chung cho tất cả pages — import vào bất kỳ page nào cần AnimatePresence

import type { Variants } from "framer-motion";

// ─── MAP → DETAIL (cinematic wipe) ───────────────────────────────────────────
// Khi navigate từ Map sang Detail:
//   Enter: trang mới slide lên từ dưới, hero image scale từ 1.08 → 1
//   Exit:  trang cũ fade + scale nhỏ lại (như bị "đẩy ra phía sau")

export const detailPageVariants: Variants = {
    initial: {
        opacity: 0,
        y: "4vh",
        scale: 0.98,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1], // expo out — feel premium, không linear
            when: "beforeChildren",
            staggerChildren: 0.07,
        },
    },
    exit: {
        opacity: 0,
        y: "-2vh",
        scale: 1.01,
        transition: {
            duration: 0.45,
            ease: [0.4, 0, 1, 0.6], // ease-in khi exit
        },
    },
};

// ─── HERO IMAGE ───────────────────────────────────────────────────────────────
// Image scale từ lớn → đúng size, tạo cảm giác "reveal"
export const heroImageVariants: Variants = {
    initial: { scale: 1.08, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        scale: 1.04,
        opacity: 0,
        transition: { duration: 0.4, ease: "easeIn" },
    },
};

// ─── HERO OVERLAY TEXT ────────────────────────────────────────────────────────
export const heroOverlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.8, delay: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

// ─── STAGGER CHILDREN (dùng cho từng dòng text, section) ─────────────────────
export const fadeUpVariants: Variants = {
    initial: { opacity: 0, y: 28 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

// ─── STICKY CARD (slide từ phải vào) ─────────────────────────────────────────
export const sideCardVariants: Variants = {
    initial: { opacity: 0, x: 32 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
};

// ─── SEASON TAG (pop vào) ─────────────────────────────────────────────────────
export const tagVariants: Variants = {
    initial: { opacity: 0, scale: 0.85 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }, // spring bounce nhẹ
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// ─── MAP PAGE EXIT (khi click vào restaurant pin) ────────────────────────────
// Map thu nhỏ + fade ra, như camera zoom vào restaurant
export const mapPageVariants: Variants = {
    initial: { opacity: 0, scale: 1.02 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        transition: {
            duration: 0.55,
            ease: [0.4, 0, 0.6, 1],
        },
    },
};

// ─── SEASON PAGE ─────────────────────────────────────────────────────────────
export const seasonPageVariants: Variants = {
    initial: { opacity: 0, x: "3vw" },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        x: "-2vw",
        transition: { duration: 0.4, ease: "easeIn" },
    },
};

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
export const homePageVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
};