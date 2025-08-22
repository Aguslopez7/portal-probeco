package com.probeco.erp.modules.eventos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.probeco.erp.modules.eventos.entities.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    @Query("""
        SELECT DISTINCT e
        FROM Evento e
        LEFT JOIN FETCH e.productosEvento pe
        LEFT JOIN FETCH pe.producto p
    """)
    List<Evento> findEventosConProductos();

    @Query("""
        SELECT DISTINCT e
        FROM Evento e
        LEFT JOIN FETCH e.terciarizados t
        WHERE e.id IN :ids
    """)
    List<Evento> findEventosConTerciarizados(@Param("ids") List<Long> ids);

}