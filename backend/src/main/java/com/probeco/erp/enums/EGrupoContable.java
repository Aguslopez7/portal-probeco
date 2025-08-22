package com.probeco.erp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;

public enum EGrupoContable {
    INGRESOS_BLINK("Ingresos Blink"),
    INGRESOS_INSIDE_GROUP("Ingresos Inside Group"),
    COSTO_PERSONAL("Costo Personal"),
    COSTO_DE_ARMADOS("Costo de Armados"),
    DEPOSITO_Y_OFICINAS("Depósito y Oficinas"),
    SERVICIOS_CONTRATADOS("Servicios Contratados"),
    GASTOS_BANCARIOS("Gastos Bancarios"),
    MARKETING("Marketing"),
    SEGUROS_Y_PATENTES("Seguros y Patentes"),
    MANTENIMIENTOS("Mantenimientos"),
    INTERESES_BANCARIOS("Interéses Bancarios"),
    OTROS("Otros"),
    IMPUESTOS("Impuestos"),
    GASTOS_EXTRAORDINARIOS("Gastos Extraordinarios"),
    INVERSIONES("Inversiones");

    private final String descripcion;

    EGrupoContable(String descripcion) {
        this.descripcion = descripcion;
    }

    @JsonValue
    public String getDescripcion() {
        return descripcion;
    }

    @Override
    public String toString() {
        return descripcion;
    }

    @JsonCreator
    public static EGrupoContable fromDescripcion(String descripcion) {
        return Arrays.stream(EGrupoContable.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}
