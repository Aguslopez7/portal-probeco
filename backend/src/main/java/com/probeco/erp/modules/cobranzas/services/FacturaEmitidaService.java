package com.probeco.erp.modules.cobranzas.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.dtos.DtoFacturaEmitida;
import com.probeco.erp.dtos.DtoFacturaEmitidaRequest;
import com.probeco.erp.modules.cobranzas.entities.FacturaEmitida;
import com.probeco.erp.modules.cobranzas.mappers.FacturaEmitidaMapper;
import com.probeco.erp.modules.cobranzas.repositories.FacturaEmitidaRepository;

@Service
public class FacturaEmitidaService {

    private final FacturaEmitidaRepository facturaEmitidaRepository;
    private final FacturaEmitidaMapper facturaEmitidaMapper;

    public FacturaEmitidaService(FacturaEmitidaRepository facturaEmitidaRepository, FacturaEmitidaMapper facturaEmitidaMapper) {
        this.facturaEmitidaRepository = facturaEmitidaRepository;
        this.facturaEmitidaMapper = facturaEmitidaMapper;
    }

    public List<DtoFacturaEmitidaRequest> listarFacturasEmitidas() {
        List<FacturaEmitida> facturasEmitidas = facturaEmitidaRepository.findAll();

        if (facturasEmitidas.isEmpty()) {
            return List.of();
        }

        List<FacturaEmitida> reversedList = new ArrayList<>(facturasEmitidas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(facturaEmitidaMapper::toDto)
                .toList();
    }

    public List<DtoFacturaEmitidaRequest> listarFacturasEmitidasByUsername(String username) {
        List<FacturaEmitida> facturasEmitidas = facturaEmitidaRepository.findAllByCobrador(username);

        if (facturasEmitidas.isEmpty()) {
            return List.of();
        }

        List<FacturaEmitida> reversedList = new ArrayList<>(facturasEmitidas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(facturaEmitidaMapper::toDto)
                .toList();
    }

    public ResponseEntity<?> agregarFacturaEmitida(DtoFacturaEmitida dtoFacturaEmitida) {
        // validar si existe
        // if (facturaEmitidaRepository.findByName(dtoFacturaEmitida.name()).isPresent()) {
        //     return ResponseEntity.badRequest().body("Ya existe un facturaEmitida con el nombre: " + dtoFacturaEmitida.name());
        // }

        FacturaEmitida facturaEmitida = facturaEmitidaMapper.toEntity(dtoFacturaEmitida);
        facturaEmitidaRepository.save(facturaEmitida);

        return ResponseEntity.ok("El facturaEmitida con id " + facturaEmitida.getId() + " fue creado correctamente!");
    }

    public ResponseEntity<?> editarFacturaEmitida(DtoFacturaEmitida dtoFacturaEmitida, Long id) {
        Optional<FacturaEmitida> optionalFacturaEmitida = facturaEmitidaRepository.findById(id);

        if (!optionalFacturaEmitida.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un facturaEmitida con el nombre: " + id);
        }

        FacturaEmitida facturaEmitida = optionalFacturaEmitida.get();
        facturaEmitidaMapper.updateFacturaEmitidaFromDto(dtoFacturaEmitida, facturaEmitida);
        facturaEmitidaRepository.save(facturaEmitida);

        return ResponseEntity.ok("El facturaEmitida: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarFacturaEmitida(Long idFacturaEmitida) {
        if (!facturaEmitidaRepository.findById(idFacturaEmitida).isPresent()) {
            throw new IllegalArgumentException("No existe un facturaEmitida con el Id: " + idFacturaEmitida);
        }

        facturaEmitidaRepository.deleteById(idFacturaEmitida);

        return ResponseEntity.ok("Se ha eliminado el facturaEmitida con Id " + idFacturaEmitida);
    }
}
