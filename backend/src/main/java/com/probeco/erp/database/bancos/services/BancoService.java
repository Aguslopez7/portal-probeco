package com.probeco.erp.database.bancos.services;

import java.util.List;

import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.database.bancos.entities.Banco;
import com.probeco.erp.database.bancos.mappers.BancoMapper;
import com.probeco.erp.database.bancos.repositories.BancoRepository;
import com.probeco.erp.dtos.DtoBanco;
import com.probeco.erp.dtos.DtoBancoRequest;

@Service
public class BancoService {
    private final BancoRepository bancoRepository;
    private final BancoMapper bancoMapper;

    public BancoService(BancoRepository bancoRepository, BancoMapper bancoMapper) {
        this.bancoRepository = bancoRepository;
        this.bancoMapper = bancoMapper;
    }

    public List<DtoBancoRequest> listarBancos() {
        List<Banco> bancoResponse = bancoRepository.findAllByOrderByCreatedAtDesc();

        return bancoResponse.isEmpty()
                ? List.of()
                : bancoResponse.stream().map(bancoMapper::toDto).toList();
    }

    public String agregarBanco(DtoBanco dtoBanco) {
        Optional<Banco> bancoExistente = bancoRepository.findByNameAndNumeroCuenta(
                dtoBanco.name(), dtoBanco.numeroCuenta());

        if (bancoExistente.isPresent()) {
            throw new IllegalArgumentException(
                    "Ya existe un banco con el nombre '" + dtoBanco.name() +
                            "' y número de cuenta '" + dtoBanco.numeroCuenta() + "'.");
        }

        Banco banco = bancoMapper.toEntity(dtoBanco);
        bancoRepository.save(banco);

        return "El banco con id " + banco.getId() + " fue creado correctamente!";
    }

    public ResponseEntity<?> editarBanco(DtoBanco dtoBanco, Long id) {
        Optional<Banco> optionalBanco = bancoRepository.findById(id);

        if (!optionalBanco.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un banco con el id: " + id);
        }

        Banco banco = optionalBanco.get();

        bancoMapper.updateBancoFromDto(dtoBanco, banco);

        bancoRepository.save(banco);

        return ResponseEntity.ok("El banco con id: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarBanco(Long idBanco) {
        if (!bancoRepository.findById(idBanco).isPresent()) {
            throw new IllegalArgumentException("No existe un banco con el Id: " + idBanco);
        }

        bancoRepository.deleteById(idBanco);

        return ResponseEntity.ok("Se ha eliminado el banco con Id " + idBanco);
    }
}
