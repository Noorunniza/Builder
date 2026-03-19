import styled from "styled-components"

export const DesignLayout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #f1f5f9;
`

/* ── Left Editor Panel ─────────────────── */

export const EditorSide = styled.div`
  width: 360px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-right: 1.5px solid #e2e8f0;
  overflow: hidden;
`

export const EditorTopbar = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 4px;
  border-bottom: 1.5px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
`

export const EditorTab = styled.button`
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  background: none;
  border: none;
  border-bottom: 3px solid ${p => p.$active ? "#0f172a" : "transparent"};
  color: ${p => p.$active ? "#0f172a" : "#94a3b8"};
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: #0f172a;
  }
`

export const EditorBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
`

export const SaveBar = styled.div`
  padding: 14px 20px;
  border-top: 1.5px solid #e2e8f0;
  background: white;
  flex-shrink: 0;
  display: flex;
  gap: 10px;
`

export const SaveButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(15,23,42,0.2);
  }

  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

/* ── Right Preview Panel ───────────────── */

export const PreviewSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #e5e7eb;
`

export const PreviewToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: white;
  border-bottom: 1.5px solid #e2e8f0;
  flex-shrink: 0;
`

export const DeviceButton = styled.button`
  padding: 6px 14px;
  border-radius: 8px;
  border: 1.5px solid ${p => p.$active ? "#0f172a" : "#e2e8f0"};
  background: ${p => p.$active ? "#0f172a" : "white"};
  color: ${p => p.$active ? "white" : "#64748b"};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: #0f172a;
    color: ${p => p.$active ? "white" : "#0f172a"};
  }
`

export const PreviewFrame = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 24px;
`

export const PreviewViewport = styled.div`
  width: ${p => p.$device === "mobile" ? "390px" : "100%"};
  max-width: ${p => p.$device === "mobile" ? "390px" : "900px"};
  min-height: 600px;
  background: white;
  border-radius: ${p => p.$device === "mobile" ? "24px" : "8px"};
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  transition: width 0.3s ease;
`
