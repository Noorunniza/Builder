import React, { useState } from "react"

import {

    Container,
    Logo,
    Menu,
    MenuItem

} from "./UserSidebar.styles"

import {

    LayoutDashboard,
    Globe,
    Sparkles,
    CreditCard

} from "lucide-react"



export default function UserSidebar() {

    const [active, setActive] = useState("Dashboard")

    const items = [

        {
            name: "Dashboard",
            icon: <LayoutDashboard size={18} />
        },

        {
            name: "Websites",
            icon: <Globe size={18} />
        },

        {
            name: "AI Builder",
            icon: <Sparkles size={18} />
        },

        {
            name: "Billing",
            icon: <CreditCard size={18} />
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

        </Container>

    )

}
