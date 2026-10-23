package com.eshuecas.backend.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eshuecas.backend.dto.HuecaDTO;
import com.eshuecas.backend.entity.Categoria;
import com.eshuecas.backend.entity.Hueca;
import com.eshuecas.backend.repository.CategoriaRepository;
import com.eshuecas.backend.repository.HuecaRepository;

@Service
public class HuecaService {

    private final HuecaRepository huecaRepository;
    private final CategoriaRepository categoriaRepository;

    public HuecaService(HuecaRepository huecaRepository, CategoriaRepository categoriaRepository) {
        this.huecaRepository = huecaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<HuecaDTO> listar() {
        return convertirLista(huecaRepository.findAll());
    }

    public List<HuecaDTO> listarActivas() {
        return convertirLista(huecaRepository.findByActivoTrue());
    }

    public HuecaDTO buscarPorId(Long id) {
        Hueca hueca = huecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hueca no encontrada."));
        return convertirDTO(hueca);
    }

    public List<HuecaDTO> buscar(String texto) {
        if (texto == null || texto.isBlank()) {
            return listarActivas();
        }

        List<Hueca> huecas = huecaRepository
                .findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(texto, texto)
                .stream()
                .filter(h -> Boolean.TRUE.equals(h.getActivo()))
                .toList();

        return convertirLista(huecas);
    }

    public List<HuecaDTO> buscarPorCategoria(String categoria) {
        if (categoria == null || categoria.isBlank()) {
            return listarActivas();
        }

        return convertirLista(
                huecaRepository.findByCategoriaNombreIgnoreCaseAndActivoTrue(categoria)
        );
    }

    public HuecaDTO crear(HuecaDTO dto) {
        if (dto.getNombre() == null || dto.getNombre().isBlank()) {
            throw new RuntimeException("El nombre de la hueca es obligatorio.");
        }

        Categoria categoria = obtenerCategoria(dto.getCategoriaId());
        Hueca hueca = new Hueca();
        aplicarDatos(hueca, dto, categoria);
        return convertirDTO(huecaRepository.save(hueca));
    }

    public HuecaDTO actualizar(Long id, HuecaDTO dto) {
        Hueca hueca = huecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hueca no encontrada."));

        Categoria categoria = dto.getCategoriaId() != null
                ? obtenerCategoria(dto.getCategoriaId())
                : hueca.getCategoria();

        aplicarDatos(hueca, dto, categoria);
        return convertirDTO(huecaRepository.save(hueca));
    }

    public HuecaDTO cambiarEstado(Long id, Boolean activo) {
        Hueca hueca = huecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hueca no encontrada."));

        hueca.setActivo(Boolean.TRUE.equals(activo));
        return convertirDTO(huecaRepository.save(hueca));
    }

    public void eliminar(Long id) {
        Hueca hueca = huecaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hueca no encontrada."));
        huecaRepository.delete(hueca);
    }

    private Categoria obtenerCategoria(Long categoriaId) {
        if (categoriaId == null) {
            throw new RuntimeException("Debe seleccionar una categoría.");
        }

        return categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada."));
    }

    private void aplicarDatos(Hueca hueca, HuecaDTO dto, Categoria categoria) {
        hueca.setNombre(dto.getNombre());
        hueca.setCategoria(categoria);
        hueca.setDescripcion(dto.getDescripcion());
        hueca.setDireccion(dto.getDireccion());
        hueca.setTelefono(dto.getTelefono());
        hueca.setHorario(dto.getHorario());
        hueca.setImagen(dto.getImagen());
        hueca.setEtiqueta(dto.getEtiqueta());
        hueca.setCalificacion(dto.getCalificacion() != null ? dto.getCalificacion() : 0.0);
        hueca.setLatitud(dto.getLatitud());
        hueca.setLongitud(dto.getLongitud());
        hueca.setActivo(dto.getActivo() != null ? dto.getActivo() : true);
        hueca.setDestacado(dto.getDestacado() != null ? dto.getDestacado() : false);
        hueca.setInstagramUrl(limpiarTexto(dto.getInstagramUrl()));
        hueca.setTiktokUrl(limpiarTexto(dto.getTiktokUrl()));
        hueca.setFacebookUrl(limpiarTexto(dto.getFacebookUrl()));
    }

    private String limpiarTexto(String valor) {
        return valor == null || valor.isBlank() ? null : valor.trim();
    }

    private List<HuecaDTO> convertirLista(List<Hueca> huecas) {
        return huecas.stream()
                .sorted(
                        Comparator
                                .comparing((Hueca h) -> Boolean.TRUE.equals(h.getDestacado()) ? 0 : 1)
                                .thenComparing(
                                        h -> h.getCalificacion() != null ? h.getCalificacion() : 0.0,
                                        Comparator.reverseOrder()
                                )
                                .thenComparing(Hueca::getNombre, String.CASE_INSENSITIVE_ORDER)
                )
                .map(this::convertirDTO)
                .toList();
    }

    private HuecaDTO convertirDTO(Hueca hueca) {
        HuecaDTO dto = new HuecaDTO();

        dto.setId(hueca.getId());
        dto.setNombre(hueca.getNombre());

        if (hueca.getCategoria() != null) {
            dto.setCategoriaId(hueca.getCategoria().getId());
            dto.setCategoriaNombre(hueca.getCategoria().getNombre());
        }

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
        dto.setDestacado(hueca.getDestacado());
        dto.setInstagramUrl(hueca.getInstagramUrl());
        dto.setTiktokUrl(hueca.getTiktokUrl());
        dto.setFacebookUrl(hueca.getFacebookUrl());

        return dto;
    }
}
