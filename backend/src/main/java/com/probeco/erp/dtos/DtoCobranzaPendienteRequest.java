package com.probeco.erp.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoCobranzaPendienteRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    String id,

    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    LocalDate fechaReporte,

    @NotNull
    String nombreReporte,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    String enlace
) {}
