import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import AuthLayout from "../../components/layouts/AuthLayout/AuthLayout"
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import api from "../../services/api"
import { validateRegister } from "../../utils/authValidation"

import {
    Wrapper,
    Title,
    Subtitle,
    Divider,
    GoogleButtonWrapper,
    LoginText
} from "./Register.styles"

export default function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const register = async () => {
        const error = validateRegister({ email, password, confirmPassword })
        if (error) { alert(error); return }
        await api.post("/auth/register", { email, password })
        navigate("/")
    }

    return (
        <AuthLayout>
            <Wrapper>
                <Title>Create Account</Title>
                <Subtitle>Start building your website today.</Subtitle>
                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <Button onClick={register}>Sign Up</Button>
                <Divider>Or continue with</Divider>
                <GoogleButtonWrapper>
                    <GoogleLogin
                        onSuccess={async credentialResponse => {
                            const res = await api.post("/auth/google", { token: credentialResponse.credential })
                            localStorage.setItem("token", res.data.token)
                            navigate("/dashboard")
                        }}
                        onError={() => { alert("Google Login Failed") }}
                    />
                </GoogleButtonWrapper>
                <LoginText>
                    Already have an account? <span onClick={() => navigate("/")}>Login</span>
                </LoginText>
            </Wrapper>
        </AuthLayout>
    )
}