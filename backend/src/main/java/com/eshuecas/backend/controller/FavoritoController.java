package com.eshuecas.backend.controller;

import com.eshuecas.backend.entity.Favorito;
import com.eshuecas.backend.service.FavoritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {

    private final FavoritoService favoritoService;

    public FavoritoController(FavoritoService favoritoService) {
        this.favoritoService = favoritoService;
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Favorito>> listarPorUsuario(
            @PathVariable Long usuarioId
    ) {
        return ResponseEntity.ok(
                favoritoService.listarPorUsuario(usuarioId)
        );
    }

    @GetMapping("/usuario/{usuarioId}/hueca/{huecaId}")
    public ResponseEntity<Map<String, Boolean>> verificarFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long huecaId
    ) {
        boolean favorito = favoritoService.esFavorito(
                usuarioId,
                huecaId
        );

        return ResponseEntity.ok(
                Map.of("favorito", favorito)
        );
    }

    @PostMapping("/usuario/{usuarioId}/hueca/{huecaId}")
    public ResponseEntity<Favorito> agregar(
            @PathVariable Long usuarioId,
            @PathVariable Long huecaId
    ) {
        return ResponseEntity.ok(
                favoritoService.agregar(
                        usuarioId,
                        huecaId
                )
        );
    }

    @DeleteMapping("/usuario/{usuarioId}/hueca/{huecaId}")
    public ResponseEntity<Void> quitar(
            @PathVariable Long usuarioId,
            @PathVariable Long huecaId
    ) {
        favoritoService.quitar(
                usuarioId,
                huecaId
        );

        return ResponseEntity.noContent().build();
    }
}