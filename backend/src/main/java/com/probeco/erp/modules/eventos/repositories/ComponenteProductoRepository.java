package com.probeco.erp.modules.eventos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.probeco.erp.modules.eventos.entities.ComponenteProducto;
import com.probeco.erp.modules.eventos.entities.ComponenteProductoId;
import com.probeco.erp.modules.eventos.entities.Producto;

public interface ComponenteProductoRepository extends JpaRepository<ComponenteProducto, ComponenteProductoId> {
    List<ComponenteProducto> findByProductoPadre(Producto padre);
}
