import React from "react"
import {
    FormCard, FormTitle, FieldGroup, Label, Input, Select, PriceRow, ImageUploadArea,
    ImagePreview, HiddenInput, StatusRow, StatusOption, STATUSES
} from "../ProductsTab/ProductsTab.styles"

export function AddProductDetailsSection({ categories, availableSubcategories, form, onFieldChange, onCategoryChange }) {
    return (
        <FormCard>
            <FormTitle>Product Details</FormTitle>
            <FieldGroup><Label>Product Name *</Label><Input placeholder="e.g. Cold Drink" value={form.name} onChange={event => onFieldChange("name", event.target.value)} /></FieldGroup>
            <FieldGroup>
                <Label>Category *</Label>
                <Select value={form.category} onChange={event => onCategoryChange(event.target.value)}>
                    <option value="">Select Category</option>
                    {categories.map((category, index) => {
                        const name = typeof category === "string" ? category : category.name
                        return <option key={category._id || index} value={category._id || name}>{name}</option>
                    })}
                </Select>
            </FieldGroup>
            <FieldGroup>
                <Label>Subcategory</Label>
                <Select value={form.subcategory || ""} onChange={event => onFieldChange("subcategory", event.target.value)}>
                    <option value="">Select Subcategory (Optional)</option>
                    {availableSubcategories.map((subcategory, index) => <option key={index} value={subcategory}>{subcategory}</option>)}
                </Select>
            </FieldGroup>
            <PriceRow>
                <FieldGroup><Label>Price (Rs) *</Label><Input type="number" placeholder="e.g. 120" value={form.price} onChange={event => onFieldChange("price", event.target.value)} /></FieldGroup>
                <FieldGroup><Label>Offer Price (Rs)</Label><Input type="number" placeholder="e.g. 99" value={form.offerPrice} onChange={event => onFieldChange("offerPrice", event.target.value)} /></FieldGroup>
            </PriceRow>
        </FormCard>
    )
}

export function AddProductMediaSection({ image, onImageUpload }) {
    return (
        <FormCard>
            <FormTitle>Product Image</FormTitle>
            <ImageUploadArea>
                <HiddenInput type="file" accept="image/*" onChange={onImageUpload} />
                <div>Click to upload or drag and drop</div>
                <div>SVG, PNG, JPG (max 2MB)</div>
            </ImageUploadArea>
            {image && <ImagePreview src={image} alt="Preview" />}
        </FormCard>
    )
}

export function AddProductStatusSection({ status, onStatusChange }) {
    return (
        <FormCard>
            <FormTitle>Status</FormTitle>
            <StatusRow>{STATUSES.map(item => <StatusOption type="button" key={item.key} $selected={status === item.key} $accent={item.accent} onClick={() => onStatusChange(item.key)}>{item.label}</StatusOption>)}</StatusRow>
        </FormCard>
    )
}
