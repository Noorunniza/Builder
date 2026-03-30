import React from "react"
import {
    Page, SubNav, SubNavItem, Body,
    ManageIcon, AddIcon, CategoryIcon, SubcategoryIcon, ConfigIcon
} from "./ProductsTab.styles"
import ManageProducts from "../ManageProducts/ManageProducts"
import AddProduct from "../AddProduct/AddProduct"
import AddCategory from "../AddCategory/AddCategory"
import AddSubcategory from "../AddSubcategory/AddSubcategory"
import ProductsSettings from "../ProductsSettings/ProductsSettings"

const TABS = [
    { key: "manage", label: "Manage Products", Icon: ManageIcon },
    { key: "add", label: "Add Product", Icon: AddIcon },
    { key: "category", label: "Add Category", Icon: CategoryIcon },
    { key: "subcategory", label: "Add Subcategory", Icon: SubcategoryIcon },
    { key: "settings", label: "Settings", Icon: ConfigIcon }
]

export default function ProductsTabContent({ state }) {
    const {
        activeTab, setActiveTab, products, categories, editProduct, setEditProduct,
        handleSaveProduct, handleEditProduct, handleDeleteProduct, handleAddCategory,
        handleEditCategory, handleDeleteCategory, handleAddSubcategory, handleReorder
    } = state

    const openManage = () => { setActiveTab("manage"); setEditProduct(null) }
    const openAdd = () => { setEditProduct(null); setActiveTab("add") }

    return (
        <Page>
            <SubNav>
                {TABS.map(({ key, label, Icon }) => (
                    <SubNavItem key={key} $active={activeTab === key} onClick={() => { setActiveTab(key); if (key !== "add") setEditProduct(null) }}>
                        <Icon /> {label}
                    </SubNavItem>
                ))}
            </SubNav>

            <Body>
                {activeTab === "manage" && <ManageProducts products={products} onAddProduct={openAdd} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />}
                {activeTab === "add" && <AddProduct categories={categories} subcategories={[]} onSave={handleSaveProduct} editProduct={editProduct} onBack={openManage} />}
                {activeTab === "category" && <AddCategory categories={categories} onSave={handleAddCategory} onEdit={handleEditCategory} onDelete={handleDeleteCategory} onBack={openManage} />}
                {activeTab === "subcategory" && <AddSubcategory categories={categories} onSave={handleAddSubcategory} onBack={openManage} />}
                {activeTab === "settings" && <ProductsSettings products={products} categories={categories} onReorder={handleReorder} />}
            </Body>
        </Page>
    )
}
