package com.probeco.erp.modules.eventos.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.probeco.erp.modules.eventos.entities.ComponenteProducto;
import com.probeco.erp.modules.eventos.entities.Evento;
import com.probeco.erp.modules.eventos.entities.Producto;
import com.probeco.erp.modules.eventos.entities.ProductoEvento;
import com.probeco.erp.modules.eventos.entities.ReservaDiaria;
import com.probeco.erp.modules.eventos.entities.ReservaDiariaId;
import com.probeco.erp.modules.eventos.repositories.ComponenteProductoRepository;
import com.probeco.erp.modules.eventos.repositories.ReservaDiariaRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StockService {
    private final ComponenteProductoRepository ComponenteProductoRepo;
    private final ReservaDiariaRepository reservaRepo;

    public boolean verificarYReservarStock(Evento evento, List<ProductoEvento> ProductoEvento) {
        Map<Producto, Integer> requeridos = new HashMap<>();

        for (ProductoEvento pe : ProductoEvento) {
            Producto producto = pe.getProducto();
            int cantidadProducto = pe.getCantidad();

            List<ComponenteProducto> ComponenteProductoes = ComponenteProductoRepo.findByProductoPadre(producto);

            if (ComponenteProductoes.isEmpty()) {
                requeridos.merge(producto, cantidadProducto, Integer::sum);
            } else {
                for (ComponenteProducto comp : ComponenteProductoes) {
                    Producto componente = comp.getProductoComponente();
                    int total = comp.getCantidad() * cantidadProducto;
                    requeridos.merge(componente, total, Integer::sum);
                }
            }
        }

        for (Map.Entry<Producto, Integer> entry : requeridos.entrySet()) {
            Producto componente = entry.getKey();
            int necesario = entry.getValue();

            int reservado = reservaRepo.sumReservadoByFechaAndProducto(evento.getFechaEvento(), componente.getId());
            int disponible = componente.getStockBase() - reservado;

            if (disponible < necesario)
                return false;
        }

        for (Map.Entry<Producto, Integer> entry : requeridos.entrySet()) {
            Producto componente = entry.getKey();
            int cantidad = entry.getValue();

            // Se debe crear el id de ReservaDiaria usando la fecha del evento y el ID del componente
            ReservaDiariaId reservaId = new ReservaDiariaId(evento.getFechaEvento(), componente.getId());

            ReservaDiaria reserva = reservaRepo.findById(reservaId)
                    .orElse(new ReservaDiaria(reservaId, componente, 0));

            reserva.setCantidadReservada(reserva.getCantidadReservada() + cantidad);
            reservaRepo.save(reserva);

            reserva.setCantidadReservada(reserva.getCantidadReservada() + cantidad);
            reservaRepo.save(reserva);
        }

        return true;
    }
}