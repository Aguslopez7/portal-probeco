package com.probeco.erp.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.dtos.DtoRegisterRequest;
import com.probeco.erp.dtos.DtoUser;
import com.probeco.erp.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper( UserMapper.class );

    DtoUser toDto(User usuario);

    @Mapping(target = "id", ignore = true)
    User toEntity(DtoRegisterRequest dtoUsuario);

    @Mapping(target = "password", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUsuarioFromDto(DtoUser dtoUsuario, @MappingTarget User usuario);
}
