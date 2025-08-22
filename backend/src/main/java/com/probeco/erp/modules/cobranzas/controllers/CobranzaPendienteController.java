package com.probeco.erp.modules.cobranzas.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.probeco.erp.dtos.DtoCobranzaPendiente;
import com.probeco.erp.dtos.DtoCobranzaPendienteRequest;
import com.probeco.erp.modules.cobranzas.services.CobranzaPendienteService;

@RestController
@RequestMapping("/cobranza-pendientes")
public class CobranzaPendienteController {
    private final CobranzaPendienteService cobranzaPendienteService;

    public CobranzaPendienteController(CobranzaPendienteService cobranzaPendienteService) {
        this.cobranzaPendienteService = cobranzaPendienteService;
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN', 'VENTAS')")
    @GetMapping
    public ResponseEntity<?> listarCobranzasPendientes() {
        try {
            return ResponseEntity.ok(cobranzaPendienteService.listarCobranzasPendientes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PostMapping
    public ResponseEntity<?> agregarCobranzaPendiente(@RequestBody DtoCobranzaPendiente dtoCobranzaPendiente) {
        try {
            return ResponseEntity.ok(cobranzaPendienteService.agregarCobranzaPendiente(dtoCobranzaPendiente));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarCobranzaPendiente(@RequestBody DtoCobranzaPendienteRequest dtoCobranzaPendiente, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(cobranzaPendienteService.editarCobranzaPendiente(dtoCobranzaPendiente, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCobranzaPendiente(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(cobranzaPendienteService.eliminarCobranzaPendiente(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
