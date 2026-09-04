package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.UsuarioDTO;
import com.eshuecas.backend.dto.UsuarioRequest;
import com.eshuecas.backend.entity.Rol;
import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.RolRepository;
import com.eshuecas.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioDTO> listar() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public UsuarioDTO buscarPorId(Long id) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado con ID: " + id
                        )
                );

        return convertirDTO(usuario);
    }

    public UsuarioDTO crear(UsuarioRequest request) {

        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new RuntimeException(
                    "Ya existe un usuario con el correo indicado."
            );
        }

        String nombreRol =
                request.getRol() == null ||
                request.getRol().isBlank()
                        ? "USUARIO"
                        : request.getRol().toUpperCase();

        Rol rol = rolRepository.findByNombre(nombreRol)
                .orElseThrow(() ->
                        new RuntimeException(
                                "No existe el rol: " + nombreRol
                        )
                );

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setCorreo(request.getCorreo());
        usuario.setTelefono(request.getTelefono());

        usuario.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        usuario.setRol(rol);

        usuario.setActivo(
                request.getActivo() == null
                        ? true
                        : request.getActivo()
        );

        Usuario guardado = usuarioRepository.save(usuario);

        return convertirDTO(guardado);
    }

    public UsuarioDTO actualizar(
            Long id,
            UsuarioRequest request
    ) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado con ID: " + id
                        )
                );

        usuario.setNombre(request.getNombre());
        usuario.setTelefono(request.getTelefono());

        if (request.getCorreo() != null &&
                !request.getCorreo().equalsIgnoreCase(
                        usuario.getCorreo()
                )) {

            if (usuarioRepository.existsByCorreo(request.getCorreo())) {
                throw new RuntimeException(
                        "El correo ya está registrado."
                );
            }

            usuario.setCorreo(request.getCorreo());
        }

        if (request.getPassword() != null &&
                !request.getPassword().isBlank()) {

            usuario.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );
        }

        if (request.getRol() != null &&
                !request.getRol().isBlank()) {

            Rol rol = rolRepository
                    .findByNombre(request.getRol().toUpperCase())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Rol no encontrado."
                            )
                    );

            usuario.setRol(rol);
        }

        if (request.getActivo() != null) {
            usuario.setActivo(request.getActivo());
        }

        return convertirDTO(
                usuarioRepository.save(usuario)
        );
    }

    public void eliminar(Long id) {

        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException(
                    "Usuario no encontrado."
            );
        }

        usuarioRepository.deleteById(id);
    }

    private UsuarioDTO convertirDTO(Usuario usuario) {

        UsuarioDTO dto = new UsuarioDTO();

        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setCorreo(usuario.getCorreo());
        dto.setTelefono(usuario.getTelefono());
        dto.setActivo(usuario.getActivo());
        dto.setFechaRegistro(usuario.getFechaRegistro());

        if (usuario.getRol() != null) {
            dto.setRol(usuario.getRol().getNombre());
        }

        return dto;
    }
}