import React from "react"
import { HeroSection, HeroOverlay, HeroContent, HeroName, HeroTagline } from "./Hero.styles"

export default function Hero({ bannerConfig, storeName, tagline }) {
    const b = bannerConfig || {}

    return (
        <HeroSection bg={b.bgColor} img={b.bgImage}>
            {b.bgImage && <HeroOverlay />}
            <HeroContent color={b.textColor}>
                <HeroName>{storeName}</HeroName>
                {tagline && <HeroTagline>{tagline}</HeroTagline>}
            </HeroContent>
        </HeroSection>
    )
}
