package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComponenteProducto {

    @EmbeddedId
    private ComponenteProductoId id;

    @ManyToOne
    @MapsId("productoPadreId") // Mapea la parte productoPadreId de la clave embebida
    @JoinColumn(name = "producto_padre_id")
    private Producto productoPadre;

    @ManyToOne
    @MapsId("productoComponenteId") // Mapea la parte productoComponenteId de la clave embebida
    @JoinColumn(name = "producto_componente_id")
    private Producto productoComponente;

    private int cantidad;
    
    private boolean esOpcional;
}
