import React from "react"
import { OrdersContainer, TopNav, TopNavItem, HeaderArea, TitleBlock, Title, Subtitle, HeaderActions, Select, PrintButton, PrintIcon, StatusTabs, StatusTab, LegendArea, LegendItem, EmptyState, InfoText } from "./OrdersTab.styles"
import { mainTabs, statusTabs, rangeOptions, statusOptions, paymentTone, orderTone } from "./ordersConfig"
import OrdersSummary from "./components/OrdersSummary"
import OrdersFilters from "./components/OrdersFilters"
import OrdersSelectionBar from "./components/OrdersSelectionBar"
import OrdersTable from "./components/OrdersTable"
import OrderStatusModal from "./components/OrderStatusModal"
import OrderBuilderPanel from "./components/OrderBuilderPanel"
import CheckoutBuilderPanel from "./components/CheckoutBuilderPanel"
import ShippingBuilderPanel from "./components/ShippingBuilderPanel"

export default function OrdersTabView(props) {
    const { loading, error, activeMainTab, query, activeStatusTab, topRange, searchRange, expandedOrderId, selectedOrderIds, isStatusModalOpen, nextStatus, isUpdatingStatus, builderConfig, isSavingBuilder, builderSaved, selectAllRef, summary, filteredOrders, selectedOrderIdSet, allFilteredSelected, setActiveMainTab, setQuery, setActiveStatusTab, setTopRange, setSearchRange, setSelectedOrderIds, setIsStatusModalOpen, setNextStatus, clearFilters, toggleOrderSelection, toggleExpanded, toggleSelectAll, updateBuilderField, closeStatusModal, saveStatus, saveBuilder } = props

    return (
        <OrdersContainer>
            <TopNav>{mainTabs.map(({ key, icon: Icon }) => <TopNavItem key={key} $active={activeMainTab === key} onClick={() => setActiveMainTab(key)}><Icon size={18} />{key}</TopNavItem>)}</TopNav>
            <HeaderArea><TitleBlock><Title>Orders</Title><Subtitle>Real orders from your live store, styled like a production dashboard.</Subtitle></TitleBlock><HeaderActions><Select value={topRange} onChange={(event) => setTopRange(event.target.value)}>{rangeOptions.map(option => <option key={option} value={option}>{option}</option>)}</Select><PrintButton onClick={() => window.print()}><PrintIcon />Print</PrintButton></HeaderActions></HeaderArea>
            {activeMainTab === "Orders" && <OrdersSummary summary={summary} />}
            {activeMainTab === "Orders" && <StatusTabs>{statusTabs.map(tab => <StatusTab key={tab} $active={activeStatusTab === tab} onClick={() => setActiveStatusTab(tab)}>{tab}</StatusTab>)}</StatusTabs>}
            {activeMainTab === "Orders" && <OrdersFilters query={query} onQueryChange={setQuery} searchRange={searchRange} onSearchRangeChange={setSearchRange} onClear={clearFilters} rangeOptions={rangeOptions} />}
            {activeMainTab === "Orders" && <LegendArea><LegendItem $variant="today">Today&apos;s Orders</LegendItem><LegendItem $variant="yesterday">Yesterday&apos;s Orders</LegendItem><LegendItem $variant="older">Older Orders</LegendItem></LegendArea>}
            {activeMainTab === "Orders" && <OrdersSelectionBar selectedCount={selectedOrderIds.length} onClear={() => setSelectedOrderIds([])} onOpenStatusModal={() => setIsStatusModalOpen(true)} />}
            {error && <InfoText $error>{error}</InfoText>}
            {loading && <InfoText>Loading orders...</InfoText>}
            {activeMainTab === "Orders" && !loading && !error && !filteredOrders.length && <EmptyState>No orders found for the selected filters.</EmptyState>}
            {activeMainTab === "Orders" && !loading && !error && filteredOrders.length > 0 && <OrdersTable orders={filteredOrders} expandedOrderId={expandedOrderId} onToggleExpanded={toggleExpanded} selectAllRef={selectAllRef} allFilteredSelected={allFilteredSelected} onToggleSelectAll={toggleSelectAll} selectedOrderIdSet={selectedOrderIdSet} onToggleOrderSelection={toggleOrderSelection} paymentTone={paymentTone} orderTone={orderTone} />}
            {activeMainTab === "Shipping" && <ShippingBuilderPanel config={builderConfig} onChange={updateBuilderField} onSave={saveBuilder} isSaving={isSavingBuilder} saved={builderSaved} />}
            {activeMainTab !== "Orders" && activeMainTab !== "Checkout" && activeMainTab !== "Shipping" && <OrderBuilderPanel activeTab={activeMainTab} config={builderConfig} onChange={updateBuilderField} onSave={saveBuilder} isSaving={isSavingBuilder} saved={builderSaved} />}
            {activeMainTab === "Checkout" && <CheckoutBuilderPanel config={builderConfig} onChange={updateBuilderField} onSave={saveBuilder} isSaving={isSavingBuilder} saved={builderSaved} />}
            {activeMainTab === "Orders" && <OrderStatusModal isOpen={isStatusModalOpen} selectedCount={selectedOrderIds.length} nextStatus={nextStatus} onSelectStatus={setNextStatus} onClose={closeStatusModal} onSave={saveStatus} isUpdatingStatus={isUpdatingStatus} statusOptions={statusOptions} />}
        </OrdersContainer>
    )
}
