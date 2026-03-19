import styled from "styled-components"
import { ChevronDown, ChevronUp } from "lucide-react"

/* ── Section ─── */
export const SectionBox = styled.div`
  margin-bottom: 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
`

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: ${p => p.open ? "#f8fafc" : "white"};
  cursor: pointer;
  transition: background 0.15s;
  user-select: none;
  &:hover { background: #f8fafc; }
`

export const HeadingText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
`

export const IconUp = styled(ChevronUp)`
  color: #94a3b8;
  width: 16px;
  height: 16px;
`

export const IconDown = styled(ChevronDown)`
  color: #94a3b8;
  width: 16px;
  height: 16px;
`

export const DropdownContent = styled.div`
  padding: ${p => p.open ? "16px" : "0 16px"};
  max-height: ${p => p.open ? "600px" : "0"};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: white;
  border-top: ${p => p.open ? "1.5px solid #f1f5f9" : "none"};
`

/* ── Field ─── */
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const InputBox = styled.input`
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #0f172a;
  background: white;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: #6366f1; }
  &::placeholder { color: #cbd5e1; }
`

/* ── Color ─── */
export const ColorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ColorPicker = styled.input.attrs({ type: "color" })`
  width: 40px;
  height: 40px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 2px;
  cursor: pointer;
  background: white;
  &::-webkit-color-swatch-wrapper { padding: 0; }
  &::-webkit-color-swatch { border-radius: 6px; border: none; }
`

export const HexText = styled.span`
  font-size: 13px;
  color: #64748b;
  font-family: monospace;
`

/* ── Upload ─── */
export const ImageUploadArea = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1.5px dashed #cbd5e1;
  border-radius: 10px;
  cursor: pointer;
  background: #f8fafc;
  transition: border-color 0.2s;
  &:hover { border-color: #6366f1; }
  input { display: none; }
`

export const PreviewImg = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`

export const EmptyImage = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`

export const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const MainText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
`

export const SubText = styled.span`
  font-size: 11px;
  color: #94a3b8;
`
