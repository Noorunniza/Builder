import React, { useState } from "react"
import { Menu } from "lucide-react"
import ArrangeList from "../ArrangeList/ArrangeList"
import productImg from "../../../../assets/product_settings/product.jpg"
import subcategoriesImg from "../../../../assets/product_settings/subcategory.png"
import categoriesImg from "../../../../assets/product_settings/category.png"
import {
    Container,
    Title,
    Grid,
    Card,
    Illustration,
    CardTitle,
    CardSubtitle,
    ArrangeButton,
    ProductsIllust,
    SubcategoriesIllust,
    CategoriesIllust
} from "./ProductsSettings.styles"

export default function ProductsSettings({
    products = [],
    categories = [],
    onReorder
}) {
    const [activeArrange, setActiveArrange] = useState(null) // "products", "categories", or null

    const handleSaveReorder = (type, newList) => {
        if (onReorder) {
            onReorder(type, newList)
        }
        setActiveArrange(null)
    }

    if (activeArrange === "products") {
        return <ArrangeList type="Products" items={products} onSave={(list) => handleSaveReorder("products", list)} onBack={() => setActiveArrange(null)} />
    }
    if (activeArrange === "categories") {
        return <ArrangeList type="Categories" items={categories} onSave={(list) => handleSaveReorder("categories", list)} onBack={() => setActiveArrange(null)} />
    }

    const productsCount = products.length
    const categoriesCount = categories.length
    const subcategoriesCount = categories.reduce((total, cat) => total + (cat.subcategories?.length || 0), 0)

    return (
        <Container>
            <Title>Manage Sorting</Title>
            <Grid>
                {/* Products Card */}
                <Card>
                    <Illustration>
                        <img src={productImg} alt="Products" />
                    </Illustration>
                    <CardTitle>Products</CardTitle>
                    <CardSubtitle>
                        You have <strong>{productsCount}</strong> {productsCount === 1 ? 'product' : 'products'}
                    </CardSubtitle>
                    <ArrangeButton onClick={() => setActiveArrange("products")}>
                        <Menu /> Arrange
                    </ArrangeButton>
                </Card>

                {/* Subcategories Card */}
                <Card>
                    <Illustration>
                        <img src={subcategoriesImg} alt="Subcategories" />
                    </Illustration>
                    <CardTitle>Subcategories</CardTitle>
                    <CardSubtitle>
                        You have <strong>{subcategoriesCount}</strong> {subcategoriesCount === 1 ? 'subcategory' : 'subcategories'}
                    </CardSubtitle>
                    {/* Arrange subcategories would require choosing a category first, so hiding for now */}
                </Card>

                {/* Categories Card */}
                <Card>
                    <Illustration>
                        <img src={categoriesImg} alt="Categories" />
                    </Illustration>
                    <CardTitle>Categories</CardTitle>
                    <CardSubtitle>
                        You have <strong>{categoriesCount}</strong> {categoriesCount === 1 ? 'category' : 'categories'}
                    </CardSubtitle>
                    <ArrangeButton onClick={() => setActiveArrange("categories")}>
                        <Menu /> Arrange
                    </ArrangeButton>
                </Card>
            </Grid>
        </Container>
    )
}
