package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EBancoEmisorTarjeta;
import com.probeco.erp.enums.ETipoTarjeta;

public record DtoPropietarioTarjetaRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    Long id,

    @NotNull
    String nombrePropietarioTarjeta,

    @NotNull
    EBancoEmisorTarjeta bancoEmisorTarjeta,

    @NotNull
    ETipoTarjeta tipoTarjeta,

    @NotNull
    Integer ultimosDigitos
) {}
