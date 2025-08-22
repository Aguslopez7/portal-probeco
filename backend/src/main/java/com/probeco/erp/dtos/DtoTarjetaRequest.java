package com.probeco.erp.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEstadoControl;
import com.probeco.erp.enums.EEstadoRegistroContable;
import com.probeco.erp.enums.EMoneda;

public record DtoTarjetaRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    Long id,

    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    String subidoPor,

    @JsonPropertyDescription("{\"format\": \"date\"}")
    @NotNull
    LocalDate fechaGasto,

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

    @NotNull
    EMoneda moneda,

    @NotNull
    float montoTotal,

    @NotNull
    EConfirm ivaIncluido,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    String comprobante,

    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    EEstadoControl estadoControl,

    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    String nombreCuentaContable,

    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    EEstadoRegistroContable estadoRegistroContable
) {}
