import styled from "styled-components"

export const PreviewRoot = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: white;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
`

export const Bar = styled.div`
  background: ${p => p.$bg || "#000"};
  color: ${p => p.$color || "#fff"};
  text-align: center;
  padding: 16px 0;
  min-height: 56px;
  display: flex;
  align-items: center;
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.08);
  overflow: hidden;
`

export const PolicyView = styled.div`
  background: white;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`

export const DEFAULT_PRIMARY_COLOR = "#0f172a"
