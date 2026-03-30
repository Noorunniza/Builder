import styled, { keyframes } from "styled-components"
import { Check, Zap, Shield, ArrowRight, CreditCard, Receipt, AlertCircle } from "lucide-react"

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  padding: 32px 36px 60px;
  background: #f8fafc;
  min-height: 100%;
  animation: ${fadeUp} 0.3s ease both;

  @media (max-width: 800px) { padding: 24px 16px 48px; }
`

export const Head = styled.div`
  margin-bottom: 32px;
`

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px;
`

export const PageSub = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`

export const CurrentPlan = styled.div`
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  border-radius: 20px;
  padding: 28px 32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`

export const PlanLeft = styled.div``

export const PlanBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,.12);
  color: #c7d2fe;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 4px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
  text-transform: uppercase;
`

export const PlanName = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
`

export const PlanDesc = styled.div`
  font-size: 13px;
  color: #a5b4fc;
`

export const PlanRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  @media (max-width: 600px) { align-items: flex-start; }
`

export const UpgradeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  color: #1e1b4b;
  border: none;
  border-radius: 12px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s;

  &:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,0,0,.15); }
`

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 16px;
`

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`

export const PlanCard = styled.div`
  background: ${p => p.$highlight ? "#4f46e5" : "#fff"};
  border: 1.5px solid ${p => p.$highlight ? "#4f46e5" : "#e2e8f0"};
  border-radius: 18px;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const PopularBadge = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #f59e0b;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 3px 10px;
  border-radius: 999px;
  text-transform: uppercase;
  white-space: nowrap;
`

export const PlanTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${p => p.$light ? "#fff" : "#0f172a"};
`

export const PlanPrice = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: ${p => p.$light ? "#fff" : "#0f172a"};
  line-height: 1;

  span { font-size: 14px; font-weight: 500; opacity: 0.7; }
`

export const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
`

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${p => p.$light ? "rgba(255,255,255,.85)" : "#475569"};

  svg { flex-shrink: 0; color: ${p => p.$light ? "#a5f3fc" : "#22c55e"}; }
`

export const PlanBtn = styled.button`
  width: 100%;
  padding: 11px;
  border-radius: 10px;
  border: ${p => p.$highlight ? "none" : "1.5px solid #e2e8f0"};
  background: ${p => p.$highlight ? "#fff" : p.$current ? "#f1f5f9" : "#0f172a"};
  color: ${p => p.$highlight ? "#4f46e5" : p.$current ? "#94a3b8" : "#fff"};
  font-size: 13px;
  font-weight: 700;
  cursor: ${p => p.$current ? "default" : "pointer"};
  transition: all 0.18s;
  margin-top: auto;

  &:hover:not(:disabled) { opacity: 0.88; }
`

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
`

export const InfoCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 22px 24px;
`

export const InfoCardTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;

  &:last-child { border-bottom: none; }
`

export const InfoLabel = styled.div` color: ${p => p.$muted ? "#94a3b8" : "#64748b"}; `

export const InfoVal = styled.div`
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 6px;
`

export const GreenDot = styled.span`
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  display: inline-block;
`

export const InvoiceStatus = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #22c55e;
  background: #dcfce7;
  padding: 2px 7px;
  border-radius: 999px;
`

export const SecureNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #94a3b8;
`

export const AlertBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 14px;
  padding: 18px 20px;
  margin-bottom: 28px;
  font-size: 13px;
  color: #9a3412;

  svg { flex-shrink: 0; margin-top: 1px; color: #ea580c; }
`

export const PlanCreditIcon = styled(CreditCard).attrs({ size: 10 })``
export const UpgradeZapIcon = styled(Zap).attrs({ size: 15 })``
export const UpgradeArrowIcon = styled(ArrowRight).attrs({ size: 14 })``
export const AlertIcon = styled(AlertCircle).attrs({ size: 18 })``
export const FeatureCheckIcon = styled(Check).attrs({ size: 13 })``
export const PaymentMethodIcon = styled(CreditCard).attrs({ size: 16 })``
export const InvoiceReceiptIcon = styled(Receipt).attrs({ size: 16 })``
export const SecureShieldIcon = styled(Shield).attrs({ size: 13 })``
