import React, { useState } from "react"
import {
    Toolbar, PageTitle, AddBtn,
    Form, FormCard, FormTitle,
    FieldGroup, Label, Input, SubmitBtn
} from "../ProductsTab/ProductsTab.styles"

export default function AddSubcategory({ categories, onSave, onBack }) {

    const [categoryId, setCategoryId] = useState("")
    const [name, setName] = useState("")

    // Find the currently selected category to display its subcategories
    const selectedCategory = categories.find(c => c._id === categoryId)
    const existingSubcategories = selectedCategory?.subcategories || []

    const handleSubmit = e => {
        e.preventDefault()
        if (!categoryId) {
            alert("Please select a category first.")
            return
        }
        if (!name.trim() || existingSubcategories.includes(name.trim())) return
        
        onSave(categoryId, name.trim())
        setName("")
    }

    return (
        <>
            <Toolbar>
                <PageTitle>Add Subcategory</PageTitle>
                <AddBtn type="button" onClick={onBack}>← Back</AddBtn>
            </Toolbar>

            <Form onSubmit={handleSubmit}>
                <FormCard>
                    <FormTitle>New Subcategory</FormTitle>
                    <FieldGroup>
                        <Label>Select Category *</Label>
                        <select 
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'var(--bg-card)', color: 'var(--text-main)', fontSize: '15px' }}
                            value={categoryId} 
                            onChange={e => setCategoryId(e.target.value)}
                        >
                            <option value="">-- Choose Category --</option>
                            {categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </FieldGroup>
                    <FieldGroup>
                        <Label>Subcategory Name *</Label>
                        <Input
                            placeholder='e.g. Cold Drinks, Warm Drinks, Chips...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FieldGroup>
                    <SubmitBtn type="submit" disabled={!categoryId}>Add Subcategory</SubmitBtn>
                </FormCard>

                {categoryId && existingSubcategories.length > 0 && (
                    <FormCard>
                        <FormTitle>Existing Subcategories in {selectedCategory?.name}</FormTitle>
                        {existingSubcategories.map(c => (
                            <div key={c} style={{ fontSize: "14px", padding: "6px 0", borderBottom: "1px solid #f1f5f9", color: "#0f172a" }}>
                                {c}
                            </div>
                        ))}
                    </FormCard>
                )}
            </Form>
        </>
    )
}
