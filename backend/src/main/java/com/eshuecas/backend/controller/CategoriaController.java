package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.CategoriaDTO;
import com.eshuecas.backend.service.CategoriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(
            CategoriaService categoriaService
    ) {
        this.categoriaService = categoriaService;
    }

    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> listar() {
        return ResponseEntity.ok(
                categoriaService.listar()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> buscar(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                categoriaService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<CategoriaDTO> crear(
            @RequestBody CategoriaDTO dto
    ) {
        return ResponseEntity.ok(
                categoriaService.crear(dto)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> actualizar(
            @PathVariable Long id,
            @RequestBody CategoriaDTO dto
    ) {
        return ResponseEntity.ok(
                categoriaService.actualizar(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {
        categoriaService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}