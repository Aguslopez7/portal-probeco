package com.probeco.erp.modules.eventos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.probeco.erp.modules.eventos.entities.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Additional query methods can be defined here if needed
}
