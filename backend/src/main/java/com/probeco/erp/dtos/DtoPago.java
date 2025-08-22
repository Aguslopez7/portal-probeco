package com.probeco.erp.dtos;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EMoneda;

public record DtoPago(
    @NotNull
    String conceptoPago,

    @JsonPropertyDescription("{\"default\": \"UYU\"}")
    @NotNull
    EMoneda moneda,

    @NotNull
    String centroDeCostos,

    @NotNull
    @JsonPropertyDescription("{\"format\": \"currency\"}")
    Float monto,

    @NotNull
    EConfirm ivaIncluido,

    EConfirm adjuntaFactura,

    @JsonPropertyDescription("{\"type\": \"file\", \"x-conditional\": {\"field\": \"adjuntaFactura\", \"equals\": \"SI\"}}")
    String factura,

    @JsonPropertyDescription("{\"default\": \"SI\", \"leftOnly\":true}")
    EConfirm existeProveedor,

    //@JsonPropertyDescription("{\"searchable\": true}")
    @NotNull
    String proveedor,

    @JsonPropertyDescription("{\"x-conditional\": {\"field\": \"existeProveedor\", \"equals\": \"NO\"}}")
    @NotNull
    EBancoProveedor bancoProveedor,

    @JsonPropertyDescription("{\"x-conditional\": {\"field\": \"existeProveedor\", \"equals\": \"NO\"}}")
    @NotNull
    String numeroCuenta,

    @JsonPropertyDescription("{\"x-conditional\": {\"field\": \"existeProveedor\", \"equals\": \"NO\"}}")
    String sucursal
) {}
