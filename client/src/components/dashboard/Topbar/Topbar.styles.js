import styled from "styled-components"

export const Container = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  position: sticky;
  top: 0;
  z-index: 10;
`

export const WelcomeText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;

  span {
    color: #0f172a;
    font-weight: 700;
  }
`

export const LogoutBtn = styled.button`
  background: none;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`
