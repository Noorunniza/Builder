import styled, { css } from "styled-components"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const ProductSection = styled.div`
  padding: 4px 16px 30px;
`

export const ProductSectionTitle = styled.h3`
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  line-height: 1.15;
  
  &::after {
    content: '';
    height: 2px;
    flex-grow: 1;
    background: linear-gradient(90deg, #cbd5e1 0%, transparent 100%);
    border-radius: 2px;
  }
`

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: ${p => p.$device === "mobile" ? "repeat(2, 1fr)" : "repeat(4, 1fr)"};
  gap: ${p => p.$device === "mobile" ? "12px" : "18px"};

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`

export const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`

export const PageButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${p => p.$active ? (p.$primaryColor || "#0f172a") : "#e2e8f0"};
  background: ${p => p.$active ? (p.$primaryColor || "#0f172a") : "white"};
  color: ${p => p.$active ? "white" : "#64748b"};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${p => p.$primaryColor || "#0f172a"};
    color: ${p => p.$active ? "white" : (p.$primaryColor || "#0f172a")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const PageText = styled.span`
  font-size: 14px;
  color: #64748b;
  margin: 0 4px;
`

export const ProductCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    border-color: #cbd5e1;
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.14);
  }
`

export const ProductImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
  overflow: hidden;
  padding: 0;

  ${ProductCard}:hover & img { transform: none; }
`

export const ProductImageTag = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: center;
  transition: none;
  background: white;
  image-rendering: auto;
`

export const ProductImageEmpty = styled.div`
  width: 100%;
  height: 100%;
  border: 1px dashed #cbd5e1;
  background: repeating-linear-gradient(
    45deg,
    #f8fafc,
    #f8fafc 10px,
    #f1f5f9 10px,
    #f1f5f9 20px
  );
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProductBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(15, 23, 42, 0.92);
  color: white;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.03em;
  padding: 5px 10px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
`

export const ProductInfo = styled.div`
  padding: 12px 13px 14px;
`

export const ProductName = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  margin: 0 0 7px;
`

export const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const ProductDiscount = styled.span`
  font-size: 12px;
  color: #16a34a;
  font-weight: 700;
  background: #dcfce7;
  padding: 2px 8px;
  border-radius: 999px;
`

export const ProductOldPrice = styled.span`
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;
`

export const ProductNewPrice = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.01em;
`

export const SubcategoryFilterRow = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 14px;
  margin-bottom: 18px;
  &::-webkit-scrollbar { display: none; }
`

export const SubcategoryPill = styled.div`
  padding: 9px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  ${p => p.$active ? css`
    background: ${p.$primaryColor || "#0f172a"};
    color: white;
    border-color: ${p.$primaryColor || "#0f172a"};
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
  ` : css`
    background: #f8fafc;
    color: #334155;
    border-color: #e2e8f0;
    &:hover {
      background: #eef2f7;
      border-color: #cbd5e1;
      color: #0f172a;
    }
  `}
`

export const PrevPageIcon = styled(ChevronLeft).attrs({ size: 16 })``
export const NextPageIcon = styled(ChevronRight).attrs({ size: 16 })``
