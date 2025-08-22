import { Form } from 'react-bootstrap';
import { bancosConstants } from '../../utils/constants';

const BancosDropdown = ({ label, name, value, handleChange }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Banco {label}</Form.Label>
            <Form.Select required name={name} value={value} onChange={handleChange}>
                <option value="">Seleccionar Banco {label}</option>
                {Object.entries(bancosConstants).map(([key, value]) => (
                    <option key={key} value={value}>
                        {value}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}

export default BancosDropdown;