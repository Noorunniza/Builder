import React, { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Wrapper, StyledInput, EyeIcon } from "./Input.styles"

export default function Input({ type, ...props }) {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === "password"

    return (
        <Wrapper>
            <StyledInput
                type={
                    isPassword
                        ? (showPassword ? "text" : "password")
                        : type
                }
                {...props}
            />
            {isPassword && (
                <EyeIcon onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </EyeIcon>
            )}
        </Wrapper>
    )
}
