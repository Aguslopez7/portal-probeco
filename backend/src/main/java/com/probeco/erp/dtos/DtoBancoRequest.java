package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EMoneda;

public record DtoBancoRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    Long id,

    @NotNull
    EBancoProveedor name,

    @NotNull
    String sucursal,

    @NotNull
    EMoneda moneda,

    @NotNull
    String numeroCuenta
) {}
