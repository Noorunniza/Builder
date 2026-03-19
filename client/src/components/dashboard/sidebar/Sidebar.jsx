import React from "react"
import { Container, Logo, MenuItem } from "./Sidebar.styles"

export default function Sidebar() {

    return (

        <Container>

            <Logo>Builder</Logo>

            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Websites</MenuItem>
            <MenuItem>AI Builder</MenuItem>
            <MenuItem>Domains</MenuItem>
            <MenuItem>Analytics</MenuItem>
            <MenuItem>Orders</MenuItem>
            <MenuItem>Billing</MenuItem>

        </Container>

    )

}
