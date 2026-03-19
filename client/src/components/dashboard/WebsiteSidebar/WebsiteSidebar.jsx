import React from "react"
import { useNavigate } from "react-router-dom"

import {
    Container,
    Menu,
    MenuItem,
    Logo
} from "./WebsiteSidebar.styles"

import {
    Home,
    Paintbrush,
    Layers,
    ShoppingBag,
    ShoppingCart,
    BarChart3,
    Settings,
    BookOpen,
    Utensils,
    CalendarDays,
    Globe
} from "lucide-react"

const navByType = {
    "online-store": [
        { name: "Home", icon: <Home size={18} /> },
        { name: "Design", icon: <Paintbrush size={18} /> },
        { name: "Sections", icon: <Layers size={18} /> },
        { name: "Products", icon: <ShoppingBag size={18} /> },
        { name: "Orders", icon: <ShoppingCart size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> }
    ],
    "portfolio": [
        { name: "Home", icon: <Home size={18} /> },
        { name: "Design", icon: <Paintbrush size={18} /> },
        { name: "Sections", icon: <Layers size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> }
    ],
    "blog": [
        { name: "Home", icon: <Home size={18} /> },
        { name: "Design", icon: <Paintbrush size={18} /> },
        { name: "Posts", icon: <BookOpen size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> }
    ],
    "restaurant": [
        { name: "Home", icon: <Home size={18} /> },
        { name: "Design", icon: <Paintbrush size={18} /> },
        { name: "Menu", icon: <Utensils size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> }
    ],
    "booking": [
        { name: "Home", icon: <Home size={18} /> },
        { name: "Design", icon: <Paintbrush size={18} /> },
        { name: "Bookings", icon: <CalendarDays size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> }
    ],
    "business": [
        { name: "Home", icon: <Home size={18} /> },
        { name: "Design", icon: <Paintbrush size={18} /> },
        { name: "Sections", icon: <Layers size={18} /> },
        { name: "Domain", icon: <Globe size={18} /> },
        { name: "Analytics", icon: <BarChart3 size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> }
    ]
}

export default function WebsiteSidebar({ type, activeTab, onTabChange, storeName }) {

    const items = navByType[type] || navByType["business"]

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

        </Container>

    )

}
