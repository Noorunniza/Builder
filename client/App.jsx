import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Dashboard from "./pages/dashboard/Dashboard"

import { GlobalStyle } from "./styles/GlobalStyles"

export default function App() {

    return (

        <BrowserRouter>

            <GlobalStyle />

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

               

            </Routes>

        </BrowserRouter>

    )

}