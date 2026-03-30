import React from "react"
import {
    DesignLayout, EditorSide, EditorTopbar, EditorTab, EditorBody, SaveBar, SaveButton,
    PreviewSide, PreviewToolbar, DeviceButton, PreviewFrame, PreviewViewport, DesktopIcon, MobileIcon
} from "./SiteDesign.styles"
import HeaderEditor from "../editors/HeaderEditor/HeaderEditor"
import BannerEditor from "../editors/BannerEditor/BannerEditor"
import FooterEditor from "../editors/FooterEditor/FooterEditor"
import SitePreview from "../preview/SitePreview/SitePreview"

const TABS = ["Header", "Banner", "Footer"]

function renderEditor(activeTab, config, onChange) {
    if (activeTab === "Header") return <HeaderEditor config={config} onChange={onChange} />
    if (activeTab === "Banner") return <BannerEditor config={config} onChange={onChange} />
    if (activeTab === "Footer") return <FooterEditor config={config} onChange={onChange} />
    return null
}

export default function SiteDesignContent({ website, state }) {
    const previewConfig = {
        ...state.config,
        categories: website?.config?.categories || state.config.categories || []
    }

    return (
        <DesignLayout>
            <EditorSide>
                <EditorTopbar>
                    {TABS.map(tab => (
                        <EditorTab key={tab} $active={state.activeTab === tab} onClick={() => state.setActiveTab(tab)}>
                            {tab}
                        </EditorTab>
                    ))}
                </EditorTopbar>

                <EditorBody>
                    {renderEditor(state.activeTab, state.config, state.handleConfigChange)}
                    <SaveBar>
                        <SaveButton onClick={state.handleSave} disabled={state.saving}>
                            {state.saving ? "Saving..." : state.saved ? "Saved!" : "Save Changes"}
                        </SaveButton>
                    </SaveBar>
                </EditorBody>
            </EditorSide>

            <PreviewSide>
                <PreviewToolbar>
                    <DeviceButton $active={state.device === "desktop"} onClick={() => state.setDevice("desktop")}>
                        <DesktopIcon /> Desktop
                    </DeviceButton>
                    <DeviceButton $active={state.device === "mobile"} onClick={() => state.setDevice("mobile")}>
                        <MobileIcon /> Mobile
                    </DeviceButton>
                </PreviewToolbar>

                <PreviewFrame $device={state.device}>
                    <PreviewViewport $device={state.device}>
                        <SitePreview device={state.device} config={previewConfig} website={website} />
                    </PreviewViewport>
                </PreviewFrame>
            </PreviewSide>
        </DesignLayout>
    )
}
