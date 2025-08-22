package com.probeco.erp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.probeco.erp.dtos.DtoUser;
import com.probeco.erp.mappers.UserMapper;
import com.probeco.erp.repositories.UserRepository;
import com.probeco.erp.services.UserService;

@RestController
@RequestMapping("/usuarios")
public class UserController {
    private final UserService usuarioService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserController(UserService usuarioService, UserRepository userRepository, UserMapper userMapper) {
        this.usuarioService = usuarioService;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @GetMapping("/me")
    public DtoUser getCurrentUser(Authentication authentication) {
        return userRepository.findByUsername(authentication.getName())
                .map(userMapper::toDto)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PreAuthorize("hasAnyRole('CONTABLE', 'SYSADMIN')")
    @GetMapping
    public ResponseEntity<?> listarUsuarios() {
        try {
            return ResponseEntity.ok(usuarioService.listarUsuarios());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{nombre}")
    public ResponseEntity<?> editarUsuario(@RequestBody DtoUser dtoUsuario, @PathVariable String nombre) {
        try {
            return ResponseEntity.ok(usuarioService.editarUsuario(dtoUsuario, nombre));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(usuarioService.eliminarUsuario(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
