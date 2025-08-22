package com.probeco.erp.database.propietariosTarjeta.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.database.propietariosTarjeta.entities.PropietarioTarjeta;
import com.probeco.erp.database.propietariosTarjeta.mappers.PropietarioTarjetaMapper;
import com.probeco.erp.database.propietariosTarjeta.repositories.PropietarioTarjetaRepository;
import com.probeco.erp.dtos.DtoPropietarioTarjeta;
import com.probeco.erp.dtos.DtoPropietarioTarjetaRequest;

@Service
public class PropietarioTarjetaService {

    private final PropietarioTarjetaRepository propietarioTarjetaRepository;
    private final PropietarioTarjetaMapper propietarioTarjetaMapper;

    public PropietarioTarjetaService(PropietarioTarjetaRepository propietarioTarjetaRepository, PropietarioTarjetaMapper propietarioTarjetaMapper) {
        this.propietarioTarjetaRepository = propietarioTarjetaRepository;
        this.propietarioTarjetaMapper = propietarioTarjetaMapper;
    }

    public List<DtoPropietarioTarjetaRequest> listarPropietariosTarjetas() {
        List<PropietarioTarjeta> propietariosTarjetas = propietarioTarjetaRepository.findAll();

        if (propietariosTarjetas.isEmpty()) {
            return List.of();
        }

        List<PropietarioTarjeta> reversedList = new ArrayList<>(propietariosTarjetas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(propietarioTarjetaMapper::toDto)
                .toList();
    }

    public List<DtoPropietarioTarjetaRequest> listarPropietariosTarjetasByUsername(String username) {
        List<PropietarioTarjeta> propietariosTarjetas = propietarioTarjetaRepository.findAllByCreatedBy(username);

        if (propietariosTarjetas.isEmpty()) {
            return List.of();
        }

        List<PropietarioTarjeta> reversedList = new ArrayList<>(propietariosTarjetas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(propietarioTarjetaMapper::toDto)
                .toList();
    }

    public DtoPropietarioTarjetaRequest obtenerPropietarioTarjeta(String nombre) {
        List<PropietarioTarjeta> proveedores = propietarioTarjetaRepository.findAll();

        return proveedores.stream()
                .filter(proveedor -> proveedor.getNombrePropietarioTarjeta().equalsIgnoreCase(nombre))
                .findFirst()
                .map(propietarioTarjetaMapper::toDto)
                .orElse(null);
    }

    public ResponseEntity<?> agregarPropietarioTarjeta(DtoPropietarioTarjeta dtoPropietarioTarjeta) {
        // validar si existe
        // if (propietarioTarjetaRepository.findByName(dtoPropietarioTarjeta.name()).isPresent()) {
        //     return ResponseEntity.badRequest().body("Ya existe un propietarioTarjeta con el nombre: " + dtoPropietarioTarjeta.name());
        // }

        PropietarioTarjeta propietarioTarjeta = propietarioTarjetaMapper.toEntity(dtoPropietarioTarjeta);
        propietarioTarjetaRepository.save(propietarioTarjeta);

        return ResponseEntity.ok("El propietarioTarjeta con id " + propietarioTarjeta.getId() + " fue creado correctamente!");
    }

    public ResponseEntity<?> editarPropietarioTarjeta(DtoPropietarioTarjetaRequest dtoPropietarioTarjeta, Long id) {
        Optional<PropietarioTarjeta> optionalPropietarioTarjeta = propietarioTarjetaRepository.findById(id);

        if (!optionalPropietarioTarjeta.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un propietarioTarjeta con el nombre: " + id);
        }

        PropietarioTarjeta propietarioTarjeta = optionalPropietarioTarjeta.get();
        propietarioTarjetaMapper.updatePropietarioTarjetaFromDto(dtoPropietarioTarjeta, propietarioTarjeta);
        propietarioTarjetaRepository.save(propietarioTarjeta);

        return ResponseEntity.ok("El propietarioTarjeta: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarPropietarioTarjeta(Long idPropietarioTarjeta) {
        if (!propietarioTarjetaRepository.findById(idPropietarioTarjeta).isPresent()) {
            throw new IllegalArgumentException("No existe un propietarioTarjeta con el Id: " + idPropietarioTarjeta);
        }

        propietarioTarjetaRepository.deleteById(idPropietarioTarjeta);

        return ResponseEntity.ok("Se ha eliminado el propietarioTarjeta con Id " + idPropietarioTarjeta);
    }
}
