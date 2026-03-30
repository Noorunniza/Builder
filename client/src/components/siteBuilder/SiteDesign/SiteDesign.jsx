import React from "react"
import SiteDesignContent from "./SiteDesignContent"
import useSiteDesignState from "./useSiteDesignState"

export default function SiteDesign({ website, onUpdate }) {
    const state = useSiteDesignState(website, onUpdate)
    return <SiteDesignContent website={website} state={state} />
}
