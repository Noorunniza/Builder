import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import CreateWebsite from "./pages/CreateWebsite/CreateWebsite"
import StoreDetails from "./pages/StoreDetails/StoreDetails"
import SiteDashboard from "./pages/SiteDashboard/SiteDashboard"
import PublicSiteViewer from "./pages/publicSite/PublicSiteViewer"

import { GlobalStyle } from "./styles/GlobalStyles"

export default function App() {

    return (

        <BrowserRouter>

            <GlobalStyle />

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/create" element={<CreateWebsite />} />

                <Route path="/create/store-details" element={<StoreDetails />} />

                <Route path="/dashboard/site/:id" element={<SiteDashboard />} />

                <Route path="/live/:subdomain" element={<PublicSiteViewer />} />

            </Routes>

        </BrowserRouter>

    )

}
