import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/Logo-ProBeCo-Color.png';
import axios from 'axios'; // Assuming you're using axios

const LoginView = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const { login } = useAuth(); // Get login() from context
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
            const { token } = response.data;

            login(token); // Calls context's login(), which decodes and stores role
            navigate('/'); // Redirect after successful login
        } catch (err) {
            console.error('Login failed:', err);
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="login-view">
            <Modal show={true} centered dialogClassName="custom-login-modal">
                <Modal.Body className='modal-body'>
                    <div className="text-center">
                        <img
                            style={{ width: '100px', height: 'auto', borderRadius: '50%' }}  
                            src={Logo}
                            alt="Grupo Planeta Logo"
                            className="login-logo mb-3"
                        />
                        <h4>Iniciar Sesión</h4>
                        <hr />
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Ingresa tu usuario"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {error && (
                            <div className="text-danger text-center mb-3">
                                {error}
                            </div>
                        )}

                        <Button type="submit" variant="dark" className="w-100">
                            Ingresar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginView;
