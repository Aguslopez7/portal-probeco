package com.probeco.erp.modules.cobranzas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.modules.cobranzas.entities.Cobranza;

@Repository
public interface CobranzaRepository extends JpaRepository<Cobranza, Long> {
    
    List<Cobranza> findAllByCreatedBy(String createdBy);

    List<Cobranza> findAllByOrderByCreatedAtDesc();
}
