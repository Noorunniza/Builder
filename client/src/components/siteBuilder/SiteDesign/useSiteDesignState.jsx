import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../../../services/api"
import {
    FALLBACK_HEADER_BG, FALLBACK_HEADER_TEXT, FALLBACK_BANNER_BG, FALLBACK_BANNER_TEXT,
    FALLBACK_PRIMARY, FALLBACK_FOOTER_BG
} from "./SiteDesign.styles"

const defaultConfig = website => ({
    header: { message: "", bgColor: FALLBACK_HEADER_BG, textColor: FALLBACK_HEADER_TEXT, logo: null },
    banner: {
        storeName: website?.name || "",
        tagline: website?.industry || "",
        bgImage: null,
        bgColor: FALLBACK_BANNER_BG,
        textColor: FALLBACK_BANNER_TEXT
    },
    theme: { primaryColor: FALLBACK_PRIMARY },
    social: { instagram: "", facebook: "", youtube: "" },
    footer: {
        copyright: `(c) 2026 ${website?.name || "My Store"}. All rights reserved.`,
        bgColor: FALLBACK_FOOTER_BG
    }
})

function buildInitialConfig(website) {
    const base = Object.keys(website?.config || {}).length ? { ...website.config } : defaultConfig(website)
    if (!base.banner) base.banner = {}
    base.banner.storeName = website?.name || ""
    base.banner.tagline = website?.industry || ""
    return base
}

export default function useSiteDesignState(website, onUpdate) {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeTab = searchParams.get("editor") || "Header"
    const device = searchParams.get("device") || "desktop"
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [config, setConfig] = useState(() => buildInitialConfig(website))

    const updateParam = (key, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(key, value)
        setSearchParams(params, { replace: true })
    }

    const setActiveTab = value => updateParam("editor", value)
    const setDevice = value => updateParam("device", value)

    const handleConfigChange = nextConfig => {
        setConfig(nextConfig)
        const updatedWebsite = { ...website }
        let siteChanged = false

        if (nextConfig?.banner) {
            if (nextConfig.banner.storeName !== undefined && nextConfig.banner.storeName !== website?.name) {
                updatedWebsite.name = nextConfig.banner.storeName
                siteChanged = true
            }
            if (nextConfig.banner.tagline !== undefined && nextConfig.banner.tagline !== website?.industry) {
                updatedWebsite.industry = nextConfig.banner.tagline
                siteChanged = true
            }
        }

        onUpdate?.(nextConfig, siteChanged ? updatedWebsite : undefined)
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

    return {
        activeTab,
        setActiveTab,
        device,
        setDevice,
        saving,
        saved,
        config,
        handleConfigChange,
        handleSave
    }
}
