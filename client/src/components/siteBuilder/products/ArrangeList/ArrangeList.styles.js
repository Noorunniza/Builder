import styled from "styled-components"

export const ArrangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`

export const SubTitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0;
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${p => p.$isDragging ? "#eef2ff" : "white"};
  border: 1px solid ${p => p.$isDragging ? "#6366f1" : "#e2e8f0"};
  border-radius: 8px;
  opacity: ${p => p.$isDragging ? 0.7 : 1};
  transform: ${p => p.$isDragging ? "scale(1.02)" : "scale(1)"};
  box-shadow: ${p => p.$isDragging ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" : "none"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: grab;
  position: relative;
  z-index: ${p => p.$isDragging ? 10 : 1};

  &:active {
    cursor: grabbing;
  }
  
  &:hover {
    border-color: ${p => p.$isDragging ? "#6366f1" : "#cbd5e1"};
    background: ${p => p.$isDragging ? "#eef2ff" : "#f8fafc"};
  }
`

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: grab;
`

export const ItemContent = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
`

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`

export const PrimaryButton = styled.button`
  padding: 10px 20px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.85; }
`

export const SecondaryButton = styled.button`
  padding: 10px 20px;
  background: white;
  color: #64748b;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { 
    background: #f8fafc;
    color: #0f172a; 
  }
`
