import styled from "styled-components"
import { LayoutDashboard, Globe, Sparkles, CreditCard, LogOut } from "lucide-react"

export const Container = styled.div`
  width: 250px;
  flex-shrink: 0;
  min-height: 100vh;
  background: linear-gradient(180deg, #020617, #0f172a);
  color: white;
  padding: 30px 18px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255,255,255,.06);
  box-shadow: 10px 0 30px rgba(0,0,0,.25);

  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
    padding: 18px 14px;
    box-shadow: 0 10px 24px rgba(0,0,0,.16);
  }
`

export const Logo = styled.h2`
  margin-bottom: 50px;
  font-weight: 700;
  letter-spacing: .5px;
  color: white;
  -webkit-background-clip: text;

  @media (max-width: 900px) {
    margin-bottom: 16px;
    font-size: 20px;
  }
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 4px;
  }
`

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: .25s ease;
  font-size: 15px;
  opacity: .85;
  white-space: nowrap;

  &:hover {
    opacity: 1;
    background: hsla(0, 0%, 100%, 0.12);
    transform: translateX(6px);
  }

  &.active {
    opacity: 1;
    background: linear-gradient(90deg, hsla(200, 10%, 71%, 0.53), rgba(99,102,241,.2));
    border-left: 3px solid rgba(245, 248, 249, 1);
  }

  @media (max-width: 900px) {
    font-size: 14px;
    padding: 10px 12px;

    &:hover {
      transform: none;
    }
  }
`

export const LogoutButton = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
  color: #fca5a5;
  border: 1px solid rgba(252, 165, 165, 0.1);
  background: rgba(252, 165, 165, 0.03);

  &:hover {
    background: rgba(252, 165, 165, 0.1);
    color: #ef4444;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
  }

  @media (max-width: 900px) {
    margin-top: 16px;
    padding: 10px 12px;
    font-size: 14px;
  }
`

export const DashboardIcon = styled(LayoutDashboard).attrs({ size: 18 })``
export const GlobeIcon = styled(Globe).attrs({ size: 18 })``
export const SparklesIcon = styled(Sparkles).attrs({ size: 18 })``
export const BillingIcon = styled(CreditCard).attrs({ size: 18 })``
export const LogoutIcon = styled(LogOut).attrs({ size: 18 })``

