package com.probeco.erp.database.proveedores.controllers;

import org.springframework.http.*;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.probeco.erp.database.proveedores.services.ProveedorService;
import com.probeco.erp.dtos.DtoProveedor;
import com.probeco.erp.services.ExcelImportService;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
    private final ProveedorService proveedorService;
    private final ExcelImportService excelImportService;

    public ProveedorController(ProveedorService proveedorService, ExcelImportService excelImportService) {
        this.proveedorService = proveedorService;
        this.excelImportService = excelImportService;
    }

    @PreAuthorize("hasAnyRole('GERENTE', 'CONTABLE', 'SYSADMIN', 'RRHH' , 'VENTAS', 'MARKETING')")
    @GetMapping()
    public ResponseEntity<?> listarProveedors() {
        try {
            return ResponseEntity.ok(proveedorService.listarProveedors());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'GERENTE', 'RRHH', 'SYSADMIN', 'VENTAS', 'MARKETING')")
    @GetMapping("/{nombre}")
    public ResponseEntity<?> obtenerProveedor(@PathVariable String nombre) {
        try {
            return ResponseEntity.ok(proveedorService.obtenerProveedor(nombre));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PostMapping
    public ResponseEntity<?> agregarProveedor(@RequestBody DtoProveedor dtoProveedor) throws Exception {
        try {
            return ResponseEntity.ok(proveedorService.agregarProveedor(dtoProveedor));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> editarProveedor(@RequestBody DtoProveedor dtoProveedor, @PathVariable Long id) {
        try {
            return ResponseEntity.ok(proveedorService.editarProveedor(dtoProveedor, id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProveedor(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(proveedorService.eliminarProveedor(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @PostMapping("/import")
    public ResponseEntity<?> importarProveedores(@RequestParam("file") MultipartFile file) {
        try {
            List<DtoProveedor> proveedores = excelImportService.importar(file.getInputStream(), DtoProveedor.class);
            if (proveedores.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Error el archivo esta vacio");
            } else {
                List<Object> resultados = proveedorService.importarProveedores(proveedores);
                return ResponseEntity.ok(resultados);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al procesar el archivo: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('SYSADMIN')")
    @GetMapping("/report/{id}")
    public ResponseEntity<?> generarReporte(@PathVariable Long id){
        try {

            byte[] pdf = proveedorService.generarReporte("Proveedor", id);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=reporte.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdf);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
