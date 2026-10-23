package com.eshuecas.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eshuecas.backend.entity.Hueca;

public interface HuecaRepository extends JpaRepository<Hueca, Long> {

    // Huecas activas
    List<Hueca> findByActivoTrue();

    // Huecas activas ordenadas por calificación
    List<Hueca> findByActivoTrueOrderByCalificacionDesc();

    // Huecas por categoría
    List<Hueca> findByCategoriaId(Long categoriaId);

    // Buscar por nombre
    List<Hueca> findByNombreContainingIgnoreCase(String nombre);

    // Buscar por nombre o descripción
    List<Hueca>
    findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
            String nombre,
            String descripcion
    );

    // Buscar activas por nombre de categoría
    List<Hueca>
    findByCategoriaNombreIgnoreCaseAndActivoTrue(
            String categoria
    );

    // Buscar activas por categoría y ordenar por calificación
    List<Hueca>
    findByCategoriaNombreIgnoreCaseAndActivoTrueOrderByCalificacionDesc(
            String categoria
    );

    // Buscar una hueca por nombre exacto ignorando mayúsculas/minúsculas
    Optional<Hueca> findByNombreIgnoreCase(String nombre);

    /*
     * Se usa principalmente en DataSeeder.
     * La imagen funciona como identificador estable y evita que
     * se creen duplicados cuando el nombre cambia por tildes,
     * ñ o problemas de codificación.
     */
    Optional<Hueca> findFirstByImagenOrderByIdAsc(String imagen);

    // Útil para auditorías o limpiezas
    List<Hueca> findAllByImagen(String imagen);

    long countByActivoTrue();
}
