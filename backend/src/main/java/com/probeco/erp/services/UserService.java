package com.probeco.erp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.probeco.erp.dtos.DtoUser;
import com.probeco.erp.entities.User;
import com.probeco.erp.mappers.UserMapper;
import com.probeco.erp.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository usuarioRepository;
    private final UserMapper usuarioMapper;

    public UserService(UserRepository usuarioRepository, UserMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioMapper = usuarioMapper;
    }

    public List<DtoUser> listarUsuarios() {
        List<User> usuarios = usuarioRepository.findAll();

        return usuarios.isEmpty()
            ? List.of()
            : usuarios.stream().map(usuarioMapper::toDto).toList();
    }

    public ResponseEntity<?> editarUsuario(DtoUser dtoUsuario, String nombreUsuario) {
        Optional<User> optionalUsuario = usuarioRepository.findByUsername(nombreUsuario);

        if (!optionalUsuario.isPresent()) {
            throw new IllegalArgumentException("No se ha encontrado un usuario con el nombre: " + nombreUsuario);
        }

        User usuario = optionalUsuario.get();
        usuarioMapper.updateUsuarioFromDto(dtoUsuario, usuario);
        usuarioRepository.save(usuario);

        return ResponseEntity.ok("El usuario: " + nombreUsuario + " fue editado correctamente!");
    }

    public ResponseEntity<?> eliminarUsuario(Long idUsuario) {
        if (!usuarioRepository.findById(idUsuario).isPresent()) {
            throw new IllegalArgumentException("No existe un usuario con el Id: " + idUsuario);
        }

        usuarioRepository.deleteById(idUsuario);

        return ResponseEntity.ok("Se ha eliminado el usuario con Id " + idUsuario);
    }
}
