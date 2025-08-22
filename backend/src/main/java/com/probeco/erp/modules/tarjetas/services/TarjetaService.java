package com.probeco.erp.modules.tarjetas.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.dtos.DtoTarjeta;
import com.probeco.erp.dtos.DtoTarjetaRequest;
import com.probeco.erp.dtos.DtoTarjetasRequestPublic;
import com.probeco.erp.modules.tarjetas.entities.Tarjeta;
import com.probeco.erp.modules.tarjetas.mappers.TarjetaMapper;
import com.probeco.erp.modules.tarjetas.repositories.TarjetaRepository;

@Service
public class TarjetaService {

    private final TarjetaRepository tarjetaRepository;
    private final TarjetaMapper tarjetaMapper;

    public TarjetaService(TarjetaRepository tarjetaRepository, TarjetaMapper tarjetaMapper) {
        this.tarjetaRepository = tarjetaRepository;
        this.tarjetaMapper = tarjetaMapper;
    }

    public List<DtoTarjetaRequest> listarTarjetas() {
        List<Tarjeta> tarjetas = tarjetaRepository.findAllByOrderByFechaGastoAsc();

        if (tarjetas.isEmpty()) {
            return List.of();
        }

        List<Tarjeta> reversedList = new ArrayList<>(tarjetas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(tarjetaMapper::toDto)
                .toList();
    }

    public List<DtoTarjetasRequestPublic> listarTarjetasByUsername(String username) {
        List<Tarjeta> tarjetas = tarjetaRepository.findAllByCreatedBy(username);

        if (tarjetas.isEmpty()) {
            return List.of();
        }

        List<Tarjeta> reversedList = new ArrayList<>(tarjetas);
        Collections.reverse(reversedList);

        // Mapear a DTO y retornar
        return reversedList.stream()
                .map(tarjetaMapper::toDtoPublic)
                .toList();
    }

    public ResponseEntity<?> agregarTarjeta(DtoTarjeta dtoTarjeta) {
        // validar si existe
        // if (tarjetaRepository.findByName(dtoTarjeta.name()).isPresent()) {
        //     return ResponseEntity.badRequest().body("Ya existe un tarjeta con el nombre: " + dtoTarjeta.name());
        // }

        Tarjeta tarjeta = tarjetaMapper.toEntity(dtoTarjeta);
        tarjetaRepository.save(tarjeta);

        return ResponseEntity.ok("El tarjeta con id " + tarjeta.getId() + " fue creado correctamente!");
    }

    public ResponseEntity<?> editarTarjeta(DtoTarjetaRequest dtoTarjeta, Long id) {
        Optional<Tarjeta> optionalTarjeta = tarjetaRepository.findById(id);

        if (!optionalTarjeta.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un tarjeta con el nombre: " + id);
        }

        Tarjeta tarjeta = optionalTarjeta.get();
        tarjetaMapper.updateTarjetaFromDto(dtoTarjeta, tarjeta);
        tarjetaRepository.save(tarjeta);

        return ResponseEntity.ok("El tarjeta: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarTarjeta(Long idTarjeta) {
        if (!tarjetaRepository.findById(idTarjeta).isPresent()) {
            throw new IllegalArgumentException("No existe un tarjeta con el Id: " + idTarjeta);
        }

        tarjetaRepository.deleteById(idTarjeta);

        return ResponseEntity.ok("Se ha eliminado el tarjeta con Id " + idTarjeta);
    }
}
