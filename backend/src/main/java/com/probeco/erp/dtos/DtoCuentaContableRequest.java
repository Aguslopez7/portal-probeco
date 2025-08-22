package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EGrupoContable;
import com.probeco.erp.enums.ESubGrupoContable;
import com.probeco.erp.enums.ETipoCosto;
import com.probeco.erp.enums.ETipoCuentaContable;

public record DtoCuentaContableRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    Long id,

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
