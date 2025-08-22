package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservaDiaria {

    @EmbeddedId
    private ReservaDiariaId id;

    @ManyToOne
    @MapsId("productoId") // Mapea la parte productoId de la clave embebida
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private int cantidadReservada;
}
