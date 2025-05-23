import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Swal from 'sweetalert2';


const EmployeeManage = () => {
    const [employee, setEmployee] = useState([]);
    const [salary, setSalary] = useState([]);

    useEffect(() => {
        fetchEmployeeDetails();
        fetchSalaryDetails();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedEmployee', JSON.stringify(data));
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/admin/getAll');
            const employeesWithId = response.data.map((employee, index) => ({
                id: index + 1,
                ...employee
            }));
            setEmployee(employeesWithId);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };  
      const fetchSalaryDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/salary/all');
            const salaryWithId = response.data.map((salary, index) => ({
                id: index + 1,
                ...salary
            }));
            setSalary(salaryWithId);
        } catch (error) {
            console.error('Error fetching salary details:', error);
        }
    };

    const handleAddEmployee = () => {
        window.location.href = "/EmployeeForm";
    };

    const handleEditEmployee = (selectedEmployee) => {
        const editBtn = true;     
        const data = {
            selectedEmployee,
            editBtn
        };
        localStorage.setItem('selectedEmployee', JSON.stringify(data));
        window.location.href = "/EmployeeForm";
    };

    const handleUpdateEmployee = async (selectedEmployee) => {
        try {
            let updatedStatus;
            if (selectedEmployee.status === 'Activate') {
                updatedStatus = 'Deactivate';
            } else {
                updatedStatus = 'Activate';
            }

            const updatedEmployee = { ...selectedEmployee, status: updatedStatus };
            await axios.put(`${global.APIUrl}/admin/update`, updatedEmployee);

            setEmployee(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.id === selectedEmployee.id ? updatedEmployee : employee
                )
            );
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };



    const handleDeleteEmployee = (employeeId) => {
        axios.delete(global.APIUrl + "/admin/delete/" + employeeId).then(() => {
            window.location.href = "/Employee";

        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Employee Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };

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

    const columns = [
        { field: 'uid', headerName: 'Employee ID', width: 150 },
        { field: 'name', headerName: 'Employee Name', width: 150 },
        { field: 'nic', headerName: 'NIC', width: 150 },
        { field: 'type', headerName: 'Type', width: 100 },
        { field: 'salary', headerName: 'Salary (Per Day)', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone No', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
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
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    {params.row.status === 'Activate' ? (
                        <IconButton color="error" onClick={() => handleUpdateEmployee(params.row)}>
                            <CloseIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="success" onClick={() => handleUpdateEmployee(params.row)}>
                            <CheckIcon />
                        </IconButton>
                    )}
                    <IconButton color="primary" onClick={() => handleEditEmployee(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteEmployee(params.row.uid)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];  
      const column = [
        { field: 'uid', headerName: 'Employee ID', width: 200 },
        { field: 'name', headerName: 'Employee Name', width: 200 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'salary', headerName: 'Per Day Salary', width: 200 },
        { field: 'days', headerName: 'Working Days', width: 200 },
        { field: 'fullSalary', headerName: 'Full Salary', width: 200 },             
    ];

    const handleAddSalary = () => {
        window.location.href = "/SalaryForm";
    }

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#ecf0f1', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Employee Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                            Add New Employee
                        </Button>
                        &nbsp;
                        &nbsp;
                         <Button variant="contained" color="primary" onClick={handleAddSalary}>
                            Salary
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Employee Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={employee} columns={columns} pageSize={5} />
                    </div>
                </div>
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Salary Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={salary} columns={column} pageSize={5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeManage;
