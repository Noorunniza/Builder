import React from "react"
import {
    ModalOverlay,
    ModalCard,
    ModalHeader,
    ModalEyebrow,
    ModalTitle,
    ModalText,
    ModalGrid,
    StatusOptionCard,
    StatusOptionIcon,
    StatusOptionTitle,
    StatusOptionDescription,
    ModalFooter,
    GhostButton,
    PrimaryButton
} from "../OrdersTab.styles"

export default function OrderStatusModal({
    isOpen,
    selectedCount,
    nextStatus,
    onSelectStatus,
    onClose,
    onSave,
    isUpdatingStatus,
    statusOptions
}) {
    if (!isOpen || !selectedCount) return null

    return (
        <ModalOverlay onClick={onClose}>
            <ModalCard onClick={(event) => event.stopPropagation()}>
                <ModalHeader>
                    <ModalEyebrow>Bulk order action</ModalEyebrow>
                    <ModalTitle>Update order status</ModalTitle>
                    <ModalText>
                        Apply one status to {selectedCount} selected order{selectedCount === 1 ? "" : "s"}.
                        Choose the option that best matches the next fulfilment step.
                    </ModalText>
                </ModalHeader>

                <ModalGrid>
                    {statusOptions.map(({ value, label, description, tone, icon: Icon }) => (
                        <StatusOptionCard
                            key={value}
                            $active={nextStatus === value}
                            $tone={tone}
                            onClick={() => onSelectStatus(value)}
                        >
                            <StatusOptionIcon $tone={tone}>
                                <Icon size={18} />
                            </StatusOptionIcon>
                            <div>
                                <StatusOptionTitle>{label}</StatusOptionTitle>
                                <StatusOptionDescription>{description}</StatusOptionDescription>
                            </div>
                        </StatusOptionCard>
                    ))}
                </ModalGrid>

                <ModalFooter>
                    <GhostButton onClick={onClose} disabled={isUpdatingStatus}>
                        Cancel
                    </GhostButton>
                    <PrimaryButton onClick={onSave} disabled={!nextStatus || isUpdatingStatus}>
                        {isUpdatingStatus ? "Saving..." : "Save changes"}
                    </PrimaryButton>
                </ModalFooter>
            </ModalCard>
        </ModalOverlay>
    )
}
