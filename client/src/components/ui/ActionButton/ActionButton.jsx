import React from "react"
import { StyledActionButton } from "./ActionButton.styles"

export default function ActionButton({ children, ...props }) {
    return <StyledActionButton {...props}>{children}</StyledActionButton>
}
