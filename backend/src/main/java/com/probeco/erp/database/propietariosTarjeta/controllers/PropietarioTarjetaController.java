package com.probeco.erp.database.propietariosTarjeta.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.probeco.erp.database.propietariosTarjeta.services.PropietarioTarjetaService;
import com.probeco.erp.dtos.DtoPropietarioTarjeta;
import com.probeco.erp.dtos.DtoPropietarioTarjetaRequest;

@RestController
@RequestMapping("/propietarios-tarjetas")
public class PropietarioTarjetaController {
    private final PropietarioTarjetaService propietarioTarjetaService;

    public PropietarioTarjetaController(PropietarioTarjetaService propietarioTarjetaService) {
        this.propietarioTarjetaService = propietarioTarjetaService;
    }

    @GetMapping
    public ResponseEntity<?> listarPropietariosTarjetas() {
        try {
            return ResponseEntity.ok(propietarioTarjetaService.listarPropietariosTarjetas());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerPropietario(@PathVariable String nombre) {
        try {
            return ResponseEntity.ok(propietarioTarjetaService.obtenerPropietarioTarjeta(nombre));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> agregarPropietarioTarjeta(@RequestBody DtoPropietarioTarjeta dtoPropietarioTarjeta) {
        try {
            return ResponseEntity.ok(propietarioTarjetaService.agregarPropietarioTarjeta(dtoPropietarioTarjeta));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarPropietarioTarjeta(@RequestBody DtoPropietarioTarjetaRequest dtoPropietarioTarjeta, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(propietarioTarjetaService.editarPropietarioTarjeta(dtoPropietarioTarjeta, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPropietarioTarjeta(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(propietarioTarjetaService.eliminarPropietarioTarjeta(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
