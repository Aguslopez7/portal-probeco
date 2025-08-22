package com.probeco.erp.database.bancos.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.database.bancos.entities.Banco;
import com.probeco.erp.dtos.DtoBanco;
import com.probeco.erp.dtos.DtoBancoRequest;

@Mapper(componentModel = "spring")
public interface BancoMapper {
    
    BancoMapper INSTANCE = Mappers.getMapper( BancoMapper.class );
    
    DtoBancoRequest toDto(Banco dtoBanco);

    @Mapping(target = "id", ignore = true)
    Banco toEntity(DtoBanco dtoBanco);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBancoFromDto(DtoBanco dtoBanco, @MappingTarget Banco banco);
}
