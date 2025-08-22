package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EMoneda;

public record DtoProveedor(
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
