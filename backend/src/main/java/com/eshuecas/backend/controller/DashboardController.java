package com.eshuecas.backend.controller;

import com.eshuecas.backend.dto.DashboardDTO;
import com.eshuecas.backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardDTO> obtenerEstadisticas() {
        return ResponseEntity.ok(
                dashboardService.obtenerEstadisticas()
        );
    }
}