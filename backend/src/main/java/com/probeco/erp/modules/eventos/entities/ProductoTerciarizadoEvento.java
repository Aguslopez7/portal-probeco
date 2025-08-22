package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoTerciarizadoEvento {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Evento evento;

    String conceptoGasto;

    Float importeSubcontratacion;
    
    String descripcion;
}
