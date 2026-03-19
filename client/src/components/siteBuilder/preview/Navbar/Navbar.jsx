import React, { useState, useRef, useEffect, useCallback } from "react"
import { Search, ShoppingCart, Home, Menu, X } from "lucide-react"

import {
    DesktopNavWrapper, NavLogoContainer, DesktopNavIcons,
    MobileNavWrapper, NavTop, MenuIconWrapper, LogoContainer, CartContainer, SearchBarContainer, MobileSearchBar,
    NavLogo, NavLogoPlaceholder, CartWrapper, CartBadge, SearchInput,
    StyledSearchIcon, StyledNavIcon, StyledCartIcon, StyledMenuIcon,
    DesktopSearchBar,
    SearchDropdown, SearchDropdownHeader, SearchResultItem, SearchResultImage,
    SearchResultMeta, SearchResultName, SearchResultSub, SearchResultPrice, SearchNoResults
} from "./Navbar.styles"

export default function Navbar({ device, headerConfig, storeName, currentPage, primaryColor, onGoHome, products = [] }) {
    const h = headerConfig || {}
    const primary = primaryColor || "#0f172a"

    const [query, setQuery] = useState("")
    const [focused, setFocused] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const wrapperRef = useRef(null)

    // Filter products based on query
    const results = query.trim().length < 1 ? [] : products.filter(p => {
        const name = (p.name || "").toLowerCase()
        const cat = (p.categoryName || (typeof p.category === "object" ? p.category?.name : p.category) || "").toLowerCase()
        const q = query.toLowerCase()
        return name.includes(q) || cat.includes(q)
    }).slice(0, 8)

    const showDropdown = focused && query.trim().length > 0

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setFocused(false)
                setActiveIndex(-1)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    const handleKeyDown = useCallback((e) => {
        if (!showDropdown) return
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setActiveIndex(i => Math.min(i + 1, results.length - 1))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setActiveIndex(i => Math.max(i - 1, 0))
        } else if (e.key === "Escape") {
            setFocused(false)
            setActiveIndex(-1)
            setQuery("")
        }
    }, [showDropdown, results.length])

    const handleChange = (e) => {
        setQuery(e.target.value)
        setActiveIndex(-1)
    }

    const handleClear = () => {
        setQuery("")
        setActiveIndex(-1)
    }

    const dropdown = showDropdown && (
        <SearchDropdown>
            {results.length > 0 ? (
                <>
                    <SearchDropdownHeader>
                        {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                    </SearchDropdownHeader>
                    {results.map((p, idx) => {
                        const cat = p.categoryName || (typeof p.category === "object" ? p.category?.name : p.category) || ""
                        return (
                            <SearchResultItem
                                key={p._id || p.name}
                                $highlighted={idx === activeIndex}
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => { setFocused(false); setQuery("") }}
                            >
                                <SearchResultImage>
                                    {p.image ? <img src={p.image} alt={p.name} /> : "📦"}
                                </SearchResultImage>
                                <SearchResultMeta>
                                    <SearchResultName>{p.name}</SearchResultName>
                                    {cat && <SearchResultSub>{cat}</SearchResultSub>}
                                </SearchResultMeta>
                                <SearchResultPrice>₹{p.offerPrice || p.price}</SearchResultPrice>
                            </SearchResultItem>
                        )
                    })}
                </>
            ) : (
                <SearchNoResults>
                    No products found for &ldquo;<strong>{query}</strong>&rdquo;
                </SearchNoResults>
            )}
        </SearchDropdown>
    )

    return (
        <>
            {/* ── Desktop Navbar ─── */}
            <DesktopNavWrapper $device={device}>
                <NavLogoContainer>
                    {h.logo
                        ? <NavLogo src={h.logo} alt="logo" />
                        : <NavLogoPlaceholder>{storeName?.[0]?.toUpperCase() || "S"}</NavLogoPlaceholder>
                    }
                </NavLogoContainer>

                {!currentPage ? (
                    <div ref={wrapperRef} style={{ position: "relative", flex: 1, maxWidth: "480px" }}>
                        <DesktopSearchBar $focused={focused} $primary={primary}>
                            <StyledSearchIcon><Search /></StyledSearchIcon>
                            <SearchInput
                                type="text"
                                placeholder="Search for products..."
                                value={query}
                                onChange={handleChange}
                                onFocus={() => setFocused(true)}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                            />
                            {query && (
                                <div style={{ cursor: "pointer", color: "#94a3b8", display: "flex" }} onClick={handleClear}>
                                    <X size={16} />
                                </div>
                            )}
                        </DesktopSearchBar>
                        {dropdown}
                    </div>
                ) : <div style={{ flex: 1 }} />}

                <DesktopNavIcons>
                    <StyledNavIcon onClick={onGoHome}><Home /></StyledNavIcon>
                    <CartWrapper>
                        <StyledCartIcon><ShoppingCart /></StyledCartIcon>
                        <CartBadge $bg={primary}>0</CartBadge>
                    </CartWrapper>
                </DesktopNavIcons>
            </DesktopNavWrapper>

            {/* ── Mobile Navbar ─── */}
            <MobileNavWrapper $device={device}>
                <NavTop>
                    <MenuIconWrapper onClick={onGoHome}>
                        <StyledMenuIcon><Menu /></StyledMenuIcon>
                    </MenuIconWrapper>
                    <LogoContainer>
                        {h.logo
                            ? <NavLogo src={h.logo} alt="logo" />
                            : <NavLogoPlaceholder>{storeName?.[0]?.toUpperCase() || "S"}</NavLogoPlaceholder>
                        }
                    </LogoContainer>
                    <CartContainer>
                        <CartWrapper>
                            <StyledCartIcon $mobile><ShoppingCart /></StyledCartIcon>
                            <CartBadge $bg={primary}>0</CartBadge>
                        </CartWrapper>
                    </CartContainer>
                </NavTop>
                {!currentPage && (
                    <SearchBarContainer ref={wrapperRef}>
                        <MobileSearchBar $focused={focused} $primary={primary}>
                            <StyledSearchIcon><Search /></StyledSearchIcon>
                            <SearchInput
                                type="text"
                                placeholder="Search products..."
                                value={query}
                                onChange={handleChange}
                                onFocus={() => setFocused(true)}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                            />
                            {query && (
                                <div style={{ cursor: "pointer", color: "#94a3b8", display: "flex" }} onClick={handleClear}>
                                    <X size={16} />
                                </div>
                            )}
                        </MobileSearchBar>
                        {dropdown}
                    </SearchBarContainer>
                )}
            </MobileNavWrapper>
        </>
    )
}
