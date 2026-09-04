package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.LoginRequest;
import com.eshuecas.backend.dto.LoginResponse;
import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.UsuarioRepository;
import com.eshuecas.backend.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            UsuarioRepository usuarioRepository,
            CustomUserDetailsService userDetailsService,
            JwtService jwtService
    ) {
        this.authenticationManager =
                authenticationManager;

        this.usuarioRepository =
                usuarioRepository;

        this.userDetailsService =
                userDetailsService;

        this.jwtService =
                jwtService;
    }

    public LoginResponse login(
            LoginRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getCorreo(),
                        request.getPassword()
                )
        );

        Usuario usuario =
                usuarioRepository
                        .findByCorreo(
                                request.getCorreo()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Usuario no encontrado."
                                )
                        );

        UserDetails userDetails =
                userDetailsService
                        .loadUserByUsername(
                                usuario.getCorreo()
                        );

        String token =
                jwtService
                        .generarToken(userDetails);

        return new LoginResponse(
                token,
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo(),
                usuario.getRol().getNombre()
        );
    }
}