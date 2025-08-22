package com.probeco.erp.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EEmpresa {
    BLINK("Blink"),
    INSIDE_GROUP("Inside Group");

    private final String descripcion;

    EEmpresa(String descripcion) {
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
    public static ETipoCuentaContable fromDescripcion(String descripcion) {
        return Arrays.stream(ETipoCuentaContable.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}
