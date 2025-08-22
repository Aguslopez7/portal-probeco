package com.probeco.erp.auth.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.probeco.erp.auth.services.AuthService;
import com.probeco.erp.dtos.DtoAuthResponse;
import com.probeco.erp.dtos.DtoLoginRequest;
import com.probeco.erp.dtos.DtoRegisterRequest;
import com.probeco.erp.entities.User;
import com.probeco.erp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody DtoRegisterRequest request) throws Exception {
        try {
            DtoAuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody DtoLoginRequest request) throws Exception {
        try {
            Optional<User> userOptional = userRepository.findByUsername(request.username());

            if (!userOptional.isPresent()) {
                DtoAuthResponse errorResponse = DtoAuthResponse.builder()
                        .message("Usuario incorrecto!")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            User user = userOptional.get();
            boolean isPasswordValid = authService.checkPassword(request.password(), user.getPassword());

            if (!isPasswordValid) {
                DtoAuthResponse errorResponse = DtoAuthResponse.builder()
                        .message("Contraseña incorrecta!")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            // Generate and return authentication token
            DtoAuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
