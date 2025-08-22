package com.probeco.erp.modules.eventos.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoEvento {

    @EmbeddedId
    private ProductoEventoId id;

    @ManyToOne
    @MapsId("eventoId") // Mapea la parte eventoId de la clave embebida
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @ManyToOne
    @MapsId("productoId") // Mapea la parte productoId de la clave embebida
    @JoinColumn(name = "producto_id")
    private Producto producto;

    private int cantidad;
    
    private double precioUnitarioSinIva;

    private double precioTotalSinIva;

    private double descuentoPorcentaje;

    private double descuentoMonto;

    private double precioFinalSinIva;

    @OneToMany(mappedBy = "productoEvento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ComponenteProductoEvento> detalleComponentesOpcionales = new ArrayList<>();
}
