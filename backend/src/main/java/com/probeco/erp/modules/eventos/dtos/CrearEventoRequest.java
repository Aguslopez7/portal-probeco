package com.probeco.erp.modules.eventos.dtos;

import java.time.LocalDate;
import java.util.List;

import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EDepartamento;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.ETipoEvento;
import com.probeco.erp.enums.ETipoSuperficie;

public record CrearEventoRequest(
    EEmpresa marca,
    LocalDate fechaEvento,
    String nombreCliente,
    String nombreContactoPrincipal,
    String telefonoContactoPrincipal,
    String nombreVendedor,
    ETipoEvento tipoEvento,
    String ubicacionEvento,
    EDepartamento departamentoEvento,
    EConfirm carpa,
    String notasAdministrativas,
    String notasDeposito,
    String notasCampo,
    ETipoSuperficie tipoSuperficie,
    List<ProductoEventoRequest> productos
) {}