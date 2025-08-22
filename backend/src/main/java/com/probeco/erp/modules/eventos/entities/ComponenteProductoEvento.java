package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComponenteProductoEvento {

    @EmbeddedId
    private ComponenteProductoEventoId id;

    @ManyToOne
    @MapsId("productoEventoId") // Mapea la parte productoEventoId de la clave embebida
    @JoinColumns({
            @JoinColumn(name = "evento_id", referencedColumnName = "evento_id"),
            @JoinColumn(name = "producto_id", referencedColumnName = "producto_id")
    })
    private ProductoEvento productoEvento;

    @ManyToOne
    @MapsId("productoComponenteId") // Mapea la parte productoComponenteId de la clave embebida
    @JoinColumn(name = "producto_componente_id", insertable = false, updatable = false)
    private Producto productoComponente;

    private int cantidad;
    private boolean esOpcional;
}
