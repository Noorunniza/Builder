import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
`

export const Illustration = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$bgColor || "transparent"};
  border-radius: 16px;
  margin-bottom: 24px;
  
  svg, img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
`

export const CardSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 24px 0;

  strong {
    font-weight: 600;
    color: #475569;
  }
`

export const ArrangeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #16a34a;
  }
  
  svg {
    width: 16px;
    height: 16px;
    stroke-width: 2.5;
  }
`

export const ProductsIllust = styled.svg.attrs({
  viewBox: "0 0 120 120",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 100%;
  height: 100%;

  circle:nth-child(1) { cx: 60; cy: 60; r: 50; fill: #e0f2fe; }
  rect:nth-child(2) { x: 35; y: 45; width: 50; height: 40; rx: 4; fill: #38bdf8; }
  path:nth-child(3) { d: path("M35 55L85 55"); stroke: #0284c7; stroke-width: 4; }
  circle:nth-child(4) { cx: 45; cy: 95; r: 5; fill: #0284c7; }
  circle:nth-child(5) { cx: 75; cy: 95; r: 5; fill: #0284c7; }
  path:nth-child(6) { d: path("M25 35L30 45"); stroke: #38bdf8; stroke-width: 4; stroke-linecap: round; }
`

export const SubcategoriesIllust = styled.svg.attrs({
  viewBox: "0 0 120 120",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 100%;
  height: 100%;

  rect:nth-child(1) { x: 20; y: 30; width: 80; height: 60; rx: 8; fill: #86efac; }
  rect:nth-child(2) { x: 30; y: 40; width: 60; height: 40; rx: 4; fill: #22c55e; }
  circle:nth-child(3) { cx: 60; cy: 60; r: 10; fill: #166534; }
`

export const CategoriesIllust = styled.svg.attrs({
  viewBox: "0 0 120 120",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
})`
  width: 100%;
  height: 100%;

  circle:nth-child(1) { cx: 60; cy: 60; r: 50; fill: #f1f5f9; }
  rect:nth-child(2) { x: 35; y: 40; width: 20; height: 40; rx: 2; fill: #f87171; }
  rect:nth-child(3) { x: 65; y: 50; width: 20; height: 30; rx: 2; fill: #ef4444; }
  path:nth-child(4) { d: path("M35 50L55 50"); stroke: #991b1b; stroke-width: 4; }
  path:nth-child(5) { d: path("M65 60L85 60"); stroke: #991b1b; stroke-width: 4; }
`
