import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../../services/api"

const slugify = value => value.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")

export default function useSettingsTabState(website, onUpdate) {
    const navigate = useNavigate()
    const [name, setName] = useState(website?.name || "")
    const [subdomain, setSubdomain] = useState(website?.subdomain || "")
    const [subdomainEdited, setSubdomainEdited] = useState(false)
    const [generalSaving, setGeneralSaving] = useState(false)
    const [generalSaved, setGeneralSaved] = useState(false)
    const [generalError, setGeneralError] = useState("")
    const [isLive, setIsLive] = useState(website?.published || false)
    const [publishSaving, setPublishSaving] = useState(false)
    const [publishError, setPublishError] = useState("")
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [deleteConfirmText, setDeleteConfirmText] = useState("")
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState("")

    useEffect(() => {
        if (!subdomainEdited) setSubdomain(website?.subdomain || "")
        setName(website?.name || "")
        setIsLive(website?.published || false)
    }, [website])

    const handleNameChange = value => {
        setName(value)
        if (!subdomainEdited) setSubdomain(slugify(value))
    }

    const handleSubdomainChange = value => {
        setSubdomainEdited(true)
        setSubdomain(slugify(value))
    }

    const saveGeneral = async () => {
        if (!name.trim()) return setGeneralError("Store name cannot be empty")
        setGeneralSaving(true)
        setGeneralError("")
        setGeneralSaved(false)

        try {
            const res = await api.patch(`/websites/${website._id}/settings`, { name: name.trim(), subdomain })
            onUpdate?.({ ...website?.config }, res.data.website)
            setGeneralSaved(true)
            setTimeout(() => setGeneralSaved(false), 2000)
        } catch (err) {
            setGeneralError(err?.response?.data?.message || "Failed to save settings")
        } finally {
            setGeneralSaving(false)
        }
    }

    const togglePublish = async () => {
        setPublishSaving(true)
        setPublishError("")
        try {
            const res = await api.put(`/websites/publish/${website._id}`)
            setIsLive(res.data.published)
        } catch (err) {
            setPublishError(err?.response?.data?.message || "Failed to update publish status")
        } finally {
            setPublishSaving(false)
        }
    }

    const openDeleteConfirm = () => {
        setShowDeleteConfirm(true)
        setDeleteConfirmText("")
        setDeleteError("")
    }

    const closeDeleteConfirm = () => {
        if (deleting) return
        setShowDeleteConfirm(false)
    }

    const confirmDelete = async () => {
        if (deleteConfirmText !== website?.name) return
        setDeleting(true)
        setDeleteError("")
        try {
            await api.delete(`/websites/${website._id}`)
            navigate("/dashboard")
        } catch (err) {
            setDeleteError(err?.response?.data?.message || "Failed to delete website")
            setDeleting(false)
        }
    }

    return {
        name,
        subdomain,
        generalSaving,
        generalSaved,
        generalError,
        isLive,
        publishSaving,
        publishError,
        showDeleteConfirm,
        deleteConfirmText,
        deleting,
        deleteError,
        handleNameChange,
        handleSubdomainChange,
        saveGeneral,
        togglePublish,
        openDeleteConfirm,
        closeDeleteConfirm,
        confirmDelete,
        setDeleteConfirmText
    }
}
