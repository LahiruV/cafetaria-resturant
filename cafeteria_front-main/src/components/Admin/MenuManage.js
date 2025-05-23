import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Avatar } from '@mui/material';

const MenuManage = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetchMenuDetails();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedMenu', JSON.stringify(data));
    }, []);

    const fetchMenuDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/menuItem/allMenuItem');
            const menusWithId = response.data.map((menu, index) => ({
                id: index + 1,
                ...menu
            }));
            setMenu(menusWithId);
        } catch (error) {
            console.error('Error fetching menu details:', error);
        }
    };

    const handleAddMenu = () => {
        window.location.href = "/MenuForm";
    };

    const handleUpdateMenuItem = (selectedMenuItem) => {
        const status = selectedMenuItem.status === 'Activate' ? 'Deactivate' : 'Activate';
        selectedMenuItem.status = status;
        axios.put(global.APIUrl + '/menuItem/update', selectedMenuItem).then(() => {
            window.location.href = "/MenuManage";
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Menu Item Not Updated",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        });
    }

    const handleDeleteMenu = (itemId) => {
        axios.delete(global.APIUrl + "/menuItem/delete/" + itemId).then(() => {
            window.location.href = "/MenuManage";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Menu Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };

    const handleEdit = (selectedMenu) => {
        const editBtn = true;
        const data = {
            selectedMenu,
            editBtn
        };
        localStorage.setItem('selectedMenu', JSON.stringify(data));
        window.location.href = "/MenuForm";
    };

    const columns = [
        { field: 'itemId', headerName: 'Item ID', width: 150 },
        { field: 'inventoryItem', headerName: 'Inventory Item', width: 150 },
        { field: 'itemName', headerName: 'Item Name', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    style={{ color: getStatusColor(params.value), borderColor: getStatusColor(params.value) }}
                    disabled
                >
                    {params.value}
                </Button>
            ),
        },
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'calorieCount', headerName: 'Calorie Count', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'categoryType', headerName: 'Category Type', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'picture', headerName: 'Picture', width: 150, renderCell: renderPicture },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.row.status === 'Activate' ? (
                        <IconButton color="error" onClick={() => handleUpdateMenuItem(params.row)}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="success" onClick={() => handleUpdateMenuItem(params.row)}>
                            <CheckIcon />
                        </IconButton>
                    )}
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteMenu(params.row.itemId)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Deactivate':
                return 'red';
            case 'Activate':
                return 'green';
            default:
                return 'black';
        }
    };

    function renderPicture(params) {
        return <Avatar alt="Item Picture" src={params.value} sx={{ width: 50, height: 50 }} variant="square" />;
    }


    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#ecf0f1', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Menu Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained" color="primary" onClick={handleAddMenu}>
                            Add New Item
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Item Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={menu} columns={columns} pageSize={5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuManage;
