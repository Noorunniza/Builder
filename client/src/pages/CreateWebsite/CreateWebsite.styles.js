import styled from "styled-components"

export const Container = styled.div`
  min-height:100vh;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  padding:40px 20px;
  background:#f8fafc;
`

export const ContentBox = styled.div`
  background:rgba(130, 132, 136, 0.07);
  padding: 60px;
  border-radius: 24px;
  border: 2px solid #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  max-width: 850px;
  width: 100%;
`

export const Title = styled.h1`
  font-size:32px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom:12px;
`

export const Subtitle = styled.p`
  color:#64748b;
  font-size: 16px;
  margin-bottom:48px;
  text-align: center;
`

export const Grid = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
  gap:20px;
  width: 100%;
  max-width: 600px;
`

export const ContinueButton = styled.button`
  margin-top:40px;
  padding:16px 40px;
  background:${props => props.disabled ? "#e2e8f0" : "#0f172a"};
  color:${props => props.disabled ? "#94a3b8" : "white"};
  border:none;
  border-radius:12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  cursor:${props => props.disabled ? "not-allowed" : "pointer"};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
  }
`

export const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 40px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
    transform: translateX(-3px);
  }
`

