package com.probeco.erp.controllers;

import com.probeco.erp.dtos.DtoEventoCalendar;
import com.probeco.erp.services.GoogleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/google")
public class GoogleController {

    @Autowired
    private GoogleService calendarService;

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.redirect.uri}")
    private String redirectUri;

    @Value("${google.scope}")
    private String scope;

    // 📅 Crear evento
    @PostMapping("/calendar/{empresa}")
    public String crearEvento(
            @PathVariable String empresa,
            @RequestBody DtoEventoCalendar dto) {
                System.out.println("CREANDO EVENTO...");
                System.out.println("Titulo: " + dto.titulo());
                System.out.println("Descripcion: " + dto.descripcion());
                System.out.println("Fecha del evento (todo el día): " + dto.fecha());
        calendarService.createEvent(empresa, dto);
        return "Evento creado correctamente en empresa " + empresa;
    }

    // 🔐 Paso 1: redirigir a Google para autorizar la cuenta organizadora
    @GetMapping("/oauth/authorize")
    public ResponseEntity<?> authorize() {
        String url = UriComponentsBuilder
                .fromHttpUrl("https://accounts.google.com/o/oauth2/v2/auth")
                .queryParam("client_id", clientId)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("response_type", "code")
                .queryParam("scope", scope)
                .queryParam("access_type", "offline")
                .queryParam("prompt", "consent") // Forzar refresh_token
                .build()
                .toUriString();

        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(url)).build();
    }

    // 🔁 Paso 2: recibir el código de Google y obtener refresh_token
    @GetMapping("/oauth/callback")
    public ResponseEntity<String> callback(@RequestParam String code) {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("code", code);
        body.add("redirect_uri", redirectUri);
        body.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = new RestTemplate().postForEntity(tokenUrl, request, String.class);

        return ResponseEntity.ok(response.getBody());
    }
}
