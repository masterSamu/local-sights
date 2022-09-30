import { logEvent, getAnalytics } from "firebase/analytics"

const analytics = getAnalytics();

/**
 * Log login events for analytics
 * @param {string} uid 
 */
export const logLogin = (uid) => {
    logEvent(analytics, "logged_in", {
        uid
    })
}