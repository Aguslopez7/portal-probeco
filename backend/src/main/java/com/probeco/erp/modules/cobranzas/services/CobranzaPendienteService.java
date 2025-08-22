package com.probeco.erp.modules.cobranzas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.dtos.DtoCobranzaPendiente;
import com.probeco.erp.dtos.DtoCobranzaPendienteRequest;
import com.probeco.erp.modules.cobranzas.entities.CobranzaPendiente;
import com.probeco.erp.modules.cobranzas.mappers.CobranzaPendienteMapper;
import com.probeco.erp.modules.cobranzas.repositories.CobranzaPendienteRepository;

@Service
public class CobranzaPendienteService {

    private final CobranzaPendienteRepository cobranzaPendienteRepository;
    private final CobranzaPendienteMapper cobranzaPendienteMapper;

    public CobranzaPendienteService(CobranzaPendienteRepository cobranzaPendienteRepository, CobranzaPendienteMapper cobranzaPendienteMapper) {
        this.cobranzaPendienteRepository = cobranzaPendienteRepository;
        this.cobranzaPendienteMapper = cobranzaPendienteMapper;
    }

    public List<DtoCobranzaPendienteRequest> listarCobranzasPendientes() {
        List<CobranzaPendiente> cobranzaPendientes = cobranzaPendienteRepository.findTop3ByOrderByCreatedAtDesc();

        if (cobranzaPendientes.isEmpty()) {
            return List.of();
        }

        // Mapear a DTO y retornar
        return cobranzaPendientes.stream()
                .map(cobranzaPendienteMapper::toDto)
                .toList();
    }

    public ResponseEntity<?> agregarCobranzaPendiente(DtoCobranzaPendiente dtoCobranzaPendiente) {
        if (cobranzaPendienteRepository.findByNombreReporte(dtoCobranzaPendiente.nombreReporte()).isPresent()) {
            throw new IllegalArgumentException("Ya existe una Cobranza Pendiente con el nombre: " + dtoCobranzaPendiente.nombreReporte());
        }

        CobranzaPendiente cobranzaPendiente = cobranzaPendienteMapper.toEntity(dtoCobranzaPendiente);
        cobranzaPendienteRepository.save(cobranzaPendiente);

        return ResponseEntity.ok("La Cobranza Pendiente con id " + cobranzaPendiente.getId() + " fue creada correctamente!");
    }

    public ResponseEntity<?> editarCobranzaPendiente(DtoCobranzaPendienteRequest dtoCobranzaPendiente, Long idCobranzaPendiente) {
        Optional<CobranzaPendiente> optionalCobranzaPendiente = cobranzaPendienteRepository.findById(idCobranzaPendiente);

        if (!optionalCobranzaPendiente.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado una Cobranza Pendiente con el id: " + idCobranzaPendiente);
        }

        CobranzaPendiente cobranzaPendiente = optionalCobranzaPendiente.get();
        cobranzaPendienteMapper.updateCobranzaPendienteFromDto(dtoCobranzaPendiente, cobranzaPendiente);
        cobranzaPendienteRepository.save(cobranzaPendiente);

        return ResponseEntity.ok("La Cobranza Pendiente con el Id: " + idCobranzaPendiente + " fue editada correctamente!");
    }

    public ResponseEntity<?> eliminarCobranzaPendiente(Long idCobranzaPendiente) {
        if (!cobranzaPendienteRepository.findById(idCobranzaPendiente).isPresent()) {
            throw new IllegalArgumentException("No existe un Cobranza Pendiente con el Id: " + idCobranzaPendiente);
        }

        cobranzaPendienteRepository.deleteById(idCobranzaPendiente);

        return ResponseEntity.ok("Se ha eliminado la Cobrana Pendiente con Id " + idCobranzaPendiente);
    }
}
