import { useState } from 'react';
import axiosInstance from '@utils/axiosConfig';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

const CrearEvento = () => {
    const [form, setForm] = useState({
        empresa: 'A',
        titulo: '',
        descripcion: '',
        ubicacion: '',
        fecha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            titulo: form.titulo,
            descripcion: form.descripcion,
            ubicacion: form.ubicacion,
            fecha: form.fecha
        };

        try {
            const res = await axiosInstance.post(`google/calendar/${form.empresa}`, payload);
            alert(res.data);
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert('❌ Error al crear evento');
        }
    };

    return (
        <Container className="mt-4">
            <h4>📅 Crear Evento de Todo el Día</h4>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Empresa</Form.Label>
                            <Form.Select
                                name="empresa"
                                value={form.empresa}
                                onChange={handleChange}
                            >
                                <option value="A">Empresa A</option>
                                <option value="B">Empresa B</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control
                        type="text"
                        name="ubicacion"
                        value={form.ubicacion}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fecha del evento</Form.Label>
                    <Form.Control
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="success"
                >
                    Crear Evento
                </Button>
            </Form>
        </Container>
    );
};

export default CrearEvento;
