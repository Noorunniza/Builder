import styled from "styled-components"

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #f1f5f9;

  @media (max-width: 900px) {
    flex-direction: column;
    overflow: visible;
  }
`

export const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    overflow: visible;
  }
`

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  @media (max-width: 900px) {
    overflow: visible;
  }
`
