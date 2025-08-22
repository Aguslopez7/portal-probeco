package com.probeco.erp.modules.eventos.mappers;

import com.probeco.erp.dtos.DtoCompuestoProductoEvento;
import com.probeco.erp.dtos.DtoProductoTerciarizadoEvento;
import com.probeco.erp.dtos.DtoProductosEvento;
import com.probeco.erp.modules.eventos.dtos.CrearEventoRequest;
import com.probeco.erp.modules.eventos.dtos.DtoEventoRequest;
import com.probeco.erp.modules.eventos.entities.ComponenteProductoEvento;
import com.probeco.erp.modules.eventos.entities.Evento;
import com.probeco.erp.modules.eventos.entities.ProductoEvento;
import com.probeco.erp.modules.eventos.entities.ProductoTerciarizadoEvento;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventoMapper {
    EventoMapper INSTANCE = Mappers.getMapper(EventoMapper.class);

    @Mapping(target = "id", ignore = true)
    Evento toEvento(CrearEventoRequest request);

    @Mapping(source = "productosEvento", target = "productos")
    @Mapping(source = "terciarizados", target = "terciarizados")
    DtoEventoRequest toDto(Evento evento);

    @Mapping(source = "producto.id", target = "id")
    @Mapping(source = "producto.nombre", target = "nombreProducto")
    @Mapping(source = "producto.familiaProducto", target = "familiaProducto")
    @Mapping(source = "detalleComponentesOpcionales", target = "detalleComponentesOpcionales")
    DtoProductosEvento toDto(ProductoEvento pe);

    @Mapping(source = "productoComponente.nombre", target = "nombre")
    @Mapping(source = "cantidad", target = "cantidad")
    DtoCompuestoProductoEvento toDto(ComponenteProductoEvento cpe);

    DtoProductoTerciarizadoEvento toDto(ProductoTerciarizadoEvento pte);
}
