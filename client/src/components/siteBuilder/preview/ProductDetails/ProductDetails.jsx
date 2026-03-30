import React, { useMemo, useState } from "react"
import {
    DetailsWrap, DetailsContainer, BackButton, MainGrid,
    MediaCard, MediaImage, MediaPlaceholder,
    InfoCard, ProductTitle, ProductMeta, PriceRow, CurrentPrice, OldPrice, SaveBadge,
    Description, ActionRow, QtyWrap, QtyBtn, QtyVal, AddBtn, AddedNote,
    SimilarSection, SimilarTitle, SimilarGrid, SimilarCard, SimilarImage, SimilarInfo, SimilarName, SimilarPrice
} from "./ProductDetails.styles"

const getCategoryName = (p) => p?.categoryName || (typeof p?.category === "object" ? p?.category?.name : p?.category) || "General"

const toNumber = (v) => Number(v) || 0

const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(toNumber(amount))

export default function ProductDetails({ product, products = [], primaryColor, device = "desktop", onAddToCart, onBack, onSelectProduct }) {
    const [qty, setQty] = useState(1)
    const [added, setAdded] = useState(false)

    const basePrice = toNumber(product?.price)
    const offerPrice = toNumber(product?.offerPrice)
    const isOnOffer = offerPrice > 0 && offerPrice < basePrice
    const finalPrice = isOnOffer ? offerPrice : basePrice
    const categoryName = getCategoryName(product)

    const similarProducts = useMemo(() => {
        return products.filter(p => {
            if (!p || p === product) return false
            return getCategoryName(p) === categoryName
        }).slice(0, 8)
    }, [products, product, categoryName])

    const handleAddToCart = () => {
        onAddToCart?.(product, qty)
        setAdded(true)
    }

    return (
        <DetailsWrap>
            <DetailsContainer>
                <BackButton onClick={onBack}>Back to products</BackButton>

                <MainGrid $device={device}>
                    <MediaCard>
                        {product?.image
                            ? <MediaImage src={product.image} alt={product?.name || "Product image"} />
                            : <MediaPlaceholder>No Image</MediaPlaceholder>
                        }
                    </MediaCard>

                    <InfoCard>
                        <ProductMeta>{categoryName}</ProductMeta>
                        <ProductTitle>{product?.name || "Product"}</ProductTitle>

                        <PriceRow>
                            <CurrentPrice>{formatINR(finalPrice)}</CurrentPrice>
                            {isOnOffer && <OldPrice>{formatINR(basePrice)}</OldPrice>}
                            {isOnOffer && <SaveBadge>Save {Math.round(((basePrice - offerPrice) / basePrice) * 100)}%</SaveBadge>}
                        </PriceRow>

                        <Description>
                            {product?.description || "Premium quality product crafted for daily comfort and style."}
                        </Description>

                        <ActionRow>
                            <QtyWrap>
                                <QtyBtn onClick={() => setQty(v => Math.max(1, v - 1))}>-</QtyBtn>
                                <QtyVal>{qty}</QtyVal>
                                <QtyBtn onClick={() => setQty(v => v + 1)}>+</QtyBtn>
                            </QtyWrap>
                            <AddBtn $primary={primaryColor} onClick={handleAddToCart}>
                                Add to Cart
                            </AddBtn>
                        </ActionRow>

                        {added && <AddedNote>{qty} item(s) added to cart</AddedNote>}
                    </InfoCard>
                </MainGrid>

                {similarProducts.length > 0 && (
                    <SimilarSection>
                        <SimilarTitle>Similar Products</SimilarTitle>
                        <SimilarGrid $device={device}>
                            {similarProducts.map((p, idx) => (
                                <SimilarCard
                                    key={p?._id || p?.id || `${p?.name}-${idx}`}
                                    onClick={() => {
                                        setQty(1)
                                        setAdded(false)
                                        onSelectProduct?.(p)
                                    }}
                                >
                                    <SimilarImage src={p?.image} alt={p?.name || "Similar product"} />
                                    <SimilarInfo>
                                        <SimilarName>{p?.name || "Product"}</SimilarName>
                                        <SimilarPrice>{formatINR(p?.offerPrice || p?.price)}</SimilarPrice>
                                    </SimilarInfo>
                                </SimilarCard>
                            ))}
                        </SimilarGrid>
                    </SimilarSection>
                )}
            </DetailsContainer>
        </DetailsWrap>
    )
}
