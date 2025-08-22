package com.probeco.erp.database.bancos.entities;

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
@Table(name = "bancos") // Define the name of the table in the database
public class Banco extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID for the entity
    private Long id;

    @Column(name = "nombre_banco", nullable = false)
    private EBancoProveedor name;

    @Column(name = "sucursal", nullable = false)
    private String sucursal;

    @Enumerated(EnumType.STRING) // Save enum as a string in the database
    @Column(name = "moneda", nullable = false)
    private EMoneda moneda;

    @Column(name = "numero_cuenta", nullable = false)
    private String numeroCuenta;
}
