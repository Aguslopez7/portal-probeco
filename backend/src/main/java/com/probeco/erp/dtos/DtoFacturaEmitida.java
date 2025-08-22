package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoFacturaEmitida(
    @NotNull
    String cobrador,

    @NotNull
    String referenciaClienteEvento,

    @NotNull
    String numeroFactura,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    @NotNull
    String factura
) {}
