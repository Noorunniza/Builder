import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import {

    Container,
    Logo,
    Menu,
    MenuItem,
    LogoutButton,
    DashboardIcon,
    GlobeIcon,
    SparklesIcon,
    BillingIcon,
    LogoutIcon
} from "./UserSidebar.styles"

// Icons are now imported from styles as styled-components



export default function UserSidebar({ activeTab = "Dashboard", onTabChange }) {
    const navigate = useNavigate()
    const active = activeTab
    const setActive = (name) => { if (onTabChange) onTabChange(name) }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("provider")
        navigate("/")
    }

    const items = [

        {
            name: "Dashboard",
            icon: <DashboardIcon />
        },

        {
            name: "Websites",
            icon: <GlobeIcon />
        },

        {
            name: "AI Builder",
            icon: <SparklesIcon />
        },

        {
            name: "Billing",
            icon: <BillingIcon />
        }

    ]

    return (

        <Container>

            <Logo>

                Builder

            </Logo>

            <Menu>

                {items.map(item => (

                    <MenuItem

                        key={item.name}

                        className={
                            active === item.name
                                ? "active" : ""
                        }

                        onClick={() =>
                            setActive(
                                item.name
                            )
                        }

                    >

                        {item.icon}

                        {item.name}

                    </MenuItem>

                ))}

            </Menu>

            <LogoutButton onClick={handleLogout}>
                <LogoutIcon />
                Logout
            </LogoutButton>

        </Container>

    )

}
