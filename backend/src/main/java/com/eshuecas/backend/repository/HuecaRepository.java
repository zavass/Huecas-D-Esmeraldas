package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Hueca;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HuecaRepository extends JpaRepository<Hueca, Long> {

    List<Hueca> findByActivoTrue();

    List<Hueca> findByActivoTrueOrderByCalificacionDesc();

    List<Hueca> findByCategoriaId(Long categoriaId);

    List<Hueca> findByNombreContainingIgnoreCase(String nombre);

    List<Hueca>
    findByNombreContainingIgnoreCaseOrDescripcionContainingIgnoreCase(
            String nombre,
            String descripcion
    );

    List<Hueca>
    findByCategoriaNombreIgnoreCaseAndActivoTrue(
            String categoria
    );

    List<Hueca>
    findByCategoriaNombreIgnoreCaseAndActivoTrueOrderByCalificacionDesc(
            String categoria
    );

    long countByActivoTrue();
}