import React, { useState, useEffect } from "react"
import Marquee from "react-fast-marquee"
import { PreviewRoot, Bar, PolicyView } from "./SitePreview.styles"

import Navbar from "../Navbar/Navbar"
import Hero from "../Hero/Hero"
import Category from "../Category/Category"
import Products from "../Products/Products"
import Footer from "../Footer/Footer"
import PolicyPage from "../PolicyPage/PolicyPage"

export default function SitePreview({ device = "desktop", config, website }) {
    const h = config?.header || {}
    const b = config?.banner || {}
    const th = config?.theme || {}
    const sections = config?.sections || {}
    const activePolicy = config?.activePolicy

    const storeName = b.storeName || website?.name || "My Store"
    const tagline = b.tagline || website?.industry || ""
    const primary = th.primaryColor || "#0f172a"
    const marqueeSpeed = device === "mobile" ? 24 : 32

    const [clickedPolicy, setClickedPolicy] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [selectedSubcategory, setSelectedSubcategory] = useState("All")
    
    const currentPage = activePolicy || clickedPolicy

    // Reset subcategory when category changes
    useEffect(() => {
        setSelectedSubcategory("All")
    }, [selectedCategory])

    // Auto-scroll to top when page changes
    const previewContainerRef = React.useRef(null);
    useEffect(() => {
        // Scroll the window itself (for live viewer)
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        
        // Scroll the element itself and its scrollable parents (for dashboard preview)
        let el = previewContainerRef.current
        while (el) {
            if (typeof el.scrollTo === 'function') {
                el.scrollTo({ top: 0, behavior: 'smooth' })
            }
            el = el.parentElement
            if (!el || el === document.body || el === document.documentElement) break
        }
    }, [currentPage])

    const policy = currentPage ? sections[currentPage] : null;
    let middleContent = null;

    if (currentPage === "location") {
        const locationData = policy || {}
        const address = locationData.address || b.address || storeName + " store"
        middleContent = (
            <PolicyPage
                currentPage={currentPage}
                policy={policy}
                contactData={sections.contact || {}}
                storeName={storeName}
                bannerAddress={b.address}
            />
        )
    } else if (currentPage && policy) {
        const contactData = sections.contact || {}
        middleContent = (
            <PolicyPage
                currentPage={currentPage}
                policy={policy}
                contactData={contactData}
                storeName={storeName}
                bannerAddress={b.address}
            />
        )
    } else {
        middleContent = (
            <>
                <Hero
                    bannerConfig={b}
                    storeName={storeName}
                    tagline={tagline}
                />
                <Category 
                    categories={config?.categories || []} 
                    primaryColor={primary} 
                    selectedCategory={selectedCategory}
                    onSelectCategory={(cat) => setSelectedCategory(prev => 
                        prev && (prev._id === cat._id || prev.name === cat.name) ? null : cat
                    )}
                />
                <Products 
                    products={config?.products || []}
                    categories={config?.categories || []}
                    selectedCategory={selectedCategory}
                    selectedSubcategory={selectedSubcategory}
                    onSelectSubcategory={setSelectedSubcategory}
                    primaryColor={primary}
                    device={device}
                />
            </>
        )
    }

    return (
        <PreviewRoot ref={previewContainerRef}>
            {h.message && (
                <Bar $bg={h.bgColor} $color={h.textColor}>
                    <Marquee speed={marqueeSpeed} gradient={false} pauseOnHover>
                        {h.message}
                    </Marquee>
                </Bar>
            )}
            <Navbar
                device={device}
                headerConfig={h}
                storeName={storeName}
                currentPage={currentPage}
                primaryColor={primary}
                onGoHome={() => setClickedPolicy(null)}
                products={config?.products || []}
            />
            {middleContent}
            <Footer
                config={config}
                storeName={storeName}
                primaryColor={primary}
                currentPage={currentPage}
                onPolicyClick={setClickedPolicy}
            />
        </PreviewRoot>
    )

}

