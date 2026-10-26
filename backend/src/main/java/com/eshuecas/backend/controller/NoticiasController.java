
package com.eshuecas.backend.controller;

import com.eshuecas.backend.entity.Noticia;
import com.eshuecas.backend.service.NoticiasService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiasController {

    private final NoticiasService noticiasService;

    public NoticiasController(
            NoticiasService noticiasService
    ) {
        this.noticiasService = noticiasService;
    }

    @GetMapping
    public List<Noticia> listarNoticias() {
        return noticiasService
                .listarNoticiasPublicadas();
    }

    @PostMapping("/actualizar")
    public List<Noticia> actualizarNoticiasAhora() {
        return noticiasService
                .actualizarAhoraYListar();
    }
}
