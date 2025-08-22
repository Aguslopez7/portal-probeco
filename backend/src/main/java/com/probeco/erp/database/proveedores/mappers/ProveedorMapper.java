package com.probeco.erp.database.proveedores.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.database.proveedores.entities.Proveedor;
import com.probeco.erp.dtos.DtoProveedor;
import com.probeco.erp.dtos.DtoProveedorRequest;

@Mapper(componentModel = "spring")
public interface ProveedorMapper {

    ProveedorMapper INSTANCE = Mappers.getMapper( ProveedorMapper.class );

    DtoProveedorRequest toDto(Proveedor proveedor);

    @Mapping(target = "id", ignore = true)
    Proveedor toEntity(DtoProveedor dtoProveedor);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateProveedorFromDto(DtoProveedor dtoProveedor, @MappingTarget Proveedor proveedor);
}
