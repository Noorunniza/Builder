import React, { useState, useRef } from "react"
import { GripVertical } from "lucide-react"
import {
    ArrangeContainer,
    Header,
    TitleContainer,
    Title,
    SubTitle,
    List,
    ListItem,
    DragHandle,
    ItemContent,
    ButtonGroup,
    PrimaryButton,
    SecondaryButton
} from "./ArrangeList.styles"

export default function ArrangeList({ items, type, onSave, onBack }) {
    const [list, setList] = useState(items)
    const [draggingIndex, setDraggingIndex] = useState(null)
    const dragItemNode = useRef(null)

    const handleDragStart = (e, index) => {
        setDraggingIndex(index)
        dragItemNode.current = e.target
        e.dataTransfer.effectAllowed = "move"
        e.dataTransfer.setData("text/html", e.target.parentNode)
        setTimeout(() => { if (dragItemNode.current) { } }, 0)
    }

    const handleDragEnter = (e, targetIndex) => {
        if (targetIndex !== draggingIndex) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                const draggedItem = newList.splice(draggingIndex, 1)[0]
                newList.splice(targetIndex, 0, draggedItem)
                setDraggingIndex(targetIndex)
                return newList
            })
        }
    }

    const handleDragEnd = () => {
        setDraggingIndex(null)
        dragItemNode.current = null
    }

    const getItemLabel = (item) => {
        if (typeof item === 'object' && item !== null) {
            return item.name || item.id || JSON.stringify(item)
        }
        return item
    }

    return (
        <ArrangeContainer>
            <Header>
                <TitleContainer>
                    <Title>Arrange {type}</Title>
                    <SubTitle>Drag and drop items to reorder them in your store</SubTitle>
                </TitleContainer>
            </Header>

            <List>
                {list.map((item, index) => (
                    <ListItem
                        key={item.id || item || index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragEnter={draggingIndex !== null ? (e) => handleDragEnter(e, index) : null}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        $isDragging={draggingIndex === index}
                    >
                        <DragHandle><GripVertical size={18} /></DragHandle>
                        <ItemContent>{getItemLabel(item)}</ItemContent>
                    </ListItem>
                ))}
            </List>

            <ButtonGroup>
                <PrimaryButton onClick={() => onSave(list)}>Save Order</PrimaryButton>
                <SecondaryButton onClick={onBack}>Cancel</SecondaryButton>
            </ButtonGroup>
        </ArrangeContainer>
    )
}
