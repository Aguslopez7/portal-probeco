package com.probeco.erp.database.cuentas.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.probeco.erp.database.cuentas.services.CuentaContableService;
import com.probeco.erp.dtos.DtoCuentaContable;
import com.probeco.erp.dtos.DtoCuentaContableRequest;
import com.probeco.erp.services.ExcelImportService;

@RestController
@RequestMapping("/cuentas-contables")
public class CuentaContableController {
    private final CuentaContableService cuentaContableService;
    private final ExcelImportService excelImportService;

    public CuentaContableController(CuentaContableService cuentaContableService, ExcelImportService excelImportService) {
        this.cuentaContableService = cuentaContableService;
        this.excelImportService = excelImportService;
    }

    @GetMapping
    public ResponseEntity<?> listarCuentacontables() {
        try {
            return ResponseEntity.ok(cuentaContableService.listarCuentacontables());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> agregarCuentaContable(@RequestBody DtoCuentaContable dtoCuentaContable) {
        try {
            return ResponseEntity.ok(cuentaContableService.agregarCuentaContable(dtoCuentaContable));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarCuentaContable(@RequestBody DtoCuentaContableRequest dtoCuentaContable, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(cuentaContableService.editarCuentaContable(dtoCuentaContable, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCuentaContable(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(cuentaContableService.eliminarCuentaContable(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/import")
    public ResponseEntity<?> importarCuentasContables(@RequestParam("file") MultipartFile file) {
        try {
            List<DtoCuentaContable> cuentasContables = excelImportService.importar(file.getInputStream(), DtoCuentaContable.class);
            if (cuentasContables.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error el archivo esta vacio");
            } else {
                List<Object> resultados = cuentaContableService.importarCuentasContables(cuentasContables);
                return ResponseEntity.ok(resultados);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al procesar el archivo: " + e.getMessage());
        }
    }
}
