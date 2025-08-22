package com.probeco.erp.database.propietariosTarjeta.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.database.propietariosTarjeta.entities.PropietarioTarjeta;
import com.probeco.erp.dtos.DtoPropietarioTarjeta;
import com.probeco.erp.dtos.DtoPropietarioTarjetaRequest;

@Mapper(componentModel = "spring")
public interface PropietarioTarjetaMapper {

    PropietarioTarjetaMapper INSTANCE = Mappers.getMapper( PropietarioTarjetaMapper.class );

    DtoPropietarioTarjetaRequest toDto(PropietarioTarjeta propietariotarjeta);

    @Mapping(target = "id", ignore = true)
    PropietarioTarjeta toEntity(DtoPropietarioTarjeta dtoPropietarioTarjeta);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePropietarioTarjetaFromDto(DtoPropietarioTarjetaRequest dtoPropietarioTarjeta, @MappingTarget PropietarioTarjeta propietariotarjeta);
}
