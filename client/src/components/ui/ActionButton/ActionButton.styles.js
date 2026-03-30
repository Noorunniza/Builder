import styled from "styled-components"

export const StyledActionButton = styled.button`
  padding: 12px 22px;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0);
    transition: background 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.35);

    &::after {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
  }
`
