import styled from "styled-components"

export const DrawerOverlay = styled.button`
  position: fixed;
  inset: 0;
  border: none;
  padding: 0;
  margin: 0;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(4px);
  z-index: 1100;
  cursor: pointer;
`

export const DrawerPanel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(420px, 100vw);
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-left: 1px solid #e2e8f0;
  box-shadow: -18px 0 42px rgba(15, 23, 42, 0.16);
  z-index: 1101;
  display: flex;
  flex-direction: column;
`

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid #e2e8f0;
`

export const DrawerTitle = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
`

export const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: white;
  color: #334155;
  font-size: 18px;
  cursor: pointer;
`

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px 18px;
`

export const EmptyState = styled.div`
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  padding: 20px;
`

export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 10px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
`

export const CartImageWrap = styled.div`
  width: 86px;
  height: 108px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
`

export const CartImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  background: white;
`

export const CartMeta = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`

export const CartName = styled.p`
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
`

export const CartSub = styled.p`
  margin: 0 0 10px;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const CartPrice = styled.p`
  margin: 0 0 12px;
  color: #111827;
  font-size: 16px;
  font-weight: 800;
`

export const CartActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
`

export const QtyControl = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  overflow: hidden;
  background: white;
`

export const QtyAction = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: #f8fafc;
  color: #0f172a;
  font-size: 16px;
  cursor: pointer;
`

export const QtyCount = styled.span`
  min-width: 34px;
  text-align: center;
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
`

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: #dc2626;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`

export const DrawerFooter = styled.div`
  border-top: 1px solid #e2e8f0;
  background: rgba(255, 255, 255, 0.96);
  padding: 16px 18px 18px;
`

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`

export const SummaryLabel = styled.span`
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const SummaryValue = styled.span`
  color: #0f172a;
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
`

export const CheckoutButton = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 14px;
  background: ${p => p.$primary || "#0f172a"};
  color: white;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.14);
`
