import React, { useState } from "react"

import {
    SectionBox, TopBar, HeadingText, DropdownContent,
    IconUp, IconDown,
    InputContainer, Label, InputBox, ColorBox, ColorPicker, HexText,
    ImageUploadArea, PreviewImg, EmptyImage, TextArea, MainText, SubText
} from "./HeaderEditor.styles"

function Section({ title, children }) {
    const [open, setOpen] = useState(true)
    return (
        <SectionBox>
            <TopBar open={open} onClick={() => setOpen(p => !p)}>
                <HeadingText>{title}</HeadingText>
                {open ? <IconUp /> : <IconDown />}
            </TopBar>
            <DropdownContent open={open}>{children}</DropdownContent>
        </SectionBox>
    )
}

export default function HeaderEditor({ config, onChange }) {

    const h = config.header || {}
    const set = (key, val) => onChange({ ...config, header: { ...h, [key]: val } })

    return (
        <>
            <Section title="Announcement Bar">
                <InputContainer>
                    <Label>Message Text</Label>
                    <InputBox
                        placeholder="e.g. Flash Sale: Up to 50% Off!"
                        value={h.message || ""}
                        onChange={e => set("message", e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Bar Color</Label>
                    <ColorBox>
                        <ColorPicker value={h.bgColor || "#000000"} onChange={e => set("bgColor", e.target.value)} />
                        <HexText>{h.bgColor || "#000000"}</HexText>
                    </ColorBox>
                </InputContainer>
                <InputContainer>
                    <Label>Text Color</Label>
                    <ColorBox>
                        <ColorPicker value={h.textColor || "#ffffff"} onChange={e => set("textColor", e.target.value)} />
                        <HexText>{h.textColor || "#ffffff"}</HexText>
                    </ColorBox>
                </InputContainer>
            </Section>

            <Section title="Logo">
                <ImageUploadArea>
                    <input type="file" accept="image/*" onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = ev => set("logo", ev.target.result)
                        reader.readAsDataURL(file)
                    }} />
                    {h.logo
                        ? <PreviewImg src={h.logo} alt="logo" />
                        : <EmptyImage>🖼️</EmptyImage>
                    }
                    <TextArea>
                        <MainText>Upload Logo</MainText>
                        <SubText>PNG or SVG recommended</SubText>
                    </TextArea>
                </ImageUploadArea>
            </Section>
        </>
    )
}
