import styled from "styled-components"

/* â”€â”€ Social Banner â”€â”€â”€ */
export const SocialBanner = styled.div`
  background: ${p => p.bg || "#0f172a"};
  color: white;
  padding: 40px 32px;
  text-align: center;
`

export const SocialTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
`

export const SocialSub = styled.p`
  font-size: 16px;
  opacity: 0.6;
  margin-bottom: 14px;
`

export const SocialIcons = styled.div`
  display: flex;
  gap: 18px;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 26px;
    height: 26px;
    cursor: pointer;
    transition: all 0.25s ease;

    /* ðŸ”¥ brightness effect */
    filter: brightness(1.15) saturate(1.2);

    /* slight shadow glow */
    drop-shadow: 0 0 6px rgba(0,0,0,0.15);
  }

  img:hover, svg:hover {
    transform: scale(1.15);

    /* more bright on hover */
    filter: brightness(1.35) saturate(1.4);

    /* premium glow */
    drop-shadow: 0 4px 10px rgba(0,0,0,0.25);
  }
`

/* â”€â”€ Footer Links â”€â”€â”€ */
export const FooterLinks = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  border-top: 1px solid #f1f5f9;
`

export const FooterLink = styled.span`
  font-size: 15px;
  color: ${p => p.$active ? (p.$primary || "#0f172a") : "#64748b"};
  font-weight: ${p => p.$active ? "700" : "normal"};
  cursor: pointer;
  &:hover { color: ${p => p.$primary || "#0f172a"}; text-decoration: underline; }
`

export const Copyright = styled.div`
  background: ${p => p.bg || "#0f172a"};
  color: ${p => p.color || "#94a3b8"};
  text-align: center;
  padding: 16px;
  font-size: 13px;
`

/* â”€â”€ Contact Form â”€â”€â”€ */
export const ContactSection = styled.div`
  background: white;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ContactCard = styled.div`
  background: #0a0a0a;
  border-radius: 16px;
  padding: 32px 28px;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const ContactTitle = styled.h3`
  font-size: 28px;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 6px;
`

export const ContactSub = styled.p`
  font-size: 16px;
  color: #94a3b8;
  text-align: center;
  margin-bottom: 12px;
`

export const ContactInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1.5px solid #d1d5db;
  background: white;
  color: #0f172a;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;

  &::placeholder { color: #94a3b8; }
  &:focus { border-color: #64748b; }
`

export const ContactTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1.5px solid #d1d5db;
  background: white;
  color: #0f172a;
  font-size: 15px;
  outline: none;
  resize: none;
  min-height: 100px;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder { color: #475569; }
`

export const ContactButton = styled.button`
  width: 100%;
  padding: 14px;
  background: white;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
`

/* â”€â”€ Map Section â”€â”€â”€ */
export const StyledAddressIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  svg { width: 18px; height: 18px; }
`

export const MapSection = styled.div`
  background: #0f172a;
  padding: 20px 16px 0;
`

export const AddressBox = styled.div`
  background: white;
  border-radius: 10px;
  padding: 16px 24px;
  text-align: center;
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 24px;
`

export const MapIframe = styled.iframe`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  border: none;
`
