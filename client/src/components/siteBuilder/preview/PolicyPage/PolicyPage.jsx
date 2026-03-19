import React from "react"
import {
    PolicyContent, PolicyTitle, PolicyDescription,
    ContactSection, ContactCard, ContactTitle, ContactSub, ContactInput, ContactTextarea, ContactButton
} from "./PolicyPage.styles"
import { MapSection, MapIframe } from "../Footer/Footer.styles"

export default function PolicyPage({ currentPage, policy, contactData, storeName = "Store", bannerAddress = "" }) {
    const getPolicyName = (key) => {
        if (policy?.linkName) return policy.linkName
        if (policy?.title) return policy.title
        const fallbacks = { about: "About Us", terms: "Terms of Service", refund: "Refund Policy", shipping: "Shipping Policy", privacy: "Privacy Policy", contact: "Contact Us", location: "Our Location" }
        return fallbacks[key] || "Policy"
    }

    if (currentPage === "location") {
        const locationData = policy || {}
        const address = locationData.address || bannerAddress || storeName + " store"
        return (
            <ContactSection style={{ padding: "64px 24px", background: "white", width: "100%", boxSizing: "border-box" }}>
                <PolicyTitle style={{ marginBottom: "8px" }}>{locationData.title || "Our Location"}</PolicyTitle>
                <ContactSub style={{ marginBottom: "32px", fontSize: "16px" }}>{locationData.subtitle || "Visit us at our store"}</ContactSub>
                <div style={{ width: "100%", maxWidth: "800px" }}>
                    <MapIframe 
                        title="Store Location"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        loading="lazy"
                        style={{ height: "450px" }}
                    />
                </div>
            </ContactSection>
        )
    }

    if (currentPage === "contact") {
        return (
            <ContactSection style={{ padding: "64px 24px", background: "white" }}>
                <ContactCard>
                    <ContactTitle>{contactData?.title || "Contact us"}</ContactTitle>
                    <ContactSub>{contactData?.subtitle || "Have a question? We're here for you!"}</ContactSub>
                    <ContactInput placeholder={contactData?.namePlaceholder || "Name*"} />
                    <ContactInput placeholder={contactData?.emailPlaceholder || "Email*"} />
                    <ContactInput placeholder={contactData?.phonePlaceholder || "Number*"} />
                    <ContactTextarea placeholder={contactData?.messagePlaceholder || "Message*"} />
                    <ContactButton>{contactData?.buttonText || "Send"}</ContactButton>
                </ContactCard>
            </ContactSection>
        )
    }

    return (
        <PolicyContent>
            <PolicyTitle>{getPolicyName(currentPage)}</PolicyTitle>
            <PolicyDescription color={policy?.color}>
                {policy?.content || "No content provided yet."}
            </PolicyDescription>
        </PolicyContent>
    )
}
