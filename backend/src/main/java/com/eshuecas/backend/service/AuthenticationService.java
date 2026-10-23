package com.eshuecas.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eshuecas.backend.dto.LoginRequest;
import com.eshuecas.backend.dto.LoginResponse;
import com.eshuecas.backend.dto.RegistroRequest;
import com.eshuecas.backend.entity.Rol;
import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.RolRepository;
import com.eshuecas.backend.repository.UsuarioRepository;
import com.eshuecas.backend.security.JwtService;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            CustomUserDetailsService userDetailsService,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getCorreo(),
                        request.getPassword()
                )
        );

        Usuario usuario = usuarioRepository
                .findByCorreo(request.getCorreo())
                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado.")
                );

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        usuario.getCorreo()
                );

        String token =
                jwtService.generarToken(userDetails);

        return new LoginResponse(
                token,
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo(),
                usuario.getRol().getNombre()
        );
    }

    public LoginResponse registrar(RegistroRequest request) {

        if (
                request.getNombre() == null ||
                request.getNombre().isBlank()
        ) {
            throw new RuntimeException(
                    "El nombre es obligatorio."
            );
        }

        if (
                request.getCorreo() == null ||
                request.getCorreo().isBlank()
        ) {
            throw new RuntimeException(
                    "El correo es obligatorio."
            );
        }

        if (
                request.getPassword() == null ||
                request.getPassword().length() < 6
        ) {
            throw new RuntimeException(
                    "La contraseña debe tener mínimo 6 caracteres."
            );
        }

        if (
                !request.getPassword()
                        .equals(
                                request.getConfirmarPassword()
                        )
        ) {
            throw new RuntimeException(
                    "Las contraseñas no coinciden."
            );
        }

        if (
                usuarioRepository.existsByCorreo(
                        request.getCorreo()
                )
        ) {
            throw new RuntimeException(
                    "Ya existe una cuenta con ese correo."
            );
        }

        Rol rolUsuario =
                rolRepository.findByNombre("USUARIO")
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "No existe el rol USUARIO."
                                )
                        );

        Usuario usuario = new Usuario();

        usuario.setNombre(
                request.getNombre()
        );

        usuario.setCorreo(
                request.getCorreo()
        );

        usuario.setTelefono(
                request.getTelefono()
        );

        usuario.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        usuario.setRol(
                rolUsuario
        );

        usuario.setActivo(true);

        Usuario guardado =
                usuarioRepository.save(usuario);

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        guardado.getCorreo()
                );

        String token =
                jwtService.generarToken(userDetails);

        return new LoginResponse(
                token,
                guardado.getId(),
                guardado.getNombre(),
                guardado.getCorreo(),
                guardado.getRol().getNombre()
        );
    }
}