import React from "react"
import {
    TableWrap,
    Table,
    Th,
    Td,
    Checkbox,
    LinkButton,
    StatusBadge,
    OrderText,
    MutedText,
    RowDetails
} from "../OrdersTab.styles"
import {
    formatDateTime,
    formatINR,
    formatStatusLabel,
    getAgeBucket,
    getOrderKey
} from "../orderUtils"

export default function OrdersTable({
    orders,
    expandedOrderId,
    onToggleExpanded,
    selectAllRef,
    allFilteredSelected,
    onToggleSelectAll,
    selectedOrderIdSet,
    onToggleOrderSelection,
    paymentTone,
    orderTone
}) {
    return (
        <TableWrap>
            <Table>
                <thead>
                    <tr>
                        <Th $width={44}>
                            <Checkbox
                                ref={selectAllRef}
                                type="checkbox"
                                checked={allFilteredSelected}
                                onChange={onToggleSelectAll}
                            />
                        </Th>
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
                    {orders.map(order => {
                        const ageBucket = getAgeBucket(order.createdAt)
                        const orderKey = getOrderKey(order)
                        const isExpanded = expandedOrderId === orderKey
                        const isSelected = selectedOrderIdSet.has(orderKey)

                        return (
                            <React.Fragment key={orderKey}>
                                <tr>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <Checkbox
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => onToggleOrderSelection(orderKey)}
                                        />
                                    </Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <OrderText>{order.orderId}</OrderText>
                                    </Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>{formatDateTime(order.createdAt)}</Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <LinkButton onClick={() => onToggleExpanded(orderKey)}>
                                            {isExpanded ? "Hide" : "View more"}
                                        </LinkButton>
                                    </Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <OrderText>{order.customerName || "Customer"}</OrderText>
                                        <MutedText>{order.customerPhone || "-"}</MutedText>
                                    </Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <OrderText>{order.itemSummary || "-"}</OrderText>
                                    </Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>{formatINR(order.total)}</Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <StatusBadge $tone={paymentTone[order.paymentStatus] || "blue"}>{formatStatusLabel(order.paymentStatus)}</StatusBadge>
                                    </Td>
                                    <Td $rowTone={ageBucket} $selected={isSelected}>
                                        <StatusBadge $tone={orderTone[order.orderStatus] || "blue"}>{formatStatusLabel(order.orderStatus)}</StatusBadge>
                                    </Td>
                                </tr>
                                {isExpanded && (
                                    <tr>
                                        <Td colSpan={9}>
                                            <RowDetails>
                                                <div>
                                                    <strong>Address:</strong> {order.shippingAddress?.address || "-"}, {order.shippingAddress?.city || ""}, {order.shippingAddress?.state || ""} {order.shippingAddress?.pincode || ""}
                                                </div>
                                                <div>
                                                    <strong>Payment Method:</strong> {(order.paymentMethod || "-").toUpperCase()}
                                                </div>
                                                <div>
                                                    <strong>Subtotal:</strong> {formatINR(order.subtotal)}
                                                </div>
                                                <div>
                                                    <strong>Shipping:</strong> {formatINR(order.shipping)}
                                                </div>
                                            </RowDetails>
                                        </Td>
                                    </tr>
                                )}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </Table>
        </TableWrap>
    )
}
