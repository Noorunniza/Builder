import React from "react"
import SettingsTabContent from "./SettingsTabContent"
import useSettingsTabState from "./useSettingsTabState"

export default function SettingsTab({ website, onUpdate }) {
    const state = useSettingsTabState(website, onUpdate)
    return <SettingsTabContent website={website} state={state} />
}
