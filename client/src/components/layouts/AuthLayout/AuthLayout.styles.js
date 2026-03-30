import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #ffffff;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #ffffff;

  @media (max-width: 900px) {
    padding: 24px;
    order: 2;
  }
`

export const Right = styled.div`
  flex: 1.2;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -10%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

export const OverlayCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 48px;
  border-radius: 24px;
  max-width: 500px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  h2 {
    color: white;
    font-size: 32px;
    line-height: 1.4;
    margin-bottom: 24px;
    font-weight: 600;
    font-style: italic;
  }
`

export const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`
