package com.probeco.erp.database.cuentas.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.database.cuentas.entities.CuentaContable;
import com.probeco.erp.dtos.DtoCuentaContable;
import com.probeco.erp.dtos.DtoCuentaContableRequest;
import com.probeco.erp.enums.EGrupoContable;
import com.probeco.erp.enums.ESubGrupoContable;
import com.probeco.erp.enums.ETipoCosto;
import com.probeco.erp.enums.ETipoCuentaContable;

@Mapper(componentModel = "spring")
public interface CuentaContableMapper {

    CuentaContableMapper INSTANCE = Mappers.getMapper( CuentaContableMapper.class );

    // Métodos auxiliares
    @Named("descripcionToGrupo")
    default EGrupoContable descripcionToGrupo(String descripcion) {
        return EGrupoContable.fromDescripcion(descripcion);
    }

    @Named("descripcionToSubGrupo")
    default ESubGrupoContable descripcionToSubGrupo(String descripcion) {
        return ESubGrupoContable.fromDescripcion(descripcion);
    }

    @Named("descripcionToTipoCuenta")
    default ETipoCuentaContable descripcionToTipoCuenta(String descripcion) {
        return ETipoCuentaContable.fromDescripcion(descripcion);
    }

    @Named("descripcionToTipoCosto")
    default ETipoCosto descripcionToTipoCosto(String descripcion) {
        return ETipoCosto.fromDescripcion(descripcion);
    }

    DtoCuentaContableRequest toDto(CuentaContable cuentaContable);

    @Mapping(target = "id", ignore = true)
    CuentaContable toEntity(DtoCuentaContable dto);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCuentaContableFromDto(DtoCuentaContableRequest dto, @MappingTarget CuentaContable cuentaContable);
}
