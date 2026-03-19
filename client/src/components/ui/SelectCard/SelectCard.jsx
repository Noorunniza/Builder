import React from "react"
import styled from "styled-components"

const Card = styled.div`
  background:white;
  padding:30px;
  border-radius:16px;
  box-shadow:0 5px 20px rgba(0,0,0,0.05);
  cursor:pointer;
  border:${props => props.selected ? "2px solid #0f172a" : "2px solid transparent"};
  transition:0.2s;

  &:hover{
    transform:translateY(-3px);
  }
`

export default function SelectCard({ title, selected, onClick }) {

    return (
        <Card selected={selected} onClick={onClick}>
            <h3>{title}</h3>
        </Card>
    )

}
