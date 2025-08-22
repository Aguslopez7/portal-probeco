package com.probeco.erp.database.cuentas.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.database.cuentas.entities.CuentaContable;

@Repository
public interface CuentaContableRepository extends JpaRepository<CuentaContable, Long> {
    public Optional<CuentaContable> findByNombre(String nombre);

    List<CuentaContable> findAllByOrderByCreatedAtDesc();
}
