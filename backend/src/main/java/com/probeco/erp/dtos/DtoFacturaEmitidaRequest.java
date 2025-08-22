package com.probeco.erp.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoFacturaEmitidaRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    String id,

    @JsonPropertyDescription("{\"readOnly\": true}")
    LocalDate fechaFactura,

    @NotNull
    String cobrador,

    @NotNull
    String referenciaClienteEvento,

    @NotNull
    String numeroFactura,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    String factura
) {}
