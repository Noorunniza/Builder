import styled from "styled-components"

export const Layout = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #f1f5f9;
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Main = styled.main`
  flex: 1;
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
`
