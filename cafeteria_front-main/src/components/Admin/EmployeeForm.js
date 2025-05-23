import React, { useState,useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddNewEmployeeForm = () => {
    const [newEmployee, setNewEmployee] = useState({
        uid: "E" + generateId(),
        name: '',
        nic: '',
        status: 'Deactivate',
        email: '',
        phone: '',
        password: '',
        type: 'Employee',
        salary: 0,
    });

    const info = JSON.parse(localStorage.getItem("selectedEmployee"));

    useEffect(() => {
        if (info.editBtn) {
            setNewEmployee(info.selectedEmployee);
        }
    }, []);

    const [errors, setErrors] = useState({});

    function generateId() {
        let id = '';
        for (let i = 0; i < 9; i++) {
            id += Math.floor(Math.random() * 10);
        }
        return id;
    }

    const handleAddEmployee = async () => {
        if (validateForm()) {
            try {
                const response = await axios.post(
                    `${global.APIUrl}/admin/register`,
                    newEmployee
                );
                console.log(response);
                if (response.data.message !== "Email is Already Used") {

                    Swal.fire({
                        title: "Success!",
                        text: response.data.message,
                        icon: "success",
                        confirmButtonText: "OK",
                        type: "success",
                    }).then((okay) => {
                        if (okay) {
                            window.location.href = "/Employee";
                        }
                    });
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "Email Already Taken",
                        icon: "error",
                        confirmButtonText: "OK",
                        type: "success",
                    });
                    setTimeout(() => {
                        window.location.href = "/EmployeeForm";
                    }, 3000);
                }
            } catch (err) {
                Swal.fire({
                    title: "Error!",
                    text: "Registration Not Success",
                    icon: "error",
                    confirmButtonText: "OK",
                    type: "success",
                });
                setTimeout(() => {
                    window.location.href = "/EmployeeForm";
                }, 3000);
            }

        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newEmployee.uid.trim()) {
            errors.uid = 'Employee ID is required';
            isValid = false;
        }

        if (!newEmployee.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!newEmployee.nic.trim()) {
            errors.nic = 'NIC is required';
            isValid = false;
        }

        if (!newEmployee.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(newEmployee.email)) {
            errors.email = 'Invalid email address';
            isValid = false;
        }

        if (!newEmployee.phone.trim()) {
            errors.phone = 'Phone number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(newEmployee.phone)) {
            errors.phone = 'Phone number must be exactly 10 digits';
            isValid = false;
        }

        if (!newEmployee.password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (newEmployee.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        if (!newEmployee.salary) {
            errors.salary = 'Salary is required';
            isValid = false;
        }


        setErrors(errors);
        return isValid;
    };

    const handleEditEmployee = async () => {
        if (validateForm()) {
            newEmployee.uid = info.selectedEmployee.uid;            
            try {
                await axios.put(global.APIUrl + "/admin/update", newEmployee);
                Swal.fire({
                    title: "Success!",
                    text: "Employee updated successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedEmployee', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/Employee";
                }, 1000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to update Employee.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedEmployee', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/Employee";
                }, 1000);
            }
        }
    }

    const handleCancel = () => {
        localStorage.setItem('selectedEmployee', JSON.stringify({}));
        window.location.href = "/Employee";
    };

    return (
        <div style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#f4f4f4' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                <Toolbar>
                {(info.editBtn) ? (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                            Edit Employee
                        </Typography>
                    ) : (
                        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                             Add New Employee
                        </Typography>
                    )}                   
                    <div style={{ flexGrow: 1 }}></div>
                    {(info.editBtn) ? (
                        <Button variant="contained" color="primary" onClick={handleEditEmployee}>
                            Edit Employee
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                           Add Employee
                        </Button>
                    )}
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                Add New Employee Form
                            </Typography>
                            <hr />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Employee ID"
                                fullWidth
                                placeholder='A4562'
                                value={newEmployee.uid}
                                onChange={(e) => setNewEmployee({ ...newEmployee, uid: e.target.value })}
                                error={!!errors.uid}
                                helperText={errors.uid}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={newEmployee.name}
                                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="NIC"
                                fullWidth
                                value={newEmployee.nic}
                                onChange={(e) => setNewEmployee({ ...newEmployee, nic: e.target.value })}
                                error={!!errors.nic}
                                helperText={errors.nic}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Salary (Per Day)"
                                fullWidth
                                value={newEmployee.salary}
                                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                                error={!!errors.salary}
                                helperText={errors.salary}
                                type='number'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={newEmployee.email}
                                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                error={!!errors.email}
                                helperText={errors.email}
                                disabled = {info.editBtn}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                fullWidth
                                value={newEmployee.phone}
                                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                fullWidth
                                type="password"
                                value={newEmployee.password}
                                onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                                error={!!errors.password}
                                helperText={errors.password}
                                disabled = {info.editBtn}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default AddNewEmployeeForm;
