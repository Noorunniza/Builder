import styled from "styled-components"

export const SectionsContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: white;
`

export const EditorSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e2e8f0;
  background: #f8fafc;
  max-width: 450px;
`

export const EditorContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`

export const SectionTitle = styled.h2`
  background: #0f172a;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`

export const SaveBar = styled.div`
  padding: 16px 24px;
  background: white;
  border-top: 1px solid #e2e8f0;
`

export const SaveButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1e293b;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const SubNav = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 20px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const SubNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.$active ? "#6366f1" : "#64748b"};
  cursor: pointer;
  transition: all 0.2s;
  padding: 8px 0;
  border-bottom: 2px solid ${props => props.$active ? "#6366f1" : "transparent"};

  &:hover {
    color: #4f46e5;
  }

  svg {
    color: ${props => props.$active ? "#6366f1" : "#94a3b8"};
  }
`

export const PreviewSide = styled.div`
  flex: 1.5;
  background: #e2e8f0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export const DeviceSwitcher = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 4px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  display: flex;
  gap: 4px;
  z-index: 10;
`

export const DeviceButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: none;
  background: ${p => p.$active ? "#f1f5f9" : "transparent"};
  color: ${p => p.$active ? "#0f172a" : "#64748b"};
  border-radius: 6px;
  font-size: 12px;
  font-weight: ${p => p.$active ? "600" : "500"};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
  }
`

export const PreviewFrame = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 64px 24px 24px;
`

export const PreviewViewport = styled.div`
  width: ${p => p.device === "mobile" ? "390px" : "100%"};
  max-width: ${p => p.device === "mobile" ? "390px" : "900px"};
  min-height: 500px;
  background: white;
  border-radius: ${p => p.device === "mobile" ? "24px" : "8px"};
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  transition: width 0.3s ease;
`
