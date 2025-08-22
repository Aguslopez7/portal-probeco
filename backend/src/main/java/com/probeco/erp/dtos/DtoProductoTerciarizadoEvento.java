package com.probeco.erp.dtos;

public record DtoProductoTerciarizadoEvento(
    String id,
    String conceptoGasto,
    Float importeSubcontratacion,
    String descripcion
) {}
