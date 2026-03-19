import React, { useState } from "react"

import {
    SectionBox, TopBar, HeadingText, DropdownContent,
    IconUp, IconDown,
    InputContainer, Label, InputBox, ColorBox, ColorPicker, HexText
} from "./FooterEditor.styles"

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

export default function FooterEditor({ config, onChange }) {

    const f = config.footer || {}
    const s = config.social || {}
    const setFooter = (key, val) => onChange({ ...config, footer: { ...f, [key]: val } })
    const setSocial = (key, val) => onChange({ ...config, social: { ...s, [key]: val } })

    return (
        <>
            <Section title="Social Links">
                <InputContainer>
                    <Label>Instagram URL</Label>
                    <InputBox
                        placeholder="https://instagram.com/yourstore"
                        value={s.instagram || ""}
                        onChange={e => setSocial("instagram", e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Facebook URL</Label>
                    <InputBox
                        placeholder="https://facebook.com/yourstore"
                        value={s.facebook || ""}
                        onChange={e => setSocial("facebook", e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>YouTube URL</Label>
                    <InputBox
                        placeholder="https://youtube.com/@yourstore"
                        value={s.youtube || ""}
                        onChange={e => setSocial("youtube", e.target.value)}
                    />
                </InputContainer>
            </Section>

            <Section title="Copyright">
                <InputContainer>
                    <Label>Copyright Text</Label>
                    <InputBox
                        placeholder="© 2026 My Store. All rights reserved."
                        value={f.copyright || ""}
                        onChange={e => setFooter("copyright", e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Footer Background Color</Label>
                    <ColorBox>
                        <ColorPicker value={f.bgColor || "#0f172a"} onChange={e => setFooter("bgColor", e.target.value)} />
                        <HexText>{f.bgColor || "#0f172a"}</HexText>
                    </ColorBox>
                </InputContainer>
            </Section>
        </>
    )
}
