package com.probeco.erp.modules.eventos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.probeco.erp.modules.eventos.entities.ComponenteProductoEvento;
import com.probeco.erp.modules.eventos.entities.ComponenteProductoEventoId;

import java.util.List;

@Repository
public interface ComponenteProductoEventoRepository extends JpaRepository<ComponenteProductoEvento, ComponenteProductoEventoId> {

    List<ComponenteProductoEvento> findByProductoEvento_Evento_Id(Long eventoId);

    List<ComponenteProductoEvento> findByProductoEvento_Evento_IdAndProductoEvento_Producto_Id(Long eventoId, Long productoId);
}

