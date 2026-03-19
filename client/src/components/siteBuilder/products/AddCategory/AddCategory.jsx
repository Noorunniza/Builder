import React, { useState } from "react"
import { Edit2 } from "lucide-react"
import {
    Toolbar, PageTitle, AddBtn,
    Form, FormCard, FormTitle,
    FieldGroup, Label, Input, SubmitBtn,
    ImageUploadArea, ImagePreview,
    CategoryItem, CategoryInfo, EditIconButton
} from "../ProductsTab/ProductsTab.styles"

export default function AddCategory({ categories, onSave, onEdit, onBack }) {

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        const trimmedName = name.trim()
        
        if (!trimmedName) return
        
        const isDuplicate = categories.some((c, i) => {
            if (editingIndex === i) return false
            const catName = typeof c === 'string' ? c : c.name
            return catName === trimmedName
        })
        
        if (isDuplicate) return
        
        if (editingIndex !== null) {
            onEdit(editingIndex, { name: trimmedName, image })
            setEditingIndex(null)
        } else {
            onSave({ name: trimmedName, image })
        }
        
        setName("")
        setImage("")
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => setImage(ev.target.result)
        reader.readAsDataURL(file)
    }

    const handleEditClick = (index, cat) => {
        setEditingIndex(index)
        setName(typeof cat === 'string' ? cat : cat.name)
        setImage(typeof cat === 'object' && cat.image ? cat.image : "")
    }

    const handleCancelEdit = () => {
        setEditingIndex(null)
        setName("")
        setImage("")
    }

    return (
        <>
            <Toolbar>
                <PageTitle>Add Category</PageTitle>
                <AddBtn type="button" onClick={onBack}>← Back</AddBtn>
            </Toolbar>

            <Form onSubmit={handleSubmit}>
                <FormCard>
                    <FormTitle>{editingIndex !== null ? "Edit Category" : "New Category"}</FormTitle>
                    <FieldGroup>
                        <Label>Category Image</Label>
                        <ImageUploadArea style={{ padding: '24px 16px' }}>
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                            {image ? (
                                <ImagePreview src={image} alt="category preview" style={{ marginTop: 0 }} />
                            ) : (
                                <div>Click to upload category image</div>
                            )}
                        </ImageUploadArea>
                    </FieldGroup>
                    <FieldGroup>
                        <Label>Category Name *</Label>
                        <Input
                            placeholder='e.g. Beverages, Snacks, Electronics...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FieldGroup>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <SubmitBtn type="submit" style={{ flex: 1 }}>
                            {editingIndex !== null ? "Save Changes" : "Add Category"}
                        </SubmitBtn>
                        {editingIndex !== null && (
                            <SubmitBtn type="button" onClick={handleCancelEdit} style={{ flex: 1, background: '#e2e8f0', color: '#0f172a' }}>
                                Cancel
                            </SubmitBtn>
                        )}
                    </div>
                </FormCard>

                {categories.length > 0 && (
                    <FormCard>
                        <FormTitle>Existing Categories</FormTitle>
                        {categories.map((c, i) => {
                            const catName = typeof c === 'string' ? c : c.name
                            const catImage = typeof c === 'object' ? c.image : null
                            return (
                                <CategoryItem key={i} onClick={() => handleEditClick(i, c)}>
                                    <CategoryInfo>
                                        {catImage ? (
                                            <img src={catImage} alt={catName} />
                                        ) : (
                                            <div className="placeholder" />
                                        )}
                                        <span>{catName}</span>
                                    </CategoryInfo>
                                    <EditIconButton
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditClick(i, c);
                                        }}
                                    >
                                        <Edit2 size={14} />
                                    </EditIconButton>
                                </CategoryItem>
                            )
                        })}
                    </FormCard>
                )}
            </Form>
        </>
    )
}
