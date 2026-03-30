import React from "react"
import { Btn } from "./Button.styles"

export default function Button({ children, ...rest }) {
    return <Btn {...rest}>{children}</Btn>
}
