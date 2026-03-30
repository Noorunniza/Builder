import React, { useState } from "react"
import { uploadImage } from "../../../../services/uploadService"

import {
    SectionBox, TopBar, HeadingText, DropdownContent,
    IconUp, IconDown,
    InputContainer, Label, InputBox, ColorBox, ColorPicker, HexText,
    ImageUploadArea, PreviewImg, EmptyImage, TextArea, MainText, SubText,
    DEFAULT_BG_COLOR, DEFAULT_TEXT_COLOR
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
                    <input type="file" accept="image/*" onChange={async e => {
                        const file = e.target.files[0]
                        if (!file) return
                        try {
                            const url = await uploadImage(file)
                            set("bgImage", url)
                        } catch (err) {
                            console.error("Banner upload failed", err)
                        }
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
                        <ColorPicker value={b.bgColor || DEFAULT_BG_COLOR} onChange={e => set("bgColor", e.target.value)} />
                        <HexText>{b.bgColor || DEFAULT_BG_COLOR}</HexText>
                    </ColorBox>
                </InputContainer>
                <InputContainer>
                    <Label>Text Color</Label>
                    <ColorBox>
                        <ColorPicker value={b.textColor || DEFAULT_TEXT_COLOR} onChange={e => set("textColor", e.target.value)} />
                        <HexText>{b.textColor || DEFAULT_TEXT_COLOR}</HexText>
                    </ColorBox>
                </InputContainer>
            </Section>
        </>
    )
}
