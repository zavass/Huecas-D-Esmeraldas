package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.RutaDTO;
import com.eshuecas.backend.entity.Ruta;
import com.eshuecas.backend.repository.RutaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RutaService {

    private final RutaRepository rutaRepository;

    public RutaService(
            RutaRepository rutaRepository
    ) {
        this.rutaRepository = rutaRepository;
    }

    public List<RutaDTO> listar() {

        return rutaRepository.findAll()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<RutaDTO> listarActivas() {

        return rutaRepository.findByActivoTrue()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public RutaDTO buscarPorId(Long id) {

        return convertirDTO(
                buscarEntidad(id)
        );
    }

    public List<RutaDTO> buscar(String texto) {

        return rutaRepository
                .findByTituloContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
                        texto,
                        texto
                )
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public RutaDTO crear(RutaDTO dto) {

        Ruta ruta = new Ruta();

        copiarDatos(dto, ruta);

        return convertirDTO(
                rutaRepository.save(ruta)
        );
    }

    public RutaDTO actualizar(
            Long id,
            RutaDTO dto
    ) {

        Ruta ruta = buscarEntidad(id);

        copiarDatos(dto, ruta);

        return convertirDTO(
                rutaRepository.save(ruta)
        );
    }

    public void eliminar(Long id) {

        if (!rutaRepository.existsById(id)) {
            throw new RuntimeException(
                    "Ruta no encontrada."
            );
        }

        rutaRepository.deleteById(id);
    }

    public RutaDTO cambiarEstado(
            Long id,
            Boolean activo
    ) {

        Ruta ruta = buscarEntidad(id);

        ruta.setActivo(activo);

        return convertirDTO(
                rutaRepository.save(ruta)
        );
    }

    private Ruta buscarEntidad(Long id) {

        return rutaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Ruta no encontrada con ID: " + id
                        )
                );
    }

    private void copiarDatos(
            RutaDTO dto,
            Ruta ruta
    ) {

        ruta.setTitulo(dto.getTitulo());
        ruta.setDescripcion(dto.getDescripcion());
        ruta.setOrigen(dto.getOrigen());
        ruta.setDestino(dto.getDestino());
        ruta.setDuracion(dto.getDuracion());
        ruta.setIcono(dto.getIcono());
        ruta.setGoogleMapsUrl(dto.getGoogleMapsUrl());
        ruta.setDistanciaKm(dto.getDistanciaKm());

        if (dto.getActivo() != null) {
            ruta.setActivo(dto.getActivo());
        }
    }

    private RutaDTO convertirDTO(Ruta ruta) {

        RutaDTO dto = new RutaDTO();

        dto.setId(ruta.getId());
        dto.setTitulo(ruta.getTitulo());
        dto.setDescripcion(ruta.getDescripcion());
        dto.setOrigen(ruta.getOrigen());
        dto.setDestino(ruta.getDestino());
        dto.setDuracion(ruta.getDuracion());
        dto.setIcono(ruta.getIcono());
        dto.setGoogleMapsUrl(ruta.getGoogleMapsUrl());
        dto.setDistanciaKm(ruta.getDistanciaKm());
        dto.setActivo(ruta.getActivo());

        return dto;
    }
}