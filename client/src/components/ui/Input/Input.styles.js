import styled from "styled-components"

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px;
  padding-right: 45px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;

  /* Hide the native eye icon in Microsoft Edge */
  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }
`

export const EyeIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 40%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #777;
  display: flex;
  align-items: center;

  &:hover {
    color: #000;
  }
`
