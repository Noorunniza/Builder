import React, { useState } from "react"
import {
    Toolbar, PageTitle, AddBtn,
    Form, FormCard, FormTitle,
    FieldGroup, Label, Input, Select, SubmitBtn, StickyButtonBar, SubcategoryItem
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
                        <Select 
                            value={categoryId} 
                            onChange={e => setCategoryId(e.target.value)}
                        >
                            <option value="">-- Choose Category --</option>
                            {categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </Select>
                    </FieldGroup>
                    <FieldGroup>
                        <Label>Subcategory Name *</Label>
                        <Input
                            placeholder='e.g. Cold Drinks, Warm Drinks, Chips...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FieldGroup>
                    <StickyButtonBar>
                        <SubmitBtn type="submit" disabled={!categoryId} $flex1>Add Subcategory</SubmitBtn>
                    </StickyButtonBar>
                </FormCard>

                {categoryId && existingSubcategories.length > 0 && (
                    <FormCard>
                        <FormTitle>Existing Subcategories in {selectedCategory?.name}</FormTitle>
                        {existingSubcategories.map(c => (
                            <SubcategoryItem key={c}>
                                {c}
                            </SubcategoryItem>
                        ))}
                    </FormCard>
                )}
            </Form>
        </>
    )
}
