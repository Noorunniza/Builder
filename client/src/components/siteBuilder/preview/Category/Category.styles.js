import styled from "styled-components"

export const CategoryRow = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 20px;
  overflow-x: auto;
  &::-webkit-scrollbar { display: none; }
`

export const CategoryPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: transform 0.18s ease, opacity 0.18s ease;
  opacity: ${p => p.$opacity !== undefined ? p.$opacity : 1};
  &:hover {
    transform: translateY(-2px);
  }
`

export const CategoryCircle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${p => p.$all ? p.$primaryColor : (p.$hasImage ? "#f8fafc" : p.$primaryColor || "#0f172a")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${p => p.$all ? "13px" : "20px"};
  font-weight: ${p => p.$all ? "800" : "normal"};
  border: 2px solid ${p => p.$hasImage ? "#e2e8f0" : (p.$primaryColor || "#0f172a")};
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  color: #fff;
`

export const CategoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

export const CategoryName = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 600;
  text-align: center;
  max-width: 96px;
  line-height: 1.25;
`

export const DEFAULT_PRIMARY_COLOR = "#0f172a"
