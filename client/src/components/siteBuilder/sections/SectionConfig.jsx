// Icons are now imported from styles as styled-components
import React from "react"
import {
    DEFAULT_TEXT_COLOR,
    AboutIcon, PrivacyIcon, ShippingIcon, RefundIcon, TermsIcon, ContactIcon, LocationIcon
} from "./SectionConfig.styles"

export const SECTIONS = [
    { id: "about", name: "About Us", icon: <AboutIcon /> },
    { id: "privacy", name: "Privacy Policy", icon: <PrivacyIcon /> },
    { id: "shipping", name: "Shipping Policy", icon: <ShippingIcon /> },
    { id: "refund", name: "Refund Policy", icon: <RefundIcon /> },
    { id: "terms", name: "Terms of Service", icon: <TermsIcon /> },
    { id: "contact", name: "Contact Us", icon: <ContactIcon /> },
    { id: "location", name: "Location", icon: <LocationIcon /> }
]

export const DEFAULT_SECTIONS = {
    about: {
        show: true, color: DEFAULT_TEXT_COLOR, content:
            `Welcome to our store! We are committed to providing the best products.
Our team works hard to maintain quality. Customer satisfaction is our priority. 
We believe in trust and transparency. Thank you for choosing us! We continue to
innovate and improve every day. Our mission is to create lasting value for our customers.
We aim to build strong relationships through honesty and care. Your trust inspires us to keep growing.`
    },
    privacy: {
        show: true, color: DEFAULT_TEXT_COLOR, content:
            `Your privacy is important to us. We do not share your personal information with third parties. All data you provide is securely stored. We use your information only to improve our services. Your details will not be sold or rented. Access to your data is limited to authorized staff only. We implement strong security measures to protect your information. Cookies may be used only to enhance your browsing experience. You have full control over your personal information. By using our services, you agree to this privacy policy.`
    },
    shipping: {
        show: true, color: DEFAULT_TEXT_COLOR, content:
            `Orders are shipped within 3–5 business days. Delivery times may vary based on location. We process orders promptly to ensure timely delivery. Tracking information will be provided once your order is shipped. Shipping charges may apply depending on your order and location. We are not responsible for delays caused by couriers. International deliveries may take longer due to customs clearance. Customers are responsible for providing accurate shipping details. In case of failed delivery, we will attempt re-shipment if possible. Our goal is to deliver your order safely and on time.`
    },
    refund: {
        show: true, color: DEFAULT_TEXT_COLOR, content:
            `We accept returns within 7 days of delivery. The item must be unused and in original packaging. Proof of purchase is required for all returns. Refunds will be processed to the original payment method. Shipping costs for returns may be the responsibility of the customer. Damaged or defective items will be replaced at no extra charge. Certain items may not be eligible for return due to hygiene reasons. Refund processing may take 5–10 business days. Customers must contact our support team before returning an item. Our goal is to ensure your complete satisfaction with every purchase.`
    },
    terms: {
        show: true, color: DEFAULT_TEXT_COLOR, content:
            `By using our store, you agree to our terms and conditions. Please read them carefully. All users must comply with applicable laws while using our services. Unauthorized use of our platform is strictly prohibited. We reserve the right to update these terms at any time. Continued use of our store means acceptance of the updated terms. Users are responsible for maintaining the confidentiality of their accounts. We are not liable for losses caused by misuse of our services. Any disputes will be handled under the applicable laws of our jurisdiction. By accessing our services, you accept full responsibility for your actions.`
    },
    contact: {
        show: true,
        title: "Contact us",
        subtitle: "Have a question? We're here for you!",
        buttonText: "Send",
        namePlaceholder: "Name*",
        emailPlaceholder: "Email*",
        phonePlaceholder: "Number*",
        messagePlaceholder: "Message*"
    },
    location: {
        show: true,
        title: "Our Location",
        subtitle: "Visit us at our store",
        address: ""
    }
}

const PLACEHOLDERS = [
    "Your about us content...",
    "Your privacy policy content...",
    "Your shipping policy content...",
    "Your refund policy content...",
    "Your terms of service content...",
    "Standard privacy policy text...",
    "Contact us information...",
]

/** Merge saved DB sections with defaults, ignoring stale placeholder values */
export function initSections(existing = {}) {
    const merged = { ...DEFAULT_SECTIONS }
    Object.keys(DEFAULT_SECTIONS).forEach(key => {
        const item = existing[key]
        if (key === "contact" && item) {
            merged[key] = { ...DEFAULT_SECTIONS.contact, ...item }
            return
        }
        if (key === "location" && item) {
            merged[key] = { ...DEFAULT_SECTIONS.location, ...item }
            return
        }

        if (item && item.content) {
            const trimmed = item.content.trim()
            const isPlaceholder =
                trimmed === "" ||
                trimmed.length < 50 ||
                PLACEHOLDERS.some(p => p.toLowerCase() === trimmed.toLowerCase())
            if (!isPlaceholder) {
                merged[key] = item
            }
        }
    })
    return merged
}
