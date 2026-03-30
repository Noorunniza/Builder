import React, { useEffect, useState } from "react"
import { uploadImage } from "../../../../services/uploadService"
import { Toolbar, PageTitle, AddBtn, Form, SubmitBtn, StickyButtonBar } from "../ProductsTab/ProductsTab.styles"
import { AddProductDetailsSection, AddProductMediaSection, AddProductStatusSection } from "./AddProductSections"

const empty = { name: "", category: "", subcategory: "", price: "", offerPrice: "", image: "", status: "shown" }

export default function AddProduct({ categories, subcategories, onSave, editProduct, onBack }) {
    const [form, setForm] = useState(empty)
    useEffect(() => setForm(editProduct || empty), [editProduct])

    const selectedCategory = categories.find(category => (typeof category === "object" ? category._id : category) === form.category)
    const availableSubcategories = selectedCategory?.subcategories?.length > 0 ? selectedCategory.subcategories : subcategories || []
    const updateField = (key, value) => setForm(current => ({ ...current, [key]: value }))

    const handleImageUpload = async event => {
        const file = event.target.files?.[0]
        if (!file) return
        try {
            updateField("image", await uploadImage(file))
        } catch (err) {
            console.error("Image upload failed", err)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!form.name || !form.price) return
        onSave({ ...form, id: editProduct?.id || Date.now().toString() })
    }

    return (
        <>
            <Toolbar><PageTitle>{editProduct ? "Edit Product" : "Add Product"}</PageTitle><AddBtn type="button" onClick={onBack}>Back</AddBtn></Toolbar>
            <Form onSubmit={handleSubmit}>
                <AddProductDetailsSection categories={categories} availableSubcategories={availableSubcategories} form={form} onFieldChange={updateField} onCategoryChange={value => { updateField("category", value); updateField("subcategory", "") }} />
                <AddProductMediaSection image={form.image} onImageUpload={handleImageUpload} />
                <AddProductStatusSection status={form.status} onStatusChange={value => updateField("status", value)} />
                <StickyButtonBar><SubmitBtn type="submit" $flex1>{editProduct ? "Save Changes" : "Add Product"}</SubmitBtn></StickyButtonBar>
            </Form>
        </>
    )
}
