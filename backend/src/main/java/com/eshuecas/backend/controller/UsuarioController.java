package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.UsuarioDTO;
import com.eshuecas.backend.dto.UsuarioRequest;
import com.eshuecas.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(
            UsuarioService usuarioService
    ) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        return ResponseEntity.ok(
                usuarioService.listar()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> buscarPorId(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                usuarioService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> crear(
            @RequestBody UsuarioRequest request
    ) {
        return ResponseEntity.ok(
                usuarioService.crear(request)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> actualizar(
            @PathVariable Long id,
            @RequestBody UsuarioRequest request
    ) {
        return ResponseEntity.ok(
                usuarioService.actualizar(
                        id,
                        request
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {
        usuarioService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}