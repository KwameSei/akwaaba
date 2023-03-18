import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../partials/theme";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../Data/mockData";
import axios from "axios";
import "./users.css"

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { PageHeader } from "../../../partials/pageHeader";
import { red, green } from "@mui/material/colors";

export const Users = () => {
    // fetch("http://localhost:5000/api/v1/users")
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));

    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowClick = (event, row) => {
         // Navigate to the details page
        // navigate(`/dashboard/${row.id}`);
        navigate(`/dashboard`);
    };

    const handleSelectionModelChange = (selection) => {
    setSelectedRows(selection);
    };

    const url = "/api/v1/users";
    const [users, setUsers] = useState({
        loading: false,
        data: null,
        error: false
    });

    useEffect(() => {
        setUsers({
            loading: true,
            data: null,
            error: false
        })
        axios.get(url)
            .then(response => {
                setUsers({
                    loading: false,
                    data: response.data,
                    error: false
                })
                console.log(response.data)
            })
            .catch(() => {
                setUsers({
                    loading: false,
                    data: null,
                    error: true
                })
            })
    }, [url]);

    const green = '#00FF00';
    const red = '#FF0000';

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 130, cellClassName: 'name-column--cell' },
        { field: 'email', headerName: 'Email', type: "number", width: 130, cellClassName: 'name-column--cell' },
        { field: 'is_admin', 
            headerName: 'Is Admin',
            renderCell: ({ row: { is_admin } }) => {
                return (
                    <Box 
                        width="60%"
                        margin="0 auto"
                        display="flex"
                        padding="5px"
                        justifyContent="center"
                        backgroundColor={
                            is_admin === true 
                                ? green
                                : red
                        }
                        borderRadius="5px"
                    >
                        {is_admin === true && <AdminPanelSettingsOutlinedIcon />}
                        {is_admin === false && <LockOpenOutlinedIcon />}
                        <Typography variant="body2" color="white">
                            {is_admin === true ? "Yes" : "No"}
                        </Typography>
                    </Box> 
                )
            }},
        // Add more columns here as needed
    ];

    let content = null;

    if (users.error) {
        content = <p>There was an error please refresh or try again later.</p>
    }

    if (users.loading) {
        content = <p>Loading...</p>
    }

    // if (users.data) {
    //     content = 
    //         users.data.map((user, key) =>
    //             <div key={key}>
    //                 <p>{user.username}</p>
    //             </div>
    //         )
    // }

    if (users.data) {
        content = (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={users.data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    // rows={rows}
                    pagination
                    // disableColumnResize
                    // disableColumnReorder
                    // disableColumnMenu
                    onRowClick={handleRowClick}
                    onSelectionModelChange={handleSelectionModelChange}
                    selectionModel={selectedRows}
                    // sortModel={[
                    // {
                    //     field: 'username',
                    //     sort: 'asc',
                    // },
                    // ]}
                />
            </div>
        )
    }

    
    return (
        <Box className="users-main">
            <PageHeader icon={<AdminPanelSettingsOutlinedIcon />} title="USERS" subTitle="Managing all users" />
            <Box className="users-content">
                {content}
            </Box>
        </Box>
    );
}