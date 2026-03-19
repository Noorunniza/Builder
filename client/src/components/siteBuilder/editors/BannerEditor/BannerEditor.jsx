import React, { useState } from "react"

import {
    SectionBox, TopBar, HeadingText, DropdownContent,
    IconUp, IconDown,
    InputContainer, Label, InputBox, ColorBox, ColorPicker, HexText,
    ImageUploadArea, PreviewImg, EmptyImage, TextArea, MainText, SubText
} from "./BannerEditor.styles"

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

export default function BannerEditor({ config, onChange }) {

    const b = config.banner || {}
    const set = (key, val) => onChange({ ...config, banner: { ...b, [key]: val } })

    return (
        <>
            <Section title="Store Info">
                <InputContainer>
                    <Label>Store Name</Label>
                    <InputBox
                        placeholder="Your store name"
                        value={b.storeName || ""}
                        onChange={e => set("storeName", e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Tagline</Label>
                    <InputBox
                        placeholder="e.g. Food & Beverages"
                        value={b.tagline || ""}
                        onChange={e => set("tagline", e.target.value)}
                    />
                </InputContainer>
            </Section>

            <Section title="Hero Background">
                <ImageUploadArea>
                    <input type="file" accept="image/*" onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = ev => set("bgImage", ev.target.result)
                        reader.readAsDataURL(file)
                    }} />
                    {b.bgImage
                        ? <PreviewImg src={b.bgImage} alt="banner" />
                        : <EmptyImage>🌄</EmptyImage>
                    }
                    <TextArea>
                        <MainText>Upload Banner Image</MainText>
                        <SubText>Recommended: 1200×500</SubText>
                    </TextArea>
                </ImageUploadArea>
                <InputContainer>
                    <Label>Background Color (fallback)</Label>
                    <ColorBox>
                        <ColorPicker value={b.bgColor || "#1e293b"} onChange={e => set("bgColor", e.target.value)} />
                        <HexText>{b.bgColor || "#1e293b"}</HexText>
                    </ColorBox>
                </InputContainer>
                <InputContainer>
                    <Label>Text Color</Label>
                    <ColorBox>
                        <ColorPicker value={b.textColor || "#ffffff"} onChange={e => set("textColor", e.target.value)} />
                        <HexText>{b.textColor || "#ffffff"}</HexText>
                    </ColorBox>
                </InputContainer>
            </Section>
        </>
    )
}
