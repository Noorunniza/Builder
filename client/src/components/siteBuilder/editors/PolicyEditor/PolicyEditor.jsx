import React from "react"
import {
    FieldGroup, LabelRow, Label, Switch,
    ColorInput, ColorPicker, ColorValue,
    TextArea, CharCount, LinkNameInput
} from "./PolicyEditor.styles"

export default function PolicyEditor({ section, data, onChange }) {

    const update = (key, val) => {
        onChange(section.id, { ...data, [key]: val })
    }

    return (
        <>
            <FieldGroup>
                <LabelRow>
                    <Label>Show {section.name.toLowerCase()}</Label>
                    <Switch
                        $active={data.show}
                        onClick={() => update("show", !data.show)}
                    />
                </LabelRow>
            </FieldGroup>

            <FieldGroup>
                <Label>Link Name (Footer & Title)</Label>
                <LinkNameInput
                    type="text"
                    value={data.linkName || section.name}
                    onChange={(e) => update("linkName", e.target.value)}
                />
            </FieldGroup>

            <FieldGroup>
                <Label>Text Color</Label>
                <ColorInput>
                    <ColorPicker
                        value={data.color}
                        onChange={(e) => update("color", e.target.value)}
                    />
                    <ColorValue $color={data.color} />
                </ColorInput>
            </FieldGroup>

            <FieldGroup>
                <Label>Description</Label>
                <TextArea
                    placeholder={`Your ${section.name.toLowerCase()} content here...`}
                    value={data.content || ""}
                    onChange={(e) => update("content", e.target.value)}
                />
                <CharCount>{data.content?.length || 0} letters</CharCount>
            </FieldGroup>
        </>
    )
}
