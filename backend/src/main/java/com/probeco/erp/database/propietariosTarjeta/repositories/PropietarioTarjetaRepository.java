package com.probeco.erp.database.propietariosTarjeta.repositories;

import java.util.List;  

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.database.propietariosTarjeta.entities.PropietarioTarjeta;

@Repository
public interface PropietarioTarjetaRepository extends JpaRepository<PropietarioTarjeta, Long> {
    List<PropietarioTarjeta> findAllByCreatedBy(String createdBy);
}
