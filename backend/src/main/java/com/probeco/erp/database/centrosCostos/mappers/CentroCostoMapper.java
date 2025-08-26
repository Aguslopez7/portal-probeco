package com.probeco.erp.database.centrosCostos.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.probeco.erp.database.centrosCostos.entities.CentroCosto;
import com.probeco.erp.dtos.DtoCentroCosto;
import com.probeco.erp.dtos.DtoCentroCostoRequest;

@Mapper(componentModel = "spring")
public interface CentroCostoMapper {
    
    DtoCentroCostoRequest toDto(CentroCosto centrosCostos); 

    @Mapping(target = "id", ignore = true)
    CentroCosto toEntity(DtoCentroCosto dtoCentroCosto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCentroCostoFromDto(DtoCentroCostoRequest dtoCentroCosto, @MappingTarget CentroCosto centrosCostos);
}
