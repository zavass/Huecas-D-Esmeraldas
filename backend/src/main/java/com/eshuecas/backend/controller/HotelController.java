package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.HotelDTO;
import com.eshuecas.backend.service.HotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hoteles")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(
            HotelService hotelService
    ) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResponseEntity<List<HotelDTO>> listar(
            @RequestParam(required = false) String q
    ) {

        if (q != null && !q.isBlank()) {
            return ResponseEntity.ok(
                    hotelService.buscar(q)
            );
        }

        return ResponseEntity.ok(
                hotelService.listarActivos()
        );
    }

    @GetMapping("/admin")
    public ResponseEntity<List<HotelDTO>> listarTodos() {
        return ResponseEntity.ok(
                hotelService.listar()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelDTO> buscarPorId(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                hotelService.buscarPorId(id)
        );
    }

    @PostMapping
    public ResponseEntity<HotelDTO> crear(
            @RequestBody HotelDTO dto
    ) {
        return ResponseEntity.ok(
                hotelService.crear(dto)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelDTO> actualizar(
            @PathVariable Long id,
            @RequestBody HotelDTO dto
    ) {
        return ResponseEntity.ok(
                hotelService.actualizar(id, dto)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<HotelDTO> cambiarEstado(
            @PathVariable Long id,
            @RequestParam Boolean activo
    ) {
        return ResponseEntity.ok(
                hotelService.cambiarEstado(
                        id,
                        activo
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {

        hotelService.eliminar(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}