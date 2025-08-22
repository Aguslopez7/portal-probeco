package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.probeco.erp.enums.EGrupoContable;
import com.probeco.erp.enums.ESubGrupoContable;
import com.probeco.erp.enums.ETipoCosto;
import com.probeco.erp.enums.ETipoCuentaContable;

public record DtoCuentaContable(
    @NotNull
    String nombre,

    @NotNull
    EGrupoContable grupoContable,

    @NotNull
    ESubGrupoContable subGrupoContable,

    @NotNull
    ETipoCuentaContable tipoCuentaContable,

    @NotNull
    ETipoCosto tipoCosto
) {}
