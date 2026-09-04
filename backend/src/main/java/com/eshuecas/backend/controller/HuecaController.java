package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.HuecaDTO;
import com.eshuecas.backend.service.HuecaService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/huecas")
public class HuecaController {

    private final HuecaService huecaService;

    public HuecaController(
            HuecaService huecaService
    ) {
        this.huecaService = huecaService;
    }

    @GetMapping
    public ResponseEntity<List<HuecaDTO>> listar(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String categoria
    ) {

        if (
                q != null &&
                !q.isBlank()
        ) {
            return ResponseEntity.ok(
                    huecaService.buscar(q)
            );
        }

        if (
                categoria != null &&
                !categoria.isBlank()
        ) {
            return ResponseEntity.ok(
                    huecaService.buscarPorCategoria(
                            categoria
                    )
            );
        }

        return ResponseEntity.ok(
                huecaService.listarActivas()
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<HuecaDTO>> listarTodas() {

        return ResponseEntity.ok(
                huecaService.listar()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HuecaDTO> buscarPorId(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                huecaService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<HuecaDTO> crear(
            @RequestBody HuecaDTO dto
    ) {

        return ResponseEntity.ok(
                huecaService.crear(dto)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<HuecaDTO> actualizar(
            @PathVariable Long id,
            @RequestBody HuecaDTO dto
    ) {

        return ResponseEntity.ok(
                huecaService.actualizar(
                        id,
                        dto
                )
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<HuecaDTO> cambiarEstado(
            @PathVariable Long id,
            @RequestParam Boolean activo
    ) {

        return ResponseEntity.ok(
                huecaService.cambiarEstado(
                        id,
                        activo
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {

        huecaService.eliminar(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}