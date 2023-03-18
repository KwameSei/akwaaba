import React, { useState } from 'react'
import { SideBar } from "../../partials/sideBar"
import { ProSidebarProvider } from "react-pro-sidebar"
import './Dashboard.css'
import { PageHeader } from "../../partials/pageHeader"

export const Dashboard = () => {
    const [sidebarWidth, setSidebarWidth] = useState(80);
    return (
        <div className="dashboard">
            <ProSidebarProvider>
                <SideBar className="sidebar" onWidthChange={setSidebarWidth} />
            </ProSidebarProvider>
            <div className="dashboard-content" style={{ marginLeft: sidebarWidth }}>
                <PageHeader title="DASHBOARD" subTitle="Welcome to your dashboard" />
            </div>
        </div>
    )
}