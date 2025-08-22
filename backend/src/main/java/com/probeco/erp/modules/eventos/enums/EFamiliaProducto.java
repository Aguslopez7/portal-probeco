package com.probeco.erp.modules.eventos.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum EFamiliaProducto {

    ESTRUCTURAL_6M("Estructural 6m"),
    ESTRUCTURAL_8M("Estructural 8m"),
    ESTRUCTURAL_9M("Estructural 9m"),
    ESTRUCTURAL_10M("Estructural 10m"),
    ESTRUCTURAL_12M("Estructural 12m"),
    ESTRUCTURAL_12M_INSIDE("Estructural 12m Inside"),
    POLIGONAL_15M("Poligonal 15m"),
    PAGODAS_BLINK("Pagodas Blink"),
    PAGODAS_INSIDE("Pagodas Inside"),
    CANIO_GALVANIZADO("Caño Galvanizado"),
    BEDUINAS("Beduinas"),
    MOBILIARIO("Mobiliario"),
    COMPONENTE("Componente");

    private final String descripcion;

    EFamiliaProducto(String descripcion) {
        this.descripcion = descripcion;
    }

    @JsonValue
    public String getDescripcion() {
        return descripcion;
    }

    public String getName() {
        return name();
    }

    @JsonCreator
    public static EFamiliaProducto fromDescripcion(String descripcion) {
        return Arrays.stream(EFamiliaProducto.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}

