import React from "react"
import {
    Page, PageTitle, PageSub, Section, SectionHead, SectionIconWrap, SectionInfo, SectionTitle, SectionDesc,
    FieldGroup, FieldRow, Field, Label, LabelHint, Input, InputPrefix, Prefix, PrefixInput, Hint, Select,
    SaveBar, SaveMsg, PrimaryBtn, PublishToggleRow, PublishToggleLeft, PublishToggleLabel, PublishToggleDesc,
    ToggleSwitch, StatusPill, DangerBtn, InfoText, CheckIcon, TrashIcon, SettingsIcon, GlobeIcon, ShieldAlertIcon
} from "./SettingsTab.styles"
import SettingsDeleteModal from "./SettingsDeleteModal"

const SITE_TYPES = [
    { value: "online-store", label: "Online Store" },
    { value: "portfolio", label: "Portfolio" },
    { value: "blog", label: "Blog" },
    { value: "restaurant", label: "Restaurant" },
    { value: "booking", label: "Booking" },
    { value: "business", label: "Business" }
]

function SaveFooter({ onSave, saving, saved, error, label = "Save Changes" }) {
    return (
        <SaveBar>
            {error && <SaveMsg $error>{error}</SaveMsg>}
            {saved && <SaveMsg><CheckIcon />Saved!</SaveMsg>}
            <PrimaryBtn onClick={onSave} disabled={saving}>{saving ? "Saving..." : label}</PrimaryBtn>
        </SaveBar>
    )
}

export default function SettingsTabContent({ website, state }) {
    const siteUrl = `${window.location.origin}/live/${state.subdomain}`

    return (
        <Page>
            <PageTitle>Settings</PageTitle>
            <PageSub>Manage your store configuration, contact info, and publish status.</PageSub>

            <Section>
                <SectionHead>
                    <SectionIconWrap $variant="general"><SettingsIcon /></SectionIconWrap>
                    <SectionInfo><SectionTitle>General</SectionTitle><SectionDesc>Your store name and public URL.</SectionDesc></SectionInfo>
                </SectionHead>
                <FieldGroup>
                    <FieldRow>
                        <Field>
                            <Label>Store Name</Label>
                            <Input value={state.name} onChange={event => state.handleNameChange(event.target.value)} placeholder="My Awesome Store" />
                        </Field>
                        <Field>
                            <Label>Site Type <LabelHint>(read-only)</LabelHint></Label>
                            <Select disabled value={website?.type || ""}>{SITE_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}</Select>
                        </Field>
                    </FieldRow>
                    <Field $full>
                        <Label>Custom Subdomain</Label>
                        <InputPrefix>
                            <Prefix>{window.location.origin}/live/</Prefix>
                            <PrefixInput value={state.subdomain} onChange={event => state.handleSubdomainChange(event.target.value)} placeholder="my-store" />
                        </InputPrefix>
                        <Hint>Your store will be live at: <strong>{siteUrl}</strong></Hint>
                    </Field>
                </FieldGroup>
                <SaveFooter onSave={state.saveGeneral} saving={state.generalSaving} saved={state.generalSaved} error={state.generalError} />
            </Section>

            <Section>
                <SectionHead>
                    <SectionIconWrap $variant="globe"><GlobeIcon /></SectionIconWrap>
                    <SectionInfo><SectionTitle>Publish</SectionTitle><SectionDesc>Control whether your store is visible to the public.</SectionDesc></SectionInfo>
                </SectionHead>
                <PublishToggleRow>
                    <PublishToggleLeft>
                        <PublishToggleLabel>Live Status <StatusPill $live={state.isLive}>{state.isLive ? "Live" : "Draft"}</StatusPill></PublishToggleLabel>
                        <PublishToggleDesc>{state.isLive ? "Your store is publicly accessible at your subdomain URL." : "Your store is hidden from the public. Publish to make it live."}</PublishToggleDesc>
                    </PublishToggleLeft>
                    <ToggleSwitch $on={state.isLive}><input type="checkbox" checked={state.isLive} onChange={state.togglePublish} disabled={state.publishSaving} /><span /></ToggleSwitch>
                </PublishToggleRow>
                {state.publishError && <InfoText $error>{state.publishError}</InfoText>}
            </Section>

            <Section $danger>
                <SectionHead>
                    <SectionIconWrap $variant="danger"><ShieldAlertIcon /></SectionIconWrap>
                    <SectionInfo><SectionTitle $danger>Danger Zone</SectionTitle><SectionDesc $danger>These actions are permanent and cannot be undone.</SectionDesc></SectionInfo>
                </SectionHead>
                <PublishToggleRow>
                    <PublishToggleLeft>
                        <PublishToggleLabel>Delete This Website</PublishToggleLabel>
                        <PublishToggleDesc>Permanently delete your website, all products, orders, categories, and configuration.</PublishToggleDesc>
                    </PublishToggleLeft>
                    <DangerBtn onClick={state.openDeleteConfirm}><TrashIcon />Delete Website</DangerBtn>
                </PublishToggleRow>
            </Section>

            {state.showDeleteConfirm && (
                <SettingsDeleteModal
                    websiteName={website?.name}
                    value={state.deleteConfirmText}
                    deleting={state.deleting}
                    error={state.deleteError}
                    onChange={state.setDeleteConfirmText}
                    onClose={state.closeDeleteConfirm}
                    onConfirm={state.confirmDelete}
                />
            )}
        </Page>
    )
}
