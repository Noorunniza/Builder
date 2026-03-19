import styled from "styled-components"

export const FieldGroup = styled.div`
  margin-bottom: ${props => props.$marginBottom || "20px"};
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

export const LocationCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const getSharedInputStyles = () => `
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: white;
  color: #0f172a;
  &:focus { border-color: #cbd5e1; }
`

export const EditableTitle = styled.input`
  ${getSharedInputStyles()}
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-bottom: 1px dashed #cbd5e1;
  border-radius: 0;
  padding: 8px 0;
  margin-bottom: -8px;
`

export const EditableSub = styled.input`
  ${getSharedInputStyles()}
  border: none;
  color: #64748b;
  border-bottom: 1px dashed #cbd5e1;
  border-radius: 0;
  padding: 8px 0;
`

export const EditableInput = styled.input`
  ${getSharedInputStyles()}
`
