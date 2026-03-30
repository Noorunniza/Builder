import React, { useCallback, useEffect, useRef, useState } from "react"
import {
    DesktopNavWrapper, NavLogoContainer, DesktopNavIcons, MobileNavWrapper, NavTop, MenuIconWrapper, LogoContainer,
    CartContainer, NavLogo, NavLogoPlaceholder, CartWrapper, CartBadge, StyledNavIcon, StyledCartIcon, StyledMenuIcon,
    DesktopSearchBar, DesktopSearchContainer, Spacer, SearchBarContainer, MobileSearchBar, DEFAULT_PRIMARY_COLOR
} from "./Navbar.styles"
import NavbarSearch from "./NavbarSearch"

export default function Navbar({ device, headerConfig, storeName, currentPage, primaryColor, onGoHome, onCartClick, products = [], cartCount = 0 }) {
    const header = headerConfig || {}
    const primary = primaryColor || DEFAULT_PRIMARY_COLOR
    const [query, setQuery] = useState("")
    const [focused, setFocused] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const wrapperRef = useRef(null)
    const results = query.trim().length < 1 ? [] : products.filter(product => {
        const name = (product.name || "").toLowerCase()
        const category = (product.categoryName || (typeof product.category === "object" ? product.category?.name : product.category) || "").toLowerCase()
        const value = query.toLowerCase()
        return name.includes(value) || category.includes(value)
    }).slice(0, 8)
    const showDropdown = focused && query.trim().length > 0

    useEffect(() => {
        const handleClick = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFocused(false)
                setActiveIndex(-1)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleKeyDown = useCallback(event => {
        if (!showDropdown) return
        if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex(index => Math.min(index + 1, results.length - 1)) }
        if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex(index => Math.max(index - 1, 0)) }
        if (event.key === "Escape") { setFocused(false); setActiveIndex(-1); setQuery("") }
    }, [showDropdown, results.length])

    const renderLogo = () => header.logo ? <NavLogo src={header.logo} alt="logo" /> : <NavLogoPlaceholder>{storeName?.[0]?.toUpperCase() || "S"}</NavLogoPlaceholder>
    const searchProps = { wrapperRef, primary, focused, query, results, activeIndex, setActiveIndex, onChange: event => { setQuery(event.target.value); setActiveIndex(-1) }, onFocus: value => setFocused(typeof value === "boolean" ? value : true), onKeyDown: handleKeyDown, onClear: () => { setQuery(""); setActiveIndex(-1) } }

    return (
        <>
            <DesktopNavWrapper $device={device}>
                <NavLogoContainer>{renderLogo()}</NavLogoContainer>
                {!currentPage ? <NavbarSearch ContainerComponent={DesktopSearchContainer} BarComponent={DesktopSearchBar} {...searchProps} /> : <Spacer />}
                <DesktopNavIcons><StyledNavIcon onClick={onGoHome} /><CartWrapper onClick={onCartClick}><StyledCartIcon /><CartBadge $bg={primary}>{cartCount}</CartBadge></CartWrapper></DesktopNavIcons>
            </DesktopNavWrapper>

            <MobileNavWrapper $device={device}>
                <NavTop>
                    <MenuIconWrapper onClick={onGoHome}><StyledMenuIcon /></MenuIconWrapper>
                    <LogoContainer>{renderLogo()}</LogoContainer>
                    <CartContainer><CartWrapper onClick={onCartClick}><StyledCartIcon $mobile /><CartBadge $bg={primary}>{cartCount}</CartBadge></CartWrapper></CartContainer>
                </NavTop>
                {!currentPage && <NavbarSearch ContainerComponent={SearchBarContainer} BarComponent={MobileSearchBar} {...searchProps} />}
            </MobileNavWrapper>
        </>
    )
}
