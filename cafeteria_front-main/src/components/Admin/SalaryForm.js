import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const SalaryForm = () => {
    const [newSalary, setNewSalary] = useState({
        uid: '',
        name: '',
        date: '',
        days: 0,
        salary: 0,
        fullSalary: 0
    });

    const [errors, setErrors] = useState({});

    const handleAddSalary = async () => {
        if (validateForm()) {
            try {
                await axios.post(global.APIUrl + '/salary/add', newSalary);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Salary added successfully'
                }).then(() => {
                    window.location.href = "/Employee";
                });
            } catch (error) {
                console.error('Error adding salary:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error adding salary'
                }).then(() => {
                    window.location.href = "/SalaryForm";
                });
            }           
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newSalary.uid) {
            errors.uid = 'Employee ID is required';
            isValid = false;
        }

        if (!newSalary.name) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!newSalary.salary) {
            errors.salary = 'Salary is required';
            isValid = false;
        }

        if (!newSalary.days) {
            errors.days = 'Working Days is required';
            isValid = false;
        }

        if (!newSalary.date) {
            errors.date = 'Date is required';
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        window.location.href = "/Employee";
    };

    useEffect(() => {
        const calculateSalary = () => {
            setNewSalary({ ...newSalary, fullSalary: newSalary.salary * newSalary.days });
        };
        calculateSalary();
    }, [newSalary.salary, newSalary.days]);

    return (
        <div style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#f4f4f4' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Add Employee Salary
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button variant="contained" color="primary" onClick={handleAddSalary}>
                        Add
                    </Button>
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
                                Employee Salary Calculate Form
                            </Typography>
                            <hr />
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                Calculated Salary: {newSalary.fullSalary}
                            </Typography>
                            <hr />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Employee ID"
                                fullWidth
                                placeholder='A4562'
                                value={newSalary.uid}
                                onChange={(e) => setNewSalary({ ...newSalary, uid: e.target.value })}
                                error={!!errors.uid}
                                helperText={errors.uid}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={newSalary.name}
                                onChange={(e) => setNewSalary({ ...newSalary, name: e.target.value })}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                fullWidth
                                value={newSalary.date}
                                onChange={(e) => setNewSalary({ ...newSalary, date: e.target.value })}
                                error={!!errors.date}
                                helperText={errors.date}
                                type='date'
                                focused
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Per Day Salary"
                                fullWidth
                                value={newSalary.salary}
                                onChange={(e) => setNewSalary({ ...newSalary, salary: e.target.value })}
                                error={!!errors.salary}
                                helperText={errors.salary}
                                type='number'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Working Days"
                                fullWidth
                                value={newSalary.days}
                                onChange={(e) => setNewSalary({ ...newSalary, days: e.target.value })}
                                error={!!errors.days}
                                helperText={errors.days}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default SalaryForm;
