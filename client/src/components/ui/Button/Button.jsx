import React from "react"
import styled from "styled-components"

const Btn = styled.button`

width:100%;
padding:14px;

background:#0f172a;
color:white;

border:none;
border-radius:8px;

cursor:pointer;

`

export default function Button({ children, ...rest }) {

    return <Btn {...rest}>{children}</Btn>

}
