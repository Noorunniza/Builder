import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../../../../services/api"

import { SectionsContainer } from "./SectionsManager.styles"
import { SECTIONS, initSections } from "../SectionConfig"

import SectionsNav from "../SectionsNav/SectionsNav"
import SectionEditorPanel from "../SectionEditorPanel/SectionEditorPanel"
import SectionPreviewPanel from "../SectionPreviewPanel/SectionPreviewPanel"

export default function SectionsManager({ website, onUpdate }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const activeSectionId = searchParams.get("section") || "about"
    const setActiveSectionId = (newSection) => {
        const params = new URLSearchParams(searchParams)
        params.set("section", newSection)
        setSearchParams(params, { replace: true })
    }

    const device = searchParams.get("device") || "mobile"
    const setDevice = (newDevice) => {
        const params = new URLSearchParams(searchParams)
        params.set("device", newDevice)
        setSearchParams(params, { replace: true })
    }
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [sections, setSections] = useState(() =>
        initSections(website?.config?.sections)
    )

    const handleSectionChange = (id, data) => {
        const newSections = { ...sections, [id]: data }
        setSections(newSections)
        if (onUpdate) {
            onUpdate({ ...website.config, sections: newSections })
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const newConfig = { ...website.config, sections }
            await api.patch(`/websites/${website._id}/config`, newConfig)
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    const activeSection = SECTIONS.find(s => s.id === activeSectionId)

    return (
        <SectionsContainer>

            <SectionEditorPanel
                activeSection={activeSection}
                sectionData={sections[activeSectionId]}
                onChange={handleSectionChange}
                onSave={handleSave}
                saving={saving}
                saved={saved}
                nav={
                    <SectionsNav
                        sections={SECTIONS}
                        sectionData={sections}
                        activeSectionId={activeSectionId}
                        onSelect={setActiveSectionId}
                    />
                }
            />

            <SectionPreviewPanel
                device={device}
                onDeviceChange={setDevice}
                website={website}
                sections={sections}
                activeSectionId={activeSectionId}
            />

        </SectionsContainer>
    )
}
