package com.probeco.erp.modules.cobranzas.repositories;

import java.util.List;  

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.modules.cobranzas.entities.FacturaEmitida;

@Repository
public interface FacturaEmitidaRepository extends JpaRepository<FacturaEmitida, Long> {
    List<FacturaEmitida> findAllByCobrador(String createdBy);
}
