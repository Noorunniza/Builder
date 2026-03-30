import { useEffect, useState } from "react"
import api from "../../../../services/api"

const formatProduct = product => ({
    ...product,
    id: product._id,
    categoryName: product.category ? product.category.name : "Unknown",
    categoryId: product.category ? product.category._id : null
})

export default function useProductsTabState(website, onUpdate) {
    const config = website?.config || {}
    const websiteId = website?._id
    const [activeTab, setActiveTab] = useState("manage")
    const [products, setProducts] = useState(config.products || [])
    const [categories, setCategories] = useState(config.categories || [])
    const [editProduct, setEditProduct] = useState(null)

    const syncPreview = (nextCategories = categories, nextProducts = products) => onUpdate?.({
        ...config,
        categories: nextCategories,
        products: nextProducts
    })

    const updateProducts = updater => setProducts(current => {
        const nextProducts = typeof updater === "function" ? updater(current) : updater
        syncPreview(categories, nextProducts)
        return nextProducts
    })

    const updateCategories = updater => setCategories(current => {
        const nextCategories = typeof updater === "function" ? updater(current) : updater
        syncPreview(nextCategories, products)
        return nextCategories
    })

    useEffect(() => {
        if (!websiteId) return
        Promise.all([api.get(`/websites/${websiteId}/categories`), api.get(`/websites/${websiteId}/products`)])
            .then(([catRes, prodRes]) => {
                const nextCategories = catRes.data.categories
                const nextProducts = (prodRes.data.products || []).map(formatProduct)
                setCategories(nextCategories)
                setProducts(nextProducts)
                syncPreview(nextCategories, nextProducts)
            })
            .catch(err => console.error("Failed to load store data:", err))
    }, [websiteId])

    const handleSaveProduct = async product => {
        try {
            const isEditing = product.id && typeof product.id === "string" && product.id.length === 24
            const res = isEditing
                ? await api.put(`/websites/${websiteId}/products/${product.id}`, product)
                : await api.post(`/websites/${websiteId}/products`, product)
            const savedProduct = formatProduct(res.data.product)
            updateProducts(current => isEditing ? current.map(item => item.id === savedProduct.id ? savedProduct : item) : [...current, savedProduct])
            setEditProduct(null)
            setActiveTab("manage")
        } catch (err) {
            console.error("Failed to save product:", err)
        }
    }

    const handleDeleteProduct = async id => {
        try {
            await api.delete(`/websites/${websiteId}/products/${id}`)
            updateProducts(current => current.filter(product => product.id !== id))
        } catch (err) {
            console.error("Failed to delete product:", err)
        }
    }

    const handleAddCategory = async newCategory => {
        try {
            const res = await api.post(`/websites/${websiteId}/categories`, newCategory)
            updateCategories(current => [...current, res.data.category])
        } catch (err) {
            console.error("Failed to add category:", err)
        }
    }

    const handleEditCategory = async (index, updatedCategory) => {
        const category = categories[index]
        if (!category?._id) return
        try {
            const res = await api.put(`/websites/${websiteId}/categories/${category._id}`, updatedCategory)
            updateCategories(current => current.map((item, itemIndex) => itemIndex === index ? res.data.category : item))
        } catch (err) {
            console.error("Failed to update category:", err)
        }
    }

    const handleDeleteCategory = async index => {
        const category = categories[index]
        if (!category?._id) return
        try {
            await api.delete(`/websites/${websiteId}/categories/${category._id}`)
            updateCategories(current => current.filter((_, itemIndex) => itemIndex !== index))
        } catch (err) {
            console.error("Failed to delete category:", err)
        }
    }

    const handleAddSubcategory = async (categoryId, name) => {
        const category = categories.find(item => item._id === categoryId)
        if (!category || (category.subcategories || []).includes(name)) return
        try {
            const res = await api.put(`/websites/${websiteId}/categories/${categoryId}`, {
                name: category.name,
                image: category.image,
                subcategories: [...(category.subcategories || []), name]
            })
            updateCategories(current => current.map(item => item._id === categoryId ? res.data.category : item))
        } catch (err) {
            console.error("Failed to add subcategory:", err)
        }
    }

    const handleReorder = async (type, newList) => {
        try {
            if (type === "products") {
                setProducts(newList)
                syncPreview(categories, newList)
                await api.patch(`/websites/${websiteId}/products/reorder`, { orderedIds: newList.map(product => product.id) })
            }
            if (type === "categories") {
                setCategories(newList)
                syncPreview(newList, products)
                await api.patch(`/websites/${websiteId}/categories/reorder`, { orderedIds: newList.map(category => category._id) })
            }
        } catch (err) {
            console.error(`Failed to reorder ${type}:`, err)
        }
    }

    return {
        activeTab, setActiveTab, products, categories, editProduct, setEditProduct,
        handleSaveProduct,
        handleEditProduct: product => { setEditProduct({ ...product, category: product.categoryId }); setActiveTab("add") },
        handleDeleteProduct,
        handleAddCategory,
        handleEditCategory,
        handleDeleteCategory,
        handleAddSubcategory,
        handleReorder
    }
}
