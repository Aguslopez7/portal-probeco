package com.probeco.erp.modules.pagos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.modules.pagos.entities.Pago;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long>{
    // public Optional<Pago> findByName(String name);
    List<Pago> findAllByCreatedBy(String createdBy);

    List<Pago> findAllByOrderByCreatedAtDesc();
}
