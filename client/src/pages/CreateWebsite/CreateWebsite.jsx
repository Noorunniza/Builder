import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
// Icons are now imported from styles as styled-components

import {
    Page, Header, Logo, BackButton, Body,
    Badge, Title, Subtitle, Grid, TypeCard,
    TypeIcon, TypeName, TypeDesc, Footer, ContinueButton,
    TYPES, BackIcon, NewBadgeIcon, ContinueIcon
} from "./CreateWebsite.styles"

export default function CreateWebsite() {

    const navigate = useNavigate()
    const [selected, setSelected] = useState(null)

    const handleContinue = () => {
        if (!selected) return
        navigate("/create/store-details", { state: { websiteType: selected } })
    }

    return (
        <Page>
            <Header>
                <BackButton onClick={() => navigate("/dashboard")}>
                    <BackIcon /> Dashboard
                </BackButton>
                <Logo>✦ Builder</Logo>
            </Header>

            <Body>
                <Badge><NewBadgeIcon /> New Website</Badge>
                <Title>What are you building?</Title>
                <Subtitle>Pick a template that fits your project. You can customize everything later.</Subtitle>

                <Grid>
                    {TYPES.map(t => (
                        <TypeCard
                            key={t.key}
                            $selected={selected === t.key}
                            onClick={() => setSelected(t.key)}
                        >
                            <TypeIcon $bg={t.bg} $color={t.color}>{t.icon}</TypeIcon>
                            <TypeName>{t.name}</TypeName>
                            <TypeDesc>{t.desc}</TypeDesc>
                        </TypeCard>
                    ))}
                </Grid>

                <Footer>
                    <ContinueButton disabled={!selected} onClick={handleContinue}>
                        Continue <ContinueIcon />
                    </ContinueButton>
                </Footer>
            </Body>
        </Page>
    )
}
