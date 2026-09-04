package com.eshuecas.backend.service;

import com.eshuecas.backend.dto.CategoriaDTO;
import com.eshuecas.backend.entity.Categoria;
import com.eshuecas.backend.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(
            CategoriaRepository categoriaRepository
    ) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<CategoriaDTO> listar() {

        return categoriaRepository.findAll()
                .stream()
                .map(this::convertirDTO)
                .toList();
    }

    public CategoriaDTO buscarPorId(Long id) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Categoría no encontrada con ID: " + id
                        )
                );

        return convertirDTO(categoria);
    }

    public CategoriaDTO crear(CategoriaDTO dto) {

        if (categoriaRepository.existsByNombre(dto.getNombre())) {
            throw new RuntimeException(
                    "Ya existe una categoría con ese nombre."
            );
        }

        Categoria categoria = new Categoria();

        copiarDatos(dto, categoria);

        return convertirDTO(
                categoriaRepository.save(categoria)
        );
    }

    public CategoriaDTO actualizar(
            Long id,
            CategoriaDTO dto
    ) {

        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Categoría no encontrada."
                        )
                );

        copiarDatos(dto, categoria);

        return convertirDTO(
                categoriaRepository.save(categoria)
        );
    }

    public void eliminar(Long id) {

        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException(
                    "Categoría no encontrada."
            );
        }

        categoriaRepository.deleteById(id);
    }

    private void copiarDatos(
            CategoriaDTO dto,
            Categoria categoria
    ) {

        categoria.setNombre(dto.getNombre());
        categoria.setIcono(dto.getIcono());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setImagen(dto.getImagen());
    }

    private CategoriaDTO convertirDTO(
            Categoria categoria
    ) {

        CategoriaDTO dto = new CategoriaDTO();

        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        dto.setIcono(categoria.getIcono());
        dto.setDescripcion(categoria.getDescripcion());
        dto.setImagen(categoria.getImagen());

        return dto;
    }
}