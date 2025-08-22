package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoCobranzaPendiente(
    @NotNull
    String nombreReporte,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    @NotNull
    String enlace
) {}
