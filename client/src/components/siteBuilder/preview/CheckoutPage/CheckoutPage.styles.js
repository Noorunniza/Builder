import styled from "styled-components"

export const CheckoutWrap = styled.section`
  padding: 28px 16px 44px;
  background:
    radial-gradient(circle at top right, rgba(148, 163, 184, 0.12), transparent 26%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
`

export const CheckoutContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`

export const CheckoutBack = styled.button`
  border: none;
  background: transparent;
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
`

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: ${p => {
    if (p.$device === "mobile") return "1fr"
    if (String(p.$columns || "2") === "1") return "1fr"
    return "minmax(0, 1.1fr) minmax(340px, 0.9fr)"
  }};
  gap: 20px;
  align-items: start;
`

export const CheckoutCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  padding: 24px;
`

export const CheckoutTitle = styled.h2`
  margin: 0 0 8px;
  color: #0f172a;
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 800;
  letter-spacing: -0.03em;
`

export const CheckoutSub = styled.p`
  margin: 0 0 20px;
  color: #64748b;
  font-size: 15px;
  line-height: 1.55;
`

export const SectionTitle = styled.h3`
  margin: 0 0 12px;
  color: #0f172a;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.01em;
`

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const FullWidth = styled.div`
  margin-bottom: 16px;
`

export const Label = styled.label`
  display: block;
  color: #334155;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
`

export const Input = styled.input`
  width: 100%;
  height: 46px;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  background: white;
  color: #0f172a;
  padding: 0 14px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #94a3b8;
    box-shadow: 0 0 0 4px rgba(148, 163, 184, 0.14);
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border: 1px solid #cbd5e1;
  border-radius: 14px;
  background: white;
  color: #0f172a;
  padding: 12px 14px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #94a3b8;
    box-shadow: 0 0 0 4px rgba(148, 163, 184, 0.14);
  }
`

export const ShippingRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0 12px;
`

export const ShippingOption = styled.button`
  width: 100%;
  border: 1px solid ${p => p.$active ? (p.$primary || "#0f172a") : "#cbd5e1"};
  background: ${p => p.$active ? `${p.$primary || "#0f172a"}12` : "white"};
  border-radius: 16px;
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  text-align: left;
`

export const ShippingMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ShippingName = styled.span`
  color: #0f172a;
  font-size: 14px;
  font-weight: 800;
`

export const ShippingHint = styled.span`
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
`

export const ShippingPrice = styled.span`
  color: #0f172a;
  font-size: 14px;
  font-weight: 800;
`

export const SectionNote = styled.p`
  margin: 0 0 18px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
`

export const PaymentRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const PaymentOption = styled.button`
  border: 1px solid ${p => p.$active ? (p.$primary || "#0f172a") : "#cbd5e1"};
  background: ${p => p.$active ? `${p.$primary || "#0f172a"}12` : "white"};
  color: #0f172a;
  border-radius: 14px;
  padding: 14px 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`

export const PlaceOrderButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: ${p => p.$primary || "#0f172a"};
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.14);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const ErrorText = styled.p`
  margin: 0 0 14px;
  color: #b91c1c;
  font-size: 13px;
  font-weight: 600;
`

export const OrderCard = styled(CheckoutCard)`
  @media (min-width: 900px) {
    position: sticky;
    top: 18px;
  }
`

export const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 18px;
`

export const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 68px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 16px;
  padding: 10px;
`

export const SummaryImage = styled.img`
  width: 68px;
  height: 84px;
  object-fit: contain;
  object-position: center;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
`

export const SummaryMeta = styled.div`
  min-width: 0;
`

export const SummaryName = styled.p`
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
`

export const SummaryQty = styled.p`
  margin: 0 0 4px;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const SummaryPrice = styled.p`
  margin: 0;
  color: #111827;
  font-size: 15px;
  font-weight: 800;
`

export const Totals = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const TotalLabel = styled.div`
  color: ${p => p.$strong ? "#0f172a" : "#64748b"};
  font-size: ${p => p.$strong ? "15px" : "14px"};
  font-weight: ${p => p.$strong ? 800 : 600};
`

export const TotalValue = styled.div`
  color: #0f172a;
  font-size: ${p => p.$strong ? "18px" : "14px"};
  font-weight: ${p => p.$strong ? 800 : 700};
`
