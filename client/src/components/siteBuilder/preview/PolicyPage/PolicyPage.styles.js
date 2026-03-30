import styled from "styled-components"

export const PolicyView = styled.div`
  background: white;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

export const PolicyHeader = styled.div`
  background: #000;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

export const PolicyContent = styled.div`
  padding: 48px 24px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`

export const PolicyTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: ${p => p.$mb || "24px"};
  text-align: center;
`

export const PolicyDescription = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${p => p.color || "#334155"};
  white-space: pre-wrap;
  text-align: justify;
`

export const ContactSection = styled.div`
  background: ${p => p.$bg || "white"};
  padding: ${p => p.$padding || "32px 24px"};
  display: flex;
  flex-direction: column;
  align-items: center;
  ${p => p.$fullWidth && `
    width: 100%;
    box-sizing: border-box;
  `}
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
  font-size: 20px;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 2px;
`

export const ContactSub = styled.p`
  font-size: ${p => p.$fz || "13px"};
  color: #94a3b8;
  text-align: center;
  margin-bottom: ${p => p.$mb || "6px"};
`

export const MapWrapper = styled.div`
  width: 100%;
  max-width: 800px;
`

export const ContactInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid #d1d5db;
  background: white;
  color: #0f172a;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;

  &::placeholder { color: #94a3b8; }
  &:focus { border-color: #64748b; }
`

export const ContactTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1.5px solid #d1d5db;
  background: white;
  color: #0f172a;
  font-size: 13px;
  outline: none;
  resize: none;
  min-height: 70px;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder { color: #475569; }
`

export const ContactButton = styled.button`
  width: 100%;
  padding: 13px;
  background: white;
  color: #0a0a0a;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 4px;
  transition: opacity 0.2s;

  &:hover { opacity: 0.9; }
`
