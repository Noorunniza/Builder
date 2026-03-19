import React from "react"
import { useNavigate } from "react-router-dom"
import { googleLogout } from "@react-oauth/google"
import { LogoutButton } from "./Logout.styles"

export default function Logout() {

    const navigate = useNavigate()

    const handleLogout = () => {

        // remove JWT
        localStorage.removeItem("token")

        // remove provider (if stored)
        localStorage.removeItem("provider")

        // logout google session safely
        googleLogout()

        // redirect to login
        navigate("/")
    }

    return (
        <LogoutButton onClick={handleLogout}>
            Logout
        </LogoutButton>
    )
}

