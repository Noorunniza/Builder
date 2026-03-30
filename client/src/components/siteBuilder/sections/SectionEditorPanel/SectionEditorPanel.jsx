import React from "react"
import { EditorSide, EditorContent, SectionTitle, SaveBar, SaveButton } from "../SectionsManager/SectionsManager.styles"
import PolicyEditor from "../../editors/PolicyEditor/PolicyEditor"
import ContactEditor from "../../editors/ContactEditor/ContactEditor"
import LocationEditor from "../../editors/LocationEditor/LocationEditor"

export default function SectionEditorPanel({
    activeSection,
    sectionData,
    onChange,
    onSave,
    saving,
    saved,
    nav
}) {
    return (
        <EditorSide>
            {nav}

            <EditorContent>
                <SectionTitle>{sectionData?.linkName || sectionData?.title || activeSection.name}</SectionTitle>

                {activeSection.id === "contact" ? (
                    <ContactEditor
                        data={sectionData}
                        onChange={(data) => onChange(activeSection.id, data)}
                    />
                ) : activeSection.id === "location" ? (
                    <LocationEditor
                        data={sectionData}
                        onChange={(data) => onChange(activeSection.id, data)}
                    />
                ) : (
                    <PolicyEditor
                        section={activeSection}
                        data={sectionData}
                        onChange={onChange}
                    />
                )}
            <SaveBar>
                <SaveButton onClick={onSave} disabled={saving}>
                    {saving ? "Saving..." : saved ? "✓ Saved!" : "Save Changes"}
                </SaveButton>
            </SaveBar>
        </EditorContent>
    </EditorSide>
    )
}
