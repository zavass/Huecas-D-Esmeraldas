package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Ruta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RutaRepository extends JpaRepository<Ruta, Long> {

    List<Ruta> findByActivoTrue();

    List<Ruta> findByTituloContainingIgnoreCase(String titulo);

    List<Ruta>
    findByTituloContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
            String titulo,
            String descripcion
    );

    long countByActivoTrue();
}