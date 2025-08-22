package com.probeco.erp.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EDepartamento {
    MONTEVIDEO("Montevideo"),
    CANELONES("Canelones"),
    MALDONADO("Maldonado"),
    ARTIGAS("Artigas"),
    CERRO_LARGO("Cerro Largo"),
    COLONIA("Colonia"),
    DURAZNO("Durazno"),
    FLORES("Flores"),
    FLORIDA("Florida"),
    LAVALLEJA("Lavalleja"),
    PAYSANDU("Paysandú"),
    RIO_NEGRO("Río Negro"),
    RIVERA("Rivera"),
    ROCHA("Rocha"),
    SALTO("Salto"),
    SAN_JOSE("San José"),
    SORIANO("Soriano"),
    TACUAREMBO("Tacuarembó"),
    TREINTA_Y_TRES("Treinta y Tres");

    private final String descripcion;

    EDepartamento(String descripcion) {
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
    public static EDepartamento fromDescripcion(String descripcion) {
        return Arrays.stream(EDepartamento.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}

