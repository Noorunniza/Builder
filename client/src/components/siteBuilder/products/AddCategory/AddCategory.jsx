import React, { useState } from "react"
import { uploadImage } from "../../../../services/uploadService"
import {
    Toolbar, PageTitle, AddBtn, Form, FormCard, FormTitle, FieldGroup, Label, Input, SubmitBtn,
    ImageUploadArea, ImagePreview, HiddenInput, StickyButtonBar, CANCEL_BTN_BG, CANCEL_BTN_TEXT, DELETE_BTN_BG, DELETE_BTN_TEXT
} from "../ProductsTab/ProductsTab.styles"
import CategoryListCard from "./CategoryListCard"

export default function AddCategory({ categories, onSave, onEdit, onDelete, onBack }) {
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)

    const reset = () => { setEditingIndex(null); setName(""); setImage("") }
    const handleEdit = (index, category) => { setEditingIndex(index); setName(typeof category === "string" ? category : category.name); setImage(typeof category === "object" && category.image ? category.image : "") }

    const handleSubmit = event => {
        event.preventDefault()
        const trimmedName = name.trim()
        if (!trimmedName) return
        if (categories.some((category, index) => index !== editingIndex && (typeof category === "string" ? category : category.name) === trimmedName)) return
        editingIndex !== null ? onEdit(editingIndex, { name: trimmedName, image }) : onSave({ name: trimmedName, image })
        reset()
    }

    const handleImageUpload = async event => {
        const file = event.target.files[0]
        if (!file) return
        try {
            setImage(await uploadImage(file))
        } catch (err) {
            console.error("Image upload failed", err)
        }
    }

    const handleDelete = () => {
        if (editingIndex === null) return
        if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            onDelete(editingIndex)
            reset()
        }
    }

    return (
        <>
            <Toolbar><PageTitle>Add Category</PageTitle><AddBtn type="button" onClick={onBack}>Back</AddBtn></Toolbar>
            <Form onSubmit={handleSubmit}>
                <FormCard>
                    <FormTitle>{editingIndex !== null ? "Edit Category" : "New Category"}</FormTitle>
                    <FieldGroup>
                        <Label>Category Image</Label>
                        <ImageUploadArea $padding="24px 16px"><HiddenInput type="file" accept="image/*" onChange={handleImageUpload} />{image ? <ImagePreview src={image} alt="category preview" $mt="0" /> : <div>Click to upload category image</div>}</ImageUploadArea>
                    </FieldGroup>
                    <FieldGroup><Label>Category Name *</Label><Input placeholder="e.g. Beverages, Snacks, Electronics..." value={name} onChange={event => setName(event.target.value)} /></FieldGroup>
                    <StickyButtonBar>
                        <SubmitBtn type="submit" $flex1>{editingIndex !== null ? "Save Changes" : "Add Category"}</SubmitBtn>
                        {editingIndex !== null && <><SubmitBtn type="button" onClick={reset} $flex1 $bg={CANCEL_BTN_BG} $color={CANCEL_BTN_TEXT}>Cancel</SubmitBtn><SubmitBtn type="button" onClick={handleDelete} $flex1 $bg={DELETE_BTN_BG} $color={DELETE_BTN_TEXT}>Delete</SubmitBtn></>}
                    </StickyButtonBar>
                </FormCard>
                <CategoryListCard categories={categories} onEdit={handleEdit} />
            </Form>
        </>
    )
}
