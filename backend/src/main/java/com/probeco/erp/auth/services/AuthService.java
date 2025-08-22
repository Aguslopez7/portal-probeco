package com.probeco.erp.auth.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.probeco.erp.dtos.DtoAuthResponse;
import com.probeco.erp.dtos.DtoLoginRequest;
import com.probeco.erp.dtos.DtoRegisterRequest;
import com.probeco.erp.entities.User;
import com.probeco.erp.mappers.UserMapper;
import com.probeco.erp.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public DtoAuthResponse register(DtoRegisterRequest dtoRegisterRequest) throws Exception {

        if (userRepository.findByUsername(dtoRegisterRequest.username()).isPresent()) {
            throw new Exception("El nombre de usuario ya existe!");  
        }

        String email = dtoRegisterRequest.email();

        if (!email.isEmpty()) {
            if (userRepository.findByEmail(email).isPresent()) {
                throw new Exception("El email ingresado ya existe o no se puede ocupar.");  
            }
        }
        
        User user = userMapper.toEntity(dtoRegisterRequest);

        // Encode the password before mapping to User entity
        String encodedPasswordUser = passwordEncoder.encode(dtoRegisterRequest.password());

        // Set the encoded password on the User entity
        user.setPassword(encodedPasswordUser);

        userRepository.save(user);
        
        if (user == null || userRepository.findById(user.getId()).isEmpty()) {
            throw new RuntimeException("User registration failed. Please try again.");
        } else {
            return DtoAuthResponse.builder()
                .message("Usuario registrado correctamente!")
                .token(jwtService.getToken(user))
                .username(user.getUsername())
                .role(user.getRole().toString())
                .build(); 
        }
    }

    public DtoAuthResponse login(DtoLoginRequest request) throws Exception {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        UserDetails userDetail = userRepository.findByUsername(request.username()).orElseThrow();
    
        // Buscar el usuario en la base de datos
        Optional<User> userOpt = userRepository.findByUsername(request.username());
        User userEnt = userOpt.orElseThrow(() -> new Exception("User not found"));
    
    
        // Añadir parametros al jwt
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("role", userDetail.getAuthorities());
        extraClaims.put("username", userDetail.getUsername());
        extraClaims.put("userId", userEnt.getId());
        extraClaims.put("email", userEnt.getEmail());
    
        // Generar el token con las reclamaciones adicionales
        String token = jwtService.generateTokenWithClaims(extraClaims, userDetail);
    
        return DtoAuthResponse.builder()
            .message("User successfully logged in")
            .token(token)
            .username(userDetail.getUsername())
            .role(userDetail.getAuthorities().toString())
            .build();
    }
}
