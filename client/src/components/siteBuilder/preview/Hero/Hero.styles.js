import styled from "styled-components"

export const HeroSection = styled.div`
  position: relative;
  min-height: clamp(420px, 72vh, 760px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 20px;
  background: ${p => p.bg || "#1e293b"};
  background-image: ${p => p.img ? `url(${p.img})` : "none"};
  background-size: cover;
  background-position: center;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: clamp(300px, 56vh, 480px);
    padding: 24px 16px;
  }
`

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${p => p.color || "#fff"};
  width: min(920px, 100%);
`

export const HeroName = styled.h2`
  font-size: clamp(34px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.08;
  margin: 0 0 10px;
`

export const HeroTagline = styled.p`
  font-size: clamp(16px, 2.4vw, 24px);
  line-height: 1.45;
  margin: 0;
  opacity: 0.85;
`
