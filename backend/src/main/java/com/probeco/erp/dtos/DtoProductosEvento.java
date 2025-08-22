package com.probeco.erp.dtos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

public record DtoProductosEvento(
    String id, // Remover cuando se implemente el backend
    
    String nombreProducto,

    @JsonPropertyDescription("{\"readOnly\": true}")
    String familiaProducto,

    int cantidad,

    float precioUnitarioSinIva,

    @JsonPropertyDescription("{\"readOnly\": true}")
    float precioTotalSinIva,

    float descuentoPorcentaje,
    
    float descuentoMonto,

    @JsonPropertyDescription("{\"readOnly\": true}")
    float precioFinalSinIva,
    
    List<DtoCompuestoProductoEvento> detalleComponentesOpcionales
) {}
