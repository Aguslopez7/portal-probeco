package com.probeco.erp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.probeco.erp.services.WhatsappNotificationService;

@RestController
@RequestMapping("/whatsapp-notification")
public class WhatsappNotificationController {

    @Autowired
    private WhatsappNotificationService whatsappService;

    @PostMapping("/send")
    public String SendWhatsappNotification(@RequestParam String phone) {
        return whatsappService.sendTemplateMessage(phone);
    }
}
