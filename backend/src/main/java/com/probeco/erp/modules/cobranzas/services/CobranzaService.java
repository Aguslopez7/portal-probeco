package com.probeco.erp.modules.cobranzas.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.auth.SecurityUtils;
import com.probeco.erp.dtos.DtoCobranza;
import com.probeco.erp.dtos.DtoCobranzaRequest;
import com.probeco.erp.modules.cobranzas.entities.Cobranza;
import com.probeco.erp.modules.cobranzas.mappers.CobranzaMapper;
import com.probeco.erp.modules.cobranzas.repositories.CobranzaRepository;

@Service
public class CobranzaService {

    private final CobranzaRepository cobranzaRepository;
    private final CobranzaMapper cobranzaMapper;

    public CobranzaService(CobranzaRepository cobranzaRepository, CobranzaMapper cobranzaMapper) {
        this.cobranzaRepository = cobranzaRepository;
        this.cobranzaMapper = cobranzaMapper;
    }

    public List<DtoCobranzaRequest> listarCobranzas() {
        List<Cobranza> cobranzas = cobranzaRepository.findAllByOrderByCreatedAtDesc();

        if (cobranzas.isEmpty()) {
            return List.of();
        }

        // Mapear a DTO y retornar
        return cobranzas.stream()
                .map(cobranzaMapper::toDto)
                .toList();
    }

    public List<DtoCobranzaRequest> listarCobranzasByUsername(String username) {
        List<Cobranza> cobranzas = cobranzaRepository.findAllByCreatedBy(username);

        if (cobranzas.isEmpty()) {
            return List.of();
        }

        List<Cobranza> reversedList = new ArrayList<>(cobranzas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(cobranzaMapper::toDto)
                .toList();
    }

    public ResponseEntity<?> agregarCobranza(DtoCobranza dtoCobranza) {
        String username = SecurityUtils.getCurrentUsername();

        Cobranza cobranza = cobranzaMapper.toEntity(dtoCobranza, username);
        cobranzaRepository.save(cobranza);

        return ResponseEntity.ok("El cobranza con id " + cobranza.getId() + " fue creado correctamente!");
    }

    public ResponseEntity<?> editarCobranza(DtoCobranzaRequest dtoCobranza, Long id) {
        Optional<Cobranza> optionalCobranza = cobranzaRepository.findById(id);

        if (!optionalCobranza.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un cobranza con el id: " + id);
        }

        Cobranza cobranza = optionalCobranza.get();
        cobranzaMapper.updateCobranzaFromDto(dtoCobranza, cobranza);
        cobranzaRepository.save(cobranza);

        return ResponseEntity.ok("El cobranza con id: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarCobranza(Long idCobranza) {
        if (!cobranzaRepository.findById(idCobranza).isPresent()) {
            throw new IllegalArgumentException("No existe un cobranza con el Id: " + idCobranza);
        }

        cobranzaRepository.deleteById(idCobranza);

        return ResponseEntity.ok("Se ha eliminado el cobranza con Id " + idCobranza);
    }
}
