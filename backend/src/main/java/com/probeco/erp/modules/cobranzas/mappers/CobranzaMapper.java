
package com.probeco.erp.modules.cobranzas.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.probeco.erp.dtos.DtoCobranza;
import com.probeco.erp.dtos.DtoCobranzaRequest;
import com.probeco.erp.modules.cobranzas.entities.Cobranza;

@Mapper(componentModel = "spring")
public interface CobranzaMapper {

    CobranzaMapper INSTANCE = Mappers.getMapper(CobranzaMapper.class);

    // Maps from DTO to Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "fechaEnvioCobranza", ignore = true)
    @Mapping(target = "cobrador", source = "username") // set logged username as ordenanteDelPago
    @Mapping(target = "estadoAcreditacionBancaria", ignore = true)
    @Mapping(target = "estadoFcSistemas", ignore = true)
    @Mapping(target = "recibo", ignore = true)
    Cobranza toEntity(DtoCobranza dtoCobranza, String username);

    // Maps from Entity to DTO
    DtoCobranzaRequest toDto(Cobranza cobranza);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCobranzaFromDto(DtoCobranzaRequest dtoCobranza, @MappingTarget Cobranza cobranza);
}
