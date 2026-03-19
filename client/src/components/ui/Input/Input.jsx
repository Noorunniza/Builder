import React, { useState } from "react"
import styled from "styled-components"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
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

const EyeIcon = styled.div`
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

export default function Input({ type, ...props }) {

    const [showPassword, setShowPassword] = useState(false)

    // check password field
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
                <EyeIcon
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword
                        ? <FaEyeSlash />
                        : <FaEye />
                    }
                </EyeIcon>
            )}

        </Wrapper>
    )
}
