package com.probeco.erp.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEstadoPago;
import com.probeco.erp.enums.EMoneda;

public record DtoPagoRequest(
    @JsonPropertyDescription("{\"readOnly\": true}")
    Long id,

    @JsonPropertyDescription("{\"readOnly\": true}")
    LocalDate fechaSolicitudPago,

    @JsonPropertyDescription("{\"readOnly\": true}")
    String ordenanteDelPago,

    String conceptoPago,

    EMoneda moneda,

    @NotNull
    String centroCosto,

    float monto,
    
    EConfirm ivaIncluido,

    @JsonPropertyDescription("{\"type\": \"file\"}")
    String factura,

    String proveedor,

    EBancoProveedor bancoProveedor,

    String numeroCuenta,

    String sucursal,
    
    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    EEstadoPago estadoPago,

    @JsonPropertyDescription("{\"section\": \"Contable\", \"type\": \"file\"}")
    String comprobantePago,

    @JsonPropertyDescription("{\"section\": \"Contable\"}")
    String bancoEmisor

    // @JsonPropertyDescription("{\"section\": \"Contable\"}")
    // String nombreCuentaContable,

    // @JsonPropertyDescription("{\"section\": \"Contable\"}")
    // EEstadoRegistroContable estadoRegistroContable
) {}
