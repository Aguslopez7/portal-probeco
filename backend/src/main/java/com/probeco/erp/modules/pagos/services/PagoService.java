package com.probeco.erp.modules.pagos.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.auth.SecurityUtils;
import com.probeco.erp.dtos.DtoPago;
import com.probeco.erp.dtos.DtoPagoRequest;
import com.probeco.erp.modules.pagos.entities.Pago;
import com.probeco.erp.modules.pagos.mappers.PagoMapper;
import com.probeco.erp.modules.pagos.repositories.PagoRepository;

@Service
public class PagoService {

    private final PagoRepository pagoRepository;
    private final PagoMapper pagoMapper;

    public PagoService(PagoRepository pagoRepository, PagoMapper pagoMapper) {
        this.pagoRepository = pagoRepository;
        this.pagoMapper = pagoMapper;
    }

    public ResponseEntity<?> agregarPago(DtoPago dtoPago) {
        String username = SecurityUtils.getCurrentUsername();

        Pago pago = pagoMapper.toEntity(dtoPago, username);

        pagoRepository.save(pago);
        
        return ResponseEntity.ok("El pago con id " + pago.getId() + " fue creado correctamente!");
    }

    public List<DtoPagoRequest> listarPagos() {
        List<Pago> pagoResponse = pagoRepository.findAllByOrderByCreatedAtDesc();

        if (pagoResponse.isEmpty()) {
            return List.of();
        }

        // Mapear a DTO y retornar
        return pagoResponse.stream()
                .map(pagoMapper::toDto)
                .toList();
    }
    
    public List<DtoPagoRequest> listarPagosPorUsername(String username) {
        List<Pago> pagoResponse = pagoRepository.findAllByCreatedBy(username);
        
        if (pagoResponse.isEmpty()) {
            return List.of();
        }

        List<Pago> reversedList = new ArrayList<>(pagoResponse);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(pagoMapper::toDto)
                .toList();
    }

    public ResponseEntity<?> editarPago(DtoPagoRequest dtoPago, Long id) {
        Optional<Pago> optionalPago = pagoRepository.findById(id);

        if (!optionalPago.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un pago con el id: " + id);
        }

        Pago pago = optionalPago.get();

        pagoMapper.updateBancoFromDto(dtoPago, pago);

        pagoRepository.save(pago);

        return ResponseEntity.ok("El pago con Id: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarPago(Long idPago) {
        if (!pagoRepository.findById(idPago).isPresent()) {
            throw new IllegalArgumentException("No existe un pago con el Id: " + idPago);
        }

        pagoRepository.deleteById(idPago);

        return ResponseEntity.ok("Se ha eliminado el pago con Id " + idPago);
    }
}
