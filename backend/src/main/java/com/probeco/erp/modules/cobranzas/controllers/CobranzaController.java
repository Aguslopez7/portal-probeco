package com.probeco.erp.modules.cobranzas.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.probeco.erp.dtos.DtoCobranza;
import com.probeco.erp.dtos.DtoCobranzaRequest;
import com.probeco.erp.modules.cobranzas.services.CobranzaService;

@RestController
@RequestMapping("/cobranzas")
public class CobranzaController {
    private final CobranzaService cobranzaService;

    public CobranzaController(CobranzaService cobranzaService) {
        this.cobranzaService = cobranzaService;
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN', 'VENTAS')")
    @GetMapping
    public ResponseEntity<?> listarCobranzas() {
        try {
            return ResponseEntity.ok(cobranzaService.listarCobranzas());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('VENTAS')")
    @GetMapping("/{username}")
    public ResponseEntity<?> listarCobranzassPorUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok(cobranzaService.listarCobranzasByUsername(username));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN', 'VENTAS')")
    @PostMapping
    public ResponseEntity<?> agregarCobranza(@RequestBody DtoCobranza dtoCobranza) {
        try {
            return ResponseEntity.ok(cobranzaService.agregarCobranza(dtoCobranza));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarCobranza(@RequestBody DtoCobranzaRequest dtoCobranza, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(cobranzaService.editarCobranza(dtoCobranza, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCobranza(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(cobranzaService.eliminarCobranza(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
