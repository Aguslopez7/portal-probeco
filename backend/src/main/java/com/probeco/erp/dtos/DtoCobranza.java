package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.EMoneda;
import com.probeco.erp.enums.EType;

public record DtoCobranza(
    @NotNull
    EEmpresa empresa,

    @NotNull
    String clienteEvento,

    @JsonPropertyDescription("{\"default\": \"UYU\"}")
    @NotNull
    EMoneda moneda,

    @NotNull
    Float monto,

    @NotNull
    String bancoReceptor,

    @NotNull
    String referenciaFactura,

    @NotNull
    EType tipo,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    @NotNull
    String comprobanteCobranza,

    @NotNull
    EConfirm requiereRecibo
) {}
