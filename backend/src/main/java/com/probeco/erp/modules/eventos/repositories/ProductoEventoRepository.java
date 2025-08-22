package com.probeco.erp.modules.eventos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.probeco.erp.modules.eventos.entities.ProductoEvento;
import com.probeco.erp.modules.eventos.entities.ProductoEventoId;

public interface ProductoEventoRepository extends JpaRepository<ProductoEvento, ProductoEventoId> {
    @Query("""
        SELECT DISTINCT pe
        FROM ProductoEvento pe
        LEFT JOIN FETCH pe.detalleComponentesOpcionales cpe
        LEFT JOIN FETCH cpe.productoComponente pc
        WHERE pe.evento.id IN :ids
    """)
    List<ProductoEvento> findComponentesByEventoIds(@Param("ids") List<Long> ids);
}
