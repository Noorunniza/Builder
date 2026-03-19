import React from "react"
import { Container } from "./Card.styles"

export default function Card({ title, value }) {

    return (

        <Container>

            <h4>{title}</h4>
            <h2>{value}</h2>

        </Container>

    )

}
