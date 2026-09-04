package com.eshuecas.backend.repository;

import com.eshuecas.backend.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findByNombre(String nombre);

    Optional<Categoria> findByNombreIgnoreCase(String nombre);

    boolean existsByNombre(String nombre);
}