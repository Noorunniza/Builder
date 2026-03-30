import React from "react"
import { builderSections } from "../orderBuilderConfig"
import {
    BuilderCard,
    BuilderHeader,
    BuilderTitle,
    BuilderDescription,
    BuilderGrid,
    BuilderField,
    BuilderLabel,
    BuilderInput,
    BuilderTextarea,
    BuilderSelect,
    BuilderToggleRow,
    BuilderCheckboxText,
    BuilderSaveBar,
    BuilderSaveButton,
    BuilderSaveText
} from "../OrdersTab.styles"

export default function OrderBuilderPanel({ activeTab, config, onChange, onSave, isSaving, saved }) {
    const section = builderSections[activeTab]
    if (!section) return null

    const values = config[section.key] || {}

    return (
        <BuilderCard>
            <BuilderHeader>
                <BuilderTitle>{section.title}</BuilderTitle>
                <BuilderDescription>{section.description}</BuilderDescription>
            </BuilderHeader>

            <BuilderGrid>
                {section.fields.map(field => (
                    <BuilderField key={field.key} $full={field.type === "textarea"}>
                        {field.type === "boolean" ? (
                            <BuilderToggleRow>
                                <input
                                    type="checkbox"
                                    checked={Boolean(values[field.key])}
                                    onChange={(event) => onChange(section.key, field.key, event.target.checked)}
                                />
                                <BuilderCheckboxText>{field.label}</BuilderCheckboxText>
                            </BuilderToggleRow>
                        ) : (
                            <>
                                <BuilderLabel>{field.label}</BuilderLabel>
                                {field.type === "textarea" && (
                                    <BuilderTextarea value={values[field.key] || ""} onChange={(event) => onChange(section.key, field.key, event.target.value)} />
                                )}
                                {field.type === "select" && (
                                    <BuilderSelect value={values[field.key] || ""} onChange={(event) => onChange(section.key, field.key, event.target.value)}>
                                        {field.options.map(option => <option key={option} value={option}>{option}</option>)}
                                    </BuilderSelect>
                                )}
                                {(field.type === "text" || field.type === "number") && (
                                    <BuilderInput type={field.type} value={values[field.key] ?? ""} onChange={(event) => onChange(section.key, field.key, field.type === "number" ? Number(event.target.value) || 0 : event.target.value)} />
                                )}
                            </>
                        )}
                    </BuilderField>
                ))}
            </BuilderGrid>

            <BuilderSaveBar>
                <BuilderSaveText>{saved ? "Saved to website builder config." : "Save to make these settings part of the website builder flow."}</BuilderSaveText>
                <BuilderSaveButton onClick={onSave} disabled={isSaving}>{isSaving ? "Saving..." : saved ? "Saved" : "Save Changes"}</BuilderSaveButton>
            </BuilderSaveBar>
        </BuilderCard>
    )
}
