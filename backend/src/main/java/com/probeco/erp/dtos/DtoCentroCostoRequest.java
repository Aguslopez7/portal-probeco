package com.probeco.erp.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoCentroCostoRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    Long id,
    String nombre
) {}
