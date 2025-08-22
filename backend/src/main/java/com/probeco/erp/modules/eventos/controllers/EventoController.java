package com.probeco.erp.modules.eventos.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.probeco.erp.modules.eventos.dtos.CrearEventoRequest;
import com.probeco.erp.modules.eventos.dtos.DtoEventoRequest;
import com.probeco.erp.modules.eventos.entities.Evento;
import com.probeco.erp.modules.eventos.repositories.EventoRepository;
import com.probeco.erp.modules.eventos.services.EventoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventoController {
    private final EventoService eventoService;
    private final EventoRepository eventoRepository;

    @GetMapping("/test")
    public List<Evento> getEventosSimple() {
        return eventoRepository.findAll();
    }

@GetMapping("/completos")
public List<DtoEventoRequest> getEventosCompletos() {
    System.out.println(">>> Entró al método /completos");
    return eventoService.obtenerEventosCompletos();
}


        @GetMapping("/ping")
public String ping() {
    System.out.println(">>> Entró al ping");
    return "pong";
}

    @PostMapping
    public ResponseEntity<String> crearEvento(@RequestBody CrearEventoRequest request) {
        try {
            eventoService.crearEvento(request);
            return ResponseEntity.ok("Evento creado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
