package com.probeco.erp.modules.tarjetas.repositories;

import java.util.List;  


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.modules.tarjetas.entities.Tarjeta;

@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {
    List<Tarjeta> findAllByCreatedBy(String createdBy);

    List<Tarjeta> findAllByOrderByFechaGastoAsc();
}
