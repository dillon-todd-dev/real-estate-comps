import { Box, Button, Link, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authProvider";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with at least one uppercase and lowercase letter';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            if (formData.email === 'dillontodd10@gmail.com') {
                setToken('this is a test token');
                navigate('/properties', { replace: true });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                maxWidth: '500px',
                margin: 'auto',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white'
            }}
        >
            <TextField
                fullWidth
                label='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin='normal'
            />
            <TextField
                fullWidth
                type='password'
                label='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin='normal'
            />
            <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                sx={{ mt: 2 }}
            >
                Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Link href='#' variant='body2'>
                    Forgot Password
                </Link>
                <Box mt={1}>
                    <Link href='/signup' variant='body2'>
                        Don't have an account? Sign Up
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Login;