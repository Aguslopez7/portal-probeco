import React, { useMemo } from 'react';

import { Form } from 'react-bootstrap';
import Select, { components } from 'react-select';

import useResponsive from '@hooks/useResponsive';

import { FaCheck } from 'react-icons/fa';
import { PiWarningCircleBold } from 'react-icons/pi';

const SearchableDropdown = ({ dropdownData, dataValue, dataLabel, handleChange, label, name, value, placeholder, required = false, isInvalid = false, isValidated = false }) => {
    const { isMobile } = useResponsive();

    const opciones = useMemo(
        () =>
            dropdownData.map((data) => ({
                value: data[dataValue] ?? data.name,
                label: data[dataLabel] ?? data.name
            })),
        [dropdownData]
    );

    const selectedOption = opciones.find((option) => option.value === value);

    const handleSelectChange = (selected) => {
        handleChange({
            target: {
                name,
                value: selected ? selected.value : ''
            }
        });
    };

    const showValidIcon = isValidated && !isInvalid;
    const showInvalidIcon = isInvalid;

    const IndicatorsContainer = (props) => (
        <components.IndicatorsContainer {...props}>
            {showValidIcon && (
                <FaCheck
                    size={16}
                    color="#198754"
                    style={{ marginRight: 6 }}
                />
            )}
            {showInvalidIcon && (
                <PiWarningCircleBold
                    size={18}
                    color="#dc3545"
                    style={{ marginRight: 6 }}
                />
            )}
            {props.children}
        </components.IndicatorsContainer>
    );

    return (
        <Form.Group controlId={`form-${name}`} className='mb-3'>
            <Form.Label>
                {label}
                {required && <span className="text-danger"> (*)</span>}
            </Form.Label>

            <Select
                name={name}
                value={selectedOption}
                onChange={handleSelectChange}
                options={opciones}
                isClearable
                isSearchable
                placeholder={placeholder}
                menuPosition="fixed"
                menuPlacement={isMobile ? 'top' : 'bottom'}
                menuShouldScrollIntoView={false}
                menuPortalTarget={document.body}
                components={{ IndicatorsContainer }}
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => {
                        const borderColor = isInvalid ? '#dc3545' : isValidated ? '#198754' : '#2a2a2a';

                        const boxShadow = state.isFocused
                            ? isInvalid
                                ? '0 0 0 0.25rem rgba(220,53,69,.25)'
                                : isValidated
                                ? '0 0 0 0.25rem rgba(25,135,84,.25)'
                                : '0 0 0 0.25rem rgba(13,110,253,.25)'
                            : 'none';

                        const borderWidth = isInvalid || isValidated ? '2px' : "1px";

                        return {
                            ...base,
                            border: `${borderWidth} solid ${borderColor}`,
                            boxShadow,
                            '&:hover': {
                                borderColor
                            }
                        };
                    }
                }}
            />

            {isInvalid && <div className="invalid-feedback d-block mt-2">Campo requerido (*)</div>}
        </Form.Group>
    );
};

export default SearchableDropdown;
