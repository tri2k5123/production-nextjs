export const animateContentAbout = delay => ({
    hidden: { x: -150, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay }
    }
})
export const animateImageAbout = delay => ({
    hidden: { x: 300, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 1, delay }
    }
})
export const containerPromoSection = delay => ({
    hidden: { x: -150, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: delay },
    },
});
