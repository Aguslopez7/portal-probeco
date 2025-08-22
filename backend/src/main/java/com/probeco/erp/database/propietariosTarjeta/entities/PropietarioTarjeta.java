package com.probeco.erp.database.propietariosTarjeta.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.probeco.erp.auditory.AuditableEntity;
import com.probeco.erp.enums.EBancoEmisorTarjeta;
import com.probeco.erp.enums.ETipoTarjeta;

import jakarta.persistence.*;

@Entity
@Table(name = "propietarios_tarjetas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropietarioTarjeta extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_propietario_tarjeta", nullable = false)
    private String nombrePropietarioTarjeta;

    @Column(name = "banco_emisor_tarjeta", nullable = false)
    private EBancoEmisorTarjeta bancoEmisorTarjeta;

    @Column(name = "tipo_tarjeta", nullable = false)
    private ETipoTarjeta tipoTarjeta;

    @Column(name = "ultimos_digitos", nullable = false)
    private Integer ultimosDigitos;

}