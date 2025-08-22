package com.probeco.erp.modules.eventos.controllers;

import com.probeco.erp.dtos.DtoCompuestoProductoEvento;
import com.probeco.erp.dtos.DtoProductosEvento;
import com.probeco.erp.modules.eventos.dtos.DtoEventoRequest;
import com.probeco.erp.modules.eventos.entities.ComponenteProductoEvento;
import com.probeco.erp.modules.eventos.entities.ComponenteProductoEventoId;
import com.probeco.erp.modules.eventos.entities.Evento;
import com.probeco.erp.modules.eventos.entities.ProductoEvento;
import com.probeco.erp.modules.eventos.entities.ProductoEventoId;
import com.probeco.erp.modules.eventos.mappers.EventoMapper;
import com.probeco.erp.modules.eventos.repositories.ComponenteProductoEventoRepository;
import com.probeco.erp.modules.eventos.repositories.EventoRepository;
import com.probeco.erp.modules.eventos.repositories.ProductoEventoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/debug")
@RequiredArgsConstructor
public class MapperDebugController {

        private final EventoRepository eventoRepository;
        private final ProductoEventoRepository productoEventoRepository;
        private final ComponenteProductoEventoRepository componenteProductoEventoRepository;
        private final EventoMapper eventoMapper;

        // 🔹 1️⃣ Probar mapper de Evento -> DtoEventoRequest
        @GetMapping("/evento/{id}")
        public DtoEventoRequest debugEvento(@PathVariable Long id) {
                Evento evento = eventoRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Evento no encontrado"));
                return eventoMapper.toDto(evento);
        }

        // 🔹 2️⃣ Probar mapper de ProductoEvento -> DtoProductosEvento
        @GetMapping("/producto-evento/{idEvento}/{idProducto}")
        public DtoProductosEvento debugProductoEvento(@PathVariable Long idEvento, @PathVariable Long idProducto) {
                ProductoEventoId peId = new ProductoEventoId(idEvento, idProducto);
                ProductoEvento pe = productoEventoRepository.findById(peId)
                                .orElseThrow(() -> new IllegalArgumentException("ProductoEvento no encontrado"));
                return eventoMapper.toDto(pe);
        }

        // 🔹 3️⃣ Probar mapper de ComponenteProductoEvento ->
        // DtoCompuestoProductoEvento
        @GetMapping("/componente/{idEvento}/{idProducto}/{idComponente}")
        public DtoCompuestoProductoEvento debugComponente(
                        @PathVariable Long idEvento,
                        @PathVariable Long idProducto,
                        @PathVariable Long idComponente) {

                ComponenteProductoEventoId cpeId = new ComponenteProductoEventoId(
                                new ProductoEventoId(idEvento, idProducto),
                                idComponente);

                ComponenteProductoEvento cpe = componenteProductoEventoRepository.findById(cpeId)
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "ComponenteProductoEvento no encontrado"));

                return eventoMapper.toDto(cpe);
        }
}
