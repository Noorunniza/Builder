import React, { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Monitor, Smartphone, Save } from "lucide-react"
import api from "../../../services/api"

import {
    DesignLayout,
    EditorSide, EditorTopbar, EditorTab, EditorBody, SaveBar, SaveButton,
    PreviewSide, PreviewToolbar, DeviceButton, PreviewFrame, PreviewViewport
} from "./SiteDesign.styles"

import HeaderEditor from "../editors/HeaderEditor/HeaderEditor"
import BannerEditor from "../editors/BannerEditor/BannerEditor"
import FooterEditor from "../editors/FooterEditor/FooterEditor"
import SitePreview from "../preview/SitePreview/SitePreview"

const TABS = ["Header", "Banner", "Footer"]

const defaultConfig = (website) => ({
    header: {
        message: "",
        bgColor: "#000000",
        textColor: "#ffffff",
        logo: null
    },
    banner: {
        storeName: website?.name || "",
        tagline: website?.industry || "",
        bgImage: null,
        bgColor: "#1e293b",
        textColor: "#ffffff"
    },
    theme: {
        primaryColor: "#6366f1"
    },
    social: {
        instagram: "",
        facebook: "",
        youtube: ""
    },
    footer: {
        copyright: `© 2026 ${website?.name || "My Store"}. All rights reserved.`,
        bgColor: "#0f172a"
    }
})

export default function SiteDesign({ website, onUpdate }) {

    const [searchParams, setSearchParams] = useSearchParams()

    const activeTab = searchParams.get("editor") || "Header"
    const setActiveTab = (newEditor) => {
        const params = new URLSearchParams(searchParams)
        params.set("editor", newEditor)
        setSearchParams(params, { replace: true })
    }

    const device = searchParams.get("device") || "desktop"
    const setDevice = (newDevice) => {
        const params = new URLSearchParams(searchParams)
        params.set("device", newDevice)
        setSearchParams(params, { replace: true })
    }

    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    const [config, setConfig] = useState(
        () => Object.keys(website?.config || {}).length
            ? website.config
            : defaultConfig(website)
    )

    // Notify parent when config changes locally
    const handleConfigChange = (newConfig) => {
        setConfig(newConfig)
        if (onUpdate) onUpdate(newConfig)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await api.patch(`/websites/${website._id}/config`, config)
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    const renderEditor = () => {
        switch (activeTab) {
            case "Header": return <HeaderEditor config={config} onChange={handleConfigChange} />
            case "Banner": return <BannerEditor config={config} onChange={handleConfigChange} />
            case "Footer": return <FooterEditor config={config} onChange={handleConfigChange} />
            default: return null
        }
    }

    return (

        <DesignLayout>

            {/* ── Left: Editor ─────────────────── */}
            <EditorSide>

                <EditorTopbar>
                    {TABS.map(tab => (
                        <EditorTab
                            key={tab}
                            $active={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </EditorTab>
                    ))}
                </EditorTopbar>

                <EditorBody>
                    {renderEditor()}
                </EditorBody>

                <SaveBar>
                    <SaveButton onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
                    </SaveButton>
                </SaveBar>

            </EditorSide>

            {/* ── Right: Live Preview ───────────── */}
            <PreviewSide>

                <PreviewToolbar>
                    <DeviceButton $active={device === "desktop"} onClick={() => setDevice("desktop")}>
                        <Monitor size={14} /> Desktop
                    </DeviceButton>
                    <DeviceButton $active={device === "mobile"} onClick={() => setDevice("mobile")}>
                        <Smartphone size={14} /> Mobile
                    </DeviceButton>
                </PreviewToolbar>

                <PreviewFrame $device={device}>
                    <PreviewViewport $device={device}>
                        <SitePreview
                            device={device}
                            config={{ ...config, categories: website?.config?.categories || config.categories || [] }}
                            website={website}
                        />
                    </PreviewViewport>
                </PreviewFrame>

            </PreviewSide>

        </DesignLayout>

    )

}
