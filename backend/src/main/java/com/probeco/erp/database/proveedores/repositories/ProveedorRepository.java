package com.probeco.erp.database.proveedores.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.database.proveedores.entities.Proveedor;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    public Optional<Proveedor> findByName(String name);

    List<Proveedor> findAllByOrderByCreatedAtDesc();
}
