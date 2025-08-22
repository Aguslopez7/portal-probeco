// EstadoCuentaModalBootstrap.jsx
import { useState } from 'react';

import { Step, StepLabel, Stepper } from '@mui/material';
import { Alert, Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';

import { FaCalendarAlt, FaCheckCircle, FaList, FaPlus, FaTrash, FaChartLine } from 'react-icons/fa';
import { HiCurrencyDollar } from 'react-icons/hi2';
import { MdCancel } from 'react-icons/md';
import { GiProgression } from "react-icons/gi";

const EstadoCuentaEvento = () => {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDescription, setPaymentDescription] = useState('');
    const [eventAccount, setEventAccount] = useState({
        eventName: 'Boda de María y Carlos',
        totalAmount: 15000,
        payments: [
            { id: '1', amount: 5000, date: '2024-01-14', description: 'Anticipo inicial' },
            { id: '2', amount: 3000, date: '2024-02-09', description: 'Segundo pago' }
        ]
    });

    const totalPaid = eventAccount.payments.reduce((sum, p) => sum + p.amount, 0);
    const remainingBalance = eventAccount.totalAmount - totalPaid;

    const addPayment = () => {
        const amount = parseFloat(paymentAmount);
        if (amount > 0) {
            const newPayment = {
                id: Date.now().toString(),
                amount,
                date: new Date().toISOString().split('T')[0],
                description: paymentDescription || `Pago ${eventAccount.payments.length + 1}`
            };
            setEventAccount({ ...eventAccount, payments: [...eventAccount.payments, newPayment] });
            setPaymentAmount('');
            setPaymentDescription('');
        }
    };

    const removePayment = (id) => {
        setEventAccount({
            ...eventAccount,
            payments: eventAccount.payments.filter((p) => p.id !== id)
        });
    };

    const formatCurrency = (amount) => amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    const formatDate = (date) => new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

    const steps = [
        ...eventAccount.payments.map((p, i) => ({
            label: p.description || `Pago ${i + 1}`,
            amount: formatCurrency(p.amount),
            icon: (
                <HiCurrencyDollar
                    size={25}
                    color="black"
                />
            ),
            date: formatDate(p.date)
        })),
        {
            label: 'Pago Total',
            amount: formatCurrency(eventAccount.totalAmount),
            icon:
                remainingBalance <= 0 ? (
                    <FaCheckCircle
                        size={22}
                        color="green"
                    />
                ) : (
                    <MdCancel
                        size={25}
                        color="red"
                    />
                ),
            date: ''
        }
    ];

    return (
        <>
            <p className="text-muted">
                Gestiona los pagos y consulta el saldo pendiente de <strong>{eventAccount.eventName}</strong>
            </p>

            <Card className="mb-4">
                <Card.Header>
                    <GiProgression className="me-2" />
                    Progreso de pagos
                </Card.Header>
                <Card.Body>
                    {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                <small className="text-muted"></small>
                                <small className="fw-bold">{paymentProgress.toFixed(1)}%</small>
                            </div> */}
                    <br />
                    <Stepper
                        alternativeLabel
                        activeStep={eventAccount.payments.length}
                    >
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel
                                    icon={step.icon}
                                    optional={
                                        <div className="text-center small text-muted">
                                            <div>{step.amount}</div>
                                            {step.date && <div>{step.date}</div>}
                                        </div>
                                    }
                                >
                                    <div className="small">{step.label}</div>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <br />
                    {remainingBalance <= 0 ? (
                        <Alert
                            variant="success"
                            className="text-center mb-0"
                        >
                            ¡Evento completamente pagado! ✅
                        </Alert>
                    ) : (
                        <Alert
                            variant="danger"
                            className="text-center mb-0"
                        >
                            Deuda Cliente <strong>{formatCurrency(remainingBalance)}</strong>
                        </Alert>
                    )}
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header>
                    <FaPlus className="me-2" />
                    Registrar Nuevo Pago
                </Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Monto del Pago</Form.Label>
                            <Form.Control
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                placeholder="0.00"
                                min="0"
                            />
                        </Col>
                        <Col>
                            <Form.Label>Descripción (Opcional)</Form.Label>
                            <Form.Control
                                value={paymentDescription}
                                onChange={(e) => setPaymentDescription(e.target.value)}
                                placeholder="Concepto del pago"
                            />
                        </Col>
                    </Row>
                    <Button
                        onClick={addPayment}
                        className="w-100"
                        disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
                        variant="dark"
                    >
                        <FaPlus className="me-2" />
                        Agregar Pago
                    </Button>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Header>
                    <FaList className="me-2" />
                    Historial de Pagos
                </Card.Header>
                <Card.Body>
                    {eventAccount.payments.length === 0 ? (
                        <div className="text-center text-muted py-3">
                            <HiCurrencyDollar
                                size={40}
                                className="mb-2"
                            />
                            <p>No hay pagos registrados</p>
                        </div>
                    ) : (
                        eventAccount.payments.map((payment) => (
                            <div
                                key={payment.id}
                                className="d-flex justify-content-between align-items-start mb-3 p-2 border rounded"
                            >
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <span className="fw-bold">{formatCurrency(payment.amount)}</span>
                                        <Badge
                                            bg="secondary"
                                            className="d-flex align-items-center gap-1"
                                        >
                                            <FaCalendarAlt /> {formatDate(payment.date)}
                                        </Badge>
                                    </div>
                                    <small className="text-muted">{payment.description}</small>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => removePayment(payment.id)}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        ))
                    )}
                </Card.Body>
            </Card>

            <Card>
                <Card.Header><FaChartLine className='me-2'/>Resumen Financiero</Card.Header>
                <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Monto Total del Evento:</span>
                        <strong>{formatCurrency(eventAccount.totalAmount)}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Total Pagado:</span>
                        <strong className="text-success">{formatCurrency(totalPaid)}</strong>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                        <span className="fw-medium">Saldo Pendiente:</span>
                        <strong className={remainingBalance > 0 ? 'text-danger' : 'text-success'}>{formatCurrency(remainingBalance)}</strong>
                    </div>
                </Card.Body>
            </Card>
        </>
        // <Modal
        //     show={show}
        //     onHide={handleClose}
        //     size="lg"
        //     scrollable
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title>Estado de Cuenta del Evento</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>

        //     </Modal.Body>
        // </Modal>
    );
};

export default EstadoCuentaEvento;
