import React from "react"
import {
    Container,
    Left,
    Right,
    OverlayCard,
    SubTitle
} from "./AuthLayout.styles"

export default function AuthLayout({ children }) {

    return (

        <Container>

            <Left>

                {children}

            </Left>

            <Right>

                <OverlayCard>

                    <h2>

                        "Where great ideas turn into powerful beginnings"

                    </h2>

                    <SubTitle>

                        Tungston Labs

                    </SubTitle>

                </OverlayCard>

            </Right>

        </Container>

    )

}
