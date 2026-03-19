import React, { useState, useEffect } from "react"
import { LayoutList, Plus, FolderPlus, Settings as SettingsIcon } from "lucide-react"
import api from "../../../../services/api"

import { Page, SubNav, SubNavItem, Body } from "./ProductsTab.styles"

import ManageProducts from "../ManageProducts/ManageProducts"
import AddProduct from "../AddProduct/AddProduct"
import AddCategory from "../AddCategory/AddCategory"
import AddSubcategory from "../AddSubcategory/AddSubcategory"
import ProductsSettings from "../ProductsSettings/ProductsSettings"

// No static demo data needed
const TABS = [
    { key: "manage", label: "Manage Products", icon: <LayoutList size={14} /> },
    { key: "add", label: "Add Product", icon: <Plus size={14} /> },
    { key: "category", label: "Add Category", icon: <FolderPlus size={14} /> },
    { key: "subcategory", label: "Add Subcategory", icon: <FolderPlus size={14} /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon size={14} /> },
]

export default function ProductsTab({ website, onUpdate }) {

    const config = website?.config || {}
    const websiteId = website?._id

    const [activeTab, setActiveTab] = useState("manage")
    // Initialize products from config, fallback to empty array
    const [products, setProducts] = useState(config.products || [])
    // Initialize from config (already includes categories injected by backend on load)
    const [categories, setCategories] = useState(config.categories || [])
    const [editProduct, setEditProduct] = useState(null)

    // ── Fetch fresh categories and products from dedicated collections ──
    useEffect(() => {
        if (!websiteId) return
        
        const fetchCategories = api.get(`/websites/${websiteId}/categories`)
        const fetchProducts = api.get(`/websites/${websiteId}/products`)
        
        Promise.all([fetchCategories, fetchProducts])
            .then(([catRes, prodRes]) => {
                const cats = catRes.data.categories
                const prods = prodRes.data.products
                
                setCategories(cats)
                
                // Format the populated products to surface the category name inside `categoryId` or `categoryName`
                const formattedProds = prods.map(p => ({
                    ...p,
                    id: p._id, // map _id to id for the frontend table
                    categoryName: p.category ? p.category.name : "Unknown",
                    categoryId: p.category ? p.category._id : null
                }))
                
                setProducts(formattedProds)
                
                // Keep preview in sync
                syncPreview(cats, formattedProds)
            })
            .catch(err => console.error("Failed to load store data:", err))
    }, [websiteId])

    // ── Sync categories into site preview config ───────────────
    const syncPreview = (cats = categories, prods = products) => {
        onUpdate({ ...config, categories: cats, products: prods })
    }

    // ── Product handlers (backed by API) ───────────────────────
    const handleSaveProduct = async (product) => {
        try {
            if (product.id && typeof product.id === 'string' && product.id.length === 24) {
               // Update existing product
               const res = await api.put(`/websites/${websiteId}/products/${product.id}`, product)
               const updatedProd = res.data.product
               
               const formattedProd = {
                   ...updatedProd,
                   id: updatedProd._id,
                   categoryName: updatedProd.category ? updatedProd.category.name : "Unknown",
                   categoryId: updatedProd.category ? updatedProd.category._id : null
               }

               setProducts(prev => {
                   const newProducts = prev.map(p => p.id === formattedProd.id ? formattedProd : p)
                   syncPreview(categories, newProducts)
                   return newProducts
               })
            } else {
               // Create new product
               const res = await api.post(`/websites/${websiteId}/products`, product)
               const newProd = res.data.product
               
               const formattedProd = {
                   ...newProd,
                   id: newProd._id,
                   categoryName: newProd.category ? newProd.category.name : "Unknown",
                   categoryId: newProd.category ? newProd.category._id : null
               }

               setProducts(prev => {
                   const newProducts = [...prev, formattedProd]
                   syncPreview(categories, newProducts)
                   return newProducts
               })
            }

            setEditProduct(null)
            setActiveTab("manage")
        } catch (err) {
            console.error("Failed to save product:", err)
        }
    }

    const handleEditProduct = (product) => {
        setEditProduct({
            ...product,
            category: product.categoryId // AddProduct expects 'category' to hold the ID mapping ideally, 
                                         // but due to mapping we might need to be careful.
                                         // Let's ensure AddProduct gets what it needs.
        })
        setActiveTab("add")
    }

    const handleDeleteProduct = async (id) => {
        try {
            await api.delete(`/websites/${websiteId}/products/${id}`)
            setProducts(prev => {
                const newProducts = prev.filter(p => p.id !== id)
                syncPreview(categories, newProducts)
                return newProducts
            })
        } catch (err) {
            console.error("Failed to delete product:", err)
        }
    }

    // ── Category handlers (backed by API) ──────────────────────
    const handleAddCategory = async (newCat) => {
        try {
            const res = await api.post(`/websites/${websiteId}/categories`, newCat)
            const updated = [...categories, res.data.category]
            setCategories(updated)
            syncPreview(updated)
        } catch (err) {
            console.error("Failed to add category:", err)
        }
    }

    const handleEditCategory = async (index, updatedCat) => {
        const cat = categories[index]
        if (!cat?._id) return
        try {
            const res = await api.put(`/websites/${websiteId}/categories/${cat._id}`, updatedCat)
            const updated = categories.map((c, i) => i === index ? res.data.category : c)
            setCategories(updated)
            syncPreview(updated)
        } catch (err) {
            console.error("Failed to update category:", err)
        }
    }

    const handleAddSubcategory = async (categoryId, name) => {
        const catIndex = categories.findIndex(c => c._id === categoryId)
        if (catIndex === -1) return
        
        const cat = categories[catIndex]
        const existingSubs = cat.subcategories || []
        if (existingSubs.includes(name)) return

        const updatedSubs = [...existingSubs, name]
        
        try {
            const reqBody = {
                name: cat.name,
                image: cat.image,
                subcategories: updatedSubs
            }
            const res = await api.put(`/websites/${websiteId}/categories/${categoryId}`, reqBody)
            const updated = categories.map(c => c._id === categoryId ? res.data.category : c)
            setCategories(updated)
            syncPreview(updated)
        } catch (err) {
            console.error("Failed to add subcategory:", err)
        }
    }

    const handleReorder = async (type, newList) => {
        if (type === "products") {
            setProducts(newList)
            syncPreview(categories, newList)
            try {
                await api.patch(`/websites/${websiteId}/products/reorder`, {
                    orderedIds: newList.map(p => p.id)
                })
            } catch(err) {
                console.error("Failed to reorder products:", err)
            }
        }
        else if (type === "categories") {
            setCategories(newList)
            syncPreview(newList, products)
            try {
                await api.patch(`/websites/${websiteId}/categories/reorder`, {
                    orderedIds: newList.map(c => c._id)
                })
            } catch (err) {
                console.error("Failed to reorder categories:", err)
            }
        }
    }

    return (
        <Page>
            <SubNav>
                {TABS.map(t => (
                    <SubNavItem
                        key={t.key}
                        $active={activeTab === t.key}
                        onClick={() => { setActiveTab(t.key); if (t.key !== "add") setEditProduct(null) }}
                    >
                        {t.icon} {t.label}
                    </SubNavItem>
                ))}
            </SubNav>

            <Body>
                {activeTab === "manage" && (
                    <ManageProducts
                        products={products}
                        onAddProduct={() => { 
                            console.log("Add Product button clicked in ManageProducts");
                            setEditProduct(null); 
                            setActiveTab("add");
                        }}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                )}
                {activeTab === "add" && (
                    <AddProduct
                        categories={categories}
                        subcategories={[]}
                        onSave={handleSaveProduct}
                        editProduct={editProduct}
                        onBack={() => { setActiveTab("manage"); setEditProduct(null) }}
                    />
                )}
                {activeTab === "category" && (
                    <AddCategory
                        categories={categories}
                        onSave={handleAddCategory}
                        onEdit={handleEditCategory}
                        onBack={() => setActiveTab("manage")}
                    />
                )}
                {activeTab === "subcategory" && (
                    <AddSubcategory
                        categories={categories}
                        onSave={handleAddSubcategory}
                        onBack={() => setActiveTab("manage")}
                    />
                )}
                {activeTab === "settings" && (
                    <ProductsSettings
                        products={products}
                        categories={categories}
                        onReorder={handleReorder}
                    />
                )}
            </Body>
        </Page>
    )
}
