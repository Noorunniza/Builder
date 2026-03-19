import React, { useState } from 'react';
import {
    OrdersContainer,
    TopBar,
    TabItem,
    HeaderArea,
    Title,
    HeaderActions,
    Select,
    PrintButton,
    StatusTabs,
    StatusTab,
    FiltersArea,
    SearchInput,
    ActionButton,
    LegendArea,
    LegendItem,
    Table,
    Th,
    Td,
    LinkText
} from './OrdersTab.styles';

const mockOrders = [
    {
        id: '#ORD-E94BE91C-7678-4971-8E4A-B',
        date: '11/03/2026, 03:29 PM',
        customer: 'niza (1212121212)',
        items: 'Demo Product-3',
        amount: '120.00',
        payment: 'paid',
        status: 'shipped'
    }
];

export default function OrdersTab() {
    const [activeMainTab, setActiveMainTab] = useState('Orders');
    const [activeStatusTab, setActiveStatusTab] = useState('All');

    const mainTabs = ['Orders', 'Order Setup', 'Shipping', 'Payments', 'Checkout', 'Order Summary'];
    const statusTabs = ['Pending', 'Shipped', 'Cancelled', 'All'];

    return (
        <OrdersContainer>
            {/* Top Navigation Bar */}
            <TopBar>
                {mainTabs.map(tab => (
                    <TabItem 
                        key={tab} 
                        $active={activeMainTab === tab}
                        onClick={() => setActiveMainTab(tab)}
                    >
                        {tab === 'Orders' && <span role="img" aria-label="cart">🛒</span>}
                        {tab === 'Order Setup' && <span role="img" aria-label="setup">⚙️</span>}
                        {tab === 'Shipping' && <span role="img" aria-label="truck">🚚</span>}
                        {tab === 'Payments' && <span role="img" aria-label="card">💳</span>}
                        {tab === 'Checkout' && <span role="img" aria-label="receipt">🧾</span>}
                        {tab === 'Order Summary' && <span role="img" aria-label="list">📋</span>}
                        {tab}
                    </TabItem>
                ))}
            </TopBar>

            {/* Header Area */}
            <HeaderArea>
                <Title>Orders</Title>
                <HeaderActions>
                    <Select defaultValue="Today">
                        <option value="Today">Today</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="Last 7 Days">Last 7 Days</option>
                        <option value="All Time">All Time</option>
                    </Select>
                    <PrintButton>
                        <span role="img" aria-label="print">🖨️</span> Print
                    </PrintButton>
                </HeaderActions>
            </HeaderArea>

            {/* Status Filter Tabs */}
            <StatusTabs>
                {statusTabs.map(tab => (
                    <StatusTab 
                        key={tab} 
                        $active={activeStatusTab === tab}
                        onClick={() => setActiveStatusTab(tab)}
                    >
                        {tab}
                    </StatusTab>
                ))}
            </StatusTabs>

            {/* Search and Filters */}
            <FiltersArea>
                <SearchInput placeholder="Search by Phone , Customer or Order..." />
                <Select defaultValue="All Time">
                    <option value="All Time">All Time</option>
                    <option value="Today">Today</option>
                </Select>
                <ActionButton primary>
                    <span role="img" aria-label="search">🔍</span>
                </ActionButton>
                <ActionButton>
                    <span role="img" aria-label="clear">✖️</span>
                </ActionButton>
            </FiltersArea>

            {/* Legend */}
            <LegendArea>
                <LegendItem color="#86efac">Today's Orders</LegendItem>
                <LegendItem color="#fde047">Yesterday's Orders</LegendItem>
                <LegendItem color="#ffffff" style={{ border: '1px solid #d1d5db', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block' }}></LegendItem>
                <span style={{ fontSize: '13px', color: '#4b5563', marginLeft: '-16px' }}>Older Orders</span>
            </LegendArea>

            {/* Data Table */}
            <Table>
                <thead>
                    <tr>
                        <Th style={{ width: '40px' }}><input type="checkbox" /></Th>
                        <Th>Order</Th>
                        <Th>Date</Th>
                        <Th>Details</Th>
                        <Th>Customer</Th>
                        <Th>Items</Th>
                        <Th>Amount</Th>
                        <Th>Payment</Th>
                        <Th>Status</Th>
                    </tr>
                </thead>
                <tbody>
                    {mockOrders.map(order => (
                        <tr key={order.id}>
                            <Td><input type="checkbox" /></Td>
                            <Td>{order.id}</Td>
                            <Td>{order.date}</Td>
                            <Td><LinkText>View more</LinkText></Td>
                            <Td>{order.customer}</Td>
                            <Td>{order.items}</Td>
                            <Td>{order.amount}</Td>
                            <Td>{order.payment}</Td>
                            <Td>{order.status}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </OrdersContainer>
    );
}
