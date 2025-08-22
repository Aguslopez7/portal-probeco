package com.probeco.erp.modules.eventos.repositories;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.probeco.erp.modules.eventos.entities.ReservaDiaria;
import com.probeco.erp.modules.eventos.entities.ReservaDiariaId;

public interface ReservaDiariaRepository extends JpaRepository<ReservaDiaria, ReservaDiariaId> {
    /**
     * Busca una reserva diaria por fecha y producto.
     *
     * @param fecha Fecha de la reserva.
     * @param productoId ID del producto.
     * @return ReservaDiaria si existe, de lo contrario Optional vacío.
     */
    @Query(
        "SELECT r " +
        "FROM ReservaDiaria r " +
        "WHERE r.id.fecha = :fecha " +
        "AND r.id.productoId = :productoId"
    )
    Optional<ReservaDiaria> findByFechaAndProducto(@Param("fecha") LocalDate fecha, @Param("productoId") Long productoId);
    
    /**
     * Suma la cantidad reservada de un producto en una fecha específica.
     *
     * @param fecha Fecha de la reserva.
     * @param productoId ID del producto.
     * @return Cantidad total reservada.
     */
    @Query(
        "SELECT COALESCE(SUM(r.cantidadReservada), 0) " +
        "FROM ReservaDiaria r " +
        "WHERE r.id.fecha = :fecha " +
        "AND r.id.productoId = :productoId"
    )
    int sumReservadoByFechaAndProducto(@Param("fecha") LocalDate fecha, @Param("productoId") Long productoId);
}
