package com.probeco.erp.enums;

import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EBancoProveedor {
    BROU("BROU"),
    ITAU("Itaú"),
    BBVA("BBVA"),
    MIDINERO("Mi Dinero"),
    HERITAGE("Heritage"),
    PREX("Prex"),
    HSBC("HSBC"),
    SCOTIABANK("Scotiabank"),
    SANTANDER("Santander"),
    PAGO_INTERNET("Pago por Internet"),
    NO_APLICA("No Aplica"),
    CAJA("Caja");

    private final String descripcion;

    EBancoProveedor(String descripcion) {
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
    public static EBancoProveedor fromDescripcion(String descripcion) {
        return Arrays.stream(EBancoProveedor.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}
