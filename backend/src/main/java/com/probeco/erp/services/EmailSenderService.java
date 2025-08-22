package com.probeco.erp.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.resend.*;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

import jakarta.annotation.PostConstruct;

@Service
public class EmailSenderService {

    private Resend resend;

    @Value("${resend.api_key}")
    private String apiKey;

    @PostConstruct
    public void init() {
        this.resend = new Resend(apiKey);
    }

    public String sendEmail(String nameFrom, String emailFrom, String message, String subject/*String from, String to, String htmlContent*/) {
        String from = String.format("%s <%s>", nameFrom, emailFrom);
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from(from) // Acme <onboarding@resend.dev>
                .to("agustinlopezn.dev@gmail.com")
                .subject(subject)
                .text(message)
                .build();

        try {
            CreateEmailResponse response = resend.emails().send(params);
            System.out.println("Email enviado, ID: " + response.getId());
            return response.getId();
        } catch (ResendException e) {
            System.err.println("Error Resend: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}

