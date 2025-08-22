package com.probeco.erp.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum ESubGrupoContable {

    INGRESOS_BLINK_VARIABLES("Ingresos Blink Variables"),
    INGRESOS_BLINK_FIJOS("Ingresos Blink Fijos"),
    BLINK_ARTICULOS_TERCERIZADOS_Y_COMISIONES_POR_VENTAS_CLIENTES(
            "Blink Artículos Tercerizados y Comisiones por Ventas Clientes"),
    INGRESOS_INSIDE_GROUP_VARIABLES("Ingresos Inside Group Variables"),
    INGRESOS_INSIDE_GROUP_FIJOS("Ingresos Inside Group Fijos"),
    INSIDE_GROUP_ARTICULOS_TERCERIZADOS_Y_COMISIONES_POR_VENTAS_CLIENTES(
            "Inside Group Artículos Tercerizados y Comisiones por Ventas Clientes"),
    EMPLEADOS_MENSUALES_OFICINA_Y_VENDEDORES("Empleados Mensuales Oficina y Vendedores"),
    EMPLEADOS_MENSUALES_CAMPO_Y_DEPOSITO("Empleados Mensuales Campo y Depósito"),
    JORNALEROS_CAMPO_Y_DEPOSITO("Jornaleros Campo y Depósito"),
    JORNALEROS_TERCERIZADOS("Jornaleros Tercerizados"),
    COMISIONES_POR_VENTAS("Comisiones por Ventas"),
    PRIMAS("Primas"),
    AGUINALDOS("Aguinaldos"),
    SALARIOS_VACACIONALES("Salarios Vacacionales"),
    BPS("BPS"),
    BSE("BSE"),
    COMBUSTIBLES("Combustibles"),
    PEAJES("Peajes"),
    VIATICOS("Viáticos"),
    SUMINISTROS("Suministros"),
    FLETES_TERCEROS_Y_ALQUILERES_VEHICULOS("Fletes de Terceros y Alquileres Vehículos"),
    OTROS_COSTOS_DE_ARMADO("Otros Costos de Armado"),
    ALQUILERES_DEPOSITOS_Y_CONTENEDORES("Alquileres Depósitos y Contenedores"),
    ANTEL("Antel"),
    OSE("OSE"),
    UTE("UTE"),
    SERVICIOS_CONTRATADOS("Servicios Contratados"),
    MOVISTAR_Y_ANTEL("Movistar y Antel"),
    HONORARIOS("Honorarios"),
    PREVENCIONISMO("Prevencionismo"),
    SERVICIOS_EDENRED("Servicios Edenred"),
    GOOGLE_WORKSPACE("Google Workspace"),
    GASTOS_BANCARIOS_BLINK("Gastos Bancarios Blink"),
    GASTOS_BANCARIOS_INSIDE_GROUP("Gastos Bancarios Inside Group"),
    MARKETING_BLINK("Marketing Blink"),
    PUBLICIDAD_META_BLINK("Publicidad Meta Blink"),
    PUBLICIDAD_GOOGLE_BLINK("Publicidad Google Blink"),
    PUBLICIDAD_TIK_TOK_BLINK("Publicidad Tik Tok Blink"),
    MARKETING_INSIDE_GROUP("Marketing Inside Group"),
    PUBLICIDAD_META_INSIDE_GROUP("Publicidad Meta Inside Group"),
    PUBLICIDAD_GOOGLE_INSIDE_GROUP("Publicidad Google Inside Group"),
    SEGUROS("Seguros"),
    PATENTES("Patentes"),
    MANTENIMIENTO_LONAS("Mantenimiento Lonas"),
    MANTENIMIENTOS_FIERROS_Y_MOBILIARIO("Mantenimientos Fierros y Mobiliario"),
    MANTENIMIENTO_PISOS("Mantenimiento Pisos"),
    MANTENIMIENTO_VEHICULOS("Mantenimiento Vehículos"),
    INTERESES_BANCARIOS_BLINK("Interéses Bancarios Blink"),
    INTERESES_BANCARIOS_INSIDE_GROUP("Interéses Bancarios Inside Group"),
    ROPA_Y_UNIFORMES("Ropa y Uniformes"),
    MULTAS_Y_DEMANDAS("Multas y Demandas"),
    BUSQUEDA_Y_SELECCION("Busqueda y Selección"),
    BENEFICIOS_RECURSOS_HUMANOS("Beneficios Recursos Humanos"),
    LIQUIDACIONES_POR_EGRESOS("Liquidaciones por Egresos"),
    OTROS_GASTOS_GENERALES("Otros Gastos Generales"),
    IMPUESTOS_BLINK("Impuestos Blink"),
    IMPUESTOS_INSIDE_GROUP("Impuestos Inside Group"),
    SUELDOS_ACCIONISTAS("Sueldos Accionistas"),
    OTROS_GASTOS_EXTRAORDINARIOS("Otros Gastos Extraordinarios"),
    INVERSION_CARPAS("Inversión Carpas"),
    INVERSION_PISOS("Inversión Pisos"),
    INVERSION_VEHICULOS("Inversión Vehículos"),
    INVERSION_OTRAS("Inversión Otras"),
    UTILIDADES_AGUSTIN_CASTAGNET("Utilidades Agustin Castagnet"),
    UTILIDADES_JUAN_LUSSICH("Utilidades Juan Lussich"),
    UTILIDADES_DIEGO_MOREIRA("Utilidades Diego Moreira");

    private final String descripcion;

    ESubGrupoContable(String descripcion) {
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
    public static ESubGrupoContable fromDescripcion(String descripcion) {
        return Arrays.stream(ESubGrupoContable.values())
                .filter(e -> e.getDescripcion().equalsIgnoreCase(descripcion.trim()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Descripción inválida: " + descripcion));
    }
}
