package com.probeco.erp.database.cuentas.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.database.cuentas.entities.CuentaContable;
import com.probeco.erp.database.cuentas.mappers.CuentaContableMapper;
import com.probeco.erp.database.cuentas.repositories.CuentaContableRepository;
import com.probeco.erp.database.proveedores.mappers.ProveedorMapper;
import com.probeco.erp.dtos.DtoCuentaContable;
import com.probeco.erp.dtos.DtoCuentaContableRequest;

@Service
public class CuentaContableService {

    private final CuentaContableRepository cuentaContableRepository;
    private final CuentaContableMapper cuentaContableMapper;

    public CuentaContableService(CuentaContableRepository cuentaContableRepository,
            CuentaContableMapper cuentaContableMapper, ProveedorMapper proveedorMapper) {
        this.cuentaContableRepository = cuentaContableRepository;
        this.cuentaContableMapper = cuentaContableMapper;
    }

    public List<DtoCuentaContableRequest> listarCuentacontables() {
        List<CuentaContable> cuentaContables = cuentaContableRepository.findAllByOrderByCreatedAtDesc();

        return cuentaContables.isEmpty()
                ? List.of()
                : cuentaContables.stream().map(cuentaContableMapper::toDto).toList();
    }

    public ResponseEntity<?> agregarCuentaContable(DtoCuentaContable dtoCuentaContable) {
        if (cuentaContableRepository.findByNombre(dtoCuentaContable.nombre()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un cuentaContable con el nombre: " + dtoCuentaContable.nombre());
        }

        CuentaContable cuentaContable = cuentaContableMapper.toEntity(dtoCuentaContable);
        cuentaContableRepository.save(cuentaContable);

        return ResponseEntity.ok("La cuenta contable con id " + cuentaContable.getNombre() + " fue creada correctamente!");
    }

    public ResponseEntity<?> editarCuentaContable(DtoCuentaContableRequest dtoCuentaContable, Long id) {
        Optional<CuentaContable> optionalCuentaContable = cuentaContableRepository.findById(id);

        if (!optionalCuentaContable.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un cuenta Contable con el id: " + id);
        }

        CuentaContable cuentaContable = optionalCuentaContable.get();
        cuentaContableMapper.updateCuentaContableFromDto(dtoCuentaContable, cuentaContable);
        cuentaContableRepository.save(cuentaContable);

        return ResponseEntity.ok("La cuenta contable con id: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarCuentaContable(Long idCuentaContable) {
        if (!cuentaContableRepository.findById(idCuentaContable).isPresent()) {
            throw new IllegalArgumentException("No existe un cuentaContable con el Id: " + idCuentaContable);
        }

        cuentaContableRepository.deleteById(idCuentaContable);

        return ResponseEntity.ok("Se ha eliminado el cuentaContable con Id " + idCuentaContable);
    }

    public List<Object> importarCuentasContables(List<DtoCuentaContable> cuentasContables) {
        return cuentasContables.stream()
                .map(dto -> {
                    try {
                        return agregarCuentaContable(dto).getBody();
                    } catch (Exception e) {
                        return "Error con cuenta contable '" + dto.nombre() + "': " + e.getMessage();
                    }
                })
                .toList();
    }
}
