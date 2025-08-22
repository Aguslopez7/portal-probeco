package com.probeco.erp.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.probeco.erp.dtos.DtoEventoCalendar;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class GoogleService {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.refresh.token}")
    private String refreshToken;

    @Value("${google.calendar.empresaA}")
    private String calendarA;

    @Value("${google.calendar.empresaB}")
    private String calendarB;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAccessToken() {
        String tokenUrl = "https://oauth2.googleapis.com/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("refresh_token", refreshToken);
        body.add("grant_type", "refresh_token");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        return response.getBody().get("access_token").toString();
    }

    public void createEvent(String empresa, DtoEventoCalendar dto) {
    String calendarId = empresa.equalsIgnoreCase("A") ? calendarA : calendarB;
    String accessToken = getAccessToken();

    Map<String, Object> event = new LinkedHashMap<>();
    event.put("summary", dto.titulo());
    event.put("description", dto.descripcion());
    event.put("location", dto.ubicacion());

    // Evento de día completo: se usa "date" en lugar de "dateTime"
    Map<String, String> startObj = new LinkedHashMap<>();
    startObj.put("date", dto.fecha().toString()); // e.g. "2025-08-01"

    Map<String, String> endObj = new LinkedHashMap<>();
    endObj.put("date", dto.fecha().plusDays(1).toString()); // fin exclusivo

    event.put("start", startObj);
    event.put("end", endObj);

    try {
        String prettyJson = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(event);
        System.out.println("JSON a enviar:\n" + prettyJson);
    } catch (Exception e) {
        e.printStackTrace();
    }

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(event, headers);
    String url = String.format("https://www.googleapis.com/calendar/v3/calendars/%s/events", calendarId);

    try {
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
        System.out.println("✅ Evento creado: " + response.getBody());
    } catch (HttpClientErrorException e) {
        System.out.println("❌ Error al crear evento: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
        throw e;
    }
}

}
