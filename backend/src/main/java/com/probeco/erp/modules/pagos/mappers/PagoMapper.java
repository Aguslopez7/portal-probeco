package com.probeco.erp.modules.pagos.mappers;

import com.probeco.erp.dtos.DtoPago;
import com.probeco.erp.dtos.DtoPagoRequest;
import com.probeco.erp.modules.pagos.entities.Pago;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PagoMapper {

    PagoMapper INSTANCE = Mappers.getMapper( PagoMapper.class );

    // Maps from DTO to Entity
    @Mapping(target = "fechaSolicitudPago", ignore = true)
    @Mapping(target = "ordenanteDelPago", source = "username") // set logged username as ordenanteDelPago
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "bancoEmisor", ignore = true)
    @Mapping(target = "comprobantePago", ignore = true)
    @Mapping(target = "estadoPago", ignore = true)
    @Mapping(target = "estadoRegistroContable", ignore = true)
    @Mapping(target = "nombreCuentaContable", ignore = true)
    Pago toEntity(DtoPago dtoPago, String username);

    // Maps from Entity to DTO
    DtoPagoRequest toDto(Pago pago);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateBancoFromDto(DtoPagoRequest dtoPago, @MappingTarget Pago pago);
}
