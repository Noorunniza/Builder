import styled from "styled-components"

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #f8fafc;
`

export const ContentBox = styled.div`
  background: rgba(130, 132, 136, 0.07);
  padding: 60px;
  border-radius: 24px;
  border: 2px solid #0f172a;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;
`

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
`

export const Subtitle = styled.p`
  color: #64748b;
  font-size: 16px;
  margin-bottom: 40px;
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
`

export const Input = styled.input`
  padding: 14px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #0f172a;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }

  &::placeholder {
    color: #94a3b8;
  }
`

export const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #0f172a;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    border-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }

  &::placeholder {
    color: #94a3b8;
  }
`

export const Select = styled.select`
  padding: 14px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #0f172a;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;

  &:focus {
    border-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }
`

export const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 16px 40px;
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
  }

  &:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

export const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 40px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
    transform: translateX(-3px);
  }
`

export const Badge = styled.span`
  display: inline-block;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
  text-transform: capitalize;
`

export const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin: 0;
`
