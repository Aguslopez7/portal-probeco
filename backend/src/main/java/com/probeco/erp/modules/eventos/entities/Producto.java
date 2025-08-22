package com.probeco.erp.modules.eventos.entities;

import com.probeco.erp.modules.eventos.enums.EFamiliaProducto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private int stockBase;
    private boolean esComponente;
    
    @Enumerated(EnumType.STRING)
    private EFamiliaProducto familiaProducto;
}
