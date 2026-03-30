import styled, { css, keyframes } from "styled-components"
import { createElement } from "react"
import { 
    DollarSign, ShoppingCart, TrendingUp, Package, BarChart2,
    Clock, CheckCircle, Truck, PackageCheck, XCircle
} from "lucide-react"

export const STATUS_COLORS = {
    pending: "#f59e0b",
    confirmed: "#6366f1",
    shipped: "#3b82f6",
    delivered: "#22c55e",
    cancelled: "#ef4444"
}

export const PAYMENT_COLORS = {
    cod: "#8b5cf6",
    card: "#0ea5e9",
    upi: "#f97316"
}

export const DEFAULT_GRAY = "#94a3b8"


export const RevenueIcon = styled(DollarSign).attrs({ size: 20 })``
export const OrdersIcon = styled(ShoppingCart).attrs({ size: 20 })``
export const AvgValueIcon = styled(TrendingUp).attrs({ size: 20 })``
export const ProductsIcon = styled(Package).attrs({ size: 20 })``
export const ChartTitleIcon = styled(BarChart2).attrs({ size: 16 })``

const IconMap = {
    pending: Clock,
    confirmed: CheckCircle,
    shipped: Truck,
    delivered: PackageCheck,
    cancelled: XCircle
}

export const StatusIcon = ({ type, size = 12 }) => {
    const Icon = IconMap[type] || XCircle
    return createElement(Icon, { size })
}


const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  padding: 24px 28px 48px;
  background: #f8fafc;
  min-height: 100%;
  animation: ${fadeUp} 0.32s ease;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`

export const TitleBlock = styled.div``
export const Title = styled.h1`
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 22px;
  font-weight: 800;
`
export const Subtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 14px;
`

export const RangeGroup = styled.div`
  display: flex;
  gap: 6px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 5px;
`

export const RangeBtn = styled.button`
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  background: ${p => p.$active ? "#4f46e5" : "transparent"};
  color: ${p => p.$active ? "#fff" : "#64748b"};

  &:hover {
    background: ${p => p.$active ? "#4f46e5" : "#f1f5f9"};
    color: ${p => p.$active ? "#fff" : "#0f172a"};
  }
`

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`

export const KpiCard = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,.08);
    transform: translateY(-2px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #4f46e5;
    ${p => p.$variant === "orders" && css`background: #0ea5e9;`}
    ${p => p.$variant === "avg" && css`background: #10b981;`}
    ${p => p.$variant === "products" && css`background: #f97316;`}
    border-radius: 18px 18px 0 0;
  }
`

export const KpiIconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  background: #ede9fe;
  color: #6d28d9;

  ${p => p.$variant === "orders" && css`background: #e0f2fe; color: #0369a1;`}
  ${p => p.$variant === "avg" && css`background: #d1fae5; color: #065f46;`}
  ${p => p.$variant === "products" && css`background: #ffedd5; color: #c2410c;`}
`

export const KpiLabel = styled.div`
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
`

export const KpiValue = styled.div`
  color: #0f172a;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
`

export const KpiSub = styled.div`
  color: #94a3b8;
  font-size: 12px;
  margin-top: 6px;
`

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1000px) { grid-template-columns: 1fr; }
`

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 22px;
`

export const CardTitle = styled.div`
  color: #0f172a;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 20px;
`

// Bar chart pieces
export const BarChartWrap = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 140px;
`

export const BarCol = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 100%;
  justify-content: flex-end;
`

export const Bar = styled.div`
  width: 100%;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
  height: ${p => p.$pct || 0}%;
  min-height: ${p => p.$pct > 0 ? 3 : 0}px;
  transition: height 0.4s ease;
  position: relative;

  &:hover::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: #0f172a;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
    padding: 4px 8px;
    border-radius: 6px;
    pointer-events: none;
    z-index: 10;
  }
`

export const BarLabel = styled.div`
  color: #94a3b8;
  font-size: 9px;
  font-weight: 700;
  text-align: center;
`

// Donut-like distribution list
export const DistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const DistRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DistDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${p => p.$color};
  flex-shrink: 0;
`

export const DistLabel = styled.div`
  flex: 1;
  color: #334155;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
`

export const DistBar = styled.div`
  flex: 2;
  height: 8px;
  border-radius: 999px;
  background: #f1f5f9;
  overflow: hidden;

  div {
    height: 100%;
    border-radius: 999px;
    background: ${p => p.$color};
    width: ${p => p.$pct || 0}%;
    transition: width 0.5s ease;
  }
`

export const DistCount = styled.div`
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  min-width: 28px;
  text-align: right;
`

// Bottom row
export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`

export const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  transition: background 0.15s;

  &:hover { background: #f1f5f9; }
`

export const Rank = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${p => p.$top ? "linear-gradient(135deg,#f59e0b,#d97706)" : "#e2e8f0"};
  color: ${p => p.$top ? "#fff" : "#64748b"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  flex-shrink: 0;
`

export const ProductImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
  background: #e2e8f0;
  flex-shrink: 0;
`

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const ProductName = styled.div`
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ProductMeta = styled.div`
  color: #94a3b8;
  font-size: 11px;
  margin-top: 2px;
`

export const ProductRevenue = styled.div`
  color: #0f172a;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
`

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
  border: 2px dashed #e2e8f0;
  border-radius: 16px;
`

export const InfoText = styled.p`
  color: ${p => p.$error ? "#b91c1c" : "#64748b"};
  font-size: 14px;
  font-weight: ${p => p.$error ? 700 : 400};
`

export const DistIconWrap = styled.span`
  & > svg {
    margin-right: 4px;
    vertical-align: middle;
  }
`

export const TitleIconWrap = styled.span`
  & > svg {
    margin-right: 8px;
    vertical-align: middle;
  }
`
