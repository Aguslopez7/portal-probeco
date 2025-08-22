package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaDiariaId implements Serializable {
    private LocalDate fecha;
    private Long productoId;
}
