package com.probeco.erp.modules.cobranzas.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.probeco.erp.dtos.DtoCobranzaPendiente;
import com.probeco.erp.dtos.DtoCobranzaPendienteRequest;
import com.probeco.erp.modules.cobranzas.entities.CobranzaPendiente;

@Mapper(componentModel = "spring")
public interface CobranzaPendienteMapper {

    DtoCobranzaPendienteRequest toDto(CobranzaPendiente cobranzapendiente);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "fechaReporte", ignore = true)
    CobranzaPendiente toEntity(DtoCobranzaPendiente dtoCobranzaPendiente);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCobranzaPendienteFromDto(DtoCobranzaPendienteRequest dtoCobranzaPendiente, @MappingTarget CobranzaPendiente cobranzapendiente);
}
