import React from "react"
import {
    LocationCard, EditableTitle, EditableSub, EditableInput,
    FieldGroup, LabelRow, Label, Switch
} from "./LocationEditor.styles"

export default function LocationEditor({ data, onChange }) {

    const title = data.title || "Our Location"
    const subtitle = data.subtitle || "Find us here!"
    const address = data.address || ""

    const update = (key, val) => {
        onChange({ ...data, [key]: val })
    }

    return (
        <>
            <FieldGroup $marginBottom="24px">
                <LabelRow>
                    <Label>Show location section</Label>
                    <Switch
                        $active={data.show !== false}
                        onClick={() => update("show", !data.show)}
                    />
                </LabelRow>
            </FieldGroup>

            <LocationCard>
                <EditableTitle
                    value={title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Section Title"
                />

                <EditableSub
                    value={subtitle}
                    onChange={(e) => update("subtitle", e.target.value)}
                    placeholder="Section Subtitle"
                />

                <EditableInput
                    value={address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="Enter your full address..."
                />
            </LocationCard>
        </>
    )
}
