package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Noticia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoticiaRepository extends JpaRepository<Noticia, Long> {

    Optional<Noticia> findByUrl(String url);

    List<Noticia> findByPublicadaTrueOrderByFechaDescIdDesc();

    long countByPublicadaTrue();
}