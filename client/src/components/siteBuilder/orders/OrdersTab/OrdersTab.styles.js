import styled, { css } from "styled-components"
import { Printer } from "lucide-react"

export const PrintIcon = styled(Printer).attrs({ size: 16 })``


const rowToneStyles = {
  today: css`background: #dcfce7;`,
  yesterday: css`background: #fef3c7;`,
  older: css`background: #ffffff;`
}

const badgeToneStyles = {
  green: css`background: #dcfce7; color: #166534;`,
  yellow: css`background: #fef3c7; color: #92400e;`,
  red: css`background: #fee2e2; color: #991b1b;`,
  blue: css`background: #dbeafe; color: #1d4ed8;`
}

const optionToneStyles = {
  green: css`border-color: #22c55e; background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%); box-shadow: 0 18px 36px rgba(34, 197, 94, 0.14);`,
  yellow: css`border-color: #f59e0b; background: linear-gradient(180deg, #fffbeb 0%, #ffffff 100%); box-shadow: 0 18px 36px rgba(245, 158, 11, 0.14);`,
  red: css`border-color: #ef4444; background: linear-gradient(180deg, #fef2f2 0%, #ffffff 100%); box-shadow: 0 18px 36px rgba(239, 68, 68, 0.14);`,
  blue: css`border-color: #3b82f6; background: linear-gradient(180deg, #eff6ff 0%, #ffffff 100%); box-shadow: 0 18px 36px rgba(59, 130, 246, 0.14);`
}

const optionIconStyles = {
  green: css`background: #dcfce7; color: #15803d;`,
  yellow: css`background: #fef3c7; color: #b45309;`,
  red: css`background: #fee2e2; color: #b91c1c;`,
  blue: css`background: #dbeafe; color: #2563eb;`
}

export const OrdersContainer = styled.div`padding: 20px 24px 28px; background: #ffffff; min-height: 100%;`
export const EmptyState = styled.div`padding: 44px 18px; border: 1px solid #e5e7eb; border-radius: 16px; background: #ffffff; text-align: center; color: #64748b; font-size: 15px;`
export const InfoText = styled.p`margin: 0 0 14px; color: ${p => p.$error ? "#b91c1c" : "#64748b"}; font-size: 14px; font-weight: ${p => p.$error ? 700 : 500};`

export const Select = styled.select`
  min-width: 146px;
  height: 38px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background: #ffffff;
  color: #111827;
  padding: 0 14px;
  font-size: 14px;
  font-weight: 600;
  outline: none;
`

export const Checkbox = styled.input`width: 16px; height: 16px; cursor: pointer; accent-color: #4f46e5;`

export const TopNav = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 0 14px;
  margin-bottom: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar { height: 4px; }
`

export const TopNavItem = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  padding: 0;
  color: ${p => p.$active ? "#4f46e5" : "#111827"};
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  position: relative;
  cursor: ${p => p.$active ? "default" : "pointer"};

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 -16px;
    height: 2px;
    background: ${p => p.$active ? "#4f46e5" : "transparent"};
  }
`

export const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const TitleBlock = styled.div``
export const Title = styled.h1`margin: 0 0 6px; color: #111827; font-size: 20px; font-weight: 700;`
export const Subtitle = styled.p`margin: 0; color: #6b7280; font-size: 14px;`
export const HeaderActions = styled.div`display: flex; align-items: center; gap: 12px;`

export const PrintButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  border: none;
  border-radius: 10px;
  background: #6b7280;
  color: #ffffff;
  padding: 0 14px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`

export const SummaryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

export const SummaryCard = styled.div`border: 1px solid #e5e7eb; border-radius: 14px; background: #f8fafc; padding: 14px 16px;`
export const SummaryLabel = styled.div`color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;`
export const SummaryValue = styled.div`color: #111827; font-size: 24px; font-weight: 800;`

export const StatusTabs = styled.div`display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;`

export const StatusTab = styled.button`
  min-width: 118px;
  height: 52px;
  border: 1px solid ${p => p.$active ? "#22c55e" : "#d1d5db"};
  border-radius: 10px;
  background: #ffffff;
  color: ${p => p.$active ? "#16a34a" : "#374151"};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
`

export const FiltersArea = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 134px 54px 54px;
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

export const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #111827;
  padding: 0 16px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #94a3b8;
    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.14);
  }
`

export const ActionButton = styled.button`
  height: 48px;
  border: none;
  border-radius: 10px;
  background: ${p => p.$primary ? "#2563eb" : "#6b7280"};
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const LegendArea = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #ffffff;
  padding: 12px 14px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`

export const LegendItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #475569;
  font-size: 13px;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 999px;
    ${p => p.$variant === "today" && css`background: #86efac;`}
    ${p => p.$variant === "yesterday" && css`background: #fde68a;`}
    ${p => p.$variant === "older" && css`background: #ffffff; border: 1px solid #cbd5e1;`}
  }
`

export const TableWrap = styled.div`overflow-x: auto;`
export const Table = styled.table`width: 100%; min-width: 1100px; border-collapse: separate; border-spacing: 0;`

export const Th = styled.th`
  text-align: left;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-left: 0;
  background: #ffffff;
  color: #374151;
  font-size: 12px;
  font-weight: 800;
  width: ${p => p.$width ? `${p.$width}px` : "auto"};

  &:first-child { border-left: 1px solid #d1d5db; border-top-left-radius: 10px; }
  &:last-child { border-top-right-radius: 10px; }
`

export const Td = styled.td`
  padding: 14px;
  border-right: 1px solid #d1d5db;
  border-bottom: 1px solid #d1d5db;
  color: #334155;
  font-size: 14px;
  vertical-align: top;
  transition: box-shadow 0.18s ease;
  ${p => rowToneStyles[p.$rowTone || "older"]}
  ${p => p.$selected && css`box-shadow: inset 0 0 0 999px rgba(79, 70, 229, 0.08);`}

  &:first-child { border-left: 1px solid #d1d5db; }
`

export const LinkButton = styled.button`border: none; background: transparent; color: #2563eb; font-size: 14px; font-weight: 700; cursor: pointer; padding: 0;`

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 82px;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
  ${p => badgeToneStyles[p.$tone || "blue"]}
`

export const OrderText = styled.div`color: #0f172a; font-weight: 700;`
export const MutedText = styled.div`color: #64748b; font-size: 13px; margin-top: 4px;`

export const RowDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 18px;
  padding: 4px 0;
  color: #475569;
  font-size: 14px;
  background: #f8fafc;

  @media (max-width: 760px) { grid-template-columns: 1fr; }
`

export const SelectionToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid #c7d2fe;
  border-radius: 18px;
  background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%);
  padding: 16px 18px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const SelectionSummary = styled.div`min-width: 0;`
export const SelectionTitle = styled.div`color: #1e1b4b; font-size: 17px; font-weight: 800; margin-bottom: 4px;`
export const SelectionMeta = styled.div`color: #475569; font-size: 13px; line-height: 1.5;`
export const SelectionActions = styled.div`display: flex; align-items: center; gap: 10px; flex-wrap: wrap;`

export const GhostButton = styled.button`
  height: 42px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #ffffff;
  color: #334155;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.18s ease, transform 0.18s ease;

  &:hover:not(:disabled) { border-color: #94a3b8; transform: translateY(-1px); }
  &:disabled { cursor: not-allowed; opacity: 0.6; }
`

export const PrimaryButton = styled.button`
  height: 42px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%);
  color: #ffffff;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;

  &:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 12px 26px rgba(37, 99, 235, 0.24); }
  &:disabled { cursor: not-allowed; opacity: 0.6; box-shadow: none; }
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1200;
`

export const ModalCard = styled.div`
  width: min(640px, 100%);
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.28);
  padding: 24px;
`

export const ModalHeader = styled.div`margin-bottom: 22px;`
export const ModalEyebrow = styled.div`color: #4338ca; font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px;`
export const ModalTitle = styled.h3`margin: 0 0 8px; color: #0f172a; font-size: 28px; font-weight: 800;`
export const ModalText = styled.p`margin: 0; color: #475569; font-size: 14px; line-height: 1.65;`

export const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 22px;

  @media (max-width: 760px) { grid-template-columns: 1fr; }
`

export const StatusOptionCard = styled.button`
  text-align: left;
  border: 1px solid #dbe2ea;
  border-radius: 18px;
  background: #ffffff;
  min-height: 168px;
  padding: 18px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;

  &:hover { transform: translateY(-2px); border-color: #94a3b8; box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08); }
  ${p => p.$active && optionToneStyles[p.$tone || "blue"]}
`

export const StatusOptionIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  ${p => optionIconStyles[p.$tone || "blue"]}
`

export const StatusOptionTitle = styled.div`color: #0f172a; font-size: 18px; font-weight: 800; margin-bottom: 8px;`
export const StatusOptionDescription = styled.div`color: #64748b; font-size: 13px; line-height: 1.6;`
export const ModalFooter = styled.div`display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap;`

export const BuilderCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  padding: 22px;
`

export const BuilderHeader = styled.div`margin-bottom: 18px;`
export const BuilderTitle = styled.h3`margin: 0 0 8px; color: #0f172a; font-size: 24px; font-weight: 800;`
export const BuilderDescription = styled.p`margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;`

export const BuilderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
`

export const BuilderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${p => p.$full && css`grid-column: 1 / -1;`}
`

export const BuilderLabel = styled.label`color: #334155; font-size: 13px; font-weight: 700;`

const builderControlStyles = css`
  width: 100%;
  min-height: 44px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #0f172a;
  padding: 0 14px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #94a3b8;
    box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.14);
  }
`

export const BuilderInput = styled.input`${builderControlStyles}`
export const BuilderSelect = styled.select`${builderControlStyles}`
export const BuilderTextarea = styled.textarea`${builderControlStyles}; min-height: 110px; padding: 12px 14px; resize: vertical;`

export const BuilderToggleRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 2px;
`

export const BuilderCheckboxText = styled.span`color: #334155; font-size: 14px; font-weight: 600;`

export const BuilderSaveBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid #e2e8f0;
  margin-top: 20px;
  padding-top: 18px;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const BuilderSaveText = styled.div`color: #64748b; font-size: 13px; line-height: 1.5;`
export const BuilderSaveButton = styled(PrimaryButton)`min-width: 148px;`

export const BuilderSplit = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 520px) minmax(320px, 1fr);
  gap: 28px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

export const BuilderControls = styled.div`display: flex; flex-direction: column; gap: 18px;`
export const BuilderPreview = styled.div`display: flex; justify-content: center;`

export const BuilderSectionCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background: #ffffff;
  padding: 20px;
`

export const BuilderSectionHead = styled.div`margin-bottom: 16px;`
export const BuilderSectionTitle = styled.h3`margin: 0 0 6px; color: #0f172a; font-size: 30px; font-weight: 800;`
export const BuilderSectionHint = styled.p`margin: 0; color: #64748b; font-size: 14px; line-height: 1.55;`

export const BuilderControlGroup = styled.div`
  border-top: 1px solid #eef2f7;
  padding-top: 16px;
  margin-top: 16px;
`

export const BuilderControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  border-radius: 12px;
  background: linear-gradient(90deg, #eef2ff 0%, #f5f7ff 100%);
  color: #334155;
  padding: 0 14px;
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 14px;
`

export const BuilderControlLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #334155;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 2px;
`

export const BuilderSwitch = styled.input`
  width: 42px;
  height: 24px;
  accent-color: #5b34ea;
  cursor: pointer;
`

export const BuilderMiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 10px;
`

export const BuilderMiniField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const BuilderMiniInput = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: #ffffff;
  color: #0f172a;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`

export const BuilderPreviewPhone = styled.div`
  width: min(460px, 100%);
  max-height: 680px;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 26px;
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
  padding: 28px 26px;
`

export const BuilderPreviewTitle = styled.h3`
  margin: 0 0 18px;
  color: #0f172a;
  font-size: 28px;
  font-weight: 800;
`

export const BuilderPreviewField = styled.div`
  display: flex;
  align-items: center;
  height: 58px;
  border: 1px solid #d1d5db;
  border-radius: 14px;
  background: #ffffff;
  color: #94a3b8;
  padding: 0 16px;
  font-size: 15px;
  margin-bottom: 14px;
`

export const BuilderPreviewBlock = styled.h4`
  margin: 26px 0 14px;
  color: #111827;
  font-size: 18px;
  font-weight: 800;
`

export const BuilderPreviewOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  border: 1px solid #111827;
  border-radius: 14px;
  background: #f3f4f6;
  color: #111827;
  padding: 0 18px;
  font-size: 15px;
  margin-bottom: 12px;
`
