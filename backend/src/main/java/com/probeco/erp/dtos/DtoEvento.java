package com.probeco.erp.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;

import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EDepartamento;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.EMoneda;
import com.probeco.erp.enums.ETipoEvento;
import com.probeco.erp.enums.ETipoSuperficie;

public record DtoEvento(
    @NotNull
    EEmpresa marca,                           // Validación taxativa: "Inside Group" / "Blink"

    @NotNull
    @JsonPropertyDescription("{\"format\": \"date\"}")
    LocalDate fechaEvento,                  // Date Picker

    @NotNull
    String nombreCliente,                   // Selecciona cliente del modulo BD

    @NotNull
    @JsonPropertyDescription("{\"readOnly\": true}")
    String nombreContactoPrincipal,         // Automático al elegir cliente

    @NotNull
    @JsonPropertyDescription("{\"readOnly\": true}")
    String telefonoContactoPrincipal,       // Automático al elegir cliente

    @NotNull
    ETipoEvento tipoEvento,                      // Lista taxativa

    @NotNull
    String ubicacionEvento,                 // Coordenadas o dirección del mapa

    @NotNull
    EDepartamento departamentoEvento,              // Lista taxativa de 19 departamentos

    @NotNull
    String nombreVendedor,                  // (opcional) nombre del vendedor

    @NotNull
    @JsonPropertyDescription("{\"default\": \"UYU\"}")
    EMoneda moneda,

    @NotNull
    @JsonPropertyDescription("{\"x-conditional\": {\"field\": \"moneda\", \"equals\": \"USD\"}}")
    Float tipoCambio,                  // (opcional) tipo de cambio

    @NotNull
    @JsonPropertyDescription("{\"section\": \"Productos\",\"leftOnly\":true}")
    List<DtoProductosEvento> productos,                       // Lista de productos

    @NotNull
    @JsonPropertyDescription("{\"section\": \"Productos\",\"leftOnly\":true}")
    EConfirm requiereTerciarizados,

    @JsonPropertyDescription("{\"section\": \"Productos\",\"leftOnly\":true, \"x-conditional\": {\"field\": \"requiereTerciarizados\", \"equals\": \"SI\"}}")
    List<DtoProductoTerciarizadoEvento> terciarizados,                   // Campo libre (string plano)

    @NotNull
    @JsonPropertyDescription("{\"section\": \"Productos\", \"leftOnly\":true}")
    EConfirm aplicaComisionVentas,

    @JsonPropertyDescription("{ \"leftOnly\":true, \"section\": \"Productos\", \"x-conditional\": {\"field\": \"aplicaComisionVentas\", \"equals\": \"SI\"}}")
    List<DtoProductoTerciarizadoEvento> comisionVentas,                   // Campo libre (string plano)

    @NotNull
    @JsonPropertyDescription("{ \"readOnly\": true, \"section\": \"Productos\",\"leftOnly\":true}")
    BigDecimal precioNetoSinIvaEvento,  

    @JsonPropertyDescription("{ \"section\": \"Productos\", \"readOnly\": true, \"leftOnly\":true, \"x-conditional\": {\"field\": \"requiereTerciarizados\", \"equals\": \"SI\"}}")
    BigDecimal totalSinIvaTerciarizados,

    @NotNull
    @JsonPropertyDescription("{ \"section\": \"Productos\", \"readOnly\": true, \"leftOnly\":true, \"x-conditional\": {\"field\": \"aplicaComisionVentas\", \"equals\": \"SI\"}}")
    BigDecimal totalComisonVenta,

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    String notasAdministrativas,            // Campo de texto libre

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    EConfirm exigente,                           // Lista Taxativa: "Si" / "No"

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    String notasParaDeposito,                   // Campo de texto libre

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    String notasParaCampo,                      // Campo de texto libre

    @JsonPropertyDescription("{\"section\": \"Detalles\"}")
    ETipoSuperficie tipoSuperficie                   // Lista Taxativa: "Pasto", "Superficie Dura", etc.
) {}

