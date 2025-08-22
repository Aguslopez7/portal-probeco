package com.probeco.erp.modules.eventos.services;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.probeco.erp.modules.eventos.dtos.ComponenteOpcionalRequest;
import com.probeco.erp.modules.eventos.dtos.CrearEventoRequest;
import com.probeco.erp.modules.eventos.dtos.DtoEventoRequest;
import com.probeco.erp.modules.eventos.dtos.ProductoEventoRequest;
import com.probeco.erp.modules.eventos.entities.*;
import com.probeco.erp.modules.eventos.mappers.EventoMapper;
import com.probeco.erp.modules.eventos.repositories.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventoService {

    private final ProductoRepository productoRepo;
    private final EventoRepository eventoRepo;
    private final ProductoEventoRepository productoEventoRepo;
    private final ComponenteProductoRepository componenteProductoRepo;
    private final ComponenteProductoEventoRepository componenteProductoEventoRepo;
    private final StockService stockService;
    private final EventoMapper eventoMapper;

    /**
     * Obtener eventos con sus 
     * productos y componentes opcionales
     * productos/servicios terciarizados asociados.
     *
     * Se usan dos queries para evitar la excepción MultipleBagFetchException,
     * ya que Hibernate no permite cargar múltiples colecciones tipo List en un solo JOIN FETCH.
     */
    @Transactional(readOnly = true)
    public List<DtoEventoRequest> obtenerEventosCompletos() {

        // 1. Primer query: carga eventos + productos asociados + componentes de esos productos.
        // Esto incluye JOIN FETCH a ProductoEvento, Producto y ComponenteProductoEvento.
        List<Evento> eventos = eventoRepo.findEventosConProductos();

        // 2️. Extrae todos los IDs de los eventos obtenidos para usarlos en la segunda query.
        List<Long> ids = eventos.stream()
                .map(Evento::getId)
                .toList();

        // 3️. Segunda query: carga solo los productos terciarizados asociados a esos eventos.
        // Evita el MultipleBagFetch porque se ejecuta en una query separada.
        List<Evento> eventosConTerciarizados = eventoRepo.findEventosConTerciarizados(ids);

        // 4️. Convierte la lista de eventos con terciarizados en un Map<EventoId, List<ProductoTerciarizadoEvento>>
        // Esto permite luego asignar a cada evento su lista de terciarizados correspondiente.
        Map<Long, List<ProductoTerciarizadoEvento>> mapTerciarizados = eventosConTerciarizados.stream()
                .collect(Collectors.toMap(
                        Evento::getId,
                        Evento::getTerciarizados));

        // 5️. Asigna manualmente la lista de terciarizados a cada evento de la primera query.
        // Si un evento no tiene terciarizados, se asigna una lista vacía para evitar nulls.
        eventos.forEach(e -> e.setTerciarizados(mapTerciarizados.getOrDefault(e.getId(), List.of())));

        // 6️. Convierte la lista de entidades Evento a DTOs listos para el frontend.
        // Usa MapStruct para mapear Evento -> DtoEventoRequest, incluyendo productos y terciarizados.
        return eventos.stream()
                .map(eventoMapper::toDto)
                .toList();
    }

    @Transactional
    public Evento crearEvento(CrearEventoRequest request) {
        // 1. Crear y guardar evento
        Evento evento = eventoMapper.toEvento(request);
        eventoRepo.save(evento);

        List<ProductoEvento> productosEvento = new ArrayList<>();

        // 2. Procesar productos
        for (ProductoEventoRequest productoDto : request.productos()) {
            Producto producto = productoRepo.findById(productoDto.productoId())
                    .orElseThrow(
                            () -> new IllegalArgumentException("Producto no encontrado: " + productoDto.productoId()));

            // ✅ Crear el ID embebido de ProductoEvento
            ProductoEventoId peId = new ProductoEventoId(evento.getId(), producto.getId());

            ProductoEvento productoEvento = new ProductoEvento();
            productoEvento.setId(peId); // <-- ID obligatorio
            productoEvento.setEvento(evento);
            productoEvento.setProducto(producto);
            productoEvento.setCantidad(productoDto.cantidad());

            // TODO: calcular precios y descuentos si aplica

            productoEventoRepo.save(productoEvento);

            // 3. Obtener los componentes opcionales definidos para este producto
            List<ComponenteProducto> opcionales = componenteProductoRepo.findByProductoPadre(producto)
                    .stream()
                    .filter(ComponenteProducto::isEsOpcional)
                    .toList();

            // 4. Asociar los componentes opcionales que vienen en el request
            for (ComponenteOpcionalRequest compDto : productoDto.componentesOpcionales()) {
                ComponenteProducto def = opcionales.stream()
                        .filter(op -> op.getProductoComponente().getId().equals(compDto.productoComponenteId()))
                        .findFirst()
                        .orElseThrow(
                                () -> new IllegalArgumentException("Componente opcional no válido para este producto"));

                // ✅ Crear el ID de ComponenteProductoEvento usando el ProductoEventoId y el
                // componente opcional
                ComponenteProductoEventoId cpeId = new ComponenteProductoEventoId(peId,
                        def.getProductoComponente().getId());

                ComponenteProductoEvento cpe = new ComponenteProductoEvento();
                cpe.setId(cpeId);
                cpe.setProductoEvento(productoEvento);
                cpe.setProductoComponente(def.getProductoComponente());
                cpe.setCantidad(compDto.cantidad());
                cpe.setEsOpcional(true);

                componenteProductoEventoRepo.save(cpe);
            }

            productosEvento.add(productoEvento);
        }

        // 5. Verificar y reservar stock
        boolean stockOk = stockService.verificarYReservarStock(evento, productosEvento);
        if (!stockOk) {
            throw new IllegalArgumentException("No hay stock suficiente para el evento");
        }

        return evento;
    }
}
