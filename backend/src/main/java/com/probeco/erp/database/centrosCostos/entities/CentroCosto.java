package com.probeco.erp.database.centrosCostos.entities;

import jakarta.validation.constraints.Size;
import lombok.*;
import jakarta.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "centros_costos") 
public class CentroCosto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 80)
    private String nombre;
}
