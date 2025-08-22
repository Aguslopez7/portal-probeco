package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EMoneda;

public record DtoProveedorRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    Long id,

    @NotNull
    String name,

    @NotNull
    EBancoProveedor banco,

    @NotNull
    String numeroCuenta,

    @NotNull
    String sucursal,

    @NotNull
    EMoneda moneda
) {}
