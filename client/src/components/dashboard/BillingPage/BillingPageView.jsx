import React from "react"
import {
    Page, Head, PageTitle, PageSub, CurrentPlan, PlanLeft, PlanBadge, PlanName, PlanDesc, PlanRight, UpgradeBtn,
    SectionTitle, PlansGrid, PlanCard, PopularBadge, PlanTitle, PlanPrice, FeatureList, Feature, PlanBtn,
    TwoCol, InfoCard, InfoCardTitle, InfoRow, InfoLabel, InfoVal, GreenDot, AlertBanner, InvoiceStatus, SecureNote,
    PlanCreditIcon, UpgradeZapIcon, UpgradeArrowIcon, AlertIcon, FeatureCheckIcon, PaymentMethodIcon,
    InvoiceReceiptIcon, SecureShieldIcon
} from "./BillingPage.styles"

const PLANS = [
    { key: "free", title: "Free", price: "Rs0", period: "", features: ["1 website", "Basic templates", "Builder subdomain", "Community support"] },
    { key: "starter", title: "Starter", price: "Rs499", period: "/mo", features: ["3 websites", "All templates", "Custom domain", "Analytics", "Priority support"], popular: true, highlight: true },
    { key: "pro", title: "Pro", price: "Rs999", period: "/mo", features: ["Unlimited websites", "Remove branding", "Advanced analytics", "API access", "Dedicated support"] }
]

const INVOICES = [
    { date: "Mar 24, 2026", amount: "Rs499", status: "Paid" },
    { date: "Feb 24, 2026", amount: "Rs499", status: "Paid" },
    { date: "Jan 24, 2026", amount: "Rs499", status: "Paid" }
]

export default function BillingPageView({ user }) {
    const currentPlan = user?.plan || "free"
    const currentPlanName = currentPlan === "free" ? "Free" : currentPlan === "starter" ? "Starter" : "Pro"

    return (
        <Page>
            <Head>
                <PageTitle>Billing & Plans</PageTitle>
                <PageSub>Manage your subscription, invoices, and payment method.</PageSub>
            </Head>

            <CurrentPlan>
                <PlanLeft>
                    <PlanBadge><PlanCreditIcon /> Current Plan</PlanBadge>
                    <PlanName>{currentPlanName}</PlanName>
                    <PlanDesc>{currentPlan === "free" ? "You are on the free plan. Upgrade to unlock more features." : "Your plan renews on Apr 24, 2026."}</PlanDesc>
                </PlanLeft>
                <PlanRight>{currentPlan === "free" && <UpgradeBtn><UpgradeZapIcon />Upgrade Now<UpgradeArrowIcon /></UpgradeBtn>}</PlanRight>
            </CurrentPlan>

            {currentPlan === "free" && (
                <AlertBanner>
                    <AlertIcon />
                    <div><strong>You're on the Free plan.</strong> You can only create <strong>1 website</strong>. Upgrade to Starter or Pro to unlock more websites, custom domains, and advanced features.</div>
                </AlertBanner>
            )}

            <SectionTitle>Choose a Plan</SectionTitle>
            <PlansGrid>
                {PLANS.map(plan => (
                    <PlanCard key={plan.key} $highlight={plan.highlight}>
                        {plan.popular && <PopularBadge>Most Popular</PopularBadge>}
                        <div><PlanTitle $light={plan.highlight}>{plan.title}</PlanTitle></div>
                        <PlanPrice $light={plan.highlight}>{plan.price}<span>{plan.period}</span></PlanPrice>
                        <FeatureList>{plan.features.map(feature => <Feature key={feature} $light={plan.highlight}><FeatureCheckIcon />{feature}</Feature>)}</FeatureList>
                        <PlanBtn $highlight={plan.highlight} $current={currentPlan === plan.key} disabled={currentPlan === plan.key}>{currentPlan === plan.key ? "Current Plan" : `Get ${plan.title}`}</PlanBtn>
                    </PlanCard>
                ))}
            </PlansGrid>

            <TwoCol>
                <InfoCard>
                    <InfoCardTitle><PaymentMethodIcon /> Payment Method</InfoCardTitle>
                    <InfoRow><InfoLabel>Status</InfoLabel><InfoVal><GreenDot /> Active</InfoVal></InfoRow>
                    <InfoRow><InfoLabel>Card</InfoLabel><InfoVal>**** **** **** 4242</InfoVal></InfoRow>
                    <InfoRow><InfoLabel>Expires</InfoLabel><InfoVal>12 / 26</InfoVal></InfoRow>
                    <InfoRow><InfoLabel>Billing Email</InfoLabel><InfoVal>{user?.email || "-"}</InfoVal></InfoRow>
                </InfoCard>
                <InfoCard>
                    <InfoCardTitle><InvoiceReceiptIcon /> Invoice History</InfoCardTitle>
                    {currentPlan === "free" ? <InfoRow><InfoLabel $muted>No invoices yet.</InfoLabel></InfoRow> : INVOICES.map(invoice => (
                        <InfoRow key={invoice.date}>
                            <InfoLabel>{invoice.date}</InfoLabel>
                            <InfoVal>{invoice.amount}<InvoiceStatus>{invoice.status}</InvoiceStatus></InfoVal>
                        </InfoRow>
                    ))}
                </InfoCard>
            </TwoCol>

            <SecureNote><SecureShieldIcon /> All payments are secure and encrypted. Cancel anytime.</SecureNote>
        </Page>
    )
}
