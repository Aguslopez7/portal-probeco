package com.probeco.erp.database.cuentas.entities;

import com.probeco.erp.auditory.AuditableEntity;
import com.probeco.erp.enums.EGrupoContable;
import com.probeco.erp.enums.ESubGrupoContable;
import com.probeco.erp.enums.ETipoCosto;
import com.probeco.erp.enums.ETipoCuentaContable;

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
@Table(name = "cuentas_contables") // Define the name of the table in the database
public class CuentaContable extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "grupo_contable", nullable = false)
    private EGrupoContable grupoContable;

    @Enumerated(EnumType.STRING)
    @Column(name = "sub_grupo_contable", nullable = false)
    private ESubGrupoContable subGrupoContable;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cuenta_contable", nullable = false)
    private ETipoCuentaContable tipoCuentaContable;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_costo", nullable = false)
    private ETipoCosto tipoCosto;
}
