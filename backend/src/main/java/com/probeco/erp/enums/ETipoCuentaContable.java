package com.probeco.erp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum ETipoCuentaContable {

    INGRESOS("Ingresos"),
    EGRESOS("Egresos"),
    EGRESOS_EXTRAORDINARIOS("Egresos Extraordinarios"),
    INVERSION("Inversión"),
    NO_APLICA("No aplica");

    private final String descripcion;

    ETipoCuentaContable(String descripcion) {
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
