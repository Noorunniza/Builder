import React from "react"
import {
    ContactCard, EditableTitle, EditableSub,
    EditableInput, EditableTextarea, EditableButton,
    FieldGroup, LabelRow, Label, Switch
} from "./ContactEditor.styles"

export default function ContactEditor({ data, onChange }) {

    const title = data.title || "Contact us"
    const subtitle = data.subtitle || "Have a question? We're here for you!"
    const buttonText = data.buttonText || "Send"

    const namePlaceholder = data.namePlaceholder || "Name*"
    const emailPlaceholder = data.emailPlaceholder || "Email*"
    const phonePlaceholder = data.phonePlaceholder || "Number*"
    const messagePlaceholder = data.messagePlaceholder || "Message*"

    const update = (key, val) => {
        onChange({ ...data, [key]: val })
    }

    return (
        <>
            <FieldGroup $marginBottom="24px">
                <LabelRow>
                    <Label>Show contact section</Label>
                    <Switch
                        $active={data.show !== false}
                        onClick={() => update("show", !data.show)}
                    />
                </LabelRow>
            </FieldGroup>

            <ContactCard>
                <EditableTitle
                    value={title}
                    onChange={(e) => update("title", e.target.value)}
                />

                <EditableSub
                    value={subtitle}
                    onChange={(e) => update("subtitle", e.target.value)}
                />

                <EditableInput
                    value={namePlaceholder}
                    onChange={(e) => update("namePlaceholder", e.target.value)}
                />
                <EditableInput
                    value={emailPlaceholder}
                    onChange={(e) => update("emailPlaceholder", e.target.value)}
                />
                <EditableInput
                    value={phonePlaceholder}
                    onChange={(e) => update("phonePlaceholder", e.target.value)}
                />
                <EditableTextarea
                    value={messagePlaceholder}
                    onChange={(e) => update("messagePlaceholder", e.target.value)}
                />

                <EditableButton
                    value={buttonText}
                    onChange={(e) => update("buttonText", e.target.value)}
                />
            </ContactCard>
        </>
    )
}
