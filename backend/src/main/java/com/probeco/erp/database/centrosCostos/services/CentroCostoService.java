package com.probeco.erp.database.centrosCostos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.database.centrosCostos.dtos.DtoCentroCosto;
import com.probeco.erp.database.centrosCostos.entities.CentroCosto;
import com.probeco.erp.database.centrosCostos.mappers.CentroCostoMapper;
import com.probeco.erp.database.centrosCostos.repositories.CentroCostoRepository;


@Service
public class CentroCostoService {
    
    private final CentroCostoRepository centroCostoRepository;
    private final CentroCostoMapper centroCostoMapper;

    public CentroCostoService(CentroCostoRepository centroCostoRepository, CentroCostoMapper centroCostoMapper) {
        this.centroCostoRepository = centroCostoRepository;
        this.centroCostoMapper = centroCostoMapper;
    }

    public List<DtoCentroCosto> listarCentrosCostos() {
        List<CentroCosto> centrosCostos = centroCostoRepository.findAll();

        return centrosCostos.isEmpty()
                ? List.of()
                : centrosCostos.stream().map(centroCostoMapper::toDto).toList();
    }

    public DtoCentroCosto obtenerCentroCosto(String nombre) {
        List<CentroCosto> centrosCostos = centroCostoRepository.findAll();

        return centrosCostos.stream()
                .filter(centroCosto -> centroCosto.getNombre().equalsIgnoreCase(nombre))
                .findFirst()
                .map(centroCostoMapper::toDto)
                .orElse(null);
    }

    public ResponseEntity<?> agregarCentroCosto(DtoCentroCosto dtoCentroCosto) {
        if (centroCostoRepository.findByNombre(dtoCentroCosto.nombre()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un centro de costos con el nombre: " + dtoCentroCosto.nombre());
        }

        CentroCosto centroCosto = centroCostoMapper.toEntity(dtoCentroCosto);
        centroCostoRepository.save(centroCosto);

        return ResponseEntity.ok("El centro de costos " + centroCosto.getNombre() + " fue creado correctamente!");
    }

    public ResponseEntity<?> editarCentroCosto(DtoCentroCosto dtoCentroCosto, Long id) {
        Optional<CentroCosto> optionalCentroCosto = centroCostoRepository.findById(id);

        if (!optionalCentroCosto.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un centro de costos con el id: " + id);
        }

        CentroCosto centroCosto = optionalCentroCosto.get();
        centroCostoMapper.updateCentroCostoFromDto(dtoCentroCosto, centroCosto);
        centroCostoRepository.save(centroCosto);

        return ResponseEntity.ok("El centro de costos con id: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarCentroCosto(Long idCentroCosto) {
        if (!centroCostoRepository.findById(idCentroCosto).isPresent()) {
            throw new IllegalArgumentException("No existe un centro de costos con el Id: " + idCentroCosto);
        }

        centroCostoRepository.deleteById(idCentroCosto);

        return ResponseEntity.ok("Se ha eliminado el centro de costos con Id " + idCentroCosto);
    }

}
