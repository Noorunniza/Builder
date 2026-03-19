import React from "react"
import { MapPin } from "lucide-react"

import fbIcon from "../../../../assets/socialmedia/facebook.png"
import igIcon from "../../../../assets/socialmedia/instagram.svg"
import ytIcon from "../../../../assets/socialmedia/youtube.png"

import {
    SocialBanner, SocialTitle, SocialSub, SocialIcons,
    ContactSection, ContactCard, ContactTitle, ContactSub, ContactInput, ContactTextarea, ContactButton,
    MapSection, AddressBox, MapIframe,
    FooterLinks, FooterLink, Copyright, StyledAddressIcon
} from "./Footer.styles"

const BASE_FOOTER_KEYS = ["home", "about", "terms", "refund", "shipping", "privacy"]

export default function Footer({ config, storeName, primaryColor, currentPage, onPolicyClick }) {
    const h = config?.header || {}
    const s = config?.social || {}
    const f = config?.footer || {}
    const b = config?.banner || {}
    const sections = config?.sections || {}
    const contactData = sections.contact || {}
    const locationData = sections.location || {}
    const address = locationData.address || b.address || storeName + " store"
    const primary = primaryColor || "#0f172a"

    const handleFooterClick = (key) => {
        if (key === "home") onPolicyClick(null)
        else onPolicyClick(key)
    }

    const footerLinksToRender = BASE_FOOTER_KEYS.map(key => {
        if (key === "home") return { key: "home", label: "Home", show: true }
        const sec = sections[key] || {}
        return {
            key,
            label: sec.linkName || sec.title || (key === "about" ? "About Us" : key === "contact" ? "Contact Us" : key + " policy"),
            show: sec.show !== false
        }
    }).filter(link => link.show)

    return (
        <>
            <SocialBanner>
                <SocialTitle>{h.message || "Connect with us"}</SocialTitle>
                <SocialSub>Follow us on social media</SocialSub>
                <SocialIcons>
                    {s.instagram && <a href={s.instagram} target="_blank" rel="noreferrer"><img src={igIcon} alt="Instagram" style={{width: '24px', height: '24px', objectFit: 'contain', borderRadius: '4px'}} /></a>}
                    {s.facebook && <a href={s.facebook} target="_blank" rel="noreferrer"><img src={fbIcon} alt="Facebook" style={{width: '24px', height: '24px', objectFit: 'contain'}} /></a>}
                    {s.youtube && <a href={s.youtube} target="_blank" rel="noreferrer"><img src={ytIcon} alt="YouTube" style={{width: '24px', height: '24px', objectFit: 'contain'}} /></a>}
                    {!s.instagram && !s.facebook && !s.youtube && (
                        <>
                            <img src={igIcon} alt="Instagram" style={{width: '24px', height: '24px', objectFit: 'contain', borderRadius: '4px', opacity: 0.5}} />
                            <img src={fbIcon} alt="Facebook" style={{width: '24px', height: '24px', objectFit: 'contain', opacity: 0.5}} />
                            <img src={ytIcon} alt="YouTube" style={{width: '24px', height: '24px', objectFit: 'contain', opacity: 0.5}} />
                        </>
                    )}
                </SocialIcons>
            </SocialBanner>

            {contactData.show !== false && (
                <ContactSection>
                    <ContactCard>
                        <ContactTitle>{contactData.title || "Contact us"}</ContactTitle>
                        <ContactSub>{contactData.subtitle || "Have a question? We're here for you!"}</ContactSub>
                        <ContactInput placeholder={contactData.namePlaceholder || "Name*"} />
                        <ContactInput placeholder={contactData.emailPlaceholder || "Email*"} />
                        <ContactInput placeholder={contactData.phonePlaceholder || "Number*"} />
                        <ContactTextarea placeholder={contactData.messagePlaceholder || "Message*"} />
                        <ContactButton>{contactData.buttonText || "Send"}</ContactButton>
                    </ContactCard>
                </ContactSection>
            )}

            <MapSection>
                <AddressBox>
                    <StyledAddressIcon><MapPin /></StyledAddressIcon>
                    {address !== (storeName + " store") ? address : "Add your store address in Settings"}
                </AddressBox>
                <MapIframe 
                    title="Store Location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    loading="lazy"
                />
            </MapSection>

            <FooterLinks>
                {footerLinksToRender.map(link => (
                    <FooterLink
                        key={link.key}
                        onClick={() => handleFooterClick(link.key)}
                        $active={currentPage === link.key}
                        $primary={primary}
                    >
                        {link.label}
                    </FooterLink>
                ))}
            </FooterLinks>

            <Copyright bg={f.bgColor} color="#94a3b8">
                {f.copyright || `© 2026 ${storeName}. All rights reserved.`}
            </Copyright>
        </>
    )
}
