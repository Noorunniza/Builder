import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import api from "../../services/api"
import {
    Container, ContentBox, Title, Subtitle, Form, FieldGroup, Label, Input, Select, SubmitButton, BackButton, Badge, ErrorMessage
} from "./StoreDetails.styles"

export default function StoreDetails() {
    const navigate = useNavigate()
    const location = useLocation()
    const websiteType = location.state?.websiteType || "business"
    const [form, setForm] = useState({ name: "", industry: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const isOnlineStore = websiteType === "online-store"
    const isValid = form.name.trim() && (!isOnlineStore || form.industry)

    const handleChange = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

    const handleSubmit = async event => {
        event.preventDefault()
        if (!form.name.trim()) return
        setLoading(true)
        setError(null)

        try {
            const payload = { name: form.name, type: websiteType, ...(isOnlineStore && { industry: form.industry }) }
            const res = await api.post("/websites", payload)
            navigate(`/dashboard/site/${res.data.website._id}`)
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <BackButton onClick={() => navigate("/create")}>Back</BackButton>
            <ContentBox>
                <Title>Store Details</Title>
                <Badge>{websiteType.replace(/-/g, " ")}</Badge>
                <Subtitle>Tell us more about your website so we can set it up perfectly</Subtitle>
                <Form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Label htmlFor="name">Store Name *</Label>
                        <Input id="name" name="name" type="text" placeholder="e.g. My Awesome Store" value={form.name} onChange={handleChange} />
                    </FieldGroup>
                    {isOnlineStore && (
                        <FieldGroup>
                            <Label htmlFor="industry">Industry *</Label>
                            <Select id="industry" name="industry" value={form.industry} onChange={handleChange}>
                                <option value="">Select Industry</option>
                                <option value="health-beauty">Health & Beauty</option>
                                <option value="fashion">Fashion</option>
                                <option value="electronics">Electronics</option>
                                <option value="food">Food</option>
                            </Select>
                        </FieldGroup>
                    )}
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <SubmitButton type="submit" disabled={!isValid || loading}>{loading ? "Creating..." : "Create Website"}</SubmitButton>
                </Form>
            </ContentBox>
        </Container>
    )
}
