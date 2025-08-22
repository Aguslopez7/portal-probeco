package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EMoneda;

public record DtoBanco(
    @NotNull
    EBancoProveedor name,

    @NotNull
    String sucursal,

    @NotNull
    EMoneda moneda,

    @NotNull
    String numeroCuenta
) {}
