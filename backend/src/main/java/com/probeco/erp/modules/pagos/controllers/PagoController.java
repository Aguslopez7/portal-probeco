package com.probeco.erp.modules.pagos.controllers;

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

import com.probeco.erp.dtos.DtoPago;
import com.probeco.erp.dtos.DtoPagoRequest;
import com.probeco.erp.modules.pagos.services.PagoService;

@RestController
@RequestMapping("/pagos")
public class PagoController {
    private final PagoService pagoService;

    public PagoController(PagoService pagoService) {
        this.pagoService = pagoService;
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'GERENTE', 'RRHH', 'VENTAS', 'SYSADMIN')")
    @PostMapping()
    public ResponseEntity<?> agregarPago(@RequestBody DtoPago dtoPago){
        try {
            return ResponseEntity.ok(pagoService.agregarPago(dtoPago));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @GetMapping()
    public ResponseEntity<?> listarPagos(){
        try {
            return ResponseEntity.ok(pagoService.listarPagos());
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('GERENTE', 'RRHH', 'VENTAS')")
    @GetMapping("/{username}")
    public ResponseEntity<?> listarPagosPorUsername(@PathVariable String username) {
        try {
            return ResponseEntity.ok(pagoService.listarPagosPorUsername(username));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarPago(@RequestBody DtoPagoRequest dtoPago, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(pagoService.editarPago(dtoPago, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{idPago}")
    public ResponseEntity<?> eliminarPago(@PathVariable Long idPago) {
        try {
            return ResponseEntity.ok(pagoService.eliminarPago(idPago));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
