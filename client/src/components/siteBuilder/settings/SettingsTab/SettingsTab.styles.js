import styled, { keyframes, css } from "styled-components"
import { CheckCircle2, Mail, Phone, MapPin, FileText, Trash2, Settings, Store, Globe, ShieldAlert } from "lucide-react"

export const CheckIcon = styled(CheckCircle2).attrs({ size: 14 })`
  margin-right: 4px;
  vertical-align: middle;
`

export const MailIcon = styled(Mail).attrs({ size: 12 })`
  margin-right: 5px;
  vertical-align: middle;
`

export const PhoneIcon = styled(Phone).attrs({ size: 12 })`
  margin-right: 5px;
  vertical-align: middle;
`

export const MapPinIcon = styled(MapPin).attrs({ size: 12 })`
  margin-right: 5px;
  vertical-align: middle;
`

export const FileTextIcon = styled(FileText).attrs({ size: 12 })`
  margin-right: 5px;
  vertical-align: middle;
`

export const TrashIcon = styled(Trash2).attrs({ size: 15 })`
  margin-right: 7px;
  vertical-align: middle;
`

export const SettingsIcon = styled(Settings).attrs({ size: 20 })``
export const StoreIcon = styled(Store).attrs({ size: 20 })``
export const GlobeIcon = styled(Globe).attrs({ size: 20 })``
export const ShieldAlertIcon = styled(ShieldAlert).attrs({ size: 20 })``
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  padding: 28px 32px 56px;
  background: #f8fafc;
  min-height: 100%;
  animation: ${fadeUp} 0.3s ease;

  @media (max-width: 800px) { padding: 20px 16px 48px; }
`

export const PageTitle = styled.h1`
  margin: 0 0 4px;
  color: #0f172a;
  font-size: 22px;
  font-weight: 800;
`

export const PageSub = styled.p`
  margin: 0 0 32px;
  color: #64748b;
  font-size: 14px;
`

export const Section = styled.div`
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 26px 28px;
  margin-bottom: 20px;

  @media (max-width: 800px) { padding: 20px 16px; }

  ${p => p.$danger && css`
    border-color: #fca5a5;
    background: #fff5f5;
  `}
`

export const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
`

export const SectionIconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${p => p.$variant === "general" && css`background: #ede9fe; color: #6d28d9;`}
  ${p => p.$variant === "store" && css`background: #dbeafe; color: #1d4ed8;`}
  ${p => p.$variant === "globe" && css`background: #dcfce7; color: #16a34a;`}
  ${p => p.$variant === "danger" && css`background: #fee2e2; color: #dc2626;`}
`

export const SectionInfo = styled.div``

export const SectionTitle = styled.h2`
  margin: 0 0 3px;
  color: ${p => p.$danger ? "#991b1b" : "#0f172a"};
  font-size: 16px;
  font-weight: 800;
`

export const SectionDesc = styled.p`
  margin: 0;
  color: ${p => p.$danger ? "#b91c1c" : "#64748b"};
  font-size: 13px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 700px) { grid-template-columns: 1fr; }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  ${p => p.$full && css`grid-column: 1 / -1;`}
`

export const Label = styled.label`
  color: #334155;
  font-size: 13px;
  font-weight: 700;
`

export const LabelHint = styled.span`
  color: #94a3b8;
  font-weight: 400;
  margin-left: 6px;
`

export const Input = styled.input`
  width: 100%;
  height: 46px;
  border: 1.5px solid ${p => p.$error ? "#ef4444" : "#e2e8f0"};
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.18s;

  &:focus {
    border-color: ${p => p.$error ? "#ef4444" : "#6366f1"};
    box-shadow: 0 0 0 3px ${p => p.$error ? "rgba(239,68,68,.12)" : "rgba(99,102,241,.12)"};
  }

  &:disabled {
    background: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }
`

export const InputPrefix = styled.div`
  display: flex;
  align-items: center;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.18s;

  &:focus-within {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
`

export const Prefix = styled.div`
  padding: 0 12px;
  height: 46px;
  display: flex;
  align-items: center;
  background: #f1f5f9;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  border-right: 1.5px solid #e2e8f0;
  white-space: nowrap;
  flex-shrink: 0;
`

export const PrefixInput = styled.input`
  flex: 1;
  height: 46px;
  border: none;
  background: transparent;
  color: #0f172a;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
`

export const Hint = styled.div`
  color: ${p => p.$error ? "#dc2626" : "#94a3b8"};
  font-size: 12px;
  font-weight: 500;
`

export const Select = styled.select`
  width: 100%;
  height: 46px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,.12);
  }
`

export const SaveBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
  margin-top: 20px;
`

export const SaveMsg = styled.div`
  color: ${p => p.$error ? "#dc2626" : "#22c55e"};
  font-size: 13px;
  font-weight: 700;
  margin-right: auto;
`

export const PrimaryBtn = styled.button`
  height: 42px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: #fff;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;

  &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 24px rgba(99,102,241,.32); }
  &:disabled { opacity: 0.55; cursor: not-allowed; }
`

export const PublishToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child { border-bottom: none; }
`

export const PublishToggleLeft = styled.div``
export const PublishToggleLabel = styled.div`
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 2px;
`
export const PublishToggleDesc = styled.div`
  color: #64748b;
  font-size: 13px;
`

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  flex-shrink: 0;
  cursor: pointer;

  input { opacity: 0; width: 0; height: 0; }

  span {
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: ${p => p.$on ? "#4f46e5" : "#cbd5e1"};
    transition: background 0.22s;
  }

  span::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    top: 4px;
    left: ${p => p.$on ? "24px" : "4px"};
    transition: left 0.22s;
    box-shadow: 0 2px 6px rgba(0,0,0,.2);
  }
`

export const StatusPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  background: ${p => p.$live ? "#dcfce7" : "#fef3c7"};
  color: ${p => p.$live ? "#16a34a" : "#a16207"};
`

export const DangerBtn = styled.button`
  height: 42px;
  border: 1.5px solid #ef4444;
  border-radius: 12px;
  background: transparent;
  color: #ef4444;
  padding: 0 22px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, transform 0.18s;

  &:hover:not(:disabled) {
    background: #ef4444;
    color: #fff;
    transform: translateY(-1px);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

export const ConfirmOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1300;
`

export const ConfirmCard = styled.div`
  width: min(460px, 100%);
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 28px 80px rgba(15,23,42,.28);
`

export const ConfirmTitle = styled.h3`
  margin: 0 0 10px;
  color: #0f172a;
  font-size: 20px;
  font-weight: 800;
`

export const ConfirmText = styled.p`
  margin: 0 0 18px;
  color: #475569;
  font-size: 14px;
  line-height: 1.65;
`

export const ConfirmInput = styled.input`
  width: 100%;
  height: 46px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 18px;

  &:focus { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.12); }
`

export const ConfirmActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

export const GhostBtn = styled.button`
  height: 42px;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  color: #334155;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.18s;
  &:hover { border-color: #94a3b8; }
`

export const InfoText = styled.p`
  color: ${p => p.$error ? "#dc2626" : "#64748b"};
  font-size: 13px;
  font-weight: ${p => p.$error ? 700 : 400};
  margin-bottom: ${p => p.$mb ? `${p.$mb}px` : "0"};
`
