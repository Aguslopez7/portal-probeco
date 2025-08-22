package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.probeco.erp.enums.EBancoEmisorTarjeta;
import com.probeco.erp.enums.ETipoTarjeta;

public record DtoPropietarioTarjeta(
    @NotNull
    String nombrePropietarioTarjeta,

    @NotNull
    EBancoEmisorTarjeta bancoEmisorTarjeta,

    @NotNull
    ETipoTarjeta tipoTarjeta,

    @NotNull
    Integer ultimosDigitos
) {}
