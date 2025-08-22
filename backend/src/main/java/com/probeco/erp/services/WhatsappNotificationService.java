package com.probeco.erp.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WhatsappNotificationService {
    private static final String WHATSAPP_API_URL = "https://graph.facebook.com/v22.0/685446811315054/messages";
    private static final String ACCESS_TOKEN = "EAARlBa1fRnoBOZCk60m9MaXAvZCgqayZBVCgSw76rW1HwewoIkz06tlnycgNY5CaQH1WOKEeZC0isrb2DttMUwJuiF2ghuEJwM5WzmruSfdOYvOVBtXsH8gB5cBV82BJZCBu5iFPgfKaRZA0smbdv5TOxOSIX3JwQsLaZCnkdsKCmvo28Sf7VOA0jMbUTvC0dpULvfWW4ZCttbo9FkPA1gQ6Vv0xt64gWTeSCEMZD"; // Reemplaza con tu token real

    public String sendTemplateMessage(String toPhoneNumber) {
        RestTemplate restTemplate = new RestTemplate();

        // Crear cuerpo del mensaje
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("messaging_product", "whatsapp");
        requestBody.put("to", toPhoneNumber);
        requestBody.put("type", "template");

        Map<String, Object> template = new HashMap<>();
        template.put("name", "hello_world");

        Map<String, String> language = new HashMap<>();
        language.put("code", "en_US");
        template.put("language", language);

        requestBody.put("template", template);

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(ACCESS_TOKEN);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Enviar POST
        ResponseEntity<String> response = restTemplate.postForEntity(WHATSAPP_API_URL, entity, String.class);

        return response.getBody();
    }
}
