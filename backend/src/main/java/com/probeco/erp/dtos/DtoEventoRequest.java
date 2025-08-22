package com.probeco.erp.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EDepartamento;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.ETipoEvento;
import com.probeco.erp.enums.ETipoSuperficie;

public record DtoEventoRequest(
    Long id,

    EEmpresa marca, // Validación taxativa: "Inside Group" / "Blink"

    @JsonPropertyDescription("{\"format\": \"date\"}")
    LocalDate fechaEvento, // Date Picker

    String nombreCliente, // Selecciona cliente del modulo BD

    @JsonPropertyDescription("{\"readOnly\": true}")
    String nombreContactoPrincipal, // Automático al elegir cliente

    @JsonPropertyDescription("{\"readOnly\": true}")
    String telefonoContactoPrincipal, // Automático al elegir cliente

    ETipoEvento tipoEvento, // Lista taxativa

    String ubicacionEvento, // Coordenadas o dirección del mapa

    EDepartamento departamentoEvento, // Lista taxativa de 19 departamentos

    String nombreVendedor, // (opcional) nombre del vendedor

    @JsonPropertyDescription("{\"section\": \"Productos\"}")
    List<DtoProductosEvento> productos, // Lista de productos

    @JsonPropertyDescription("{\"section\": \"Productos\"}")
    List<DtoProductoTerciarizadoEvento> terciarizados, // Lista de productos terciarizados

    @JsonPropertyDescription("{ \"readOnly\": true}")
    BigDecimal saldoPendiente,

    @JsonPropertyDescription("{ \"readOnly\": true}")
    List<DtoProductoTerciarizadoEvento> comisionVentas,

    @NotNull
    @JsonPropertyDescription("""
    {
        "readOnly": true,
        "section": "Productos",
        "leftOnly": true
    }
    """)
    BigDecimal precioNetoSinIvaEvento,

    @JsonPropertyDescription("""
    {
        "section": "Productos",
        "readOnly": true,
        "leftOnly": true,
        "x-conditional": {
            "field": "requiereTerciarizados",
            "equals": "SI"
        }
    }
    """)
    BigDecimal totalSinIvaTerciarizados,

    @NotNull
    @JsonPropertyDescription("""
    {
        "section": "Productos",
        "readOnly": true,
        "leftOnly": true,
        "x-conditional": {
            "field": "aplicaComisionVentas",
            "equals": "SI"
        }
    }
    """)
    BigDecimal totalComisonVenta,

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    String notasAdministrativas, // Campo de texto libre

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    EConfirm exigente, // Lista Taxativa: "Si" / "No"

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    String notasParaDeposito, // Campo de texto libre

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    String notasParaCampo, // Campo de texto libre

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    ETipoSuperficie tipoSuperficie // Lista Taxativa: "Pasto", "Superficie Dura", etc.
) {}
