package com.probeco.erp.modules.eventos.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.probeco.erp.enums.EConfirm;
import com.probeco.erp.enums.EDepartamento;
import com.probeco.erp.enums.EEmpresa;
import com.probeco.erp.enums.ETipoEvento;
import com.probeco.erp.enums.ETipoSuperficie;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private EEmpresa marca;

    private LocalDate fechaEvento;

    private String nombreCliente;

    private String nombreContactoPrincipal;

    private String telefonoContactoPrincipal;

    @Enumerated(EnumType.STRING)
    private ETipoEvento tipoEvento;

    private String ubicacionEvento; // podría ser lat/lng como "lat,-lng"
    
    private String nombreVendedor;

    @Enumerated(EnumType.STRING)
    private EDepartamento departamentoEvento;

    private EConfirm requiereTerciarizados;

    @Enumerated(EnumType.STRING)
    private EConfirm carpa;

    @Column(length = 1000)
    private String notasAdministrativas;

    @Column(length = 1000)
    private String notasDeposito;

    @Column(length = 1000)
    private String notasCampo;

    @Enumerated(EnumType.STRING)
    private ETipoSuperficie tipoSuperficie;

    // Relación con lista de productos asociados a este evento.
    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductoEvento> productosEvento = new ArrayList<>();

    // Relación con lista de productos o servicios terciarizados asociados a este evento.
    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductoTerciarizadoEvento> terciarizados = new ArrayList<>();
}
