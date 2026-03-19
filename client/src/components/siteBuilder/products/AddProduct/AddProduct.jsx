

import React, { useState, useEffect } from "react"
import {
    Toolbar, PageTitle, AddBtn,
    Form, FormCard, FormTitle,
    FieldGroup, Label, Input, Select, PriceRow,
    SubmitBtn, ImageUploadArea, ImagePreview, StatusRow, StatusOption
} from "../ProductsTab/ProductsTab.styles"

const STATUSES = [
    { key: "shown", label: "Shown", accent: "#22c55e" },
    { key: "hidden", label: "Hidden", accent: "#f59e0b" },
    { key: "coming_soon", label: "Coming Soon", accent: "#3b82f6" },
    { key: "sold_out", label: "Sold Out", accent: "#ef4444" }
]

const empty = { name: "", category: "", subcategory: "", price: "", offerPrice: "", image: "", status: "shown" }

export default function AddProduct({ categories, subcategories, onSave, editProduct, onBack }) {

    const [form, setForm] = useState(empty)

    useEffect(() => {
        if (editProduct) setForm(editProduct)
        else setForm(empty)
    }, [editProduct])

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    // Compute available subcategories based on selected category
    const selectedCategoryObj = categories.find(c => {
        const cId = typeof c === 'object' ? c._id : c
        return cId === form.category
    })

    const availableSubcategories = selectedCategoryObj?.subcategories?.length > 0
        ? selectedCategoryObj.subcategories
        : subcategories || []

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            set("image", reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!form.name || !form.price) return
        onSave({ ...form, id: editProduct?.id || Date.now().toString() })
    }

    return (
        <>
            <Toolbar>
                <PageTitle>{editProduct ? "Edit Product" : "Add Product"}</PageTitle>
                <AddBtn type="button" onClick={onBack}>← Back</AddBtn>
            </Toolbar>

            <Form onSubmit={handleSubmit}>
                <FormCard>
                    <FormTitle>Product Details</FormTitle>

                    <FieldGroup>
                        <Label>Product Name *</Label>
                        <Input
                            placeholder="e.g. Cold Drink"
                            value={form.name}
                            onChange={e => set("name", e.target.value)}
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Label>Category *</Label>
                        <Select value={form.category} onChange={e => {
                            set("category", e.target.value)
                            set("subcategory", "")
                        }}>
                            <option value="">Select Category</option>
                            {categories.map((c, i) => {
                                const cName = typeof c === 'string' ? c : c.name
                                return <option key={c._id || i} value={c._id || cName}>{cName}</option>
                            })}
                        </Select>
                    </FieldGroup>

                    <FieldGroup>
                        <Label>Subcategory</Label>
                        <Select value={form.subcategory || ""} onChange={e => set("subcategory", e.target.value)}>
                            <option value="">Select Subcategory (Optional)</option>
                            {availableSubcategories.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                            ))}
                        </Select>
                    </FieldGroup>

                    <PriceRow>
                        <FieldGroup>
                            <Label>Price (₹) *</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 120"
                                value={form.price}
                                onChange={e => set("price", e.target.value)}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Label>Offer Price (₹)</Label>
                            <Input
                                type="number"
                                placeholder="e.g. 99"
                                value={form.offerPrice}
                                onChange={e => set("offerPrice", e.target.value)}
                            />
                        </FieldGroup>
                    </PriceRow>
                </FormCard>

                <FormCard>
                    <FormTitle>Product Image</FormTitle>
                    <ImageUploadArea>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                        />
                        <div>📁 Click to upload or drag and drop</div>
                        <div>SVG, PNG, JPG (max 2MB)</div>
                    </ImageUploadArea>
                    {form.image && (
                        <ImagePreview src={form.image} alt="Preview" />
                    )}
                </FormCard>

                <FormCard>
                    <FormTitle>Status</FormTitle>
                    <StatusRow>
                        {STATUSES.map(s => (
                            <StatusOption
                                type="button"
                                key={s.key}
                                $selected={form.status === s.key}
                                $accent={s.accent}
                                onClick={() => set("status", s.key)}
                            >
                                {s.label}
                            </StatusOption>
                        ))}
                    </StatusRow>
                </FormCard>

                <SubmitBtn type="submit">{editProduct ? "Save Changes" : "Add Product"}</SubmitBtn>
            </Form>
        </>
    )
}
