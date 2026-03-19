import React, { useState } from "react"
import {
    Search,
    Plus
} from "lucide-react"
import {
    Toolbar, PageTitle, AddBtn,
    SearchWrap, SearchInput, Legend, Dot,
    Table, Th, Tr, Td, ProductImg,
    ActionGroup, ViewBtn, EditBtn, DeleteBtn, EmptyState
} from "../ProductsTab/ProductsTab.styles"

const STATUS_COLORS = {
    shown: "#22c55e",
    hidden: "#f59e0b",
    coming_soon: "#3b82f6",
    sold_out: "#ef4444"
}

export default function ManageProducts({ products, onAddProduct, onEdit, onDelete }) {

    const [query, setQuery] = useState("")

    const filtered = products.filter(p => {
        const catName = p.categoryName || p.category || "";
        return p.name.toLowerCase().includes(query.toLowerCase()) ||
            catName.toLowerCase().includes(query.toLowerCase()) ||
            (p.subcategory || "").toLowerCase().includes(query.toLowerCase())
    })

    return (
        <>
            <Toolbar>
                <PageTitle>Manage Products</PageTitle>
                <AddBtn type="button" onClick={() => {
                    console.log("Add button clicked in ManageProducts DOM");
                    onAddProduct();
                }}><Plus size={14} /> Add Product</AddBtn>
            </Toolbar>

            <SearchWrap>
                <Search size={14} color="#94a3b8" />
                <SearchInput
                    placeholder="Search by Product Name, Category, Barcode or Basket number..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </SearchWrap>

            <Legend>
                On Image-1 product is
                <span><Dot $color={STATUS_COLORS.shown} />Shown</span>
                <span><Dot $color={STATUS_COLORS.hidden} />Hidden</span>
                <span><Dot $color={STATUS_COLORS.coming_soon} />Coming Soon</span>
                <span><Dot $color={STATUS_COLORS.sold_out} />Sold Out</span>
            </Legend>

            <Table>
                <thead>
                    <tr>
                        <Th>No</Th>
                        <Th>Name</Th>
                        <Th>Category</Th>
                        <Th>Price / Offer Price</Th>
                        <Th>Image-1</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan={6}>
                                <EmptyState>No products found. Click "Add Product" to get started.</EmptyState>
                            </td>
                        </tr>
                    ) : (
                        filtered.map((p, i) => (
                            <Tr key={p.id}>
                                <Td $muted>{i + 1}</Td>
                                <Td><strong>{p.name}</strong></Td>
                                <Td>{p.categoryName || p.category}</Td>
                                <Td>{p.price} / {p.offerPrice}</Td>
                                <Td>
                                    {p.image
                                        ? <ProductImg src={p.image} alt={p.name} />
                                        : <div style={{ width: 48, height: 48, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#94a3b8' }}>No Image</div>
                                    }
                                </Td>
                                <Td>
                                    <ActionGroup>
                                        <ViewBtn>View</ViewBtn>
                                        <EditBtn onClick={() => onEdit(p)}>Edit</EditBtn>
                                        <DeleteBtn onClick={() => onDelete(p.id)}>✕</DeleteBtn>
                                    </ActionGroup>
                                </Td>
                            </Tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    )
}
