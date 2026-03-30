import React from "react"
import {
    ConfirmOverlay, ConfirmCard, ConfirmTitle, ConfirmText, ConfirmInput,
    ConfirmActions, GhostBtn, DangerBtn, InfoText
} from "./SettingsTab.styles"

export default function SettingsDeleteModal({ websiteName, value, deleting, error, onChange, onClose, onConfirm }) {
    return (
        <ConfirmOverlay onClick={event => { if (event.target === event.currentTarget) onClose() }}>
            <ConfirmCard>
                <ConfirmTitle>Delete "{websiteName}"?</ConfirmTitle>
                <ConfirmText>
                    This will permanently delete your website along with <strong>all products, categories, orders, and configuration</strong>.
                    This action <strong>cannot be undone</strong>.<br /><br />
                    Type <strong>{websiteName}</strong> below to confirm.
                </ConfirmText>
                <ConfirmInput value={value} onChange={event => onChange(event.target.value)} placeholder={websiteName} autoFocus />
                {error && <InfoText $error $mb={12}>{error}</InfoText>}
                <ConfirmActions>
                    <GhostBtn onClick={onClose} disabled={deleting}>Cancel</GhostBtn>
                    <DangerBtn onClick={onConfirm} disabled={value !== websiteName || deleting}>
                        {deleting ? "Deleting..." : "Yes, Delete Forever"}
                    </DangerBtn>
                </ConfirmActions>
            </ConfirmCard>
        </ConfirmOverlay>
    )
}
