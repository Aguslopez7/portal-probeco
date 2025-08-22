package com.probeco.erp.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ETipoEvento {
    ALQUILER_MENSUAL("Alquiler Mensual"),
    CASAMIENTO("Casamiento"),
    CONFERENCIAS("Conferencias"),
    CUMPLEANIOS("Cumpleaños"),
    EVENTO_EMPRESARIAL("Evento Empresarial"),
    EXPOSICIONES_Y_FERIAS("Exposiciones y Ferias"),
    FESTIVALES("Festivales"),
    FIESTAS("Fiestas"),
    OTROS_EVENTOS("Otros Eventos");

    private final String descripcion;

    ETipoEvento(String descripcion) {
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
    public static ETipoEvento fromDescripcion(String descripcion) {
        return Arrays.stream(ETipoEvento.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}

