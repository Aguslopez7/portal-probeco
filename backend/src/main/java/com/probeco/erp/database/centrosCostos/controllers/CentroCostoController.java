package com.probeco.erp.database.centrosCostos.controllers;

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

import com.probeco.erp.database.centrosCostos.services.CentroCostoService;
import com.probeco.erp.dtos.DtoCentroCosto;
import com.probeco.erp.dtos.DtoCentroCostoRequest;


@RestController
@RequestMapping("/centro-costos")
public class CentroCostoController {

    private final CentroCostoService centroCostoService;

    public CentroCostoController(CentroCostoService centroCostoService) {
        this.centroCostoService = centroCostoService;
    }

    @PreAuthorize("hasAnyRole('GERENTE', 'CONTABLE', 'SYSADMIN', 'RRHH' , 'VENTAS', 'MARKETING')")
    @GetMapping()
    public ResponseEntity<?> listarCentroCostos() {
        try {
            return ResponseEntity.ok(centroCostoService.listarCentrosCostos());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'GERENTE', 'RRHH', 'SYSADMIN', 'VENTAS', 'MARKETING')")
    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerCentroCosto(@PathVariable String nombre) {
        try {
            return ResponseEntity.ok(centroCostoService.obtenerCentroCosto(nombre));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PostMapping
    public ResponseEntity<?> agregarCentroCosto(@RequestBody DtoCentroCosto dtoCentroCosto) throws Exception {
        try {
            return ResponseEntity.ok(centroCostoService.agregarCentroCosto(dtoCentroCosto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarCentroCosto(@RequestBody DtoCentroCostoRequest dtoCentroCosto, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(centroCostoService.editarCentroCosto(dtoCentroCosto, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCentroCosto(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(centroCostoService.eliminarCentroCosto(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
        
}
