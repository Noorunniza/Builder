import styled, { keyframes } from "styled-components"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  padding: 20px 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  background: #fff;
`

export const Logo = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
`

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 0;
  margin-right: 20px;
  transition: color 0.18s;
  &:hover { color: #0f172a; }
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px 80px;
  animation: ${fadeUp} 0.35s ease both;
`

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ede9fe;
  color: rgba(37, 36, 38, 0.73);
  font-size: 12px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 18px;
  letter-spacing: 0.3px;
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;
  text-align: center;
  margin: 0 0 10px;
  letter-spacing: -0.8px;

  @media (max-width: 640px) { font-size: 26px; }
`

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 15px;
  text-align: center;
  margin: 0 0 48px;
  max-width: 440px;
  line-height: 1.6;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  width: 100%;
  max-width: 720px;

  @media (max-width: 760px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr 1fr; gap: 10px; }
`

export const TypeCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 18px 20px;
  border-radius: 14px;
  border: 1.5px solid ${p => p.$selected ? "#6366f1" : "#e2e8f0"};
  background: ${p => p.$selected ? "#eef2ff" : "#fff"};
  cursor: pointer;
  transition: all 0.18s;
  text-align: left;
  box-shadow: ${p => p.$selected ? "0 0 0 3px rgba(99,102,241,.15)" : "none"};

  &:hover {
    border-color: ${p => p.$selected ? "#6366f1" : "#cbd5e1"};
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(15,23,42,.07);
  }
`

export const TypeIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: ${p => p.$bg || "#ede9fe"};
  color: ${p => p.$color || "#7c3aed"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`

export const TypeName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
`

export const TypeDesc = styled.div`
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  line-height: 1.4;
`

export const Footer = styled.div`
  width: 100%;
  max-width: 720px;
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
`

export const ContinueButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 13px 30px;
  background: ${p => p.disabled ? "#e2e8f0" : "linear-gradient(135deg, #1f1e20ff, #373739ff)"};
  color: ${p => p.disabled ? "#94a3b8" : "#fff"};
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: ${p => p.disabled ? "not-allowed" : "pointer"};
  transition: all 0.2s;
  box-shadow: ${p => p.disabled ? "none" : "0 4px 14px rgba(99,102,241,.3)"};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(99,102,241,.35);
  }

  @media (max-width: 480px) { width: 100%; justify-content: center; }
`

// Legacy stubs so old imports don't break
export const Container = Page
export const ContentBox = Body

export const TYPES = [
    {
        key: "online-store",
        name: "Online Store",
        desc: "Sell products online",
        icon: "🛍️",
        bg: "#dbeafe",
        color: "#1d4ed8"
    },
    {
        key: "restaurant",
        name: "Restaurant",
        desc: "Menu, orders & delivery",
        icon: "🍽️",
        bg: "#fef3c7",
        color: "#92400e"
    },
    {
        key: "portfolio",
        name: "Portfolio",
        desc: "Showcase your work",
        icon: "🎨",
        bg: "#ede9fe",
        color: "#6d28d9"
    },
    {
        key: "blog",
        name: "Blog",
        desc: "Share your thoughts",
        icon: "✍️",
        bg: "#dcfce7",
        color: "#15803d"
    },
    {
        key: "booking",
        name: "Booking",
        desc: "Appointments & services",
        icon: "📅",
        bg: "#fce7f3",
        color: "#9d174d"
    },
    {
        key: "business",
        name: "Business",
        desc: "Present your company",
        icon: "🏢",
        bg: "#e0f2fe",
        color: "#0369a1"
    }
]

export const BackIcon = styled(ArrowLeft).attrs({ size: 14 })``
export const NewBadgeIcon = styled(Sparkles).attrs({ size: 12 })``
export const ContinueIcon = styled(ArrowRight).attrs({ size: 15 })``
