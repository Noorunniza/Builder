import styled, { keyframes } from "styled-components"
import { Copy, Check, ExternalLink, Globe, Lock } from "lucide-react"

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  padding: 40px;
  animation: ${fadeIn} 0.3s ease;
`

export const Greeting = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 4px;
`

export const StoreId = styled.p`
  font-size: 13px;
  color: #94a3b8;
  margin-bottom: 36px;
`

export const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 16px;
  margin-top: ${p => p.$marginTop || '0'};
`

export const UrlBox = styled.div`
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`

export const UrlInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const UrlLabel = styled.span`
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
`

export const UrlLink = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: #6366f1;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`

export const StatCard = styled.div`
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
`

export const CardIcon = styled.div`
  font-size: 28px;
  margin-bottom: 4px;
`

export const CardLabel = styled.span`
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
`

export const CardValue = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
`

export const CardSub = styled.span`
  font-size: 12px;
  color: #cbd5e1;
`

export const PublishButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: ${({ $live }) => $live ? "#f1f5f9" : "linear-gradient(135deg, #6366f1, #8b5cf6)"};
  color: ${({ $live }) => $live ? "#64748b" : "#fff"};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 20px;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $live }) => $live ? "#dcfce7" : "#fef3c7"};
  color: ${({ $live }) => $live ? "#16a34a" : "#a16207"};
  margin-left: 12px;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $live }) => $live ? "#16a34a" : "#a16207"};
    animation: ${({ $live }) => $live ? "pulse 1.5s ease-in-out infinite" : "none"};
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`

export const CheckIcon = styled(Check).attrs({ size: 16 })``
export const CopyIcon = styled(Copy).attrs({ size: 16 })``
export const VisitIcon = styled(ExternalLink).attrs({ size: 16 })``
export const DraftIcon = styled(Lock).attrs({ size: 16 })``
export const LiveIcon = styled(Globe).attrs({ size: 16 })``
