import styled, { css } from "styled-components"

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
  grid-template-columns: ${p => p.$device === "mobile" ? "repeat(2, 1fr)" : "repeat(3, 1fr)"};
  gap: ${p => p.$device === "mobile" ? "12px" : "18px"};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`

export const ViewMoreCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  border: 1.5px dashed ${p => p.$primaryColor || "#6366f1"};
  background: ${p => p.$primaryColor
    ? `linear-gradient(160deg, ${p.$primaryColor}18 0%, ${p.$primaryColor}08 100%)`
    : "linear-gradient(160deg, #eef2ff 0%, #f8fafc 100%)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  min-height: ${p => p.$device === "mobile" ? "160px" : "250px"};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.14);
  }
`

export const ViewMoreText = styled.span`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 700;
  color: ${p => p.$primaryColor || "#6366f1"};
`

export const ProductCard = styled.div`
  position: relative;
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
  height: ${p => p.$device === "mobile" ? "170px" : "clamp(220px, 28vw, 320px)"};
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
  overflow: hidden;
  padding: 0;

  ${ProductCard}:hover & img { transform: none; }
  
  @media (max-width: 600px) {
    height: 170px;
  }
`

export const ProductImageTag = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  transition: none;
  background: #e2e8f0;
  image-rendering: auto;
`

export const ProductImageEmpty = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
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
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(3px);
`

export const ProductName = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.25;
  margin: 0 0 6px;
`

export const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const ProductDiscount = styled.span`
  font-size: 12px;
  color: #0f172a;
  font-weight: 700;
  background: #e2e8f0;
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
