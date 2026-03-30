import React from "react"
import { useNavigate } from "react-router-dom"

import {
    Container,
    Menu,
    MenuItem,
    Logo,
    LogoutButton,
    HomeIcon,
    DesignIcon,
    SectionsIcon,
    ProductsIcon,
    OrdersIcon,
    AnalyticsIcon,
    SettingsIcon,
    PostsIcon,
    MenuIcon,
    BookingsIcon,
    DomainIcon,
    LogoutIcon
} from "./WebsiteSidebar.styles"

const navByType = {
    "online-store": [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Design", icon: <DesignIcon /> },
        { name: "Sections", icon: <SectionsIcon /> },
        { name: "Products", icon: <ProductsIcon /> },
        { name: "Orders", icon: <OrdersIcon /> },
        { name: "Analytics", icon: <AnalyticsIcon /> },
        { name: "Settings", icon: <SettingsIcon /> }
    ],
    "portfolio": [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Design", icon: <DesignIcon /> },
        { name: "Sections", icon: <SectionsIcon /> },
        { name: "Analytics", icon: <AnalyticsIcon /> },
        { name: "Settings", icon: <SettingsIcon /> }
    ],
    "blog": [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Design", icon: <DesignIcon /> },
        { name: "Posts", icon: <PostsIcon /> },
        { name: "Analytics", icon: <AnalyticsIcon /> },
        { name: "Settings", icon: <SettingsIcon /> }
    ],
    "restaurant": [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Design", icon: <DesignIcon /> },
        { name: "Menu", icon: <MenuIcon /> },
        { name: "Analytics", icon: <AnalyticsIcon /> },
        { name: "Settings", icon: <SettingsIcon /> }
    ],
    "booking": [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Design", icon: <DesignIcon /> },
        { name: "Bookings", icon: <BookingsIcon /> },
        { name: "Analytics", icon: <AnalyticsIcon /> },
        { name: "Settings", icon: <SettingsIcon /> }
    ],
    "business": [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Design", icon: <DesignIcon /> },
        { name: "Sections", icon: <SectionsIcon /> },
        { name: "Domain", icon: <DomainIcon /> },
        { name: "Analytics", icon: <AnalyticsIcon /> },
        { name: "Settings", icon: <SettingsIcon /> }
    ]
}

export default function WebsiteSidebar({ type, activeTab, onTabChange, storeName }) {
    const navigate = useNavigate()

    const items = navByType[type] || navByType["business"]

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("provider")
        navigate("/")
    }

    return (

        <Container>

            <Logo>{storeName || "My Store"}</Logo>

            <Menu>

                {items.map(item => (

                    <MenuItem
                        key={item.name}
                        className={activeTab === item.name ? "active" : ""}
                        onClick={() => onTabChange(item.name)}
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
