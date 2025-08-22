package com.probeco.erp.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EMoneda;

public record DtoTarjeta(
    @NotNull
    String propietarioTarjeta,

    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    Integer ultimosDigitos,

    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    String tipoTarjeta,

    @NotNull
    String conceptoGasto,

    @JsonPropertyDescription("{\"format\": \"date\"}")
    @NotNull
    LocalDate fechaGasto,

    @NotNull
    EMoneda moneda,

    @NotNull
    float montoTotal,

    @NotNull
    EConfirm ivaIncluido,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    @NotNull
    String comprobante
) {}
