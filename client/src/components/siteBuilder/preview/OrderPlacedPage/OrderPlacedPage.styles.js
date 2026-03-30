import styled from "styled-components"

export const SuccessWrap = styled.section`
  min-height: 70vh;
  padding: 36px 16px 52px;
  background:
    radial-gradient(circle at top center, rgba(34, 197, 94, 0.12), transparent 26%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
`

export const SuccessContainer = styled.div`
  max-width: 980px;
  margin: 0 auto;
`

export const SuccessCard = styled.div`
  border: 1px solid #dcfce7;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 22px 48px rgba(15, 23, 42, 0.08);
  padding: 34px 28px;
  text-align: center;
`

export const SuccessBadge = styled.div`
  width: 74px;
  height: 74px;
  border-radius: 999px;
  margin: 0 auto 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #dcfce7 0%, #bbf7d0 100%);
  color: #166534;
  font-size: 34px;
  font-weight: 900;
`

export const SuccessTitle = styled.h2`
  margin: 0 0 10px;
  color: #0f172a;
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 900;
  letter-spacing: -0.03em;
`

export const SuccessText = styled.p`
  max-width: 620px;
  margin: 0 auto 12px;
  color: #475569;
  font-size: 16px;
  line-height: 1.65;
`

export const OrderId = styled.p`
  margin: 0 auto 22px;
  color: #0f172a;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const SummaryBox = styled.div`
  max-width: 680px;
  margin: 0 auto 24px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background: #f8fafc;
  padding: 18px;
`

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: ${p => p.$last ? "none" : "1px solid #e2e8f0"};
`

export const SummaryLabel = styled.span`
  color: ${p => p.$strong ? "#0f172a" : "#64748b"};
  font-size: ${p => p.$strong ? "16px" : "14px"};
  font-weight: ${p => p.$strong ? "800" : "700"};
`

export const SummaryValue = styled.span`
  color: #0f172a;
  font-size: ${p => p.$strong ? "22px" : "15px"};
  font-weight: ${p => p.$strong ? "900" : "800"};
  letter-spacing: -0.02em;
`

export const ContinueButton = styled.button`
  min-width: 220px;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: ${p => p.$primary || "#0f172a"};
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.14);
`
