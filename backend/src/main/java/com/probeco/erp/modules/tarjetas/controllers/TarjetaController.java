package com.probeco.erp.modules.tarjetas.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.probeco.erp.dtos.DtoTarjeta;
import com.probeco.erp.dtos.DtoTarjetaRequest;
import com.probeco.erp.modules.tarjetas.services.TarjetaService;

@RestController
@RequestMapping("/tarjetas")
public class TarjetaController {
    private final TarjetaService tarjetaService;

    public TarjetaController(TarjetaService tarjetaService) {
        this.tarjetaService = tarjetaService;
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @GetMapping
    public ResponseEntity<?> listarTarjetas() {
        try {
            return ResponseEntity.ok(tarjetaService.listarTarjetas());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('GERENTE', 'RRHH', 'VENTAS', 'REFERENTE')")
    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerTarjeta(@PathVariable String nombre) {
        try {
            return ResponseEntity.ok(tarjetaService.listarTarjetasByUsername(nombre));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN', 'GERENTE', 'RRHH', 'VENTAS', 'REFERENTE')")
    @PostMapping
    public ResponseEntity<?> agregarTarjeta(@RequestBody DtoTarjeta dtoTarjeta) {
        try {
            return ResponseEntity.ok(tarjetaService.agregarTarjeta(dtoTarjeta));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarTarjeta(@RequestBody DtoTarjetaRequest dtoTarjeta, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(tarjetaService.editarTarjeta(dtoTarjeta, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTarjeta(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(tarjetaService.eliminarTarjeta(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
