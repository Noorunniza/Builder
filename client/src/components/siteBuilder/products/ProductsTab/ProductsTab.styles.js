import styled from "styled-components"

/* ── Sub Nav ─── */
export const SubNav = styled.nav`
  display: flex;
  gap: 4px;
  padding: 12px 24px 0;
  border-bottom: 1px solid #e2e8f0;
  background: white;
`

export const SubNavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 500;
  color: ${p => p.$active ? "#6366f1" : "#64748b"};
  border-bottom: 2px solid ${p => p.$active ? "#6366f1" : "transparent"};
  margin-bottom: -1px;
  cursor: pointer;
  transition: all 0.15s;
  &:hover { color: #6366f1; }
`

/* ── Page wrapper ─── */
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  background: #f8fafc;
  overflow: hidden;
`

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`

/* ── Toolbar ─── */
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const PageTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
`

export const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.85; }
`

/* ── Banner ─── */
export const WarnBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #fefce8;
  border: 1px solid #fde68a;
  border-radius: 8px;
  font-size: 12px;
  color: #92400e;
  margin-bottom: 16px;
`

export const WarnLink = styled.span`
  color: #6366f1;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
  &:hover { text-decoration: underline; }
`

/* ── Search ─── */
export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 12px;
`

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 13px;
  color: #0f172a;
  background: transparent;
  &::placeholder { color: #94a3b8; }
`

/* ── Status legend ─── */
export const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
`

export const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$color || "#22c55e"};
  margin-right: 4px;
`

/* ── Table ─── */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
`

export const Th = styled.th`
  padding: 12px 16px;
  text-align: ${p => p.$right ? "right" : "left"};
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`

export const Tr = styled.tr`
  border-bottom: 1px solid #f1f5f9;
  &:last-child { border-bottom: none; }
  &:hover { background: #fafafa; }
`

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 13px;
  color: ${p => p.$muted ? "#94a3b8" : "#0f172a"};
  vertical-align: middle;
  text-align: ${p => p.$right ? "right" : "left"};
`

export const ProductImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`

export const ProductEmoji = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`

export const ActionGroup = styled.div`
  display: flex;
  gap: 6px;
`

export const ViewBtn = styled.button`
  padding: 6px 14px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
`

export const EditBtn = styled.button`
  padding: 6px 14px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
`

export const DeleteBtn = styled.button`
  padding: 6px 10px;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { background: #fecaca; }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: #94a3b8;
  font-size: 14px;
`

/* ── Form ─── */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 560px;
  margin: 0 auto;
`

export const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FormTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const Input = styled.input`
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #0f172a;
  outline: none;
  background: white;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
  &:focus { border-color: #6366f1; }
  &::placeholder { color: #cbd5e1; }
`

export const Select = styled.select`
  padding: 10px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #0f172a;
  outline: none;
  background: white;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  &:focus { border-color: #6366f1; }
`

export const PriceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

export const SubmitBtn = styled.button`
  padding: 12px 24px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.85; }
`

export const EmojiPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const EmojiOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1.5px solid ${p => p.$selected ? "#6366f1" : "#e2e8f0"};
  background: ${p => p.$selected ? "#eef2ff" : "white"};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover { border-color: #6366f1; }
`

export const ImageUploadArea = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  color: #64748b;
  font-size: 13px;
  text-align: center;
  &:hover {
    border-color: #6366f1;
    background: #eef2ff;
    color: #4f46e5;
  }
`

export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-top: 12px;
`

export const StatusRow = styled.div`
  display: flex;
  gap: 8px;
`

export const StatusOption = styled.button`
  padding: 6px 14px;
  border-radius: 20px;
  border: 1.5px solid ${p => p.$selected ? p.$accent || "#6366f1" : "#e2e8f0"};
  background: ${p => p.$selected ? (p.$accent ? p.$accent + "22" : "#eef2ff") : "white"};
  color: ${p => p.$selected ? (p.$accent || "#6366f1") : "#64748b"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
`

/* ── Category List ─── */
export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  margin: 0 -8px;
  border-radius: 10px;
  color: #0f172a;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f1f5f9;
    transform: translateX(4px);
    
    & button {
        opacity: 1;
        transform: scale(1);
    }
  }
`

export const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img, .placeholder {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    object-fit: contain;
    background: #e2e8f0;
    transition: transform 0.2s;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
  }
`

export const EditIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #6366f1;
  cursor: pointer;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

  &:hover {
    background: #6366f1;
    color: white;
    border-color: #6366f1;
    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
  }
`

