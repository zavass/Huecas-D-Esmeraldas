package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.ResenaDTO;
import com.eshuecas.backend.service.ResenaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resenas")
public class ResenaController {

    private final ResenaService resenaService;

    public ResenaController(ResenaService resenaService) {
        this.resenaService = resenaService;
    }

    @GetMapping
    public ResponseEntity<List<ResenaDTO>> listar() {
        return ResponseEntity.ok(
                resenaService.listarActivas()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResenaDTO> buscarPorId(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                resenaService.buscarPorId(id)
        );
    }

    @GetMapping("/hueca/{huecaId}")
    public ResponseEntity<List<ResenaDTO>> listarPorHueca(
            @PathVariable Long huecaId
    ) {
        return ResponseEntity.ok(
                resenaService.listarPorHueca(huecaId)
        );
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ResenaDTO>> listarPorUsuario(
            @PathVariable Long usuarioId
    ) {
        return ResponseEntity.ok(
                resenaService.listarPorUsuario(usuarioId)
        );
    }

    @PostMapping
    public ResponseEntity<ResenaDTO> crear(
            @RequestBody ResenaDTO dto
    ) {
        return ResponseEntity.ok(
                resenaService.crear(dto)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResenaDTO> actualizar(
            @PathVariable Long id,
            @RequestBody ResenaDTO dto
    ) {
        return ResponseEntity.ok(
                resenaService.actualizar(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {
        resenaService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}