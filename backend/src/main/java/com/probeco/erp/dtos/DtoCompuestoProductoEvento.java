package com.probeco.erp.dtos;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoCompuestoProductoEvento(
    //String id,
    @JsonPropertyDescription("{\"readOnly\": true}")
    String nombre,

    @JsonPropertyDescription("{\"readOnly\": true,\"default\": \"SI\"}")
    String opcional,

    int cantidad,

    @JsonPropertyDescription("{\"readOnly\": true}")
    int stock
) {}
