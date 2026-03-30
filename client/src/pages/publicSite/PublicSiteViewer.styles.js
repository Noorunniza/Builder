import styled, { createGlobalStyle } from "styled-components"

export const LiveGlobal = createGlobalStyle`
    body { margin: 0; padding: 0; background: #fff; }
`

export const FullScreenWrapper = styled.div`
    min-height: 100vh;
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
`

export const Center = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    font-family: 'Inter', sans-serif;
    gap: 16px;
`

export const Spinner = styled.div`
    width: 44px;
    height: 44px;
    border: 4px solid #e2e8f0;
    border-top-color: #6366f1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    @keyframes spin { to { transform: rotate(360deg); } }
`

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
`

export const Sub = styled.p`
    font-size: 0.95rem;
    color: #64748b;
    margin: 0;
`
