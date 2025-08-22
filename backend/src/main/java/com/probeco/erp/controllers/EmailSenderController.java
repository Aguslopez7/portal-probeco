package com.probeco.erp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.probeco.erp.services.EmailSenderService;

@RestController
@RequestMapping("/email-sender")
public class EmailSenderController {
    private EmailSenderService emailSenderService;

    public EmailSenderController(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(
            // @RequestParam("from") String from,
            // @RequestParam("to") String to,
            @RequestParam("nameFrom") String nameFrom,
            @RequestParam("emailFrom") String emailFrom,
            @RequestParam("subject") String subject,
            @RequestParam("message") String message) 
            {
        String emailId = emailSenderService.sendEmail(nameFrom, emailFrom, message, subject/*from, to, html*/);

        if (emailId != null) {
            return ResponseEntity.ok("Correo enviado con ID: " + emailId);
        } else {
            return ResponseEntity.status(500).body("Error al enviar el correo");
        }
    }
}
