import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import SelectCard from "../../components/ui/SelectCard/SelectCard"

import {
    Container,
    ContentBox,
    Title,
    Subtitle,
    Grid,
    ContinueButton,
    BackButton
} from "./CreateWebsite.styles"

export default function CreateWebsite() {

    const navigate = useNavigate()

    const [selected, setSelected] = useState(null)

    const types = [
        "online-store",
        "portfolio",
        "blog",
        "restaurant",
        "booking",
        "business"
    ]

    const handleContinue = () => {
        if (!selected) return
        navigate("/create/store-details", { state: { websiteType: selected } })
    }

    return (

        <Container>

            <BackButton onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </BackButton>

            <ContentBox>

                <Title>Create a New Website</Title>

                <Subtitle>
                    Choose the type of website you want to build
                </Subtitle>

                <Grid>

                    {types.map(type => (

                        <SelectCard
                            key={type}
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                            selected={selected === type}
                            onClick={() => setSelected(type)}
                        />

                    ))}

                </Grid>

                <ContinueButton
                    disabled={!selected}
                    onClick={handleContinue}
                >
                    Continue
                </ContinueButton>

            </ContentBox>

        </Container>

    )

}
