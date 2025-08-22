package com.probeco.erp.modules.tarjetas.entities;

import java.time.LocalDate;

import com.probeco.erp.auditory.AuditableEntity;
import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EEstadoControl;
import com.probeco.erp.enums.EEstadoRegistroContable;
import com.probeco.erp.enums.EMoneda;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tarjetas") // Define the name of the table in the database
public class Tarjeta extends AuditableEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "propietario_tarjeta", nullable = false)
    private String propietarioTarjeta;

    @Size(min = 4, max = 4)
    @Column(name = "ultimos_digitos", length = 4, nullable = false)
    private Integer ultimosDigitos;

    @Column(name = "tipo_tarjeta", nullable = false)
    private String tipoTarjeta;

    @Column(name = "concepto_gasto", nullable = false)
    private String conceptoGasto;

    @Column(name = "fecha_gasto", nullable = false)
    private LocalDate fechaGasto;

    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "moneda", nullable = false)
    private EMoneda moneda;

    @Column(name = "monto_total", nullable = false)
    private float montoTotal;

    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "iva_incluido", nullable = false)
    private EConfirm ivaIncluido;

    @Column(name = "comprobante", nullable = false)
    private String comprobante;

    @Builder.Default
    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "estado_control")
    private EEstadoControl estadoControl = EEstadoControl.PENDIENTE;

    @Column(name = "nombre_cuenta_contable")
    private String nombreCuentaContable;

    @Builder.Default
    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "estado_registro_contable")
    private EEstadoRegistroContable estadoRegistroContable = EEstadoRegistroContable.PENDIENTE;
}