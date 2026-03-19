import React from "react"
import { Monitor, Smartphone } from "lucide-react"
import { PreviewSide, DeviceSwitcher, DeviceButton, PreviewFrame, PreviewViewport } from "../SectionsManager/SectionsManager.styles"
import SitePreview from "../../preview/SitePreview/SitePreview"

export default function SectionPreviewPanel({ device, onDeviceChange, website, sections, activeSectionId }) {
    return (
        <PreviewSide>
            <DeviceSwitcher>
                <DeviceButton $active={device === "desktop"} onClick={() => onDeviceChange("desktop")}>
                    <Monitor size={14} />
                </DeviceButton>
                <DeviceButton $active={device === "mobile"} onClick={() => onDeviceChange("mobile")}>
                    <Smartphone size={14} />
                </DeviceButton>
            </DeviceSwitcher>

            <PreviewFrame device={device}>
                <PreviewViewport device={device}>
                    <SitePreview
                        device={device}
                        config={{ ...website.config, sections, activePolicy: activeSectionId }}
                        website={website}
                    />
                </PreviewViewport>
            </PreviewFrame>
        </PreviewSide>
    )
}
