package com.probeco.erp.modules.cobranzas.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.probeco.erp.dtos.DtoFacturaEmitida;
import com.probeco.erp.modules.cobranzas.services.FacturaEmitidaService;

@RestController
@RequestMapping("/facturas-emitidas")
public class FacturaEmitidaController {
    private final FacturaEmitidaService facturaEmitidaService;

    public FacturaEmitidaController(FacturaEmitidaService facturaEmitidaService) {
        this.facturaEmitidaService = facturaEmitidaService;
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @GetMapping
    public ResponseEntity<?> listarFacturasEmitidas() {
        try {
            return ResponseEntity.ok(facturaEmitidaService.listarFacturasEmitidas());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('VENTAS')")
    @GetMapping("/{username}")
    public ResponseEntity<?> listarPagosPorUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok(facturaEmitidaService.listarFacturasEmitidasByUsername(username));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PostMapping
    public ResponseEntity<?> agregarFacturaEmitida(@RequestBody DtoFacturaEmitida dtoFacturaEmitida) {
        try {
            return ResponseEntity.ok(facturaEmitidaService.agregarFacturaEmitida(dtoFacturaEmitida));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarFacturaEmitida(@RequestBody DtoFacturaEmitida dtoFacturaEmitida, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(facturaEmitidaService.editarFacturaEmitida(dtoFacturaEmitida, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarFacturaEmitida(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(facturaEmitidaService.eliminarFacturaEmitida(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
