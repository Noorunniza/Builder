import React from "react"
import Topbar from "../../dashboard/Topbar/Topbar"

import {

    Layout,
    Content,
    Main

} from "./DashboardLayout.styles"

export default function DashboardLayout({

    SidebarComponent,
    user,
    children

}) {

    return (

        <Layout>

            <SidebarComponent />

            <Content>

                <Topbar user={user} />

                <Main>

                    {children}

                </Main>

            </Content>

        </Layout>

    )

}
