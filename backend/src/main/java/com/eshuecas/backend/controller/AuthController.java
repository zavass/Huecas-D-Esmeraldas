package com.eshuecas.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eshuecas.backend.dto.LoginRequest;
import com.eshuecas.backend.dto.LoginResponse;
import com.eshuecas.backend.dto.RegistroRequest;
import com.eshuecas.backend.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(
            AuthenticationService authenticationService
    ) {
        this.authenticationService =
                authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authenticationService.login(request)
        );
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> registrar(
            @RequestBody RegistroRequest request
    ) {

        return ResponseEntity.ok(
                authenticationService.registrar(request)
        );
    }
}