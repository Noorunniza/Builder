import styled from "styled-components"

export const Container = styled.div`
  background: #ffffff;
  padding: 22px 24px;
  border-radius: 18px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  cursor: default;
  position: relative;
  overflow: hidden;
  transition: all 0.25s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0f172a, #334155);
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.14);
    border-color: #cbd5e1;

    &::before {
      opacity: 1;
    }
  }

  h4 {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #94a3b8;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1;
  }
`
