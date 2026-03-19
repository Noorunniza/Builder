import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const DesktopNavWrapper = styled.div`
  display: ${p => p.$device === "mobile" ? "none" : "flex"};
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: white;
  border-bottom: 1px solid #f1f5f9;
  gap: 32px;
  position: relative;
  z-index: 100;
`

export const StyledSearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;
  svg { width: 18px; height: 18px; }
`

export const StyledNavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  cursor: pointer;
  svg { width: 24px; height: 24px; }
`

export const StyledCartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  svg { width: 24px; height: 24px; }
`

export const StyledMenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  svg { width: 28px; height: 28px; }
`

export const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
`

/* Search wrapper holds the bar + dropdown together */
export const SearchWrapper = styled.div`
  flex: 1;
  max-width: 480px;
  position: relative;
`

export const DesktopSearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1.5px solid ${p => p.$focused ? (p.$primary || "#0f172a") : "#e2e8f0"};
  border-radius: 10px;
  padding: 10px 16px;
  gap: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: ${p => p.$focused ? `0 0 0 3px ${(p.$primary || "#0f172a")}18` : "none"};
`

export const DesktopNavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

/* â”€â”€ Search Dropdown â”€â”€â”€ */
export const SearchDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  overflow: hidden;
  z-index: 999;
  animation: ${fadeIn} 0.15s ease;
  max-height: 360px;
  overflow-y: auto;
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
`

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  background: ${p => p.$highlighted ? "#f8fafc" : "white"};
  transition: background 0.12s;
  &:hover { background: #f1f5f9; }
  &:not(:last-child) { border-bottom: 1px solid #f1f5f9; }
`

export const SearchResultImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #f1f5f9;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  img { width: 100%; height: 100%; object-fit: contain; }
`

export const SearchResultMeta = styled.div`
  flex: 1;
  min-width: 0;
`

export const SearchResultName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const SearchResultSub = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
`

export const SearchResultPrice = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  flex-shrink: 0;
`

export const SearchNoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: #94a3b8;
  font-size: 14px;
`

export const SearchDropdownHeader = styled.div`
  padding: 8px 14px;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: #fafafa;
  border-bottom: 1px solid #f1f5f9;
`

/* â”€â”€ Mobile Navbar â”€â”€â”€ */
export const MobileNavWrapper = styled.div`
  background: white;
  border-bottom: 1px solid #f1f5f9;
  display: ${p => p.$device === "mobile" ? "flex" : "none"};
  flex-direction: column;
  position: relative;
  z-index: 100;
`

export const NavTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
`

export const MenuIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  cursor: pointer;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const CartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`

export const SearchBarContainer = styled.div`
  padding: 0 16px 12px 16px;
  position: relative;
`

export const MobileSearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1.5px solid ${p => p.$focused ? (p.$primary || "#0f172a") : "#e2e8f0"};
  border-radius: 10px;
  padding: 10px 14px;
  gap: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: ${p => p.$focused ? `0 0 0 3px ${(p.$primary || "#0f172a")}18` : "none"};
`

export const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #0f172a;
  &::placeholder { color: #94a3b8; }
`

/* â”€â”€ Shared Navbar Elements â”€â”€â”€ */
export const NavLogo = styled.img`
  height: 60px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  border-radius: 8px;
`

export const NavLogoPlaceholder = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 8px;
  background: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
`

export const CartWrapper = styled.div`
  position: relative;
`

export const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: ${p => p.$bg || "#0f172a"};
  color: white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
`
