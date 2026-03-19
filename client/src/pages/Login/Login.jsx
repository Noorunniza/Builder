import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"

import AuthLayout from "../../components/layouts/AuthLayout/AuthLayout"
import Input from "../../components/ui/Input/Input"
import Button from "../../components/ui/Button/Button"
import api from "../../services/api"
import { validateLogin } from "../../utils/authValidation"

import {
    Wrapper,
    Title,
    Forgot,
    Divider,
    GoogleButtonWrapper,
    SignupText
} from "./Login.styles"

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async () => {
        const error = validateLogin({ email, password })
        if (error) { alert(error); return }
        try {
            setLoading(true)
            const res = await api.post("/auth/login", { email, password })
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("provider", "local")
            navigate("/dashboard")
        } catch (err) {
            alert(err.response?.data?.message || "Login Failed")
        } finally {
            setLoading(false)
        }
    }

    const googleLoginSuccess = async credentialResponse => {
        try {
            const res = await api.post("/auth/google", { token: credentialResponse.credential })
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("provider", "google")
            navigate("/dashboard")
        } catch (err) {
            alert("Google Login Failed")
        }
    }

    return (
        <AuthLayout>
            <Wrapper>
                <Title>Welcome Back</Title>
                <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Forgot>Forgot password?</Forgot>
                <Button onClick={login}>{loading ? "Logging in..." : "Login"}</Button>
                <Divider>Or continue with</Divider>
                <GoogleButtonWrapper>
                    <GoogleLogin
                        onSuccess={googleLoginSuccess}
                        onError={() => { alert("Google Login Failed") }}
                    />
                </GoogleButtonWrapper>
                <SignupText>
                    Don&apos;t have an account?
                    <span onClick={() => navigate("/register")}>Sign Up</span>
                </SignupText>
            </Wrapper>
        </AuthLayout>
    )
}