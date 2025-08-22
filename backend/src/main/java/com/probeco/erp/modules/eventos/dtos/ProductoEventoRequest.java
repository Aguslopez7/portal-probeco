package com.probeco.erp.modules.eventos.dtos;

import java.util.List;

public record ProductoEventoRequest(
    Long productoId,
    int cantidad,
    List<ComponenteOpcionalRequest> componentesOpcionales
) {}
