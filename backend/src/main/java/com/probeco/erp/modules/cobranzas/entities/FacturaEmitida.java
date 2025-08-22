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
@Table(name = "facturas_emitidas")
public class FacturaEmitida extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(name = "fecha_factura", nullable = false)
    LocalDate fechaFactura = LocalDate.now(); // Default to current date if not provided,

    @Column(name = "cobrador", nullable = false)
    String cobrador;

    @Column(name = "referencia_cliente_evento", nullable = false)
    String referenciaClienteEvento;

    @Column(name = "numero_factura", nullable = false)
    String numeroFactura;

    @Column(name = "factura", nullable = false)
    String factura;
}
