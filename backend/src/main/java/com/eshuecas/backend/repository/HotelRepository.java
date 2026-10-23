package com.eshuecas.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eshuecas.backend.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    // Hoteles activos
    List<Hotel> findByActivoTrue();

    // Hoteles activos ordenados por calificación
    List<Hotel> findByActivoTrueOrderByCalificacionDesc();

    // Buscar hotel por nombre
    List<Hotel> findByNombreContainingIgnoreCase(String nombre);

    // Buscar por nombre o descripción
    List<Hotel>
    findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
            String nombre,
            String descripcion
    );

    // Buscar por nombre exacto
    Optional<Hotel> findByNombreIgnoreCase(String nombre);

    /*
     * Se usa en DataSeeder para evitar duplicados si un nombre
     * antiguo quedó con caracteres dañados.
     */
    Optional<Hotel> findFirstByImagenOrderByIdAsc(String imagen);

    long countByActivoTrue();
}
