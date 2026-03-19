import styled from "styled-components"

export const Wrapper = styled.div`
  padding: 36px 40px;
  animation: fadeIn 0.4s ease;
  max-width: 1200px;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 14px;
`

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 280px));
  gap: 16px;
  margin-bottom: 36px;
`

export const Actions = styled.div`
  margin-bottom: 36px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

export const WebsiteList = styled.div`
  background: #ffffff;
  padding: 28px 32px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 36px rgba(0, 0, 0, 0.09);
  }

  h3 {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 17px;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

export const WebsiteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  margin-bottom: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #94a3b8;
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const SiteName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
`

export const SiteType = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  background: #e2e8f0;
  padding: 3px 10px;
  border-radius: 20px;
  margin-left: 10px;
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
  font-size: 14px;

  .icon {
    font-size: 40px;
    margin-bottom: 12px;
    display: block;
  }

  p {
    font-weight: 500;
  }
`
