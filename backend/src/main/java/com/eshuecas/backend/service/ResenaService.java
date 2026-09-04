package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.ResenaDTO;
import com.eshuecas.backend.entity.Hueca;
import com.eshuecas.backend.entity.Resena;
import com.eshuecas.backend.entity.Usuario;
import com.eshuecas.backend.repository.HuecaRepository;
import com.eshuecas.backend.repository.ResenaRepository;
import com.eshuecas.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResenaService {

    private final ResenaRepository resenaRepository;
    private final UsuarioRepository usuarioRepository;
    private final HuecaRepository huecaRepository;

    public ResenaService(
            ResenaRepository resenaRepository,
            UsuarioRepository usuarioRepository,
            HuecaRepository huecaRepository
    ) {
        this.resenaRepository = resenaRepository;
        this.usuarioRepository = usuarioRepository;
        this.huecaRepository = huecaRepository;
    }

    public List<ResenaDTO> listar() {

        return resenaRepository.findAll()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<ResenaDTO> listarActivas() {

        return resenaRepository.findByActivoTrue()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<ResenaDTO> listarPorHueca(Long huecaId) {

        return resenaRepository.findByHuecaId(huecaId)
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<ResenaDTO> listarPorUsuario(Long usuarioId) {

        return resenaRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public ResenaDTO buscarPorId(Long id) {

        Resena resena = buscarEntidad(id);

        return convertirDTO(resena);
    }

    public ResenaDTO crear(ResenaDTO dto) {

        if (dto.getUsuarioId() == null) {
            throw new RuntimeException(
                    "Debe indicar el usuario."
            );
        }

        if (dto.getHuecaId() == null) {
            throw new RuntimeException(
                    "Debe indicar la hueca."
            );
        }

        validarCalificacion(dto.getCalificacion());

        Usuario usuario = usuarioRepository
                .findById(dto.getUsuarioId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado."
                        )
                );

        Hueca hueca = huecaRepository
                .findById(dto.getHuecaId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hueca no encontrada."
                        )
                );

        Resena resena = new Resena();

        resena.setUsuario(usuario);
        resena.setHueca(hueca);
        resena.setCalificacion(dto.getCalificacion());
        resena.setComentario(dto.getComentario());

        if (dto.getActivo() != null) {
            resena.setActivo(dto.getActivo());
        }

        Resena guardada = resenaRepository.save(resena);

        actualizarCalificacionHueca(hueca.getId());

        return convertirDTO(guardada);
    }

    public ResenaDTO actualizar(
            Long id,
            ResenaDTO dto
    ) {

        Resena resena = buscarEntidad(id);

        validarCalificacion(dto.getCalificacion());

        if (dto.getCalificacion() != null) {
            resena.setCalificacion(dto.getCalificacion());
        }

        if (dto.getComentario() != null) {
            resena.setComentario(dto.getComentario());
        }

        if (dto.getActivo() != null) {
            resena.setActivo(dto.getActivo());
        }

        Resena actualizada =
                resenaRepository.save(resena);

        actualizarCalificacionHueca(
                resena.getHueca().getId()
        );

        return convertirDTO(actualizada);
    }

    public void eliminar(Long id) {

        Resena resena = buscarEntidad(id);

        Long huecaId = resena.getHueca().getId();

        resenaRepository.delete(resena);

        actualizarCalificacionHueca(huecaId);
    }

    private Resena buscarEntidad(Long id) {

        return resenaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Reseña no encontrada con ID: " + id
                        )
                );
    }

    private void validarCalificacion(
            Integer calificacion
    ) {

        if (calificacion == null) {
            return;
        }

        if (calificacion < 1 || calificacion > 5) {
            throw new RuntimeException(
                    "La calificación debe estar entre 1 y 5."
            );
        }
    }

    private void actualizarCalificacionHueca(
            Long huecaId
    ) {

        Hueca hueca = huecaRepository
                .findById(huecaId)
                .orElse(null);

        if (hueca == null) {
            return;
        }

        List<Resena> resenas =
                resenaRepository.findByHuecaId(huecaId)
                        .stream()
                        .filter(r ->
                                Boolean.TRUE.equals(r.getActivo())
                        )
                        .toList();

        if (resenas.isEmpty()) {
            hueca.setCalificacion(0.0);
        } else {

            double promedio = resenas.stream()
                    .mapToInt(Resena::getCalificacion)
                    .average()
                    .orElse(0.0);

            double redondeado =
                    Math.round(promedio * 10.0) / 10.0;

            hueca.setCalificacion(redondeado);
        }

        huecaRepository.save(hueca);
    }

    private ResenaDTO convertirDTO(
            Resena resena
    ) {

        ResenaDTO dto = new ResenaDTO();

        dto.setId(resena.getId());
        dto.setCalificacion(resena.getCalificacion());
        dto.setComentario(resena.getComentario());
        dto.setFecha(resena.getFecha());
        dto.setActivo(resena.getActivo());

        if (resena.getUsuario() != null) {

            dto.setUsuarioId(
                    resena.getUsuario().getId()
            );

            dto.setUsuarioNombre(
                    resena.getUsuario().getNombre()
            );
        }

        if (resena.getHueca() != null) {

            dto.setHuecaId(
                    resena.getHueca().getId()
            );

            dto.setHuecaNombre(
                    resena.getHueca().getNombre()
            );
        }

        return dto;
    }
}