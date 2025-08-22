package com.probeco.erp.modules.cobranzas.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.probeco.erp.dtos.DtoFacturaEmitida;
import com.probeco.erp.dtos.DtoFacturaEmitidaRequest;
import com.probeco.erp.modules.cobranzas.entities.FacturaEmitida;

@Mapper(componentModel = "spring")
public interface FacturaEmitidaMapper {

    DtoFacturaEmitidaRequest toDto(FacturaEmitida facturaemitida);

    @Mapping(target = "id", ignore = true)
    FacturaEmitida toEntity(DtoFacturaEmitida dtoFacturaEmitida);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFacturaEmitidaFromDto(DtoFacturaEmitida dtoFacturaEmitida, @MappingTarget FacturaEmitida facturaemitida);
}
