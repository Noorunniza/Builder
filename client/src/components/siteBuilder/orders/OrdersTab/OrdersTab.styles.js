import React, { useState } from 'react';
import styled from 'styled-components';

export const OrdersContainer = styled.div`
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
`;

export const TabItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.active ? '#3b82f6' : '#6b7280'};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  position: relative;

  ${props => props.active && `
    &:after {
      content: '';
      position: absolute;
      bottom: -13px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #3b82f6;
    }
  `}
`;

export const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  font-size: 14px;
  outline: none;
`;

export const PrintButton = styled.button`
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #4b5563;
  }
`;

export const StatusTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const StatusTab = styled.button`
  background-color: white;
  border: 1px solid transparent;
  color: ${p => p.$active ? "#0f172a" : "#64748b"};
  border-bottom: 2px solid ${p => p.$active ? "#0f172a" : "transparent"};
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border-color: #22c55e;
  }
`;

export const FiltersArea = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const ActionButton = styled.button`
  background-color: ${props => props.primary ? '#3b82f6' : '#6b7280'};
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.primary ? '#2563eb' : '#4b5563'};
  }
`;

export const LegendArea = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4b5563;

  &:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${props => props.color};
  }
`;

export const Table = styled.table`
  width: 100%;
  background: white;
  border-radius: 8px;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const Th = styled.th`
  text-align: left;
  padding: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
`;

export const Td = styled.td`
  padding: 16px;
  font-size: 13px;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
`;

export const LinkText = styled.span`
  color: #3b82f6;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
