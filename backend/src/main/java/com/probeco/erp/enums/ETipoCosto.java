package com.probeco.erp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum ETipoCosto {

    COSTO_FIJO("Costo Fijo"),
    COSTO_VARIABLE("Costo Variable"),
    NO_APLICA("No aplica");

    private final String descripcion;

    ETipoCosto(String descripcion) {
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
    public static ETipoCosto fromDescripcion(String descripcion) {
        return Arrays.stream(ETipoCosto.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}
