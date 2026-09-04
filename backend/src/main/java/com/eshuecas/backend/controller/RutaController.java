package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.RutaDTO;
import com.eshuecas.backend.service.RutaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rutas")
public class RutaController {

    private final RutaService rutaService;

    public RutaController(
            RutaService rutaService
    ) {
        this.rutaService = rutaService;
    }

    @GetMapping
    public ResponseEntity<List<RutaDTO>> listar(
            @RequestParam(required = false) String q
    ) {

        if (q != null && !q.isBlank()) {
            return ResponseEntity.ok(
                    rutaService.buscar(q)
            );
        }

        return ResponseEntity.ok(
                rutaService.listarActivas()
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<RutaDTO>> listarTodas() {
        return ResponseEntity.ok(
                rutaService.listar()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<RutaDTO> buscarPorId(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                rutaService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<RutaDTO> crear(
            @RequestBody RutaDTO dto
    ) {
        return ResponseEntity.ok(
                rutaService.crear(dto)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RutaDTO> actualizar(
            @PathVariable Long id,
            @RequestBody RutaDTO dto
    ) {
        return ResponseEntity.ok(
                rutaService.actualizar(id, dto)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<RutaDTO> cambiarEstado(
            @PathVariable Long id,
            @RequestParam Boolean activo
    ) {
        return ResponseEntity.ok(
                rutaService.cambiarEstado(
                        id,
                        activo
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {

        rutaService.eliminar(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}