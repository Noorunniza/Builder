import React from "react"
import useAnalyticsState from "./useAnalyticsState"
import {
    Page, Header, TitleBlock, Title, Subtitle, RangeGroup, RangeBtn, KpiGrid, KpiCard, KpiIconWrap, KpiLabel, KpiValue, KpiSub,
    ChartsRow, Card, CardTitle, BarChartWrap, BarCol, Bar, BarLabel, DistList, DistRow, DistDot, DistLabel, DistBar, DistCount,
    BottomRow, ProductList, ProductRow, Rank, ProductImg, ProductInfo, ProductName, ProductMeta, ProductRevenue, EmptyState,
    InfoText, DistIconWrap, TitleIconWrap, STATUS_COLORS, PAYMENT_COLORS, DEFAULT_GRAY, RevenueIcon, OrdersIcon, AvgValueIcon,
    ProductsIcon, ChartTitleIcon, StatusIcon
} from "./AnalyticsTab.styles"

const formatCurrency = value => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
}).format(Number(value) || 0)

const getDayLabel = value => {
    const date = new Date(value)
    return isNaN(date) ? value : String(date.getDate())
}

function BarChart({ trend }) {
    if (!trend?.length) return <EmptyState>No data for this period.</EmptyState>
    const maxRevenue = Math.max(...trend.map(item => item.revenue), 1)
    return <BarChartWrap>{trend.map(item => (
        <BarCol key={item.date}>
            <Bar $pct={Math.round((item.revenue / maxRevenue) * 100)} data-tip={`${item.date}: ${formatCurrency(item.revenue)}`} />
            <BarLabel>{getDayLabel(item.date)}</BarLabel>
        </BarCol>
    ))}</BarChartWrap>
}

function DistributionList({ data, colors, label }) {
    const entries = Object.entries(data || {})
    const total = entries.reduce((sum, [, count]) => sum + count, 0)
    if (!entries.length) return <EmptyState>No {label} data yet.</EmptyState>

    return <DistList>{entries.sort((a, b) => b[1] - a[1]).map(([key, count]) => {
        const color = colors[key] || DEFAULT_GRAY
        const percent = total > 0 ? Math.round((count / total) * 100) : 0
        return (
            <DistRow key={key}>
                <DistDot $color={color} />
                <DistLabel><DistIconWrap><StatusIcon type={key} /></DistIconWrap>{key}</DistLabel>
                <DistBar $color={color} $pct={percent}><div /></DistBar>
                <DistCount>{count}</DistCount>
            </DistRow>
        )
    })}</DistList>
}

function TopProducts({ products }) {
    if (!products?.length) return <EmptyState>No product sales yet.</EmptyState>

    return <ProductList>{products.map((product, index) => (
        <ProductRow key={product.name}>
            <Rank $top={index < 3}>#{index + 1}</Rank>
            {product.image && <ProductImg src={product.image} alt={product.name} onError={event => { event.target.style.display = "none" }} />}
            <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductMeta>{product.quantity} sold | {product.orders} order{product.orders !== 1 ? "s" : ""}</ProductMeta>
            </ProductInfo>
            <ProductRevenue>{formatCurrency(product.revenue)}</ProductRevenue>
        </ProductRow>
    ))}</ProductList>
}

export default function AnalyticsTab({ website }) {
    const { data, loading, error, range, setRange, ranges } = useAnalyticsState(website)
    const summary = data?.summary || {}
    const kpis = [
        { key: "revenue", label: "Total Revenue", value: formatCurrency(summary.totalRevenue), sub: `${summary.totalOrders ?? 0} order${summary.totalOrders !== 1 ? "s" : ""}`, Icon: RevenueIcon },
        { key: "orders", label: "Total Orders", value: summary.totalOrders ?? 0, sub: `${summary.pendingOrders ?? 0} pending`, Icon: OrdersIcon },
        { key: "avg", label: "Avg. Order Value", value: formatCurrency(summary.avgOrderValue), Icon: AvgValueIcon },
        { key: "products", label: "Products Listed", value: summary.totalProducts ?? 0, Icon: ProductsIcon }
    ]

    return (
        <Page>
            <Header>
                <TitleBlock>
                    <Title>Analytics</Title>
                    <Subtitle>Real performance data from your live store.</Subtitle>
                </TitleBlock>
                <RangeGroup>
                    {ranges.map(item => <RangeBtn key={item} $active={range === item} onClick={() => setRange(item)}>{item}</RangeBtn>)}
                </RangeGroup>
            </Header>

            {error && <InfoText $error>{error}</InfoText>}
            {loading && <InfoText>Loading analytics...</InfoText>}

            {!loading && !error && <>
                <KpiGrid>
                    {kpis.map(({ key, label, value, sub, Icon }) => (
                        <KpiCard key={key} $variant={key}>
                            <KpiIconWrap $variant={key}><Icon /></KpiIconWrap>
                            <KpiLabel>{label}</KpiLabel>
                            <KpiValue>{value}</KpiValue>
                            {sub && <KpiSub>{sub}</KpiSub>}
                        </KpiCard>
                    ))}
                </KpiGrid>

                <ChartsRow>
                    <Card>
                        <CardTitle><TitleIconWrap><ChartTitleIcon /></TitleIconWrap>Revenue - last 30 days</CardTitle>
                        <BarChart trend={data?.dailyTrend} />
                    </Card>
                    <Card>
                        <CardTitle>Order Status</CardTitle>
                        <DistributionList data={data?.statusDistribution} colors={STATUS_COLORS} label="status" />
                    </Card>
                </ChartsRow>

                <BottomRow>
                    <Card>
                        <CardTitle>Top Products by Revenue</CardTitle>
                        <TopProducts products={data?.topProducts} />
                    </Card>
                    <Card>
                        <CardTitle>Payment Methods</CardTitle>
                        <DistributionList data={data?.paymentDistribution} colors={PAYMENT_COLORS} label="payment" />
                    </Card>
                </BottomRow>
            </>}
        </Page>
    )
}
