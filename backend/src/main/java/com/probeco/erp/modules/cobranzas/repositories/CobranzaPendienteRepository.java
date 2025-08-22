package com.probeco.erp.modules.cobranzas.repositories;

import java.util.List;  
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.modules.cobranzas.entities.CobranzaPendiente;

@Repository
public interface CobranzaPendienteRepository extends JpaRepository<CobranzaPendiente, Long> {
    public Optional<CobranzaPendiente> findByNombreReporte(String name);

    List<CobranzaPendiente> findAllByCreatedBy(String createdBy);

    List<CobranzaPendiente> findTop3ByOrderByCreatedAtDesc();
}
