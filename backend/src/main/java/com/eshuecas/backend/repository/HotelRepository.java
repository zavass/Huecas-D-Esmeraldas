package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

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

    long countByActivoTrue();
}