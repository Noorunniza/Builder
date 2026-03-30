import React from "react"
import {
    SearchInput, SearchDropdown, SearchDropdownHeader, SearchResultItem, SearchResultImage,
    SearchResultMeta, SearchResultName, SearchResultSub, SearchResultPrice, SearchNoResults,
    StyledSearchIcon, ClearIconWrap, ClearSearchIcon
} from "./Navbar.styles"

export default function NavbarSearch({
    ContainerComponent, BarComponent, wrapperRef, primary, focused, query, results, activeIndex,
    setActiveIndex, onChange, onFocus, onKeyDown, onClear
}) {
    return (
        <ContainerComponent ref={wrapperRef}>
            <BarComponent $focused={focused} $primary={primary}>
                <StyledSearchIcon />
                <SearchInput type="text" placeholder="Search products..." value={query} onChange={onChange} onFocus={onFocus} onKeyDown={onKeyDown} autoComplete="off" />
                {query && <ClearIconWrap onClick={onClear}><ClearSearchIcon /></ClearIconWrap>}
            </BarComponent>
            <SearchDropdown>
                {results.length > 0 ? (
                    <>
                        <SearchDropdownHeader>{results.length} result{results.length !== 1 ? "s" : ""} for "{query}"</SearchDropdownHeader>
                        {results.map((product, index) => {
                            const category = product.categoryName || (typeof product.category === "object" ? product.category?.name : product.category) || ""
                            return (
                                <SearchResultItem key={product._id || product.name} $highlighted={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} onClick={() => { onFocus(false); onClear() }}>
                                    <SearchResultImage>{product.image ? <img src={product.image} alt={product.name} /> : "Item"}</SearchResultImage>
                                    <SearchResultMeta><SearchResultName>{product.name}</SearchResultName>{category && <SearchResultSub>{category}</SearchResultSub>}</SearchResultMeta>
                                    <SearchResultPrice>Rs{product.offerPrice || product.price}</SearchResultPrice>
                                </SearchResultItem>
                            )
                        })}
                    </>
                ) : <SearchNoResults>No products found for "{query}"</SearchNoResults>}
            </SearchDropdown>
        </ContainerComponent>
    )
}
