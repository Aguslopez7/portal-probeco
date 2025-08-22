package com.probeco.erp.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.EEstadoAcreditacionBancaria;
import com.probeco.erp.enums.EEstadoFcSistemas;
import com.probeco.erp.enums.EMoneda;
import com.probeco.erp.enums.EType;

public record DtoCobranzaRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    Long id,

    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    LocalDate fechaEnvioCobranza,

    @JsonPropertyDescription("{\"readOnly\": true}")
    @NotNull
    String cobrador,

    @NotNull
    EEmpresa empresa,

    @NotNull
    String clienteEvento,

    @NotNull
    EMoneda moneda,

    @NotNull
    float monto,

    @NotNull
    String bancoReceptor,
    
    @NotNull
    String referenciaFactura,

    @NotNull
    EType tipo,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    String comprobanteCobranza,

    @NotNull
    EConfirm requiereRecibo,

    @JsonPropertyDescription("{\"type\": \"file\", \"section\": \"Contable\"}")
    String recibo,

    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    EEstadoAcreditacionBancaria estadoAcreditacionBancaria,

    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    EEstadoFcSistemas estadoFcSistemas
) {}
