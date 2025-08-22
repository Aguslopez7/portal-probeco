package com.probeco.erp.converters;

import com.probeco.erp.enums.EBancoProveedor;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // autoApply elimina necesidad de @Convert en la entidad
public class EBancoProveedorConverter implements AttributeConverter<EBancoProveedor, String> {

    @Override
    public String convertToDatabaseColumn(EBancoProveedor attribute) {
        return attribute != null ? attribute.getDescripcion() : null;
    }

    @Override
    public EBancoProveedor convertToEntityAttribute(String dbData) {
        return dbData != null ? EBancoProveedor.fromDescripcion(dbData) : null;
    }
}
