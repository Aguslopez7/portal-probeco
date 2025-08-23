package com.probeco.erp.database.centrosCostos.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.database.centrosCostos.entities.CentroCosto;

@Repository
public interface CentroCostoRepository extends JpaRepository<CentroCosto, Long>{
    
    public Optional<CentroCosto> findByNombre(String nombre);
}
