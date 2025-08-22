package com.probeco.erp.modules.pagos.entities;

import java.time.LocalDate;

import com.probeco.erp.auditory.AuditableEntity;
import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEstadoPago;
import com.probeco.erp.enums.EEstadoRegistroContable;
import com.probeco.erp.enums.EMoneda;

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
@Table(name = "pagos") // Define the name of the table in the database
public class Pago extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID for the entity
    private Long id;
    
    @Builder.Default
    @Column(name = "fecha_solicitud_pago", nullable = false)
    private LocalDate fechaSolicitudPago = LocalDate.now(); // Default to current date if not provided
    
    @Column(name = "ordenante_del_pago", nullable = false)
    private String ordenanteDelPago;
    
    @Column(name = "concepto_pago", nullable = false)
    private String conceptoPago;
    
    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "moneda", nullable = false)
    private EMoneda moneda;
    
    @Column(name = "monto", nullable = false)
    private float monto;
    
    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "iva_incluido", nullable = false)
    private EConfirm ivaIncluido;
    
    @Builder.Default
    @Column(name = "factura")
    private String factura = "No Aplica";
    
    @Column(name = "proveedor", nullable = false)
    private String proveedor;
    
    @Column(name = "banco_proveedor", nullable = false)
    private EBancoProveedor bancoProveedor;
    
    @Column(name = "numero_cuenta", nullable = false)
    private String numeroCuenta;

    @Column(name = "sucursal")
    private String sucursal;
    
    @Builder.Default
    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "estado_pago")
    private EEstadoPago estadoPago = EEstadoPago.PENDIENTE;
    
    @Column(name = "comprobante_pago")
    private String comprobantePago;
    
    @Column(name = "banco_emisor")
    private String bancoEmisor;
    
    @Column(name = "nombre_cuenta_contable")
    private String nombreCuentaContable;
    
    @Builder.Default
    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "estado_registro_contable")
    private EEstadoRegistroContable estadoRegistroContable = EEstadoRegistroContable.PENDIENTE;
}
