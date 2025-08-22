package com.probeco.erp.dtos;

import java.time.LocalDate;

public record DtoEventoCalendar(
    String titulo,
    String descripcion,
    String ubicacion,
    LocalDate fecha // cambiar de OffsetDateTime a LocalDate
) {}