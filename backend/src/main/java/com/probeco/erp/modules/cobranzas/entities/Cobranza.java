package com.probeco.erp.modules.cobranzas.entities;

import java.time.LocalDate;

import com.probeco.erp.auditory.AuditableEntity;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.EEstadoAcreditacionBancaria;
import com.probeco.erp.enums.EEstadoFcSistemas;
import com.probeco.erp.enums.EMoneda;
import com.probeco.erp.enums.EType;

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
@Table(name = "cobranzas") // Define the name of the table in the database
public class Cobranza extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(name = "fecha_envio_cobrabza", nullable = false)
    private LocalDate fechaEnvioCobranza = LocalDate.now(); // Default to current date if not provided
    
    @Column(name = "cobrador", nullable = false)
    private String cobrador;

    @Enumerated(EnumType.STRING)
    @Column(name = "empresa", nullable = false)
    private EEmpresa empresa;

    @Column(name = "cliente_evento", nullable = false)
    private String clienteEvento;

    @Enumerated(EnumType.STRING)
    @Column(name = "moneda", nullable = false)
    private EMoneda moneda;

    @Column(name = "monto", nullable = false)
    private float monto;

    @Column(name = "referencia_factura", nullable = false)
    private String referenciaFactura;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private EType tipo;

    @Column(name = "banco_receptor", nullable = false)
    private String bancoReceptor;

    @Column(name = "comprobante_cobranza", nullable = false)
    private String comprobanteCobranza;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "requiere_recibo", nullable = false)
    private EConfirm requiereRecibo = EConfirm.NO;

    /* Usuarios Editores */

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_acreditacion_bancaria")
    private EEstadoAcreditacionBancaria estadoAcreditacionBancaria = EEstadoAcreditacionBancaria.PENDIENTE;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_FC_Sistemas")
    private EEstadoFcSistemas estadoFcSistemas = EEstadoFcSistemas.PENDIENTE;

    @Column(name = "recibo")
    private String recibo;
}
