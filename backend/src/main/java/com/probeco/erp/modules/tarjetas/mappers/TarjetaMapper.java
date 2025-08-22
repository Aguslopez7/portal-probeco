package com.probeco.erp.modules.tarjetas.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.dtos.DtoTarjeta;
import com.probeco.erp.dtos.DtoTarjetaRequest;
import com.probeco.erp.dtos.DtoTarjetasRequestPublic;
import com.probeco.erp.modules.tarjetas.entities.Tarjeta;

@Mapper(componentModel = "spring")
public interface TarjetaMapper {
    
    TarjetaMapper INSTANCE = Mappers.getMapper( TarjetaMapper.class );

    @Mapping(source = "createdBy", target = "subidoPor")
    DtoTarjetaRequest toDto(Tarjeta tarjeta);

    @Mapping(source = "createdBy", target = "subidoPor")
    DtoTarjetasRequestPublic toDtoPublic(Tarjeta tarjeta);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "estadoControl", ignore = true)
    @Mapping(target = "estadoRegistroContable", ignore = true)
    @Mapping(target = "nombreCuentaContable", ignore = true)
    Tarjeta toEntity(DtoTarjeta dtoTarjeta);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTarjetaFromDto(DtoTarjetaRequest dtoTarjeta, @MappingTarget Tarjeta tarjeta);
}
