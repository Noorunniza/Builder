import React from "react"
import { useNavigate } from "react-router-dom"
import { googleLogout } from "@react-oauth/google"
import { Container, WelcomeText, LogoutBtn } from "./Topbar.styles"

export default function Topbar({ user }) {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("provider")
        googleLogout()
        navigate("/")
    }

    return (
        <Container>
            <WelcomeText>
                Welcome back, <span>{user?.name || user?.email}</span> 👋
            </WelcomeText>
            <LogoutBtn onClick={handleLogout}>
                Logout
            </LogoutBtn>
        </Container>
    )
}
