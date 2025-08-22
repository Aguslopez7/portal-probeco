package com.probeco.erp.database.proveedores.entities;

import com.probeco.erp.auditory.AuditableEntity;
import com.probeco.erp.enums.EBancoProveedor;
import com.probeco.erp.enums.EMoneda;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "proveedores") // Define the name of the table in the database
public class Proveedor extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String name;

    @Column(name = "banco", nullable = false)
    private EBancoProveedor banco;

    @Column(name = "numero_cuenta", nullable = false)
    private String numeroCuenta;

    @Column(name = "sucursal", nullable = false)
    private String sucursal;

    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "moneda", nullable = false)
    private EMoneda moneda;
}
