import { useState } from "react"
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";
import { Box, colors, IconButton, Typography, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { tokens } from "./theme";
import "./sideBar.css"

export const SideBar = () => {
    const theme = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const { collapseSidebar, toggleSidebar, toggled, broken, rtl } = useProSidebar();
    
    const toggle = () => {
        toggleSidebar();
        if (toggled) {
            console.log("true");
            collapseSidebar();
        } else {
            console.log("false");
            collapseSidebar();
        }
    };

    return (
        <div className="sidebar-main">
            <Sidebar
                collapsed={collapsed} 
                breakPoint="md" 
                toggled={true} 
                onToggle={() => setCollapsed(!collapsed)}
                transitionDuration={800}
                backgroundColor="rgb(0, 249, 249, 0.4)"
                >

                <Menu iconShape="square">
                    <MenuItem className="menu-item"
                        icon={<MenuOutlinedIcon />}
                        onClick={() => {
                            collapseSidebar();
                            }}
                        >
                        {""}
                        <h2 onClick={() => { toggle(); }}>Admin</h2>
                    </MenuItem>
                    {!collapsed && (
                        <Box mb='25px'>
                            <Box display='flex' justifyContent='center' alignItems='center'>
                                <img 
                                    alt="uer=profile"
                                    width="100px"
                                    height="100px"
                                    src={`./images/nat.jpg`}
                                    style={{ cursor: "pointer", borderRadius: "50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography>Nat Osei</Typography>
                                <Typography>Admin</Typography>
                            </Box>
                        </Box>
                    )}
                    <MenuItem className="menu-item"
                        icon={<HomeOutlinedIcon />} 
                        active={selected === "Dashboard"} 
                        onClick={() => setSelected("Dashboard")}>
                        <Link to='/'>Dashboard</Link>
                    </MenuItem>
                    <MenuItem icon={<PeopleOutlinedIcon />}>Team</MenuItem>
                    <MenuItem icon={<ContactsOutlinedIcon />}>Contacts</MenuItem>
                    <MenuItem icon={<ReceiptOutlinedIcon />}>Profile</MenuItem>
                    <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
                    <MenuItem icon={<BarChartOutlinedIcon />}>Analytics</MenuItem>
                    <MenuItem icon={<PieChartOutlinedIcon />}>Reports</MenuItem>
                    <MenuItem icon={<CalendarTodayOutlinedIcon />}>Calendar</MenuItem>
                    <MenuItem icon={<TimelineOutlinedIcon />}>Timeline</MenuItem>
                    <MenuItem icon={<MapOutlinedIcon />}>Map</MenuItem>
                    <MenuItem icon={<PersonOutlinedIcon />}>Profile</MenuItem>
                    <MenuItem icon={<HelpOutlinedIcon />}>Help</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}