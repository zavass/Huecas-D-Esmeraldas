package com.eshuecas.backend.service;

import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public CustomUserDetailsService(
            UsuarioRepository usuarioRepository
    ) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String correo
    ) throws UsernameNotFoundException {

        Usuario usuario =
                usuarioRepository
                        .findByCorreo(correo)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "Usuario no encontrado: "
                                                + correo
                                )
                        );

        if (!Boolean.TRUE.equals(
                usuario.getActivo()
        )) {

            throw new UsernameNotFoundException(
                    "El usuario está desactivado."
            );
        }

        String rol = usuario.getRol() != null
                ? usuario.getRol().getNombre()
                : "USUARIO";

        return User.builder()
                .username(usuario.getCorreo())
                .password(usuario.getPassword())
                .authorities(
                        "ROLE_" + rol.toUpperCase()
                )
                .build();
    }
}