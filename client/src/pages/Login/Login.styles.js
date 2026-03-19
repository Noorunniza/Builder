import styled from "styled-components"

export const Wrapper = styled.div`

width:350px;

`

export const Title = styled.h1`

margin-bottom:30px;

`

export const Forgot = styled.p`

font-size:13px;
margin-bottom:20px;
cursor:pointer;
text-align: right;
color: #3b82f6;

`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 25px 0;
  color: #94a3b8;
  font-size: 14px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  &::before {
    margin-right: .5em;
  }

  &::after {
    margin-left: .5em;
  }
`

export const GoogleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  > div {
    width: 100%;
  }
`

export const SignupText = styled.p`
margin-top:20px;
font-size:14px;
text-align: center;
color: #64748b;

span {
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: #3b82f6;
  }
}
`