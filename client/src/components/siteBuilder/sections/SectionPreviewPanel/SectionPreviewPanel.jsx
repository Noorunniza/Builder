import React from "react"
// Icons are now imported from styles as styled-components
import { PreviewSide, DeviceSwitcher, DeviceButton, PreviewFrame, PreviewViewport, DesktopIcon, MobileIcon } from "../SectionsManager/SectionsManager.styles"
import SitePreview from "../../preview/SitePreview/SitePreview"

export default function SectionPreviewPanel({ device, onDeviceChange, website, sections, activeSectionId }) {
    return (
        <PreviewSide>
            <DeviceSwitcher>
                <DeviceButton $active={device === "desktop"} onClick={() => onDeviceChange("desktop")}>
                    <DesktopIcon />
                </DeviceButton>
                <DeviceButton $active={device === "mobile"} onClick={() => onDeviceChange("mobile")}>
                    <MobileIcon />
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
