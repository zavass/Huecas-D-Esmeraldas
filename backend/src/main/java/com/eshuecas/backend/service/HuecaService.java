package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.HuecaDTO;
import com.eshuecas.backend.entity.Categoria;
import com.eshuecas.backend.entity.Hueca;
import com.eshuecas.backend.repository.CategoriaRepository;
import com.eshuecas.backend.repository.HuecaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HuecaService {

    private final HuecaRepository huecaRepository;
    private final CategoriaRepository categoriaRepository;

    public HuecaService(
            HuecaRepository huecaRepository,
            CategoriaRepository categoriaRepository
    ) {
        this.huecaRepository = huecaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<HuecaDTO> listar() {

        return huecaRepository.findAll()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<HuecaDTO> listarActivas() {

        return huecaRepository
                .findByActivoTrueOrderByCalificacionDesc()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public HuecaDTO buscarPorId(Long id) {

        Hueca hueca = buscarEntidad(id);

        return convertirDTO(hueca);
    }

    public List<HuecaDTO> buscar(String texto) {

        return huecaRepository
                .findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
                        texto,
                        texto
                )
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public List<HuecaDTO> buscarPorCategoria(
            String categoria
    ) {

        return huecaRepository
                .findByCategoriaNombreIgnoreCaseAndActivoTrueOrderByCalificacionDesc(
                        categoria
                )
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public HuecaDTO crear(HuecaDTO dto) {

        Hueca hueca = new Hueca();

        copiarDatos(dto, hueca);

        return convertirDTO(
                huecaRepository.save(hueca)
        );
    }

    public HuecaDTO actualizar(
            Long id,
            HuecaDTO dto
    ) {

        Hueca hueca = buscarEntidad(id);

        copiarDatos(dto, hueca);

        return convertirDTO(
                huecaRepository.save(hueca)
        );
    }

    public void eliminar(Long id) {

        if (!huecaRepository.existsById(id)) {
            throw new RuntimeException(
                    "Hueca no encontrada."
            );
        }

        huecaRepository.deleteById(id);
    }

    public HuecaDTO cambiarEstado(
            Long id,
            Boolean activo
    ) {

        Hueca hueca = buscarEntidad(id);

        hueca.setActivo(activo);

        return convertirDTO(
                huecaRepository.save(hueca)
        );
    }

    private Hueca buscarEntidad(Long id) {

        return huecaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hueca no encontrada con ID: " + id
                        )
                );
    }

    private void copiarDatos(
            HuecaDTO dto,
            Hueca hueca
    ) {

        if (dto.getCategoriaId() == null) {
            throw new RuntimeException(
                    "Debe seleccionar una categoría."
            );
        }

        Categoria categoria =
                categoriaRepository
                        .findById(dto.getCategoriaId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Categoría no encontrada."
                                )
                        );

        hueca.setNombre(dto.getNombre());
        hueca.setCategoria(categoria);
        hueca.setDescripcion(dto.getDescripcion());
        hueca.setDireccion(dto.getDireccion());
        hueca.setTelefono(dto.getTelefono());
        hueca.setHorario(dto.getHorario());
        hueca.setImagen(dto.getImagen());
        hueca.setEtiqueta(dto.getEtiqueta());
        hueca.setCalificacion(
                dto.getCalificacion() == null
                        ? 0.0
                        : dto.getCalificacion()
        );
        hueca.setLatitud(dto.getLatitud());
        hueca.setLongitud(dto.getLongitud());

        if (dto.getActivo() != null) {
            hueca.setActivo(dto.getActivo());
        }
    }

    private HuecaDTO convertirDTO(Hueca hueca) {

        HuecaDTO dto = new HuecaDTO();

        dto.setId(hueca.getId());
        dto.setNombre(hueca.getNombre());
        dto.setDescripcion(hueca.getDescripcion());
        dto.setDireccion(hueca.getDireccion());
        dto.setTelefono(hueca.getTelefono());
        dto.setHorario(hueca.getHorario());
        dto.setImagen(hueca.getImagen());
        dto.setEtiqueta(hueca.getEtiqueta());
        dto.setCalificacion(hueca.getCalificacion());
        dto.setLatitud(hueca.getLatitud());
        dto.setLongitud(hueca.getLongitud());
        dto.setActivo(hueca.getActivo());

        if (hueca.getCategoria() != null) {

            dto.setCategoriaId(
                    hueca.getCategoria().getId()
            );

            dto.setCategoriaNombre(
                    hueca.getCategoria().getNombre()
            );
        }

        return dto;
    }
}