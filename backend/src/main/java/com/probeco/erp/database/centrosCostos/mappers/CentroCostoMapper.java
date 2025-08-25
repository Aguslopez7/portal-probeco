package com.probeco.erp.database.centrosCostos.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.probeco.erp.database.centrosCostos.dtos.DtoCentroCosto;
import com.probeco.erp.database.centrosCostos.entities.CentroCosto;

@Mapper(componentModel = "spring")
public interface CentroCostoMapper {
    
    DtoCentroCosto toDto(CentroCosto centrosCostos); 

    CentroCosto toEntity(DtoCentroCosto dtoCentroCosto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCentroCostoFromDto(DtoCentroCosto dtoCentroCosto, @MappingTarget CentroCosto centrosCostos);
}
