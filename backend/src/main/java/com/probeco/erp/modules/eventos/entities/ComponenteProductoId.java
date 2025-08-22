package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComponenteProductoId implements Serializable {
    private Long productoPadreId;
    private Long productoComponenteId;
}
