package com.probeco.erp.modules.cobranzas.entities;

import java.time.LocalDate;

import com.probeco.erp.auditory.AuditableEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cobranzas_pendientes") // Define the name of the table in the database
public class CobranzaPendiente extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(name = "fecha_reporte", nullable = false)
    private LocalDate fechaReporte = LocalDate.now(); // Default to current date if not provided

    @Column(name = "nombre_reporte", nullable = false)
    private String nombreReporte;

    @Column(name = "enlace", nullable = false)
    private String enlace;
}
