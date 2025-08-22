package com.probeco.erp.database.proveedores.services;

import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.database.proveedores.entities.Proveedor;
import com.probeco.erp.database.proveedores.mappers.ProveedorMapper;
import com.probeco.erp.database.proveedores.repositories.ProveedorRepository;
import com.probeco.erp.dtos.DtoProveedor;
import com.probeco.erp.dtos.DtoProveedorRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;
    private final ProveedorMapper proveedorMapper;
    private final DataSource dataSource;

    public ProveedorService(ProveedorRepository proveedorRepository, ProveedorMapper proveedorMapper, DataSource dataSource) {
        this.proveedorRepository = proveedorRepository;
        this.proveedorMapper = proveedorMapper;
        this.dataSource = dataSource;
    }

    public List<DtoProveedorRequest> listarProveedors() {
        List<Proveedor> proveedores = proveedorRepository.findAllByOrderByCreatedAtDesc();

        return proveedores.isEmpty()
                ? List.of()
                : proveedores.stream().map(proveedorMapper::toDto).toList();
    }

    public DtoProveedorRequest obtenerProveedor(String nombre) {
        List<Proveedor> proveedores = proveedorRepository.findAll();

        return proveedores.stream()
                .filter(proveedor -> proveedor.getName().equalsIgnoreCase(nombre))
                .findFirst()
                .map(proveedorMapper::toDto)
                .orElse(null);
    }

    public ResponseEntity<?> agregarProveedor(DtoProveedor dtoProveedor) {
        if (proveedorRepository.findByName(dtoProveedor.name()).isPresent()) {
            throw new IllegalArgumentException("Ya existe un proveedor con el nombre: " + dtoProveedor.name());
        }

        Proveedor proveedor = proveedorMapper.toEntity(dtoProveedor);
        proveedorRepository.save(proveedor);

        return ResponseEntity.ok("El proveedor " + proveedor.getName() + " fue creado correctamente!");
    }

    public ResponseEntity<?> editarProveedor(DtoProveedor dtoProveedor, Long id) {
        Optional<Proveedor> optionalProveedor = proveedorRepository.findById(id);

        if (!optionalProveedor.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un proveedor con el id: " + id);
        }

        Proveedor proveedor = optionalProveedor.get();
        proveedorMapper.updateProveedorFromDto(dtoProveedor, proveedor);
        proveedorRepository.save(proveedor);

        return ResponseEntity.ok("El proveedor con id: " + id + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarProveedor(Long idProveedor) {
        if (!proveedorRepository.findById(idProveedor).isPresent()) {
            throw new IllegalArgumentException("No existe un proveedor con el Id: " + idProveedor);
        }

        proveedorRepository.deleteById(idProveedor);

        return ResponseEntity.ok("Se ha eliminado el proveedor con Id " + idProveedor);
    }

    public List<Object> importarProveedores(List<DtoProveedor> proveedores) {
        return proveedores.stream()
                .map(dto -> {
                    try {
                        return agregarProveedor(dto).getBody();
                    } catch (Exception e) {
                        return "Error con proveedor '" + dto.name() + "': " + e.getMessage();
                    }
                })
                .toList();
    }

    public byte [] generarReporte(String reportName, Long idProveedor) throws JRException, SQLException{

        InputStream reportStream = this.getClass().getResourceAsStream("/reports/"+reportName+".jasper");

        Map<String, Object> params = new HashMap<>();
        params.put("parmIdProveedor", idProveedor);

        JasperPrint JasperPrint = JasperFillManager.fillReport(reportStream, params, dataSource.getConnection());
        
        return JasperExportManager.exportReportToPdf(JasperPrint);
    }


}
