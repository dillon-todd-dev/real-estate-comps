import { Box, Button, Link, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/authProvider';
import axios from 'axios';
import { useAlert } from '../providers/alertProvider';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const showAlert = useAlert();

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password =
                'Password must be at least 8 characters with at least one uppercase and lowercase letter';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            axios.post('http://localhost:3000/login', {
                email: formData.email,
                password: formData.password
            }).then((res) => {
                if (res.status === 200) {
                    showAlert(`Welcome ${res.data.user.firstName}`, 'success');
                    setToken(res.data.token);
                    navigate('/properties');
                } else {
                    showAlert('Unable to login', 'error');
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: '500px',
                margin: 'auto',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
            }}
        >
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
            />
            <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href="#" variant="body2">
                    Forgot Password
                </Link>
            </Box>
        </Box>
    );
};

export default Login;
