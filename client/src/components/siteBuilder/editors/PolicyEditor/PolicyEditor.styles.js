import styled from "styled-components"

export const FieldGroup = styled.div`
  margin-bottom: 24px;
`

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  display: block;
  margin-bottom: 8px;
`

export const Switch = styled.button`
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background: ${props => props.$active ? "#22c55e" : "#cbd5e1"};
  border: none;
  position: relative;
  cursor: pointer;
  transition: 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$active ? "18px" : "2px"};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: 0.2s;
  }
`

export const ColorInput = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
`

export const ColorPicker = styled.input.attrs({ type: "color" })`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  &::-webkit-color-swatch-wrapper { padding: 0; }
  &::-webkit-color-swatch { border: none; border-radius: 4px; }
`

export const ColorValue = styled.span`
  font-size: 14px;
  color: #64748b;
  font-family: monospace;
  &::before {
    content: '${props => props.$color || "#000000"}';
  }
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  min-height: 200px;
  resize: vertical;
  line-height: 1.5;
  outline: none;
  &:focus { border-color: #cbd5e1; }
`

export const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 8px;
`

export const LinkNameInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #cbd5e1; }
`
