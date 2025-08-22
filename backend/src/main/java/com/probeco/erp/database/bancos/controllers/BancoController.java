package com.probeco.erp.database.bancos.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.probeco.erp.database.bancos.services.BancoService;
import com.probeco.erp.dtos.DtoBanco;

@RestController
@RequestMapping("/bancos")
public class BancoController {
    private final BancoService bancoService;

    public BancoController(BancoService bancoService) {
        this.bancoService = bancoService;
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'GERENTE', 'RRHH', 'VENTAS', 'SYSADMIN')")
    @GetMapping()
    public ResponseEntity<?> listarBancos(){
        try {
            return ResponseEntity.ok(bancoService.listarBancos());
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PostMapping
    public ResponseEntity<?> agregarBanco(@RequestBody DtoBanco dtoBanco) {
        try {
            return ResponseEntity.ok(bancoService.agregarBanco(dtoBanco));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error inesperado: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarBanco(@RequestBody DtoBanco dtoBanco, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(bancoService.editarBanco(dtoBanco, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{idBanco}")
    public ResponseEntity<?> eliminarBanco(@PathVariable Long idBanco) {
        try {
            return ResponseEntity.ok(bancoService.eliminarBanco(idBanco));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
