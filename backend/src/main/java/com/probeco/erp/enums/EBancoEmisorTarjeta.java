package com.probeco.erp.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EBancoEmisorTarjeta {
    ITAU("Itaú"),
    BBVA("BBVA"),
    SANTANDER("Santander"),
    OTRO("Otro");

    private final String descripcion;

    EBancoEmisorTarjeta(String descripcion) {
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
    public static EBancoEmisorTarjeta fromDescripcion(String descripcion) {
        return Arrays.stream(EBancoEmisorTarjeta.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}
